"use client";

import { useState, useMemo } from "react";
import {
  Search as SearchIcon,
  Filter,
  X,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import type { BookmarkData } from "@/components/dashboard/bookmark-card";

function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="py-3">
          <CardContent className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-lg" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-4 w-16 rounded-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function SearchPage() {
  const { user } = useUser();
  const clerkId = user?.id;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  // Search results from Convex
  const searchResults = useQuery(
    api.bookmarks.search,
    clerkId && searchQuery.trim().length > 0
      ? { clerkId, searchQuery: searchQuery.trim() }
      : "skip"
  );

  // All bookmarks for extracting tags
  const allBookmarksResult = useQuery(
    api.bookmarks.list,
    clerkId
      ? {
          clerkId,
          paginationOpts: { numItems: 100, cursor: null },
        }
      : "skip"
  );

  const collections = useQuery(
    api.collections.list,
    clerkId ? { clerkId } : "skip"
  );

  // Extract unique tags from all bookmarks
  const allTags = useMemo(() => {
    if (!allBookmarksResult?.page) return [];
    const tagSet = new Set<string>();
    allBookmarksResult.page.forEach((b) => {
      b.tags.forEach((tag: string) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allBookmarksResult]);

  // Filter results by selected tags and collection
  const filteredResults = useMemo(() => {
    if (!searchResults) return undefined;
    let results = searchResults;

    if (selectedTags.length > 0) {
      results = results.filter((b) =>
        selectedTags.some((tag) => b.tags.includes(tag))
      );
    }

    return results;
  }, [searchResults, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCollectionId(null);
  };

  const hasSearch = searchQuery.trim().length > 0;
  const isLoading = hasSearch && filteredResults === undefined;
  const hasResults =
    filteredResults !== undefined && filteredResults.length > 0;
  const noResults =
    hasSearch && filteredResults !== undefined && filteredResults.length === 0;
  const hasActiveFilters =
    selectedTags.length > 0 || selectedCollectionId !== null;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">検索</h1>
        <p className="text-sm text-muted-foreground">
          保存した知識を横断的に検索できます。
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="キーワードを入力して検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 pl-12 text-base"
          autoFocus
        />
      </div>

      {/* Filters */}
      {allTags.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="size-4" />
              <span>タグで絞り込み</span>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="xs"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="size-3" />
                フィルターをクリア
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allTags.slice(0, 20).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-colors",
                  selectedTags.includes(tag)
                    ? ""
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Collections filter */}
      {collections && collections.length > 0 && (
        <div className="flex flex-col gap-3">
          <span className="text-sm text-muted-foreground">
            コレクションで絞り込み
          </span>
          <div className="flex flex-wrap gap-1.5">
            {collections.map((collection) => (
              <Badge
                key={collection._id}
                variant={
                  selectedCollectionId === collection._id
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer transition-colors"
                onClick={() =>
                  setSelectedCollectionId(
                    selectedCollectionId === collection._id
                      ? null
                      : collection._id
                  )
                }
              >
                {collection.icon && (
                  <span className="mr-1">{collection.icon}</span>
                )}
                {collection.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Results */}
      {!hasSearch ? (
        /* Initial State */
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <SearchIcon className="size-8 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            検索キーワードを入力してください
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            タイトル、説明、タグ、AI要約から検索できます
          </p>
        </div>
      ) : isLoading ? (
        <SearchResultsSkeleton />
      ) : noResults ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchIcon className="size-12 text-muted-foreground/50 mb-4" />
          <p className="text-sm font-medium text-muted-foreground">
            「{searchQuery}」に一致する結果が見つかりませんでした
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            別のキーワードで検索するか、フィルターを変更してみてください
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {filteredResults?.length}件の検索結果
          </p>
          <div className="flex flex-col gap-2">
            {filteredResults?.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark as BookmarkData}
                clerkId={clerkId}
                variant="list"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
