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
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import { DefaultSpinner } from '../custom/spinner';
import { Modal } from '../ui/modal';
import { useMetaMaskTatum } from '@/hooks/useMetamaskTatum';
import contractABI, { contractAddress } from '@/contracts/contractABI';
import { ethers } from 'ethers';

const formSchema = z.object({
  term: z.number().positive('Number must be greater than zero'),
  monthlyFee: z.number().positive('Number must be a positive number'),
  capacity: z.number().positive(),
  usage: z.number().positive(),
  askingPrice: z.number().positive(),
  maintenanceCost: z.number().positive()
});

const formNoteSchema = z.object({
  price: z.number().positive(),
  fraction: z.number().positive()
});

type UserFormValue = z.infer<typeof formSchema>;
type NoteFormValue = z.infer<typeof formNoteSchema>;

export default function ContractCreationForm() {
  const { account, error } = useMetaMaskTatum();
  const defaultValues = {
    term: 12,
    monthlyFee: 0,
    capacity: 0,
    usage: 0,
    askingPrice: 0,
    maintenanceCost: 0
  };

  const defaultNoteValues = {
    fraction: 0,
    price: 0
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const noteForm = useForm<NoteFormValue>({
    resolver: zodResolver(formNoteSchema),
    defaultValues: defaultNoteValues
  });

  const { toast } = useToast();
  const [isNoteModal, setIsNoteModal] = useState(false);

  const [contractData, setContractData] = useState<UserFormValue | null>(null);

  const {
    post: postContractData,
    loading,
    error: postContractError,
    data: postContractResults
  } = usePost('/api/contracts');

  const onSubmit = async (data: UserFormValue) => {
    if (!account || error) {
      toast({
        description: error || 'Metamask not connected',
        variant: 'destructive'
      });
    } else {
      // setIsNoteModal(true);
      // setContractData(data);
      const alldata = { ...data, account: account };
      postContractData(alldata);
    }
  };
  const onNoteSubmit = async (data: NoteFormValue) => {
    const alldata = { ...contractData, note: data, account: account };
    postContractData(alldata);
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
                    onChange={(e) => numPositive(e, field as any)}
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
                    onChange={(e) => numPositive(e, field as any)}
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
                    onChange={(e) => numPositive(e, field as any)}
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
                    onChange={(e) => numPositive(e, field as any)}
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
                    onChange={(e) => numPositive(e, field as any)}
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
                    onChange={(e) => numPositive(e, field as any)}
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

      <Modal
        title="Create Note"
        description="Create a note in this contract"
        onClose={() => {
          setIsNoteModal(false);
        }}
        isOpen={isNoteModal}
      >
        <Form {...noteForm}>
          <form
            onSubmit={noteForm.handleSubmit(onNoteSubmit)}
            className="w-full space-y-2"
          >
            <FormField
              control={noteForm.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price of Note</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      {...field}
                      onChange={(e) => numPositive(e, field as any)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={noteForm.control}
              name="fraction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fraction of Contract</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      {...field}
                      onChange={(e) => numPositive(e, field as any)}
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
      </Modal>
    </>
  );
}
