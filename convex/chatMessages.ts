import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * チャットメッセージ一覧の取得（作成日昇順）
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
      .query("chatMessages")
      .withIndex("by_user_created", (q) => q.eq("userId", user._id))
      .order("asc")
      .collect();
  },
});

/**
 * チャットメッセージの作成
 */
export const create = mutation({
  args: {
    clerkId: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    sources: v.optional(v.array(v.id("bookmarks"))),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const messageId = await ctx.db.insert("chatMessages", {
      userId: user._id,
      role: args.role,
      content: args.content,
      sources: args.sources,
      createdAt: Date.now(),
    });

    return messageId;
  },
});

/**
 * ユーザーの全チャットメッセージを削除
 */
export const clear = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const messages = await ctx.db
      .query("chatMessages")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    for (const message of messages) {
      await ctx.db.delete(message._id);
    }

    return messages.length;
  },
});
