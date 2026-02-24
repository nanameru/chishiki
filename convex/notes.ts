import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * ブックマークに紐づくノート一覧の取得
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

    // ブックマークの所有者確認
    const bookmark = await ctx.db.get(args.bookmarkId);
    if (!bookmark || bookmark.userId !== user._id) {
      return [];
    }

    return await ctx.db
      .query("notes")
      .withIndex("by_bookmark", (q) => q.eq("bookmarkId", args.bookmarkId))
      .collect();
  },
});

/**
 * ノートの作成
 */
export const create = mutation({
  args: {
    clerkId: v.string(),
    bookmarkId: v.id("bookmarks"),
    content: v.string(),
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

    const now = Date.now();

    const noteId = await ctx.db.insert("notes", {
      userId: user._id,
      bookmarkId: args.bookmarkId,
      content: args.content,
      createdAt: now,
      updatedAt: now,
    });

    return noteId;
  },
});

/**
 * ノートの更新
 */
export const update = mutation({
  args: {
    clerkId: v.string(),
    noteId: v.id("notes"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.userId !== user._id) {
      throw new Error("ノートが見つからないか、アクセス権がありません");
    }

    await ctx.db.patch(args.noteId, {
      content: args.content,
      updatedAt: Date.now(),
    });

    return args.noteId;
  },
});

/**
 * ノートの削除
 */
export const remove = mutation({
  args: {
    clerkId: v.string(),
    noteId: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.userId !== user._id) {
      throw new Error("ノートが見つからないか、アクセス権がありません");
    }

    await ctx.db.delete(args.noteId);

    return args.noteId;
  },
});
