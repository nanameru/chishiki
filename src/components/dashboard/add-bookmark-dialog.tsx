"use client";

import { useMutation, useQuery } from "convex/react";
import { Link as LinkIcon, Loader2, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { api } from "../../../convex/_generated/api";

interface AddBookmarkDialogProps {
	clerkId: string | undefined;
	trigger?: React.ReactNode;
}

export function AddBookmarkDialog({
	clerkId,
	trigger,
}: AddBookmarkDialogProps) {
	const [open, setOpen] = useState(false);
	const [url, setUrl] = useState("");
	const [title, setTitle] = useState("");
	const [tagsInput, setTagsInput] = useState("");
	const [selectedCollection, setSelectedCollection] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const collections = useQuery(
		api.collections.list,
		clerkId ? { clerkId } : "skip",
	);
	const createBookmark = useMutation(api.bookmarks.create);

	const resetForm = useCallback(() => {
		setUrl("");
		setTitle("");
		setTagsInput("");
		setSelectedCollection("");
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!clerkId || !url.trim() || !title.trim()) return;

		setIsSubmitting(true);
		try {
			const tags = tagsInput
				.split(",")
				.map((t) => t.trim())
				.filter(Boolean);

			await createBookmark({
				clerkId,
				url: url.trim(),
				title: title.trim(),
				tags: tags.length > 0 ? tags : undefined,
			});

			resetForm();
			setOpen(false);
		} catch (error) {
			console.error("ブックマークの追加に失敗しました:", error);
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
						ブックマークを追加
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>ブックマークを追加</DialogTitle>
					<DialogDescription>
						URLを入力して、新しいブックマークを保存します。
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{/* URL */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="bookmark-url">URL</Label>
						<div className="relative">
							<LinkIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								id="bookmark-url"
								type="url"
								placeholder="https://example.com"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								className="pl-9"
								required
							/>
						</div>
					</div>

					{/* Title */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="bookmark-title">タイトル</Label>
						<Input
							id="bookmark-title"
							type="text"
							placeholder="ページのタイトル"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>

					{/* Collection */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="bookmark-collection">コレクション（任意）</Label>
						<Select
							value={selectedCollection}
							onValueChange={setSelectedCollection}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="コレクションを選択..." />
							</SelectTrigger>
							<SelectContent>
								{collections?.map((collection) => (
									<SelectItem key={collection._id} value={collection._id}>
										{collection.icon && (
											<span className="mr-1">{collection.icon}</span>
										)}
										{collection.name}
									</SelectItem>
								))}
								{(!collections || collections.length === 0) && (
									<SelectItem value="none" disabled>
										コレクションがありません
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>

					{/* Tags */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="bookmark-tags">タグ（任意）</Label>
						<Input
							id="bookmark-tags"
							type="text"
							placeholder="カンマ区切り: React, TypeScript, 開発"
							value={tagsInput}
							onChange={(e) => setTagsInput(e.target.value)}
						/>
						<p className="text-xs text-muted-foreground">
							複数のタグはカンマで区切ってください
						</p>
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
						<Button type="submit" disabled={isSubmitting || !url || !title}>
							{isSubmitting ? (
								<>
									<Loader2 className="size-4 animate-spin" />
									保存中...
								</>
							) : (
								"保存"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
