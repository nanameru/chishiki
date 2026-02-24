import { BrainCircuit, CheckCircle2, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "サービスステータス | チシキ",
	description: "チシキの各システムの稼働状況を確認できます。",
};

interface SystemStatus {
	name: string;
	description: string;
	status: "operational" | "degraded" | "outage" | "maintenance";
}

const systems: SystemStatus[] = [
	{
		name: "Webアプリケーション",
		description: "フロントエンド・ダッシュボード",
		status: "operational",
	},
	{
		name: "API / バックエンド",
		description: "Convexバックエンドサービス",
		status: "operational",
	},
	{
		name: "認証システム",
		description: "Clerk認証サービス",
		status: "operational",
	},
	{
		name: "AI要約エンジン",
		description: "AI要約・タグ生成",
		status: "operational",
	},
	{
		name: "検索エンジン",
		description: "ブックマーク検索",
		status: "operational",
	},
	{
		name: "AIチャット",
		description: "RAG対話システム",
		status: "operational",
	},
];

function getStatusLabel(status: SystemStatus["status"]) {
	switch (status) {
		case "operational":
			return {
				text: "正常稼働",
				color: "text-emerald-600",
				bg: "bg-emerald-100",
			};
		case "degraded":
			return {
				text: "パフォーマンス低下",
				color: "text-amber-600",
				bg: "bg-amber-100",
			};
		case "outage":
			return { text: "障害発生中", color: "text-rose-600", bg: "bg-rose-100" };
		case "maintenance":
			return {
				text: "メンテナンス中",
				color: "text-blue-600",
				bg: "bg-blue-100",
			};
	}
}

export default function StatusPage() {
	const allOperational = systems.every((s) => s.status === "operational");

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
				<h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900">
					サービスステータス
				</h1>

				<div
					className={`mb-12 flex items-center justify-center gap-3 rounded-2xl border p-6 ${
						allOperational
							? "border-emerald-200 bg-emerald-50"
							: "border-amber-200 bg-amber-50"
					}`}
				>
					{allOperational ? (
						<>
							<CheckCircle2 className="h-8 w-8 text-emerald-600" />
							<div>
								<p className="text-lg font-semibold text-emerald-800">
									全システム正常稼働中
								</p>
								<p className="text-sm text-emerald-600">
									すべてのサービスが正常に動作しています。
								</p>
							</div>
						</>
					) : (
						<>
							<Clock className="h-8 w-8 text-amber-600" />
							<div>
								<p className="text-lg font-semibold text-amber-800">
									一部のサービスに影響があります
								</p>
								<p className="text-sm text-amber-600">
									詳細は以下をご確認ください。
								</p>
							</div>
						</>
					)}
				</div>

				<div className="space-y-3">
					{systems.map((system) => {
						const statusInfo = getStatusLabel(system.status);
						return (
							<div
								key={system.name}
								className="flex items-center justify-between rounded-xl border bg-white px-6 py-4 shadow-sm"
							>
								<div>
									<p className="font-medium text-slate-900">{system.name}</p>
									<p className="text-sm text-slate-500">{system.description}</p>
								</div>
								<span
									className={`rounded-full px-3 py-1 text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}
								>
									{statusInfo.text}
								</span>
							</div>
						);
					})}
				</div>

				<div className="mt-12 rounded-xl border bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-lg font-semibold text-slate-900">
						過去の障害情報
					</h2>
					<p className="text-sm text-slate-500">
						現在、報告されている障害はありません。
					</p>
				</div>

				<div className="mt-8 text-center">
					<p className="text-sm text-slate-500">
						障害やメンテナンスのお知らせは、X（旧Twitter）でも配信しています。
					</p>
					<p className="mt-2 text-sm text-slate-500">
						問題が解決しない場合は、
						<a
							href="mailto:taiyo.kimura.3w@stu.hosei.ac.jp"
							className="text-indigo-600 hover:underline"
						>
							taiyo.kimura.3w@stu.hosei.ac.jp
						</a>{" "}
						までご連絡ください。
					</p>
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
