'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GithubSignInButton from '../github-auth-button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the styles
import { Checkbox } from '../ui/checkbox';
import axios from 'axios';
import { User } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import TextLink from '../custom/text-link';

import { DefaultSpinner } from '../custom/spinner';

const formSchema = z.object({
  firstname: z.string().min(1, { message: 'First name is required' }),
  lastname: z.string().min(1, { message: 'Last name is required' }),
  username: z.string().min(1, { message: 'Username is required' }),
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  phone: z.string().min(7, 'Invalid phone number')
  // acceptTerms: z.boolean().refine((val) => val === true, {
  //   message: 'You must accept the Terms and Conditions',
  // }),
  // acknowledgePolicy: z.boolean().refine((val) => val === true, {
  //   message: 'You must acknowledge the Privacy Policy and Cookie Policy',
  // }),

  // firstname: z.string(),
  // lastname: z.string(),
  // username: z.string(),
  // email: z.string(),
  // password: z.string(),
  // phone: z.string()
  // acceptTerms: z.boolean().refine((val) => val === true, {
  //   message: 'You must accept the Terms and Conditions'
  // }),
  // acknowledgePolicy: z.boolean().refine((val) => val === true, {
  //   message: 'You must acknowledge the Privacy Policy and Cookie Policy'
  // })
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserRegFormProps {
  onHaveAccount?: () => void;
}

export const UserRegForm: React.FC<UserRegFormProps> = ({ onHaveAccount }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
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

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/users/register', {
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        phone: data.phone
      });
      console.log('response: ', response);
      toast({
        title: 'Successfully Registered',
        variant: 'success'
      });
    } catch (e) {
      toast({
        title: 'Error on Sign Up',
        variant: 'destructive',
        description: e instanceof Error ? e.message : 'Something went wrong!'
      });
    }

    setLoading(false);

    // signIn('credentials', {
    //   email: data.email,
    //   callbackUrl: callbackUrl ?? '/dashboard'
    // });
  };

  return (
    <>
      <div className="flex flex-col space-y-2 py-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          SIGN-UP FOR FREE
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <div className="flex flex-col gap-2 md:flex-row">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="First Name"
                      disabled={loading} // You can keep this if you have a loading state
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Last Name"
                      disabled={loading} // You can keep this if you have a loading state
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username"
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

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInput
                    country={'us'} // Default country code
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                    placeholder="Phone"
                    inputStyle={{
                      width: '100%', // Full width
                      padding: '10px', // Adjust padding
                      border: '1px solid #ccc', // Border styling
                      borderRadius: '4px', // Rounded corners
                      paddingLeft: '50px'
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center">
            <Checkbox />
            <FormLabel className="ml-2">
              I accept the Terms & Conditions of Meshly Inc
            </FormLabel>
          </div>

          <div className="flex items-center">
            <Checkbox />
            <FormLabel className="ml-2">
              I acknowledge that my information will be used in accordance with
              the Privacy Policy and Cookie Policy
            </FormLabel>
          </div>

          {loading && (
            <div className="flex justify-center">
              <DefaultSpinner />
            </div>
          )}
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Create Account
          </Button>
        </form>
      </Form>

      <TextLink
        text="Already have an Account? Sign In"
        onClick={onHaveAccount}
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
