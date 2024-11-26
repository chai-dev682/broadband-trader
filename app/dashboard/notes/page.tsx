import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { ContractsTable } from '@/components/tables/contracts-table/contracts-table';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Notes', link: '/dashboard/notes' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  // const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = searchParams.offset ?? '';

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/contracts?offset=${offset}&limit=${pageLimit}`
  );

  const contractsRes = await res.json();
  const totalUsers = contractsRes.length; //1000
  // const pageCount = Math.ceil(totalUsers / pageLimit);
  // const employee: Employee[] = contractsRes.users;

  console.log('res', contractsRes);

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Notes (${totalUsers})`}
            description="Browse available notes or create new one"
          />

          <Link
            href={'/dashboard/notes/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        {/* <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage employees (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div> */}
        <Separator />

        <ContractsTable
          searchKey="contract_id"
          pageNo={1}
          totalItems={totalUsers}
          data={contractsRes}
          pageCount={0}
        />
      </div>
    </PageContainer>
  );
}
