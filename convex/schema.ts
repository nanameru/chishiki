import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    plan: v.union(v.literal("free"), v.literal("pro")),
    bookmarkCount: v.number(),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  bookmarks: defineTable({
    userId: v.id("users"),
    url: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    siteName: v.optional(v.string()),
    favicon: v.optional(v.string()),
    aiSummary: v.optional(v.string()),
    tags: v.array(v.string()),
    isFavorite: v.boolean(),
    isArchived: v.boolean(),
    readCount: v.number(),
    lastReadAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_favorite", ["userId", "isFavorite"])
    .index("by_user_archived", ["userId", "isArchived"])
    .index("by_user_created", ["userId", "createdAt"]),

  collections: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
    bookmarkCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  bookmarkCollections: defineTable({
    bookmarkId: v.id("bookmarks"),
    collectionId: v.id("collections"),
    userId: v.id("users"),
    addedAt: v.number(),
  })
    .index("by_bookmark", ["bookmarkId"])
    .index("by_collection", ["collectionId"])
    .index("by_user", ["userId"]),

  chatMessages: defineTable({
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    sources: v.optional(v.array(v.id("bookmarks"))),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_created", ["userId", "createdAt"]),

  notes: defineTable({
    userId: v.id("users"),
    bookmarkId: v.id("bookmarks"),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_bookmark", ["bookmarkId"])
    .index("by_user", ["userId"]),
});
