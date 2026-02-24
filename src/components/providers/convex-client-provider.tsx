"use client";

import { jaJP } from "@clerk/localizations";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { type ReactNode } from "react";

const convexUrl =
	process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

function isValidClerkKey(key: string | undefined): boolean {
	if (!key) return false;
	if (key === "pk_test_placeholder") return false;
	return key.startsWith("pk_test_") || key.startsWith("pk_live_");
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
	const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
	const hasValidClerkKey = isValidClerkKey(clerkKey);

	if (!hasValidClerkKey) {
		return <>{children}</>;
	}

	return (
		<ClerkProvider
			publishableKey={clerkKey}
			localization={jaJP}
			appearance={{
				variables: {
					colorPrimary: "#4F46E5",
					fontFamily: "var(--font-noto-sans-jp), sans-serif",
				},
			}}
		>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{children}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
