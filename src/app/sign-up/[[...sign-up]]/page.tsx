import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background">
			<SignUp
				appearance={{
					variables: {
						colorPrimary: "#4F46E5",
						fontFamily: "var(--font-noto-sans-jp), sans-serif",
					},
					elements: {
						formButtonPrimary:
							"bg-primary hover:bg-primary/90 text-primary-foreground",
						card: "shadow-lg",
						headerTitle: "text-foreground",
						headerSubtitle: "text-muted-foreground",
						socialButtonsBlockButton:
							"border-border text-foreground hover:bg-accent",
						formFieldLabel: "text-foreground",
						formFieldInput: "border-input bg-background text-foreground",
						footerActionLink: "text-primary hover:text-primary/80",
					},
				}}
			/>
		</div>
	);
}
