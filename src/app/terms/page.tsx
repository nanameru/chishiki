import { BrainCircuit } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "利用規約 | チシキ",
	description: "チシキの利用規約です。",
};

export default function TermsPage() {
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
					利用規約
				</h1>
				<p className="mb-12 text-center text-sm text-slate-500">
					最終更新日: 2026年2月24日
				</p>

				<div className="prose prose-slate max-w-none space-y-8">
					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第1条（サービスの概要）
						</h2>
						<p className="leading-relaxed text-slate-600">
							チシキ（以下「本サービス」）は、木村太陽（以下「運営者」）が提供するAI搭載のブックマーク管理・知識整理Webアプリケーションです。本サービスは、ユーザーがWebページ、記事、PDFなどの情報を保存し、AIによる要約・タグ付け・検索機能を通じて知識管理を支援します。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第2条（アカウント）
						</h2>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>本サービスの利用にはアカウント登録が必要です。</li>
							<li>ユーザーは、正確かつ最新の情報を提供する義務があります。</li>
							<li>
								アカウントの管理責任はユーザーにあり、第三者への貸与・共有は禁止します。
							</li>
							<li>
								不正利用が確認された場合、運営者はアカウントを停止・削除できます。
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第3条（料金と支払い）
						</h2>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>本サービスには無料プランと有料プラン（Pro）があります。</li>
							<li>
								有料プランの料金は月額¥980（税込）です。料金は予告なく変更される場合があります。
							</li>
							<li>支払いはクレジットカードによる自動決済で行われます。</li>
							<li>
								解約はいつでも可能で、次の請求期間から課金が停止されます。
							</li>
							<li>既に支払われた料金の返金は原則として行いません。</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第4条（禁止事項）
						</h2>
						<p className="mb-2 text-slate-600">
							ユーザーは以下の行為を行ってはなりません：
						</p>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>法令または公序良俗に反する行為</li>
							<li>
								本サービスのサーバーやネットワークに過度な負荷をかける行為
							</li>
							<li>他のユーザーの利用を妨害する行為</li>
							<li>本サービスの逆アセンブル、リバースエンジニアリング</li>
							<li>自動化ツールによる大量アクセスやスクレイピング行為</li>
							<li>第三者の知的財産権を侵害するコンテンツの保存</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第5条（知的財産権）
						</h2>
						<p className="leading-relaxed text-slate-600">
							本サービスに関する知的財産権は運営者に帰属します。ユーザーが保存したブックマークやメモの著作権はユーザー自身に帰属しますが、サービス運営に必要な範囲での利用を許諾するものとします。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第6条（免責事項）
						</h2>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>AI要約・タグ付けの正確性について、運営者は保証しません。</li>
							<li>
								サービスの中断・停止によるユーザーの損害について、運営者は一切責任を負いません。
							</li>
							<li>
								外部サイトのコンテンツの正確性・合法性について、運営者は責任を負いません。
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第7条（サービスの変更・終了）
						</h2>
						<p className="leading-relaxed text-slate-600">
							運営者は、事前の通知なくサービスの内容を変更、または終了することがあります。サービス終了の場合は、合理的な期間をもって事前に通知し、ユーザーのデータエクスポートの機会を提供します。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第8条（準拠法・管轄）
						</h2>
						<p className="leading-relaxed text-slate-600">
							本規約は日本法に準拠し、紛争が生じた場合は横浜地方裁判所を第一審の専属管轄裁判所とします。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							第9条（お問い合わせ）
						</h2>
						<p className="leading-relaxed text-slate-600">
							本規約に関するお問い合わせは、以下の連絡先までお願いいたします。
						</p>
						<p className="mt-2 text-slate-600">
							メール: taiyo.kimura.3w@stu.hosei.ac.jp
						</p>
					</section>
				</div>
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
