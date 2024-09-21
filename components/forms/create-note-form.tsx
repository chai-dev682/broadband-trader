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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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

import { countries } from '@/constants/data';

const formSchema = z.object({
  // firstname: z.string().min(1, { message: 'First name is required' }),
  // lastname: z.string().min(1, { message: 'Last name is required' }),
  // username: z.string().min(1, { message: 'Username is required' }),
  // email: z.string().email({ message: 'Enter a valid email address' }),
  // password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  // phone: z.string().min(7, 'Invalid phone number'),
  // acceptTerms: z.boolean().refine((val) => val === true, {
  //   message: 'You must accept the Terms and Conditions',
  // }),
  // acknowledgePolicy: z.boolean().refine((val) => val === true, {
  //   message: 'You must acknowledge the Privacy Policy and Cookie Policy',
  // }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function NoteCreationForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    contract_id: '',
    sell_date: '',
    internet_speed: '',
    network_bandwidth_from_isp: '',
    country: '',
    asking_price: '',
    sku: '',
    order_number: '',
    order_date: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    setTimeout((()=>{setLoading(false)}), 2000);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="contract_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract ID</FormLabel>
                <FormControl>
                  <Input type="number" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sell_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sell Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
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
            name="internet_speed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Internet Speed (Mbps)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="network_bandwidth_from_isp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network Bandwidth from ISP (Mbps)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60 overflow-y-scroll">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="asking_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input
                    type="text"
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
            name="order_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
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
            name="order_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Date</FormLabel>
                <FormControl>
                  <Input
                    type="datetime"
                    disabled={loading} // You can keep this if you have a loading state
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Submit Contract
          </Button>
        </form>
      </Form>
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
}
