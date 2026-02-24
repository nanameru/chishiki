"use client";

import {
  Bookmark,
  TrendingUp,
  Star,
  FolderOpen,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkCard } from "@/components/dashboard/bookmark-card";
import { AddBookmarkDialog } from "@/components/dashboard/add-bookmark-dialog";
import type { BookmarkData } from "@/components/dashboard/bookmark-card";
import Link from "next/link";

interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | undefined;
  description?: string;
}

function StatsCard({ icon: Icon, label, value, description }: StatsCardProps) {
  return (
    <Card className="group transition-all hover:shadow-md hover:border-primary/20">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{label}</span>
            {value !== undefined ? (
              <span className="text-3xl font-bold tracking-tight">
                {value.toLocaleString("ja-JP")}
              </span>
            ) : (
              <Skeleton className="h-9 w-16" />
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </div>
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-16" />
          </div>
          <Skeleton className="size-10 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

function RecentBookmarksSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
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

export default function DashboardPage() {
  const { user } = useUser();
  const clerkId = user?.id;

  const stats = useQuery(
    api.bookmarks.getStats,
    clerkId ? { clerkId } : "skip"
  );

  const recentBookmarks = useQuery(
    api.bookmarks.getRecent,
    clerkId ? { clerkId } : "skip"
  );

  const collections = useQuery(
    api.collections.list,
    clerkId ? { clerkId } : "skip"
  );

  const firstName = user?.firstName || user?.username;
  const greeting = firstName ? `${firstName}さん、おかえりなさい` : "ようこそ";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting}</h1>
          <p className="text-sm text-muted-foreground">
            あなたの知識ベースの概要です。
          </p>
        </div>
        <AddBookmarkDialog clerkId={clerkId} />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats === undefined ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <StatsCard
              icon={Bookmark}
              label="総ブックマーク数"
              value={stats.total}
            />
            <StatsCard
              icon={TrendingUp}
              label="今週の保存"
              value={stats.thisWeek}
              description="過去7日間"
            />
            <StatsCard
              icon={Star}
              label="お気に入り"
              value={stats.favorites}
            />
            <StatsCard
              icon={FolderOpen}
              label="コレクション数"
              value={collections?.length}
            />
          </>
        )}
      </div>

      {/* Recent Bookmarks */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">最近のブックマーク</h2>
            <p className="text-sm text-muted-foreground">
              最近保存されたブックマーク
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/bookmarks">
              すべて表示
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {recentBookmarks === undefined ? (
          <RecentBookmarksSkeleton />
        ) : recentBookmarks.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Bookmark className="size-8 text-primary" />
              </div>
              <CardTitle className="text-base mb-2">
                まだブックマークがありません
              </CardTitle>
              <CardDescription className="max-w-sm mb-4">
                URLを追加して知識の整理を始めましょう。AIが自動で要約・分類します。
              </CardDescription>
              <AddBookmarkDialog
                clerkId={clerkId}
                trigger={
                  <Button>
                    <Plus className="size-4" />
                    最初のブックマークを追加
                  </Button>
                }
              />
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentBookmarks.slice(0, 8).map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark as BookmarkData}
                clerkId={clerkId}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {recentBookmarks && recentBookmarks.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/20">
            <Link href="/dashboard/bookmarks">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bookmark className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">ブックマーク一覧</p>
                  <p className="text-xs text-muted-foreground">
                    すべてのブックマークを管理
                  </p>
                </div>
                <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Link>
          </Card>

          <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/20">
            <Link href="/dashboard/chat">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Star className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">AIチャット</p>
                  <p className="text-xs text-muted-foreground">
                    保存した知識について質問
                  </p>
                </div>
                <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Link>
          </Card>

          <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/20">
            <Link href="/dashboard/collections">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FolderOpen className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">コレクション</p>
                  <p className="text-xs text-muted-foreground">
                    テーマ別に整理する
                  </p>
                </div>
                <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
}
