import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * ブックマークをコレクションに追加
 */
export const add = mutation({
  args: {
    clerkId: v.string(),
    bookmarkId: v.id("bookmarks"),
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    // ブックマークの所有者確認
    const bookmark = await ctx.db.get(args.bookmarkId);
    if (!bookmark || bookmark.userId !== user._id) {
      throw new Error("ブックマークが見つからないか、アクセス権がありません");
    }

    // コレクションの所有者確認
    const collection = await ctx.db.get(args.collectionId);
    if (!collection || collection.userId !== user._id) {
      throw new Error("コレクションが見つからないか、アクセス権がありません");
    }

    // 既に追加済みかチェック
    const existing = await ctx.db
      .query("bookmarkCollections")
      .withIndex("by_bookmark", (q) => q.eq("bookmarkId", args.bookmarkId))
      .collect();

    const alreadyAdded = existing.some(
      (r) => r.collectionId === args.collectionId,
    );

    if (alreadyAdded) {
      throw new Error("このブックマークは既にこのコレクションに追加されています");
    }

    // bookmarkCollectionsに追加
    const relationId = await ctx.db.insert("bookmarkCollections", {
      bookmarkId: args.bookmarkId,
      collectionId: args.collectionId,
      userId: user._id,
      addedAt: Date.now(),
    });

    // コレクションのブックマーク数をインクリメント
    await ctx.db.patch(args.collectionId, {
      bookmarkCount: collection.bookmarkCount + 1,
      updatedAt: Date.now(),
    });

    return relationId;
  },
});

/**
 * ブックマークをコレクションから削除
 */
export const remove = mutation({
  args: {
    clerkId: v.string(),
    bookmarkId: v.id("bookmarks"),
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    // 関連レコードを検索
    const relations = await ctx.db
      .query("bookmarkCollections")
      .withIndex("by_bookmark", (q) => q.eq("bookmarkId", args.bookmarkId))
      .collect();

    const relation = relations.find(
      (r) => r.collectionId === args.collectionId && r.userId === user._id,
    );

    if (!relation) {
      throw new Error("このブックマークはこのコレクションに存在しません");
    }

    // 関連レコードを削除
    await ctx.db.delete(relation._id);

    // コレクションのブックマーク数をデクリメント
    const collection = await ctx.db.get(args.collectionId);
    if (collection) {
      await ctx.db.patch(args.collectionId, {
        bookmarkCount: Math.max(0, collection.bookmarkCount - 1),
        updatedAt: Date.now(),
      });
    }

    return relation._id;
  },
});

/**
 * ブックマークが属するコレクション一覧の取得
 */
export const getByBookmark = query({
  args: {
    clerkId: v.string(),
    bookmarkId: v.id("bookmarks"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return [];
    }

    const relations = await ctx.db
      .query("bookmarkCollections")
      .withIndex("by_bookmark", (q) => q.eq("bookmarkId", args.bookmarkId))
      .collect();

    // ユーザー所有のもののみフィルター
    const userRelations = relations.filter((r) => r.userId === user._id);

    const collections = [];

    for (const relation of userRelations) {
      const collection = await ctx.db.get(relation.collectionId);
      if (collection) {
        collections.push(collection);
      }
    }

    return collections;
  },
});
