import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { Doc, Id } from "./_generated/dataModel";

/**
 * ブックマーク一覧の取得（フィルター・ページネーション対応）
 */
export const list = query({
  args: {
    clerkId: v.string(),
    isFavorite: v.optional(v.boolean()),
    isArchived: v.optional(v.boolean()),
    collectionId: v.optional(v.id("collections")),
    tag: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return { page: [], isDone: true, continueCursor: "" };
    }

    // コレクションフィルターの場合、bookmarkCollectionsから取得
    if (args.collectionId) {
      const relations = await ctx.db
        .query("bookmarkCollections")
        .withIndex("by_collection", (q) =>
          q.eq("collectionId", args.collectionId as Id<"collections">),
        )
        .collect();

      const bookmarkIds = relations.map((r) => r.bookmarkId);
      const bookmarks: Doc<"bookmarks">[] = [];

      for (const bookmarkId of bookmarkIds) {
        const bookmark = await ctx.db.get(bookmarkId);
        if (bookmark && bookmark.userId === user._id) {
          bookmarks.push(bookmark);
        }
      }

      // タグフィルター
      const filtered = args.tag
        ? bookmarks.filter((b) => b.tags.includes(args.tag as string))
        : bookmarks;

      return {
        page: filtered,
        isDone: true,
        continueCursor: "",
      };
    }

    // お気に入りフィルター
    if (args.isFavorite !== undefined) {
      const results = await ctx.db
        .query("bookmarks")
        .withIndex("by_user_favorite", (q) =>
          q.eq("userId", user._id).eq("isFavorite", args.isFavorite as boolean),
        )
        .paginate(args.paginationOpts);

      if (args.tag) {
        return {
          ...results,
          page: results.page.filter((b) => b.tags.includes(args.tag as string)),
        };
      }
      return results;
    }

    // アーカイブフィルター
    if (args.isArchived !== undefined) {
      const results = await ctx.db
        .query("bookmarks")
        .withIndex("by_user_archived", (q) =>
          q.eq("userId", user._id).eq("isArchived", args.isArchived as boolean),
        )
        .paginate(args.paginationOpts);

      if (args.tag) {
        return {
          ...results,
          page: results.page.filter((b) => b.tags.includes(args.tag as string)),
        };
      }
      return results;
    }

    // デフォルト: ユーザーの全ブックマーク（作成日降順）
    const results = await ctx.db
      .query("bookmarks")
      .withIndex("by_user_created", (q) => q.eq("userId", user._id))
      .order("desc")
      .paginate(args.paginationOpts);

    if (args.tag) {
      return {
        ...results,
        page: results.page.filter((b) => b.tags.includes(args.tag as string)),
      };
    }
    return results;
  },
});

/**
 * ブックマーク単体の取得（所有者確認付き）
 */
export const get = query({
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
      return null;
    }

    const bookmark = await ctx.db.get(args.bookmarkId);

    if (!bookmark || bookmark.userId !== user._id) {
      return null;
    }

    return bookmark;
  },
});

/**
 * ブックマーク検索（タイトル・説明・タグ・AI要約を対象）
 */
export const search = query({
  args: {
    clerkId: v.string(),
    searchQuery: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return [];
    }

    const allBookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const query = args.searchQuery.toLowerCase();

    return allBookmarks.filter((bookmark) => {
      const titleMatch = bookmark.title.toLowerCase().includes(query);
      const descriptionMatch = bookmark.description
        ? bookmark.description.toLowerCase().includes(query)
        : false;
      const tagMatch = bookmark.tags.some((tag) =>
        tag.toLowerCase().includes(query),
      );
      const aiSummaryMatch = bookmark.aiSummary
        ? bookmark.aiSummary.toLowerCase().includes(query)
        : false;

      return titleMatch || descriptionMatch || tagMatch || aiSummaryMatch;
    });
  },
});

/**
 * お気に入りブックマークの取得
 */
export const getFavorites = query({
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
      .query("bookmarks")
      .withIndex("by_user_favorite", (q) =>
        q.eq("userId", user._id).eq("isFavorite", true),
      )
      .collect();
  },
});

/**
 * 最近のブックマーク10件を取得
 */
export const getRecent = query({
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
      .query("bookmarks")
      .withIndex("by_user_created", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(10);
  },
});

/**
 * ブックマーク統計の取得
 */
export const getStats = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      return { total: 0, thisWeek: 0, favorites: 0, archived: 0 };
    }

    const allBookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const now = Date.now();
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

    const total = allBookmarks.length;
    const thisWeek = allBookmarks.filter((b) => b.createdAt >= oneWeekAgo).length;
    const favorites = allBookmarks.filter((b) => b.isFavorite).length;
    const archived = allBookmarks.filter((b) => b.isArchived).length;

    return { total, thisWeek, favorites, archived };
  },
});

/**
 * ブックマークの作成
 */
export const create = mutation({
  args: {
    clerkId: v.string(),
    url: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    siteName: v.optional(v.string()),
    favicon: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
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

    const bookmarkId = await ctx.db.insert("bookmarks", {
      userId: user._id,
      url: args.url,
      title: args.title,
      description: args.description,
      thumbnailUrl: args.thumbnailUrl,
      siteName: args.siteName,
      favicon: args.favicon,
      tags: args.tags ?? [],
      isFavorite: false,
      isArchived: false,
      readCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    // ユーザーのブックマーク数を更新
    await ctx.db.patch(user._id, {
      bookmarkCount: user.bookmarkCount + 1,
    });

    return bookmarkId;
  },
});

/**
 * ブックマークの更新
 */
export const update = mutation({
  args: {
    clerkId: v.string(),
    bookmarkId: v.id("bookmarks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    url: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    siteName: v.optional(v.string()),
    favicon: v.optional(v.string()),
    aiSummary: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) {
      throw new Error("ユーザーが見つかりません");
    }

    const bookmark = await ctx.db.get(args.bookmarkId);

    if (!bookmark || bookmark.userId !== user._id) {
      throw new Error("ブックマークが見つからないか、アクセス権がありません");
    }

    const updates: Partial<{
      title: string;
      description: string;
      url: string;
      thumbnailUrl: string;
      siteName: string;
      favicon: string;
      aiSummary: string;
      tags: string[];
      updatedAt: number;
    }> = {
      updatedAt: Date.now(),
    };

    if (args.title !== undefined) updates.title = args.title;
    if (args.description !== undefined) updates.description = args.description;
    if (args.url !== undefined) updates.url = args.url;
    if (args.thumbnailUrl !== undefined) updates.thumbnailUrl = args.thumbnailUrl;
    if (args.siteName !== undefined) updates.siteName = args.siteName;
    if (args.favicon !== undefined) updates.favicon = args.favicon;
    if (args.aiSummary !== undefined) updates.aiSummary = args.aiSummary;
    if (args.tags !== undefined) updates.tags = args.tags;

    await ctx.db.patch(args.bookmarkId, updates);

    return args.bookmarkId;
  },
});

/**
 * ブックマークの削除
 * ("delete" はJSの予約語のため "remove" を使用)
 */
export const remove = mutation({
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
      throw new Error("ユーザーが見つかりません");
    }

    const bookmark = await ctx.db.get(args.bookmarkId);

    if (!bookmark || bookmark.userId !== user._id) {
      throw new Error("ブックマークが見つからないか、アクセス権がありません");
    }

    // 関連するbookmarkCollectionsを削除
    const relations = await ctx.db
      .query("bookmarkCollections")
      .withIndex("by_bookmark", (q) => q.eq("bookmarkId", args.bookmarkId))
      .collect();

    for (const relation of relations) {
      // コレクションのブックマーク数を減らす
      const collection = await ctx.db.get(relation.collectionId);
      if (collection) {
        await ctx.db.patch(relation.collectionId, {
          bookmarkCount: Math.max(0, collection.bookmarkCount - 1),
        });
      }
      await ctx.db.delete(relation._id);
    }

    // 関連するノートを削除
    const notes = await ctx.db
      .query("notes")
      .withIndex("by_bookmark", (q) => q.eq("bookmarkId", args.bookmarkId))
      .collect();

    for (const note of notes) {
      await ctx.db.delete(note._id);
    }

    // ブックマークを削除
    await ctx.db.delete(args.bookmarkId);

    // ユーザーのブックマーク数を更新
    await ctx.db.patch(user._id, {
      bookmarkCount: Math.max(0, user.bookmarkCount - 1),
    });

    return args.bookmarkId;
  },
});

/**
 * お気に入り状態の切り替え
 */
export const toggleFavorite = mutation({
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
      throw new Error("ユーザーが見つかりません");
    }

    const bookmark = await ctx.db.get(args.bookmarkId);

    if (!bookmark || bookmark.userId !== user._id) {
      throw new Error("ブックマークが見つからないか、アクセス権がありません");
    }

    await ctx.db.patch(args.bookmarkId, {
      isFavorite: !bookmark.isFavorite,
      updatedAt: Date.now(),
    });

    return !bookmark.isFavorite;
  },
});

/**
 * アーカイブ状態の切り替え
 */
export const toggleArchive = mutation({
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
      throw new Error("ユーザーが見つかりません");
    }

    const bookmark = await ctx.db.get(args.bookmarkId);

    if (!bookmark || bookmark.userId !== user._id) {
      throw new Error("ブックマークが見つからないか、アクセス権がありません");
    }

    await ctx.db.patch(args.bookmarkId, {
      isArchived: !bookmark.isArchived,
      updatedAt: Date.now(),
    });

    return !bookmark.isArchived;
  },
});

/**
 * 閲覧回数のインクリメント
 */
export const incrementReadCount = mutation({
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
      throw new Error("ユーザーが見つかりません");
    }

    const bookmark = await ctx.db.get(args.bookmarkId);

    if (!bookmark || bookmark.userId !== user._id) {
      throw new Error("ブックマークが見つからないか、アクセス権がありません");
    }

    await ctx.db.patch(args.bookmarkId, {
      readCount: bookmark.readCount + 1,
      lastReadAt: Date.now(),
      updatedAt: Date.now(),
    });

    return bookmark.readCount + 1;
  },
});
