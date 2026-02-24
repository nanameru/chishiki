"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
	readonly label: string;
	readonly href: string;
}

const navLinks: readonly NavLink[] = [
	{ label: "機能", href: "#features" },
	{ label: "料金", href: "#pricing" },
	{ label: "よくある質問", href: "#faq" },
] as const;

export function LandingHeader() {
	const [isScrolled, setIsScrolled] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		function handleScroll() {
			setIsScrolled(window.scrollY > 10);
		}
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
				isScrolled
					? "border-b border-indigo-100/60 bg-white/80 shadow-sm backdrop-blur-xl"
					: "bg-transparent"
			}`}
		>
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-md shadow-indigo-600/20">
						<span className="text-sm font-bold text-white">C</span>
					</div>
					<span className="text-xl font-bold tracking-tight text-indigo-600">
						チシキ
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
						>
							{link.label}
						</a>
					))}
				</nav>

				{/* Desktop Auth Buttons */}
				<div className="hidden items-center gap-3 md:flex">
					<Button variant="ghost" asChild>
						<Link
							href="/sign-in"
							className="text-sm font-medium text-gray-600 hover:text-indigo-600"
						>
							ログイン
						</Link>
					</Button>
					<Button
						asChild
						className="rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30"
					>
						<Link href="/sign-up">無料で始める</Link>
					</Button>
				</div>

				{/* Mobile Hamburger */}
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							aria-label="メニューを開く"
						>
							<Menu className="h-5 w-5 text-gray-700" />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-72">
						<SheetHeader>
							<SheetTitle>
								<span className="text-lg font-bold text-indigo-600">
									チシキ
								</span>
							</SheetTitle>
						</SheetHeader>
						<nav className="mt-6 flex flex-col gap-1 px-4">
							{navLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									onClick={() => setIsOpen(false)}
									className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
								>
									{link.label}
								</a>
							))}
							<div className="my-4 h-px bg-gray-100" />
							<Link
								href="/sign-in"
								onClick={() => setIsOpen(false)}
								className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
							>
								ログイン
							</Link>
							<Button
								asChild
								className="mt-2 rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
							>
								<Link href="/sign-up" onClick={() => setIsOpen(false)}>
									無料で始める
								</Link>
							</Button>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
