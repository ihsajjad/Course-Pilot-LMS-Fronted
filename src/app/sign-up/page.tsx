// app/signup/page.tsx or wherever your SignUpPage lives

import { SignupForm } from "@/components/ui/sign-up-form";

export default async function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-16">
      <div className="w-full flex flex-col items-center space-y-8">
        {/* Header */}
        {/* <div className="text-center md:text-left space-y-4">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight leading-tight text-center">
              Welcome to <span className="text-primary">Course Pilot</span>
            </h1>
            <p className="text-muted-foreground text-sm mx-auto md:mx-0">
              Your gateway to modern, efficient, and flexible learning. Explore
              structured courses, track your progress, and collaborate with
              instructors — all in one place.
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span> Interactive, self-paced
              lessons
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span> Progress tracking &
              certificates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span> Built for students and
              instructors
            </div>
          </div> 
        </div> */}

        {/* Form  */}
        <SignupForm />
      </div>
    </div>
  );
}
