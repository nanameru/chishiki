import { BrainCircuit, ExternalLink, Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "ヘルプセンター | チシキ",
	description: "チシキの使い方やよくある質問をまとめたヘルプセンターです。",
};

const faqs = [
	{
		question: "チシキとは何ですか？",
		answer:
			"チシキは、AIが知識を整理する日本人のためのセカンドブレインアプリです。Webページやアーティクルを保存すると、AIが自動で要約・タグ付け・整理を行い、必要な時にすぐに見つけられるようにします。",
	},
	{
		question: "どのようにブックマークを保存しますか？",
		answer:
			"ダッシュボードの「ブックマークを追加」ボタンをクリックし、URLを入力するだけです。タイトルやサムネイルなどのメタ情報は自動で取得されます。将来的にはChrome拡張機能からもワンクリックで保存できるようになります。",
	},
	{
		question: "AI要約はどのように機能しますか？",
		answer:
			"ブックマークを保存すると、AIが記事の内容を分析し、3〜5行の日本語要約を自動生成します。これにより、全文を読まなくても記事の要点を素早く把握できます。",
	},
	{
		question: "セマンティック検索とは何ですか？",
		answer:
			"通常のキーワード検索とは異なり、セマンティック検索は検索語句の「意味」を理解します。例えば「プログラミングの学習方法」と検索すると、「コーディングの勉強テクニック」という記事も見つかります。",
	},
	{
		question: "無料プランと有料プランの違いは？",
		answer:
			"無料プランでは50件までのブックマーク保存とAI要約10回/月が利用可能です。有料プラン（Pro: ¥980/月）では、無制限のブックマーク、AI要約、コレクション、AIチャットなどの全機能が利用できます。",
	},
	{
		question: "データの安全性は？",
		answer:
			"チシキはConvexをバックエンドに使用し、データは暗号化されて安全に保存されます。認証にはClerkを採用しており、業界標準のセキュリティを確保しています。お客様のデータを第三者に販売することは一切ありません。",
	},
	{
		question: "他のサービスからブックマークをインポートできますか？",
		answer:
			"はい。ブラウザ（Chrome、Firefox、Safari等）からエクスポートしたHTMLブックマークファイルをインポートできます。設定画面からインポート機能をご利用ください。",
	},
	{
		question: "対応ブラウザは？",
		answer:
			"チシキはWebアプリケーションです。Chrome、Firefox、Safari、Edgeなどの最新ブラウザでご利用いただけます。",
	},
];

export default function HelpPage() {
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

			<main className="mx-auto max-w-3xl px-6 py-16">
				<h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-slate-900">
					ヘルプセンター
				</h1>
				<p className="mb-12 text-center text-lg text-slate-600">
					チシキの使い方やよくある質問への回答をご覧ください。
				</p>

				<section className="mb-16">
					<h2 className="mb-6 text-2xl font-bold text-slate-900">
						よくある質問
					</h2>
					<div className="space-y-4">
						{faqs.map((faq) => (
							<details
								key={faq.question}
								className="group rounded-xl border bg-white shadow-sm"
							>
								<summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-medium text-slate-900 hover:text-indigo-600">
									{faq.question}
									<span className="ml-2 text-slate-400 transition group-open:rotate-180">
										▼
									</span>
								</summary>
								<div className="border-t px-6 py-4 text-sm leading-relaxed text-slate-600">
									{faq.answer}
								</div>
							</details>
						))}
					</div>
				</section>

				<section className="mb-16">
					<h2 className="mb-6 text-2xl font-bold text-slate-900">
						お問い合わせ
					</h2>
					<div className="rounded-xl border bg-white p-6 shadow-sm">
						<p className="mb-4 text-slate-600">
							ヘルプセンターで解決しない場合は、メールにてお問い合わせください。
						</p>
						<a
							href="mailto:taiyo.kimura.3w@stu.hosei.ac.jp"
							className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
						>
							<Mail className="h-4 w-4" />
							メールで問い合わせる
						</a>
						<p className="mt-3 text-xs text-slate-500">
							通常2営業日以内にご返信いたします。
						</p>
					</div>
				</section>

				<section>
					<h2 className="mb-6 text-2xl font-bold text-slate-900">関連リンク</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						<Link
							href="/about"
							className="flex items-center gap-2 rounded-xl border bg-white p-4 text-sm font-medium text-slate-900 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
						>
							<ExternalLink className="h-4 w-4 text-indigo-600" />
							サービスについて
						</Link>
						<Link
							href="/terms"
							className="flex items-center gap-2 rounded-xl border bg-white p-4 text-sm font-medium text-slate-900 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
						>
							<ExternalLink className="h-4 w-4 text-indigo-600" />
							利用規約
						</Link>
						<Link
							href="/privacy"
							className="flex items-center gap-2 rounded-xl border bg-white p-4 text-sm font-medium text-slate-900 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
						>
							<ExternalLink className="h-4 w-4 text-indigo-600" />
							プライバシーポリシー
						</Link>
						<Link
							href="/legal"
							className="flex items-center gap-2 rounded-xl border bg-white p-4 text-sm font-medium text-slate-900 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
						>
							<ExternalLink className="h-4 w-4 text-indigo-600" />
							特定商取引法に基づく表記
						</Link>
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
