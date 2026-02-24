"use client";

import { useUser } from "@clerk/nextjs";
import {
	BookOpen,
	Bot,
	Lightbulb,
	MessageSquare,
	Send,
	Sparkles,
	User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	createdAt: number;
}

const SUGGESTED_PROMPTS = [
	{
		icon: BookOpen,
		label: "最近の記事を要約",
		prompt: "最近保存した記事を要約してください。",
	},
	{
		icon: Lightbulb,
		label: "関連する知識を探す",
		prompt: "保存した知識の中で、最もよく保存するテーマは何ですか？",
	},
	{
		icon: MessageSquare,
		label: "おすすめを提案",
		prompt:
			"保存したブックマークに基づいて、次に読むべき記事のテーマを提案してください。",
	},
];

export default function ChatPage() {
	const { user } = useUser();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Auto scroll to bottom
	useEffect(() => {
		if (scrollRef.current) {
			const viewport = scrollRef.current.querySelector(
				"[data-slot='scroll-area-viewport']",
			);
			if (viewport) {
				viewport.scrollTop = viewport.scrollHeight;
			}
		}
	}, []);

	const handleSend = (text?: string) => {
		const messageText = text || input.trim();
		if (!messageText) return;

		const userMessage: ChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content: messageText,
			createdAt: Date.now(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setIsTyping(true);

		// Demo mode: simulate AI response
		setTimeout(() => {
			const aiMessage: ChatMessage = {
				id: `ai-${Date.now()}`,
				role: "assistant",
				content:
					"現在デモモードで動作しています。AI機能が接続されると、保存したブックマークや知識ベースに基づいて回答できるようになります。\n\nこの機能では以下のことが可能になります：\n\n- 保存した記事の内容について質問\n- 複数の記事を横断した知識の統合\n- 関連する知識の発見と推薦\n- 保存した情報の要約や比較",
				createdAt: Date.now(),
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsTyping(false);
		}, 1500);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const hasMessages = messages.length > 0;
	const userName = user?.firstName || user?.username || "ユーザー";
	const userImageUrl = user?.imageUrl;

	return (
		<div className="flex h-[calc(100dvh-8rem)] flex-col">
			{/* Header */}
			<div className="flex items-center gap-3 pb-4 border-b mb-4">
				<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
					<Sparkles className="size-5 text-primary" />
				</div>
				<div>
					<h1 className="text-lg font-semibold">AIチャット</h1>
					<p className="text-xs text-muted-foreground">
						保存した知識について何でも聞いてください
					</p>
				</div>
			</div>

			{/* Chat Area */}
			<ScrollArea ref={scrollRef} className="flex-1 pr-4">
				{!hasMessages ? (
					/* Welcome Screen */
					<div className="flex h-full flex-col items-center justify-center py-12">
						<div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-6">
							<Sparkles className="size-8 text-primary" />
						</div>
						<h2 className="text-xl font-semibold mb-2">
							保存した知識について何でも聞いてください
						</h2>
						<p className="text-sm text-muted-foreground text-center max-w-md mb-8">
							あなたのブックマークやノートに基づいて、AIが質問に回答します。情報の検索、要約、関連づけなど、様々な形でサポートします。
						</p>

						{/* Suggested Prompts */}
						<div className="grid gap-3 w-full max-w-lg">
							{SUGGESTED_PROMPTS.map((item) => {
								const Icon = item.icon;
								return (
									<Card
										key={item.label}
										className="group cursor-pointer py-0 transition-all hover:shadow-sm hover:border-primary/20"
										onClick={() => handleSend(item.prompt)}
									>
										<CardContent className="flex items-center gap-3 p-4">
											<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
												<Icon className="size-4" />
											</div>
											<div className="flex-1">
												<p className="text-sm font-medium">{item.label}</p>
												<p className="text-xs text-muted-foreground line-clamp-1">
													{item.prompt}
												</p>
											</div>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>
				) : (
					/* Messages */
					<div className="flex flex-col gap-6 py-4">
						{messages.map((message) => (
							<div
								key={message.id}
								className={cn(
									"flex gap-3",
									message.role === "user" ? "flex-row-reverse" : "flex-row",
								)}
							>
								{/* Avatar */}
								<Avatar className="size-8 shrink-0">
									{message.role === "user" ? (
										<>
											{userImageUrl && (
												<AvatarImage src={userImageUrl} alt={userName} />
											)}
											<AvatarFallback>
												<User className="size-4" />
											</AvatarFallback>
										</>
									) : (
										<AvatarFallback className="bg-primary/10 text-primary">
											<Bot className="size-4" />
										</AvatarFallback>
									)}
								</Avatar>

								{/* Message Bubble */}
								<div
									className={cn(
										"max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
										message.role === "user"
											? "bg-primary text-primary-foreground rounded-br-md"
											: "bg-muted rounded-bl-md",
									)}
								>
									{message.content.split("\n").map((line, i) => (
										<span key={i}>
											{line}
											{i < message.content.split("\n").length - 1 && <br />}
										</span>
									))}
								</div>
							</div>
						))}

						{/* Typing Indicator */}
						{isTyping && (
							<div className="flex gap-3">
								<Avatar className="size-8 shrink-0">
									<AvatarFallback className="bg-primary/10 text-primary">
										<Bot className="size-4" />
									</AvatarFallback>
								</Avatar>
								<div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
									<span className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
									<span className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
									<span className="size-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
								</div>
							</div>
						)}
					</div>
				)}
			</ScrollArea>

			{/* Input Area */}
			<div className="border-t pt-4 mt-4">
				<div className="flex items-end gap-2">
					<Textarea
						ref={textareaRef}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="メッセージを入力..."
						className="min-h-11 max-h-32 resize-none"
						rows={1}
					/>
					<Button
						onClick={() => handleSend()}
						disabled={!input.trim() || isTyping}
						size="icon"
						className="shrink-0 size-11"
					>
						<Send className="size-4" />
					</Button>
				</div>
				<p className="mt-2 text-center text-xs text-muted-foreground">
					Shift + Enter で改行 / Enter で送信
				</p>
			</div>
		</div>
	);
}
