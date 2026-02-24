import { BrainCircuit } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "プライバシーポリシー | チシキ",
	description: "チシキのプライバシーポリシーです。",
};

export default function PrivacyPage() {
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
					プライバシーポリシー
				</h1>
				<p className="mb-12 text-center text-sm text-slate-500">
					最終更新日: 2026年2月24日
				</p>

				<div className="prose prose-slate max-w-none space-y-8">
					<section>
						<h2 className="text-xl font-bold text-slate-900">1. はじめに</h2>
						<p className="leading-relaxed text-slate-600">
							チシキ（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本ポリシーでは、収集する情報、その利用目的、およびユーザーの権利について説明します。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							2. 収集する情報
						</h2>
						<h3 className="mt-4 text-lg font-semibold text-slate-800">
							2.1 ユーザーが提供する情報
						</h3>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>アカウント情報（メールアドレス、氏名、プロフィール画像）</li>
							<li>保存したブックマーク（URL、タイトル、タグ、メモ）</li>
							<li>コレクション情報</li>
							<li>AIチャットの会話履歴</li>
						</ul>

						<h3 className="mt-4 text-lg font-semibold text-slate-800">
							2.2 自動的に収集する情報
						</h3>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時）</li>
							<li>利用状況データ（機能の使用頻度、操作履歴）</li>
							<li>デバイス情報（OS、ブラウザの種類とバージョン）</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							3. 情報の利用目的
						</h2>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>本サービスの提供・運営・改善</li>
							<li>ユーザーサポートの提供</li>
							<li>AI要約・タグ付け・検索機能の品質向上</li>
							<li>サービスに関する重要な通知の送信</li>
							<li>不正利用の検知と防止</li>
							<li>利用統計の分析</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							4. 第三者サービスの利用
						</h2>
						<p className="mb-2 text-slate-600">
							本サービスでは、以下の第三者サービスを利用しています：
						</p>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>
								<strong>Clerk</strong> —
								認証・ユーザー管理（メールアドレス、氏名等の認証情報）
							</li>
							<li>
								<strong>Convex</strong> —
								データベース・バックエンド（ブックマーク、コレクション等のアプリデータ）
							</li>
							<li>
								<strong>Vercel</strong> —
								ホスティング（アクセスログ、パフォーマンスデータ）
							</li>
						</ul>
						<p className="mt-2 text-slate-600">
							各サービスのプライバシーポリシーについては、それぞれの公式サイトをご確認ください。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							5. データの保管と保護
						</h2>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>データは暗号化された通信（HTTPS）を通じて送受信されます。</li>
							<li>
								バックエンドデータはConvexの安全なインフラストラクチャに保管されます。
							</li>
							<li>アクセス権限は最小限の原則に基づいて管理されています。</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							6. ユーザーの権利
						</h2>
						<ul className="list-disc space-y-2 pl-6 text-slate-600">
							<li>
								<strong>アクセス権</strong>:
								保存されている個人情報の開示を請求できます。
							</li>
							<li>
								<strong>訂正権</strong>: 不正確な個人情報の訂正を請求できます。
							</li>
							<li>
								<strong>削除権</strong>:
								個人情報の削除を請求できます。アカウント設定画面からデータの削除が可能です。
							</li>
							<li>
								<strong>データポータビリティ</strong>:
								保存データのエクスポートが可能です。
							</li>
						</ul>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							7. Cookieの使用
						</h2>
						<p className="leading-relaxed text-slate-600">
							本サービスでは、認証状態の維持やユーザー体験の向上のために必要最小限のCookieを使用します。アナリティクス目的のCookieは使用しません。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							8. ポリシーの変更
						</h2>
						<p className="leading-relaxed text-slate-600">
							本ポリシーは、法令の変更やサービスの変更に伴い、予告なく改定されることがあります。重要な変更がある場合は、サービス内またはメールで通知します。
						</p>
					</section>

					<section>
						<h2 className="text-xl font-bold text-slate-900">
							9. お問い合わせ
						</h2>
						<p className="leading-relaxed text-slate-600">
							個人情報の取り扱いに関するご質問やお問い合わせは、以下の連絡先までお願いいたします。
						</p>
						<div className="mt-4 rounded-lg border bg-slate-50 p-4">
							<p className="text-sm text-slate-600">運営者: 木村太陽</p>
							<p className="text-sm text-slate-600">
								所在地: 神奈川県藤沢市藤沢本町
							</p>
							<p className="text-sm text-slate-600">
								メール: taiyo.kimura.3w@stu.hosei.ac.jp
							</p>
						</div>
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
