import {
	ArrowRight,
	BookmarkPlus,
	BrainCircuit,
	Check,
	Download,
	FolderOpen,
	MessageSquare,
	Search,
	Sparkles,
	Star,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

/* ------------------------------------------------------------------ */
/*  Type definitions                                                   */
/* ------------------------------------------------------------------ */

interface Feature {
	readonly icon: React.ComponentType<{ className?: string }>;
	readonly title: string;
	readonly description: string;
	readonly color: string;
	readonly bgColor: string;
}

interface Step {
	readonly number: string;
	readonly icon: React.ComponentType<{ className?: string }>;
	readonly title: string;
	readonly description: string;
}

interface PlanFeature {
	readonly text: string;
	readonly included: boolean;
}

interface PricingPlan {
	readonly name: string;
	readonly price: string;
	readonly period: string;
	readonly description: string;
	readonly features: readonly PlanFeature[];
	readonly highlighted: boolean;
	readonly badge?: string;
	readonly cta: string;
}

interface FaqItem {
	readonly question: string;
	readonly answer: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features: readonly Feature[] = [
	{
		icon: Sparkles,
		title: "AI要約",
		description:
			"保存した記事をAIが自動で要約。全文を読まなくても内容を把握できます。",
		color: "text-amber-500",
		bgColor: "bg-amber-50",
	},
	{
		icon: Search,
		title: "セマンティック検索",
		description:
			"キーワードだけでなく、意味的に関連する情報も見つかる次世代検索。",
		color: "text-indigo-600",
		bgColor: "bg-indigo-50",
	},
	{
		icon: FolderOpen,
		title: "コレクション整理",
		description: "AIが自動でタグ付け。コレクションで知識を体系的に管理。",
		color: "text-emerald-600",
		bgColor: "bg-emerald-50",
	},
	{
		icon: MessageSquare,
		title: "AIチャット",
		description: "保存した知識ベースについてAIに質問。あなたの第二の脳と対話。",
		color: "text-violet-600",
		bgColor: "bg-violet-50",
	},
	{
		icon: Star,
		title: "お気に入り&ピン",
		description: "よく参照する情報はワンクリックでお気に入り登録。",
		color: "text-amber-500",
		bgColor: "bg-amber-50",
	},
	{
		icon: Download,
		title: "インポート対応",
		description: "ブラウザのブックマークを簡単インポート。移行もスムーズ。",
		color: "text-sky-600",
		bgColor: "bg-sky-50",
	},
];

const steps: readonly Step[] = [
	{
		number: "01",
		icon: BookmarkPlus,
		title: "保存する",
		description: "URLを貼るだけ。メタ情報を自動取得。",
	},
	{
		number: "02",
		icon: BrainCircuit,
		title: "AIが整理",
		description: "タグ付け、要約、分類を自動実行。",
	},
	{
		number: "03",
		icon: Zap,
		title: "知識を活用",
		description: "検索、対話、発見。保存した情報が知恵に変わる。",
	},
];

const pricingPlans: readonly PricingPlan[] = [
	{
		name: "Free",
		price: "0",
		period: "月",
		description: "まずは気軽にお試し",
		features: [
			{ text: "50ブックマーク", included: true },
			{ text: "AI要約 10回/月", included: true },
			{ text: "2コレクション", included: true },
			{ text: "基本検索", included: true },
			{ text: "AIチャット", included: false },
			{ text: "優先サポート", included: false },
		],
		highlighted: false,
		cta: "無料で始める",
	},
	{
		name: "Pro",
		price: "980",
		period: "月",
		description: "本格的なナレッジ管理に",
		features: [
			{ text: "無制限ブックマーク", included: true },
			{ text: "無制限AI要約", included: true },
			{ text: "無制限コレクション", included: true },
			{ text: "セマンティック検索", included: true },
			{ text: "AIチャット", included: true },
			{ text: "優先サポート", included: true },
		],
		highlighted: true,
		badge: "おすすめ",
		cta: "Proを始める",
	},
];

const faqItems: readonly FaqItem[] = [
	{
		question: "保存したデータは安全ですか？",
		answer:
			"はい、すべてのデータは暗号化されて安全に保管されます。データは日本国内のサーバーで管理され、第三者への提供は一切行いません。SSL/TLS暗号化通信を使用し、企業レベルのセキュリティ基準を満たしています。",
	},
	{
		question: "どのブラウザに対応していますか？",
		answer:
			"Google Chrome、Safari、Firefox、Microsoft Edge の最新バージョンに対応しています。また、iOS / Android のモバイルブラウザでもご利用いただけます。Chrome拡張機能も近日公開予定です。",
	},
	{
		question: "既存のブックマークをインポートできますか？",
		answer:
			"はい、主要ブラウザ（Chrome、Safari、Firefox）からHTMLファイルでブックマークをエクスポートし、チシキにインポートできます。インポート後、AIが自動でタグ付けと整理を行います。",
	},
	{
		question: "無料プランから有料プランへの移行はスムーズですか？",
		answer:
			"はい、ワンクリックでアップグレードでき、既存のデータはすべてそのまま引き継がれます。また、有料プランを解約しても、Freeプランの制限内でデータにアクセスし続けることができます。",
	},
	{
		question: "AIの要約や検索にはどの言語が使えますか？",
		answer:
			"日本語と英語に完全対応しています。日本語の記事も英語の記事も、同じ精度でAI要約とセマンティック検索をご利用いただけます。他の言語についても順次対応予定です。",
	},
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-white">
			<LandingHeader />

			{/* ============================================================ */}
			{/*  HERO SECTION                                                 */}
			{/* ============================================================ */}
			<section className="relative overflow-hidden pt-16">
				{/* Background decoration */}
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-white" />
					<div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl" />
					<div className="absolute top-40 right-0 h-[300px] w-[400px] rounded-full bg-amber-100/30 blur-3xl" />
					{/* Grid pattern */}
					<div
						className="absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage:
								"linear-gradient(rgba(79,70,229,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,1) 1px, transparent 1px)",
							backgroundSize: "60px 60px",
						}}
					/>
				</div>

				<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
					<div className="mx-auto max-w-3xl text-center">
						{/* Badge */}
						<div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur-sm">
							<Sparkles className="h-3.5 w-3.5" />
							AIパワードのナレッジ管理
						</div>

						{/* Headline */}
						<h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
							あなたの知識を、
							<br />
							<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
								AIが整理する
							</span>
						</h1>

						{/* Subheading */}
						<p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
							ブックマークを保存して終わりの時代は終わりました。
							<br className="hidden sm:block" />
							チシキが、あなたの情報をAIで整理・要約・検索可能にします。
						</p>

						{/* CTA Buttons */}
						<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Button
								asChild
								size="lg"
								className="h-12 rounded-full bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
							>
								<Link href="/sign-up">
									無料で始める
									<ArrowRight className="ml-1 h-4 w-4" />
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="h-12 rounded-full border-gray-200 px-8 text-base font-medium text-gray-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
							>
								<a href="#features">詳しく見る</a>
							</Button>
						</div>

						{/* Social proof */}
						<div className="mt-14 flex flex-col items-center gap-3">
							<div className="flex -space-x-2">
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										key={`avatar-${i}`}
										className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-violet-500 text-[10px] font-bold text-white shadow-sm"
									>
										{String.fromCharCode(65 + i)}
									</div>
								))}
							</div>
							<p className="text-sm text-gray-500">
								<span className="font-semibold text-gray-700">1,200+</span>{" "}
								人のユーザーが利用中
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  FEATURES SECTION                                             */}
			{/* ============================================================ */}
			<section id="features" className="scroll-mt-20 py-24 sm:py-32">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<div className="mx-auto max-w-2xl text-center">
						<Badge className="mb-4 rounded-full border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
							機能
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							知識管理を、もっとスマートに
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							AIが面倒な整理作業を引き受けて、あなたは知識の活用に集中できます。
						</p>
					</div>

					{/* Features Grid */}
					<div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature) => {
							const IconComponent = feature.icon;
							return (
								<Card
									key={feature.title}
									className="group border-gray-100/80 bg-white shadow-sm transition-all duration-300 hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-600/5"
								>
									<CardHeader>
										<div
											className={`mb-2 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110`}
										>
											<IconComponent className={`h-5 w-5 ${feature.color}`} />
										</div>
										<CardTitle className="text-lg font-semibold text-gray-900">
											{feature.title}
										</CardTitle>
									</CardHeader>
									<CardContent className="-mt-2">
										<CardDescription className="text-sm leading-relaxed text-gray-500">
											{feature.description}
										</CardDescription>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  HOW IT WORKS SECTION                                         */}
			{/* ============================================================ */}
			<section className="relative overflow-hidden bg-gray-50/50 py-24 sm:py-32">
				{/* Background decoration */}
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute bottom-0 left-1/4 h-[400px] w-[500px] rounded-full bg-indigo-50/50 blur-3xl" />
				</div>

				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<div className="mx-auto max-w-2xl text-center">
						<Badge className="mb-4 rounded-full border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
							使い方
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							3ステップで始められる
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							複雑な設定は不要。すぐに知識管理を始められます。
						</p>
					</div>

					{/* Steps */}
					<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
						{steps.map((step, index) => {
							const IconComponent = step.icon;
							return (
								<div key={step.number} className="relative text-center">
									{/* Connector line */}
									{index < steps.length - 1 && (
										<div className="absolute top-12 left-[calc(50%+40px)] hidden h-0.5 w-[calc(100%-80px)] bg-gradient-to-r from-indigo-200 to-indigo-100 md:block" />
									)}

									{/* Step number circle */}
									<div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
										<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 shadow-sm" />
										<div className="relative flex flex-col items-center">
											<span className="text-[10px] font-bold tracking-widest text-indigo-400">
												STEP
											</span>
											<span className="text-2xl font-extrabold text-indigo-600">
												{step.number}
											</span>
										</div>
									</div>

									<div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-100">
										<IconComponent className="h-5 w-5 text-indigo-600" />
									</div>

									<h3 className="text-lg font-bold text-gray-900">
										{step.title}
									</h3>
									<p className="mt-2 text-sm leading-relaxed text-gray-500">
										{step.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  PRICING SECTION                                              */}
			{/* ============================================================ */}
			<section id="pricing" className="scroll-mt-20 py-24 sm:py-32">
				<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<div className="mx-auto max-w-2xl text-center">
						<Badge className="mb-4 rounded-full border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
							料金
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							シンプルな料金体系
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							無料プランで始めて、必要に応じてアップグレード。
						</p>
					</div>

					{/* Pricing Cards */}
					<div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
						{pricingPlans.map((plan) => (
							<Card
								key={plan.name}
								className={`relative flex flex-col overflow-hidden ${
									plan.highlighted
										? "border-indigo-200 bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600/10"
										: "border-gray-100 bg-white shadow-sm"
								}`}
							>
								{/* Badge */}
								{plan.badge && (
									<div className="absolute top-0 right-0">
										<div className="rounded-bl-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
											{plan.badge}
										</div>
									</div>
								)}

								<CardHeader className="pb-2">
									<CardTitle className="text-lg font-semibold text-gray-900">
										{plan.name}
									</CardTitle>
									<CardDescription className="text-sm text-gray-500">
										{plan.description}
									</CardDescription>
								</CardHeader>

								<CardContent className="flex-1">
									{/* Price */}
									<div className="mb-6 flex items-baseline gap-1">
										<span className="text-sm font-medium text-gray-500">
											&yen;
										</span>
										<span className="text-4xl font-extrabold tracking-tight text-gray-900">
											{plan.price}
										</span>
										<span className="text-sm font-medium text-gray-500">
											/{plan.period}
										</span>
									</div>

									{/* Features list */}
									<ul className="space-y-3">
										{plan.features.map((feature) => (
											<li
												key={feature.text}
												className="flex items-center gap-3"
											>
												<div
													className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
														feature.included
															? "bg-indigo-100 text-indigo-600"
															: "bg-gray-100 text-gray-400"
													}`}
												>
													<Check className="h-3 w-3" />
												</div>
												<span
													className={`text-sm ${
														feature.included
															? "text-gray-700"
															: "text-gray-400 line-through"
													}`}
												>
													{feature.text}
												</span>
											</li>
										))}
									</ul>
								</CardContent>

								<CardFooter>
									<Button
										asChild
										className={`w-full rounded-full py-5 text-sm font-semibold transition-all ${
											plan.highlighted
												? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30"
												: "border border-gray-200 bg-white text-gray-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
										}`}
										variant={plan.highlighted ? "default" : "outline"}
										size="lg"
									>
										<Link href="/sign-up">{plan.cta}</Link>
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  FAQ SECTION                                                  */}
			{/* ============================================================ */}
			<section id="faq" className="scroll-mt-20 bg-gray-50/50 py-24 sm:py-32">
				<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
					{/* Section Header */}
					<div className="mx-auto max-w-2xl text-center">
						<Badge className="mb-4 rounded-full border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
							FAQ
						</Badge>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							よくある質問
						</h2>
						<p className="mt-4 text-lg text-gray-600">
							チシキについてよく寄せられるご質問にお答えします。
						</p>
					</div>

					{/* Accordion */}
					<div className="mt-12 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
						<Accordion type="single" collapsible className="w-full">
							{faqItems.map((item, index) => (
								<AccordionItem
									key={`faq-${index}`}
									value={`item-${index}`}
									className="border-gray-100"
								>
									<AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-900 hover:text-indigo-600 hover:no-underline">
										{item.question}
									</AccordionTrigger>
									<AccordionContent className="text-sm leading-relaxed text-gray-600">
										{item.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</section>

			{/* ============================================================ */}
			{/*  CTA SECTION                                                  */}
			{/* ============================================================ */}
			<section className="relative overflow-hidden py-24 sm:py-32">
				{/* Background */}
				<div className="pointer-events-none absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700" />
					<div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/30 blur-3xl" />
					<div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-3xl" />
					{/* Dots pattern */}
					<div
						className="absolute inset-0 opacity-10"
						style={{
							backgroundImage:
								"radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
				</div>

				<div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
						今すぐチシキを始めよう
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-indigo-100">
						無料プランでスタート。クレジットカード不要。
						<br />
						あなたの情報を、知恵に変えましょう。
					</p>
					<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Button
							asChild
							size="lg"
							className="h-12 rounded-full bg-white px-8 text-base font-semibold text-indigo-600 shadow-lg shadow-black/10 transition-all hover:bg-gray-50 hover:shadow-xl"
						>
							<Link href="/sign-up">
								無料で始める
								<ArrowRight className="ml-1 h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			<LandingFooter />
		</div>
	);
}
