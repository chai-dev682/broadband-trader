'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GithubSignInButton from '../github-auth-button';
import 'react-phone-input-2/lib/style.css';
import { useToast } from '../ui/use-toast';
import TextLink from '../custom/text-link';
import { DefaultSpinner } from '../custom/spinner';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserAuthFormProps {
  onNotHaveAccount: () => void;
}

export const UserAuthForm: React.FC<UserAuthFormProps> = ({
  onNotHaveAccount
}) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const error = searchParams.get('error');
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    phone: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { toast } = useToast();

  useEffect(() => {
    if (error === 'CredentialsSignin')
      toast({
        title: 'Invalid Credentials',
        variant: 'destructive'
      });
  }, []);

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl ?? '/dashboard'
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-2 py-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">SIGN IN</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading && (
            <div className="flex justify-center">
              <DefaultSpinner />
            </div>
          )}
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Sign In
          </Button>
        </form>
      </Form>

      <TextLink
        text="Don't have an Account? Sign Up"
        onClick={onNotHaveAccount}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
};
