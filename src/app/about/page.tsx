import {
	BrainCircuit,
	FolderOpen,
	MessageSquare,
	Search,
	Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "サービスについて | チシキ",
	description:
		"チシキは、AIが知識を整理する日本人のためのセカンドブレインアプリです。",
};

const features = [
	{
		icon: Sparkles,
		title: "AI要約",
		description:
			"保存した記事をAIが自動で要約。忙しいあなたの時間を節約します。",
	},
	{
		icon: Search,
		title: "セマンティック検索",
		description:
			"キーワードだけでなく、意味的に関連する情報も発見できる次世代検索。",
	},
	{
		icon: FolderOpen,
		title: "スマート整理",
		description:
			"AIが自動でタグ付け＆分類。コレクションで知識を体系的に管理できます。",
	},
	{
		icon: MessageSquare,
		title: "AIチャット",
		description:
			"保存した知識ベースについてAIに質問。あなただけの第二の脳と対話。",
	},
];

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
			<header className="border-b bg-white/80 backdrop-blur-sm">
				<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
					<Link
						href="/"
						className="flex items-center gap-2 text-xl font-bold text-indigo-600"
					>
						<BrainCircuit className="h-6 w-6" />
						チシキ
					</Link>
					<Link
						href="/dashboard"
						className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
					>
						ダッシュボードへ
					</Link>
				</div>
			</header>

			<main className="mx-auto max-w-5xl px-6 py-16">
				<section className="mb-20 text-center">
					<h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
						チシキについて
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-slate-600">
						チシキは、「保存して終わり」から「知識を活用する」への転換を実現する
						AI搭載のセカンドブレインアプリです。
					</p>
				</section>

				<section className="mb-20">
					<h2 className="mb-4 text-center text-2xl font-bold text-slate-900">
						ミッション
					</h2>
					<div className="rounded-2xl border bg-white p-8 shadow-sm">
						<p className="text-center text-lg leading-relaxed text-slate-700">
							情報過多の時代に、大切な知識を見失わないために。
							<br />
							チシキは、あなたが出会った価値ある情報をAIの力で整理し、
							<br />
							必要な時にすぐに見つけられる「第二の脳」を提供します。
						</p>
					</div>
				</section>

				<section className="mb-20">
					<h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
						主な特徴
					</h2>
					<div className="grid gap-6 sm:grid-cols-2">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
							>
								<feature.icon className="mb-3 h-8 w-8 text-indigo-600" />
								<h3 className="mb-2 text-lg font-semibold text-slate-900">
									{feature.title}
								</h3>
								<p className="text-sm leading-relaxed text-slate-600">
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</section>

				<section className="mb-20">
					<h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
						運営者情報
					</h2>
					<div className="rounded-2xl border bg-white p-8 shadow-sm">
						<dl className="grid gap-4 sm:grid-cols-2">
							<div>
								<dt className="text-sm font-medium text-slate-500">運営者名</dt>
								<dd className="mt-1 text-slate-900">木村太陽</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-slate-500">所在地</dt>
								<dd className="mt-1 text-slate-900">神奈川県藤沢市藤沢本町</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-slate-500">
									メールアドレス
								</dt>
								<dd className="mt-1 text-slate-900">
									taiyo.kimura.3w@stu.hosei.ac.jp
								</dd>
							</div>
							<div>
								<dt className="text-sm font-medium text-slate-500">
									サービス開始
								</dt>
								<dd className="mt-1 text-slate-900">2026年2月</dd>
							</div>
						</dl>
					</div>
				</section>
			</main>

			<footer className="border-t bg-slate-50 py-8">
				<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6 text-sm text-slate-500">
					<Link href="/about" className="hover:text-indigo-600">
						サービスについて
					</Link>
					<Link href="/help" className="hover:text-indigo-600">
						ヘルプ
					</Link>
					<Link href="/terms" className="hover:text-indigo-600">
						利用規約
					</Link>
					<Link href="/privacy" className="hover:text-indigo-600">
						プライバシーポリシー
					</Link>
					<Link href="/legal" className="hover:text-indigo-600">
						特商法表記
					</Link>
					<Link href="/status" className="hover:text-indigo-600">
						ステータス
					</Link>
				</div>
				<p className="mt-4 text-center text-xs text-slate-400">
					© 2026 チシキ (Chishiki). All rights reserved.
				</p>
			</footer>
		</div>
	);
}
