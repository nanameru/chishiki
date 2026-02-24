import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

/**
 * コレクション一覧の取得
 */
export const list = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return [];
    }

    return await ctx.db
      .query("collections")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

/**
 * コレクション単体の取得
 */
export const get = query({
  args: {
    clerkId: v.string(),
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return null;
    }

    const collection = await ctx.db.get(args.collectionId);

    if (!collection || collection.userId !== user._id) {
      return null;
    }

    return collection;
  },
});

/**
 * コレクション内のブックマーク取得
 */
export const getBookmarks = query({
  args: {
    clerkId: v.string(),
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return [];
    }

    const collection = await ctx.db.get(args.collectionId);

    if (!collection || collection.userId !== user._id) {
      return [];
    }

    const relations = await ctx.db
      .query("bookmarkCollections")
      .withIndex("by_collection", (q) =>
        q.eq("collectionId", args.collectionId),
      )
      .collect();

    const bookmarks: Doc<"bookmarks">[] = [];

    for (const relation of relations) {
      const bookmark = await ctx.db.get(relation.bookmarkId);
      if (bookmark) {
        bookmarks.push(bookmark);
      }
    }

    return bookmarks;
  },
});

/**
 * コレクションの作成
 */
export const create = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const now = Date.now();

    const collectionId = await ctx.db.insert("collections", {
      userId: user._id,
      name: args.name,
      description: args.description,
      icon: args.icon,
      color: args.color,
      bookmarkCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return collectionId;
  },
});

/**
 * コレクションの更新
 */
export const update = mutation({
  args: {
    clerkId: v.string(),
    collectionId: v.id("collections"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const collection = await ctx.db.get(args.collectionId);

    if (!collection || collection.userId !== user._id) {
      throw new Error("コレクションが見つからないか、アクセス権がありません");
    }

    const updates: Partial<{
      name: string;
      description: string;
      icon: string;
      color: string;
      updatedAt: number;
    }> = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) updates.name = args.name;
    if (args.description !== undefined) updates.description = args.description;
    if (args.icon !== undefined) updates.icon = args.icon;
    if (args.color !== undefined) updates.color = args.color;

    await ctx.db.patch(args.collectionId, updates);

    return args.collectionId;
  },
});

/**
 * コレクションの削除（関連するbookmarkCollectionsも削除）
 */
export const remove = mutation({
  args: {
    clerkId: v.string(),
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

    const collection = await ctx.db.get(args.collectionId);

    if (!collection || collection.userId !== user._id) {
      throw new Error("コレクションが見つからないか、アクセス権がありません");
    }

    // 関連するbookmarkCollectionsを削除
    const relations = await ctx.db
      .query("bookmarkCollections")
      .withIndex("by_collection", (q) =>
        q.eq("collectionId", args.collectionId),
      )
      .collect();

    for (const relation of relations) {
      await ctx.db.delete(relation._id);
    }

    // コレクションを削除
    await ctx.db.delete(args.collectionId);

    return args.collectionId;
  },
});
