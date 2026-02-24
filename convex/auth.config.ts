const clerkDomain =
	process.env.CLERK_JWT_ISSUER_DOMAIN ??
	"https://exact-firefly-51.clerk.accounts.dev";

export default {
	providers: [
		{
			domain: clerkDomain,
			applicationID: "convex",
		},
	],
};
