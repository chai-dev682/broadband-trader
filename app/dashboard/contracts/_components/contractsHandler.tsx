'use client';
import { DefaultSpinner } from '@/components/custom/spinner';
import { ContractsTable } from '@/components/tables/contracts-table/contracts-table';
import { Heading } from '@/components/ui/heading';
import { Contract } from '@/constants/data';
import { useGet } from '@/hooks/fetcher';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';

interface ContractsHandlerProps {
  label: string;
  url: string;
}

const ContractsHandler: React.FC<ContractsHandlerProps> = ({ label, url }) => {
  const { data, loading } = useGet<Contract[]>(url);
  console.log(data);
  return (
    <div>
      <div className="flex items-start justify-between">
        <Heading
          title={`${label} (${data?.length ?? 0})`}
          description="Browse available contracts or create new one"
        />

        <Link
          href={'/dashboard/notes/create'}
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>

      {loading && <DefaultSpinner />}
      {data != null && (
        <ContractsTable
          searchKey="contract_id"
          pageNo={1}
          totalItems={data.length}
          data={data}
          pageCount={0}
        />
      )}
    </div>
  );
};

export default ContractsHandler;
