import { BrainCircuit } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "特定商取引法に基づく表記 | チシキ",
	description: "チシキの特定商取引法に基づく表記です。",
};

export default function LegalPage() {
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
				<h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-slate-900">
					特定商取引法に基づく表記
				</h1>

				<div className="rounded-2xl border bg-white p-8 shadow-sm">
					<table className="w-full">
						<tbody className="divide-y">
							<tr>
								<td className="w-1/3 py-4 pr-4 text-sm font-medium text-slate-500">
									販売業者
								</td>
								<td className="py-4 text-sm text-slate-900">木村太陽</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									運営責任者
								</td>
								<td className="py-4 text-sm text-slate-900">木村太陽</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									所在地
								</td>
								<td className="py-4 text-sm text-slate-900">
									〒251-0052 神奈川県藤沢市藤沢本町
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									メールアドレス
								</td>
								<td className="py-4 text-sm text-slate-900">
									taiyo.kimura.3w@stu.hosei.ac.jp
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									電話番号
								</td>
								<td className="py-4 text-sm text-slate-900">
									メールにてお問い合わせください
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									販売URL
								</td>
								<td className="py-4 text-sm text-slate-900">
									https://chishiki.vercel.app
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									販売価格
								</td>
								<td className="py-4 text-sm text-slate-900">
									<p>無料プラン: ¥0</p>
									<p>Proプラン: 月額¥980（税込）</p>
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									販売価格以外の必要料金
								</td>
								<td className="py-4 text-sm text-slate-900">
									インターネット接続料金、通信料金はお客様のご負担となります。
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									支払方法
								</td>
								<td className="py-4 text-sm text-slate-900">
									クレジットカード（Visa、Mastercard、American Express、JCB）
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									支払時期
								</td>
								<td className="py-4 text-sm text-slate-900">
									サブスクリプション登録時に初回決済、以降毎月自動決済
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									サービスの提供時期
								</td>
								<td className="py-4 text-sm text-slate-900">
									お支払い確認後、即時ご利用いただけます。
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									返品・キャンセル
								</td>
								<td className="py-4 text-sm text-slate-900">
									<p>
										デジタルサービスの性質上、購入後の返金は原則として行いません。
									</p>
									<p className="mt-1">
										サブスクリプションの解約はいつでも可能で、次の請求期間から課金が停止されます。
									</p>
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4 text-sm font-medium text-slate-500">
									動作環境
								</td>
								<td className="py-4 text-sm text-slate-900">
									<p>
										Chrome、Firefox、Safari、Edgeの最新版が動作するパソコンまたはスマートフォン
									</p>
									<p className="mt-1">安定したインターネット接続環境</p>
								</td>
							</tr>
						</tbody>
					</table>
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
