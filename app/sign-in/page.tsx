import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="mx-auto w-fit">
      <SignIn routing="hash" />
    </div>
  )
}
