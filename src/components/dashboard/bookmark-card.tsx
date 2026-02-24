"use client";

import { useMutation } from "convex/react";
import {
	Archive,
	ExternalLink,
	FolderPlus,
	Globe,
	MoreHorizontal,
	Pencil,
	Star,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export interface BookmarkData {
	_id: Id<"bookmarks">;
	url: string;
	title: string;
	description?: string;
	thumbnailUrl?: string;
	siteName?: string;
	favicon?: string;
	aiSummary?: string;
	tags: string[];
	isFavorite: boolean;
	isArchived: boolean;
	createdAt: number;
}

interface BookmarkCardProps {
	bookmark: BookmarkData;
	clerkId: string | undefined;
	variant?: "grid" | "list";
}

function formatDate(timestamp: number): string {
	const date = new Date(timestamp);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) return "今日";
	if (diffDays === 1) return "昨日";
	if (diffDays < 7) return `${diffDays}日前`;
	if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`;

	return date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function extractDomain(url: string): string {
	try {
		return new URL(url).hostname.replace("www.", "");
	} catch {
		return url;
	}
}

export function BookmarkCard({
	bookmark,
	clerkId,
	variant = "grid",
}: BookmarkCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	const toggleFavorite = useMutation(api.bookmarks.toggleFavorite);
	const toggleArchive = useMutation(api.bookmarks.toggleArchive);
	const removeBookmark = useMutation(api.bookmarks.remove);

	const handleToggleFavorite = async () => {
		if (!clerkId) return;
		try {
			await toggleFavorite({ clerkId, bookmarkId: bookmark._id });
		} catch (error) {
			console.error("お気に入りの切り替えに失敗しました:", error);
		}
	};

	const handleToggleArchive = async () => {
		if (!clerkId) return;
		try {
			await toggleArchive({ clerkId, bookmarkId: bookmark._id });
		} catch (error) {
			console.error("アーカイブの切り替えに失敗しました:", error);
		}
	};

	const handleDelete = async () => {
		if (!clerkId) return;
		try {
			await removeBookmark({ clerkId, bookmarkId: bookmark._id });
		} catch (error) {
			console.error("ブックマークの削除に失敗しました:", error);
		}
	};

	const domain = extractDomain(bookmark.url);

	if (variant === "list") {
		return (
			<Card
				className="group py-3 transition-colors hover:bg-accent/50"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<CardContent className="flex items-center gap-4">
					{/* Favicon */}
					<div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
						{bookmark.favicon ? (
							<Image
								src={bookmark.favicon}
								alt=""
								width={20}
								height={20}
								className="size-5 rounded"
								unoptimized
							/>
						) : (
							<Globe className="size-5 text-muted-foreground" />
						)}
					</div>

					{/* Content */}
					<div className="min-w-0 flex-1">
						<a
							href={bookmark.url}
							target="_blank"
							rel="noopener noreferrer"
							className="line-clamp-1 text-sm font-medium hover:text-primary transition-colors"
						>
							{bookmark.title}
						</a>
						<p className="mt-0.5 text-xs text-muted-foreground">
							{bookmark.siteName || domain}
						</p>
					</div>

					{/* Tags */}
					<div className="hidden gap-1 md:flex">
						{bookmark.tags.slice(0, 2).map((tag) => (
							<Badge key={tag} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
					</div>

					{/* Date */}
					<span className="hidden text-xs text-muted-foreground sm:block whitespace-nowrap">
						{formatDate(bookmark.createdAt)}
					</span>

					{/* Actions */}
					<div className="flex items-center gap-1">
						<TooltipProvider delayDuration={0}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="ghost"
										size="icon-xs"
										onClick={handleToggleFavorite}
										className="text-muted-foreground hover:text-yellow-500"
									>
										<Star
											className={cn(
												"size-4",
												bookmark.isFavorite &&
													"fill-yellow-400 text-yellow-400",
											)}
										/>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									{bookmark.isFavorite
										? "お気に入りから外す"
										: "お気に入りに追加"}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon-xs"
									className="text-muted-foreground"
								>
									<MoreHorizontal className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<a
										href={bookmark.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<ExternalLink className="size-4" />
										開く
									</a>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Pencil className="size-4" />
									編集
								</DropdownMenuItem>
								<DropdownMenuItem>
									<FolderPlus className="size-4" />
									コレクションに追加
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleToggleArchive}>
									<Archive className="size-4" />
									{bookmark.isArchived ? "アーカイブから戻す" : "アーカイブ"}
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive" onClick={handleDelete}>
									<Trash2 className="size-4" />
									削除
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card
			className="group relative overflow-hidden py-0 transition-all hover:shadow-md hover:border-primary/20"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Thumbnail / Header */}
			<div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
				{bookmark.thumbnailUrl ? (
					<Image
						src={bookmark.thumbnailUrl}
						alt={bookmark.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
						unoptimized
					/>
				) : (
					<div className="flex h-full items-center justify-center">
						<Globe className="size-12 text-primary/20" />
					</div>
				)}

				{/* Favorite Button - Overlay */}
				<div
					className={cn(
						"absolute right-2 top-2 transition-opacity",
						isHovered || bookmark.isFavorite ? "opacity-100" : "opacity-0",
					)}
				>
					<Button
						variant="ghost"
						size="icon-xs"
						onClick={handleToggleFavorite}
						className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
					>
						<Star
							className={cn(
								"size-4",
								bookmark.isFavorite
									? "fill-yellow-400 text-yellow-400"
									: "text-muted-foreground",
							)}
						/>
					</Button>
				</div>
			</div>

			{/* Card Body */}
			<CardContent className="flex flex-col gap-2 p-4">
				{/* Site info */}
				<div className="flex items-center gap-2">
					{bookmark.favicon ? (
						<Image
							src={bookmark.favicon}
							alt=""
							width={14}
							height={14}
							className="size-3.5 rounded"
							unoptimized
						/>
					) : (
						<Globe className="size-3.5 text-muted-foreground" />
					)}
					<span className="text-xs text-muted-foreground truncate">
						{bookmark.siteName || domain}
					</span>
					<span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
						{formatDate(bookmark.createdAt)}
					</span>
				</div>

				{/* Title */}
				<a
					href={bookmark.url}
					target="_blank"
					rel="noopener noreferrer"
					className="line-clamp-2 text-sm font-semibold leading-tight hover:text-primary transition-colors"
				>
					{bookmark.title}
				</a>

				{/* AI Summary */}
				{bookmark.aiSummary && (
					<p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
						{bookmark.aiSummary}
					</p>
				)}

				{/* Tags */}
				{bookmark.tags.length > 0 && (
					<div className="flex flex-wrap gap-1 pt-1">
						{bookmark.tags.slice(0, 3).map((tag) => (
							<Badge
								key={tag}
								variant="secondary"
								className="text-[10px] px-1.5 py-0"
							>
								{tag}
							</Badge>
						))}
						{bookmark.tags.length > 3 && (
							<Badge variant="outline" className="text-[10px] px-1.5 py-0">
								+{bookmark.tags.length - 3}
							</Badge>
						)}
					</div>
				)}

				{/* Actions row */}
				<div className="flex items-center justify-end pt-1">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon-xs"
								className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
							>
								<MoreHorizontal className="size-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem asChild>
								<a
									href={bookmark.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<ExternalLink className="size-4" />
									開く
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Pencil className="size-4" />
								編集
							</DropdownMenuItem>
							<DropdownMenuItem>
								<FolderPlus className="size-4" />
								コレクションに追加
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleToggleArchive}>
								<Archive className="size-4" />
								{bookmark.isArchived ? "アーカイブから戻す" : "アーカイブ"}
							</DropdownMenuItem>
							<DropdownMenuItem variant="destructive" onClick={handleDelete}>
								<Trash2 className="size-4" />
								削除
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	);
}
