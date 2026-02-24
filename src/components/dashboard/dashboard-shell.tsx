"use client";

import {
	Bookmark,
	FolderOpen,
	LayoutDashboard,
	Menu,
	MessageSquare,
	Search,
	Settings,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const UserButton = dynamic(
	() => import("@clerk/nextjs").then((mod) => mod.UserButton),
	{ ssr: false },
);

interface NavItem {
	href: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
	{
		href: "/dashboard",
		label: "ダッシュボード",
		icon: LayoutDashboard,
	},
	{
		href: "/dashboard/bookmarks",
		label: "ブックマーク",
		icon: Bookmark,
	},
	{
		href: "/dashboard/collections",
		label: "コレクション",
		icon: FolderOpen,
	},
	{
		href: "/dashboard/chat",
		label: "AIチャット",
		icon: MessageSquare,
	},
	{
		href: "/dashboard/search",
		label: "検索",
		icon: Search,
	},
];

const bottomNavItems: NavItem[] = [
	{
		href: "/dashboard/settings",
		label: "設定",
		icon: Settings,
	},
];

function NavLink({
	item,
	isActive,
	onClick,
}: {
	item: NavItem;
	isActive: boolean;
	onClick?: () => void;
}) {
	const Icon = item.icon;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={item.href}
					onClick={onClick}
					className={cn(
						"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
						isActive
							? "bg-primary/10 text-primary dark:bg-primary/20"
							: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
					)}
				>
					<Icon
						className={cn(
							"size-5 shrink-0",
							isActive ? "text-primary" : "text-muted-foreground",
						)}
					/>
					<span>{item.label}</span>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right" className="lg:hidden">
				{item.label}
			</TooltipContent>
		</Tooltip>
	);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = usePathname();

	const isActive = useCallback(
		(href: string) => {
			if (href === "/dashboard") {
				return pathname === "/dashboard";
			}
			return pathname.startsWith(href);
		},
		[pathname],
	);

	return (
		<div className="flex h-full flex-col">
			{/* Logo */}
			<div className="flex h-16 items-center gap-2 px-6">
				<div className="flex size-8 items-center justify-center rounded-lg bg-primary">
					<Bookmark className="size-4 text-primary-foreground" />
				</div>
				<span className="text-xl font-bold tracking-tight">チシキ</span>
			</div>

			<Separator />

			{/* Main Navigation */}
			<ScrollArea className="flex-1 px-3 py-4">
				<nav className="flex flex-col gap-1">
					<TooltipProvider delayDuration={0}>
						{mainNavItems.map((item) => (
							<NavLink
								key={item.href}
								item={item}
								isActive={isActive(item.href)}
								onClick={onNavigate}
							/>
						))}
					</TooltipProvider>
				</nav>
			</ScrollArea>

			{/* Bottom Section */}
			<div className="mt-auto border-t px-3 py-4">
				<nav className="flex flex-col gap-1">
					<TooltipProvider delayDuration={0}>
						{bottomNavItems.map((item) => (
							<NavLink
								key={item.href}
								item={item}
								isActive={isActive(item.href)}
								onClick={onNavigate}
							/>
						))}
					</TooltipProvider>
				</nav>

				<Separator className="my-3" />

				<div className="flex items-center gap-3 px-3">
					<UserButton
						afterSignOutUrl="/"
						appearance={{
							elements: {
								avatarBox: "size-8",
							},
						}}
					/>
					<span className="text-sm text-muted-foreground">アカウント</span>
				</div>
			</div>
		</div>
	);
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<div className="flex h-dvh overflow-hidden bg-background">
			{/* Desktop Sidebar */}
			<aside className="hidden w-64 shrink-0 border-r bg-card lg:block">
				<SidebarContent />
			</aside>

			{/* Mobile Sidebar */}
			<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
				<SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
					<SheetHeader className="sr-only">
						<SheetTitle>ナビゲーション</SheetTitle>
					</SheetHeader>
					<SidebarContent onNavigate={() => setMobileOpen(false)} />
				</SheetContent>
			</Sheet>

			{/* Main Content Area */}
			<div className="flex flex-1 flex-col overflow-hidden">
				{/* Top Bar */}
				<header className="flex h-16 shrink-0 items-center gap-4 border-b bg-card px-4 lg:px-6">
					{/* Mobile Menu Button */}
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						onClick={() => setMobileOpen(true)}
						aria-label="メニューを開く"
					>
						<Menu className="size-5" />
					</Button>

					{/* Global Search */}
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="search"
							placeholder="ブックマークを検索..."
							className="pl-9 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-input"
						/>
					</div>

					{/* Right side spacer */}
					<div className="ml-auto flex items-center gap-2">
						<div className="hidden lg:block">
							<UserButton
								afterSignOutUrl="/"
								appearance={{
									elements: {
										avatarBox: "size-8",
									},
								}}
							/>
						</div>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto">
					<div className="mx-auto w-full max-w-7xl p-4 lg:p-6">{children}</div>
				</main>
			</div>
		</div>
	);
}
