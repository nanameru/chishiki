import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * ユーザーの作成または更新（Upsert）
 * Clerk認証後にフロントエンドから呼ばれる
 */
export const createOrUpdate = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      });
      return existing._id;
    }

    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
      plan: "free",
      bookmarkCount: 0,
      createdAt: Date.now(),
    });

    return userId;
  },
});

/**
 * 現在のユーザーをClerk IDで取得
 */
export const getCurrent = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user ?? null;
  },
});
