import { Metadata } from 'next';
import Link from 'next/link';
import LoginRegisterForm from '@/components/forms/login-register-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, Target } from 'lucide-react';

const points = [
  "We're authorised by Paxful to provide crypto services.",
  'We value and respect your privacy.',
  'Your funds are kept safe by not storing $1 dollar in a bank.'
];

const details = [
  `By signing up you will receive marketing emails, which you may unsubscribe from via account settings.`,
  `All trading involves risk. We do not advise on any trading strategies or how you should buy or sell contracts.`
];
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center overflow-y-scroll md:flex md:flex-row lg:px-0">
      {/* <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link> */}
      <div className="relative hidden h-full flex-col bg-muted p-10 md:flex md:flex-[1] dark:border-r">
        {/* <div className="absolute inset-0 bg-zinc-900" /> */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Logo
        </div>
        <div className="relative z-20 flex flex-col text-lg font-normal">
          <h1 className="text-2xl font-semibold tracking-tight">
            Connect with a growing community of broadband traders.
          </h1>
          <ul className="mt-20 text-base font-normal">
            {points.map((item, index) => (
              <li className="mt-1 flex gap-4" key={index}>
                <Target /> {item}
              </li>
            ))}
          </ul>
          <ul className="mt-20">
            {details.map((item, index) => (
              <li className="mt-1 flex gap-2" key={index}>
                <CheckCircle size={50} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">&ldquo;Meshly&rdquo;</p>
            <footer className="text-sm">P2P Trading Platform</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full flex-[2] items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <LoginRegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
