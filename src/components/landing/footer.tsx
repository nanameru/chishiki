import { BookOpen, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface FooterLink {
	readonly label: string;
	readonly href: string;
}

interface FooterColumn {
	readonly title: string;
	readonly links: readonly FooterLink[];
}

const footerColumns: readonly FooterColumn[] = [
	{
		title: "プロダクト",
		links: [
			{ label: "機能紹介", href: "#features" },
			{ label: "料金プラン", href: "#pricing" },
			{ label: "サービスについて", href: "/about" },
			{ label: "よくある質問", href: "#faq" },
		],
	},
	{
		title: "サポート",
		links: [
			{ label: "ヘルプセンター", href: "/help" },
			{ label: "サービスステータス", href: "/status" },
		],
	},
	{
		title: "法的情報",
		links: [
			{ label: "利用規約", href: "/terms" },
			{ label: "プライバシーポリシー", href: "/privacy" },
			{ label: "特定商取引法に基づく表記", href: "/legal" },
		],
	},
] as const;

interface SocialLink {
	readonly label: string;
	readonly href: string;
	readonly icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: readonly SocialLink[] = [
	{ label: "Twitter", href: "#", icon: Twitter },
	{ label: "GitHub", href: "#", icon: Github },
	{ label: "ブログ", href: "#", icon: BookOpen },
] as const;

export function LandingFooter() {
	return (
		<footer className="border-t border-gray-100 bg-gray-50/50">
			<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
				{/* Main Footer Grid */}
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
					{/* Brand Column */}
					<div className="lg:col-span-2">
						<Link href="/" className="inline-flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-md shadow-indigo-600/20">
								<span className="text-sm font-bold text-white">C</span>
							</div>
							<span className="text-xl font-bold tracking-tight text-indigo-600">
								チシキ
							</span>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
							AIの力であなたのブックマークと知識を自動整理。保存した情報を賢く分類し、必要な時にすぐ見つけられるセカンドブレインアプリです。
						</p>
						{/* Social Links */}
						<div className="mt-6 flex items-center gap-3">
							{socialLinks.map((social) => {
								const IconComponent = social.icon;
								return (
									<a
										key={social.label}
										href={social.href}
										aria-label={social.label}
										className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-all hover:bg-indigo-50 hover:text-indigo-600"
									>
										<IconComponent className="h-4 w-4" />
									</a>
								);
							})}
						</div>
					</div>

					{/* Link Columns */}
					{footerColumns.map((column) => (
						<div key={column.title}>
							<h3 className="text-sm font-semibold tracking-wide text-gray-900">
								{column.title}
							</h3>
							<ul className="mt-4 space-y-3">
								{column.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-sm text-gray-500 transition-colors hover:text-indigo-600"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<Separator className="my-10 bg-gray-200/60" />
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<p className="text-xs text-gray-400">
						&copy; 2026 チシキ (Chishiki). All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="/about"
							className="text-xs text-gray-400 transition-colors hover:text-indigo-600"
						>
							サービスについて
						</Link>
						<Link
							href="/help"
							className="text-xs text-gray-400 transition-colors hover:text-indigo-600"
						>
							ヘルプ
						</Link>
						<Link
							href="/status"
							className="text-xs text-gray-400 transition-colors hover:text-indigo-600"
						>
							ステータス
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
