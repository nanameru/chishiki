"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Bookmark, LayoutGrid, List, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AddBookmarkDialog } from "@/components/dashboard/add-bookmark-dialog";
import type { BookmarkData } from "@/components/dashboard/bookmark-card";
import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "../../../../convex/_generated/api";

type ViewMode = "grid" | "list";
type FilterTab = "all" | "favorites" | "archived";

function BookmarkGridSkeleton({ count = 6 }: { count?: number }) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: count }).map((_, i) => (
				<Card key={i} className="overflow-hidden py-0">
					<Skeleton className="h-36 rounded-none" />
					<CardContent className="flex flex-col gap-2 p-4">
						<div className="flex items-center gap-2">
							<Skeleton className="size-3.5 rounded" />
							<Skeleton className="h-3 w-24" />
						</div>
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-full" />
						<div className="flex gap-1 pt-1">
							<Skeleton className="h-4 w-12 rounded-full" />
							<Skeleton className="h-4 w-16 rounded-full" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function BookmarkListSkeleton({ count = 5 }: { count?: number }) {
	return (
		<div className="flex flex-col gap-2">
			{Array.from({ length: count }).map((_, i) => (
				<Card key={i} className="py-3">
					<CardContent className="flex items-center gap-4">
						<Skeleton className="size-10 rounded-lg" />
						<div className="flex flex-col gap-1 flex-1">
							<Skeleton className="h-4 w-48" />
							<Skeleton className="h-3 w-24" />
						</div>
						<Skeleton className="h-4 w-16 rounded-full hidden md:block" />
						<Skeleton className="h-3 w-12 hidden sm:block" />
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function EmptyState({ clerkId }: { clerkId: string | undefined }) {
	return (
		<Card className="border-dashed">
			<CardContent className="flex flex-col items-center justify-center py-16 text-center">
				<div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
					<Bookmark className="size-8 text-primary" />
				</div>
				<CardTitle className="text-base mb-2">
					まだブックマークがありません
				</CardTitle>
				<CardDescription className="max-w-md mb-6">
					URLを追加して知識の整理を始めましょう。保存したページはAIが自動で要約し、タグを付けて整理します。
				</CardDescription>
				<AddBookmarkDialog
					clerkId={clerkId}
					trigger={
						<Button size="lg">
							<Plus className="size-4" />
							最初のブックマークを追加
						</Button>
					}
				/>
			</CardContent>
		</Card>
	);
}

function NoSearchResults() {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<Search className="size-12 text-muted-foreground/50 mb-4" />
			<p className="text-sm font-medium text-muted-foreground">
				検索結果が見つかりませんでした
			</p>
			<p className="text-xs text-muted-foreground mt-1">
				別のキーワードで検索してみてください
			</p>
		</div>
	);
}

export default function BookmarksPage() {
	const { user } = useUser();
	const clerkId = user?.id;
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTab, setActiveTab] = useState<FilterTab>("all");

	// Fetch all bookmarks (paginated - using first page for now)
	const allBookmarksResult = useQuery(
		api.bookmarks.list,
		clerkId
			? {
					clerkId,
					paginationOpts: { numItems: 50, cursor: null },
				}
			: "skip",
	);

	const favorites = useQuery(
		api.bookmarks.getFavorites,
		clerkId ? { clerkId } : "skip",
	);

	const archivedResult = useQuery(
		api.bookmarks.list,
		clerkId
			? {
					clerkId,
					isArchived: true,
					paginationOpts: { numItems: 50, cursor: null },
				}
			: "skip",
	);

	// Determine the current bookmark list based on active tab
	const currentBookmarks = useMemo(() => {
		switch (activeTab) {
			case "favorites":
				return favorites ?? undefined;
			case "archived":
				return archivedResult?.page ?? undefined;
			default:
				return allBookmarksResult?.page ?? undefined;
		}
	}, [activeTab, allBookmarksResult, favorites, archivedResult]);

	// Apply search filter
	const filteredBookmarks = useMemo(() => {
		if (!currentBookmarks) return undefined;
		if (!searchQuery.trim()) return currentBookmarks;

		const query = searchQuery.toLowerCase();
		return currentBookmarks.filter((bookmark) => {
			const titleMatch = bookmark.title.toLowerCase().includes(query);
			const descriptionMatch = bookmark.description
				? bookmark.description.toLowerCase().includes(query)
				: false;
			const tagMatch = bookmark.tags.some((tag: string) =>
				tag.toLowerCase().includes(query),
			);
			const siteMatch = bookmark.siteName
				? bookmark.siteName.toLowerCase().includes(query)
				: false;
			return titleMatch || descriptionMatch || tagMatch || siteMatch;
		});
	}, [currentBookmarks, searchQuery]);

	const isLoading = filteredBookmarks === undefined;
	const isEmpty =
		filteredBookmarks !== undefined && filteredBookmarks.length === 0;
	const hasSearch = searchQuery.trim().length > 0;

	return (
		<div className="flex flex-col gap-6">
			{/* Page Header */}
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold tracking-tight">ブックマーク</h1>
				<p className="text-sm text-muted-foreground">
					保存したブックマークを管理・整理できます。
				</p>
			</div>

			{/* Toolbar */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				{/* Tabs */}
				<Tabs
					value={activeTab}
					onValueChange={(v) => setActiveTab(v as FilterTab)}
					className="w-full sm:w-auto"
				>
					<TabsList>
						<TabsTrigger value="all">すべて</TabsTrigger>
						<TabsTrigger value="favorites">お気に入り</TabsTrigger>
						<TabsTrigger value="archived">アーカイブ</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="flex items-center gap-2">
					{/* Search */}
					<div className="relative flex-1 sm:w-64 sm:flex-initial">
						<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="search"
							placeholder="ブックマークを検索..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-9"
						/>
					</div>

					{/* View Toggle */}
					<div className="flex items-center rounded-lg border p-0.5">
						<Button
							variant={viewMode === "grid" ? "secondary" : "ghost"}
							size="icon-xs"
							onClick={() => setViewMode("grid")}
							aria-label="グリッド表示"
							className="rounded-md"
						>
							<LayoutGrid className="size-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "secondary" : "ghost"}
							size="icon-xs"
							onClick={() => setViewMode("list")}
							aria-label="リスト表示"
							className="rounded-md"
						>
							<List className="size-4" />
						</Button>
					</div>

					{/* Add Button */}
					<AddBookmarkDialog clerkId={clerkId} />
				</div>
			</div>

			{/* Content */}
			{isLoading ? (
				viewMode === "grid" ? (
					<BookmarkGridSkeleton />
				) : (
					<BookmarkListSkeleton />
				)
			) : isEmpty ? (
				hasSearch ? (
					<NoSearchResults />
				) : (
					<EmptyState clerkId={clerkId} />
				)
			) : viewMode === "grid" ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredBookmarks.map((bookmark) => (
						<BookmarkCard
							key={bookmark._id}
							bookmark={bookmark as BookmarkData}
							clerkId={clerkId}
							variant="grid"
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col gap-2">
					{filteredBookmarks.map((bookmark) => (
						<BookmarkCard
							key={bookmark._id}
							bookmark={bookmark as BookmarkData}
							clerkId={clerkId}
							variant="list"
						/>
					))}
				</div>
			)}
		</div>
	);
}
