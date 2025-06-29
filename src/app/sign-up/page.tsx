// app/signup/page.tsx or wherever your SignUpPage lives

export default async function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Create an Account</h1>
          <p className="text-sm text-muted-foreground">
            Join <span className="text-primary font-medium">Course Pilot</span> and start your learning journey today.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-md p-6 shadow-md">
          {/* Placeholder */}
          <div className="text-sm text-muted-foreground text-center py-8">
            Form coming soon...
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary font-medium hover:underline underline-offset-4 transition"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
