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
import { usePost } from '@/hooks/fetcher';
import { numPositive } from '@/lib/formUtls';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import { DefaultSpinner } from '../custom/spinner';

const formSchema = z.object({
  term: z.number().positive('Number must be greater than zero'),
  monthlyFee: z.number().positive('Number must be a positive number'),
  capacity: z.number().positive(),
  usage: z.number().positive(),
  askingPrice: z.number().positive(),
  maintenanceCost: z.number().positive()
});

type UserFormValue = z.infer<typeof formSchema>;

export default function ContractCreationForm() {
  const searchParams = useSearchParams();
  const defaultValues = {
    term: 12,
    monthlyFee: 0,
    capacity: 0,
    usage: 0,
    askingPrice: 0,
    maintenanceCost: 0
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const { toast } = useToast();

  const {
    post: postContractData,
    loading,
    error: postContractError,
    data: postContractResults
  } = usePost('/api/contracts/create');

  const onSubmit = async (data: UserFormValue) => {
    console.log(data);
    postContractData(data);
  };

  useEffect(() => {
    if (postContractError) {
      toast({
        title: 'Failure!',
        description: postContractError,
        variant: 'destructive'
      });
    } else if (postContractResults) {
      toast({
        title: 'Success!',
        description: 'Contract Submitted Successfully!',
        variant: 'success'
      });
    }
  }, [postContractResults, postContractError]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            name="contractID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract ID</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    disabled={loading}
                    {...field}
                    value={'xyz (will be displayed after contract creation)'}
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Term (Months)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    {...field}
                    onChange={(e) => numPositive(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Fee</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    {...field}
                    onChange={(e) => numPositive(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="askingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asking Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    {...field}
                    onChange={(e) => numPositive(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network Bandwidth from ISP (Mbps)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    {...field}
                    onChange={(e) => numPositive(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="usage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Internet Speed (Mbps)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    {...field}
                    onChange={(e) => numPositive(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maintenanceCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maintenance Cont</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    {...field}
                    onChange={(e) => numPositive(e, field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="ml-auto bg-green-500 px-10"
            type="submit"
          >
            {loading ? 'Submitting ... ' : 'Submit Contract '}
            {loading && <DefaultSpinner size="xs" margin={5} />}
          </Button>
        </form>
      </Form>
    </>
  );
}
