"use client";

import { useState, useCallback } from "react";
import {
  FolderOpen,
  Plus,
  Bookmark,
  MoreHorizontal,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CollectionData {
  _id: Id<"collections">;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  bookmarkCount: number;
  createdAt: number;
}

const COLLECTION_COLORS = [
  { name: "インディゴ", value: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { name: "ブルー", value: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { name: "グリーン", value: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { name: "オレンジ", value: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { name: "ピンク", value: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  { name: "パープル", value: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
];

const COLLECTION_ICONS = [
  "📚", "💻", "🎨", "📝", "🔬", "🎯", "💡", "🌐",
  "📊", "🛠", "🎮", "📸", "🎵", "🍳", "✈️", "💰",
];

function CreateCollectionDialog({
  clerkId,
  trigger,
}: {
  clerkId: string | undefined;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCollection = useMutation(api.collections.create);

  const resetForm = useCallback(() => {
    setName("");
    setDescription("");
    setSelectedIcon("");
    setSelectedColor("");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clerkId || !name.trim()) return;

    setIsSubmitting(true);
    try {
      await createCollection({
        clerkId,
        name: name.trim(),
        description: description.trim() || undefined,
        icon: selectedIcon || undefined,
        color: selectedColor || undefined,
      });
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("コレクションの作成に失敗しました:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="size-4" />
            コレクションを作成
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>コレクションを作成</DialogTitle>
          <DialogDescription>
            新しいコレクションを作成して、ブックマークを整理しましょう。
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="collection-name">名前</Label>
            <Input
              id="collection-name"
              type="text"
              placeholder="例: フロントエンド開発"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="collection-description">
              説明（任意）
            </Label>
            <Textarea
              id="collection-description"
              placeholder="コレクションの説明..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>アイコン（任意）</Label>
            <div className="flex flex-wrap gap-1.5">
              {COLLECTION_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() =>
                    setSelectedIcon(selectedIcon === icon ? "" : icon)
                  }
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg border text-lg transition-colors hover:bg-accent",
                    selectedIcon === icon
                      ? "border-primary bg-primary/10"
                      : "border-transparent"
                  )}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  作成中...
                </>
              ) : (
                "作成"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CollectionCard({
  collection,
  clerkId,
}: {
  collection: CollectionData;
  clerkId: string | undefined;
}) {
  const removeCollection = useMutation(api.collections.remove);

  const handleDelete = async () => {
    if (!clerkId) return;
    try {
      await removeCollection({ clerkId, collectionId: collection._id });
    } catch (error) {
      console.error("コレクションの削除に失敗しました:", error);
    }
  };

  const colorClass =
    COLLECTION_COLORS.find((c) => c.value === collection.color)?.value ||
    "bg-primary/10 text-primary";

  return (
    <Card className="group transition-all hover:shadow-md hover:border-primary/20">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-xl text-xl",
                colorClass
              )}
            >
              {collection.icon || (
                <FolderOpen className="size-6" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold leading-tight">
                {collection.name}
              </h3>
              {collection.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {collection.description}
                </p>
              )}
            </div>
          </div>

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
              <DropdownMenuItem>
                <Pencil className="size-4" />
                編集
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                <Trash2 className="size-4" />
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Bookmark className="size-3.5" />
          <span>{collection.bookmarkCount}件のブックマーク</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CollectionsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Skeleton className="size-12 rounded-xl" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="size-3.5 rounded" />
              <Skeleton className="h-3 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function CollectionsPage() {
  const { user } = useUser();
  const clerkId = user?.id;

  const collections = useQuery(
    api.collections.list,
    clerkId ? { clerkId } : "skip"
  );

  const isLoading = collections === undefined;
  const isEmpty = collections !== undefined && collections.length === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">コレクション</h1>
          <p className="text-sm text-muted-foreground">
            ブックマークをテーマ別に整理できます。
          </p>
        </div>
        <CreateCollectionDialog clerkId={clerkId} />
      </div>

      {/* Content */}
      {isLoading ? (
        <CollectionsSkeleton />
      ) : isEmpty ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <FolderOpen className="size-8 text-primary" />
            </div>
            <CardTitle className="text-base mb-2">
              コレクションがありません
            </CardTitle>
            <CardDescription className="max-w-md mb-6">
              コレクションを作成して、知識を整理しましょう。テーマやプロジェクトごとにブックマークをまとめることができます。
            </CardDescription>
            <CreateCollectionDialog
              clerkId={clerkId}
              trigger={
                <Button size="lg">
                  <Plus className="size-4" />
                  最初のコレクションを作成
                </Button>
              }
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard
              key={collection._id}
              collection={collection as CollectionData}
              clerkId={clerkId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
