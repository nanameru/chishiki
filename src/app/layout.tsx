import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";

const notoSansJP = Noto_Sans_JP({
	variable: "--font-noto-sans-jp",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "チシキ - AIが知識を整理するセカンドブレイン",
		template: "%s | チシキ",
	},
	description:
		"チシキは、AIの力であなたのブックマークと知識を自動整理するセカンドブレインアプリです。保存した情報を賢く分類し、必要な時にすぐ見つけられます。",
	keywords: [
		"セカンドブレイン",
		"ブックマーク管理",
		"AI整理",
		"ナレッジベース",
		"知識管理",
		"情報整理",
	],
	authors: [{ name: "チシキ" }],
	metadataBase: new URL("https://chishiki-sigma.vercel.app"),
	openGraph: {
		type: "website",
		locale: "ja_JP",
		url: "https://chishiki-sigma.vercel.app",
		siteName: "チシキ",
		title: "チシキ - AIが知識を整理するセカンドブレイン",
		description:
			"AIの力であなたのブックマークと知識を自動整理するセカンドブレインアプリ",
	},
	twitter: {
		card: "summary_large_image",
		title: "チシキ - AIが知識を整理するセカンドブレイン",
		description:
			"AIの力であなたのブックマークと知識を自動整理するセカンドブレインアプリ",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body className={`${notoSansJP.variable} font-sans antialiased`}>
				<ConvexClientProvider>{children}</ConvexClientProvider>
			</body>
		</html>
	);
}
