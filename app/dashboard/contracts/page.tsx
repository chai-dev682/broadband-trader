// import { Breadcrumbs } from '@/components/breadcrumbs';
// import PairTable, { PairTableItemType } from '@/components/custom/pair-table';
// import PageContainer from '@/components/layout/page-container';

// const breadcrumbItems = [
//   { title: 'Dashboard', link: '/dashboard' },
//   { title: 'Contracts', link: '/dashboard/contracts' }
// ];

// type paramsProps = {
//   searchParams: {
//     [key: string]: string | string[] | undefined;
//   };
// };

// const sampleData: PairTableItemType[] = [
//   { tag: 'Contract ID', value: 'xyz' },
//   { tag: 'Note ID', value: 'abc' },
//   { tag: 'Contract Purpose', value: 'abc' },
//   { tag: 'Internet Speed (Mbps', value: 'abc' },
//   { tag: 'Monthly Recurring Fee (MRF)', value: 'abc' },
//   { tag: 'Contract Term', value: 'abc' },
//   { tag: 'Status', value: 'abc' },
//   { tag: 'Activation Date', value: 'abc' },
//   { tag: 'Score Change', value: 'abc' }
// ];

// const sampleData2: PairTableItemType[] = [
//   { tag: 'Monthly Recurring Revenue (MRR)', value: 'xyz' },
//   { tag: 'Remaining Payments', value: 'xyz' },
//   { tag: 'Remaining Contract Value', value: 'xyz' },
//   { tag: 'Unpaid MRR Payments', value: 'xyz' },
//   { tag: 'Total Contract Value', value: 'xyz' },
//   { tag: 'Note Purchase Price', value: 'xyz' },
//   { tag: 'Markup/ Discount', value: 'xyz' },
//   { tag: 'Annualized Return', value: 'xyz' }
// ];

// export default async function page({ searchParams }: paramsProps) {
//   const page = Number(searchParams.page) || 1;
//   const pageLimit = Number(searchParams.limit) || 10;
//   const country = searchParams.search || null;
//   const offset = (page - 1) * pageLimit;

//   // const res = await fetch(
//   //   `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
//   //     (country ? `&search=${country}` : '')
//   // );
//   // const employeeRes = await res.json();
//   // const totalUsers = employeeRes.total_users; //1000
//   // const pageCount = Math.ceil(totalUsers / pageLimit);
//   // const employee: Employee[] = employeeRes.users;
//   return (
//     <PageContainer scrollable>
//       <div className="space-y-4">
//         <Breadcrumbs items={breadcrumbItems} />
//         <PairTable data={sampleData} heading="Contract Details" />
//         <PairTable data={sampleData2} heading="Financial Performance" />
//       </div>
//     </PageContainer>
//   );
// }

import { Breadcrumbs } from '@/components/breadcrumbs';
import PairTable, { PairTableItemType } from '@/components/custom/pair-table';
import PageContainer from '@/components/layout/page-container';
import { ContractsTable } from '@/components/tables/contracts-table/contracts-table';
import { Employee } from '@/constants/data';
// import { Separator } from '@radix-ui/react-dropdown-menu';

import { Plus } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Contracts', link: '/dashboard/contracts' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const sampleData: PairTableItemType[] = [
  { tag: 'Contract ID', value: 'xyz' },
  { tag: 'Note ID', value: 'abc' },
  { tag: 'Contract Purpose', value: 'abc' },
  { tag: 'Internet Speed (Mbps', value: 'abc' },
  { tag: 'Monthly Recurring Fee (MRF)', value: 'abc' },
  { tag: 'Contract Term', value: 'abc' },
  { tag: 'Status', value: 'abc' },
  { tag: 'Activation Date', value: 'abc' },
  { tag: 'Score Change', value: 'abc' }
];

const sampleData2: PairTableItemType[] = [
  { tag: 'Monthly Recurring Revenue (MRR)', value: 'xyz' },
  { tag: 'Remaining Payments', value: 'xyz' },
  { tag: 'Remaining Contract Value', value: 'xyz' },
  { tag: 'Unpaid MRR Payments', value: 'xyz' },
  { tag: 'Total Contract Value', value: 'xyz' },
  { tag: 'Note Purchase Price', value: 'xyz' },
  { tag: 'Markup/ Discount', value: 'xyz' },
  { tag: 'Annualized Return', value: 'xyz' }
];

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const offset = searchParams.offset ?? '';

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/thisuser/contracts?offset=${offset}&limit=${pageLimit}`
  );

  const contractsRes = await res.json();
  const totalUsers = contractsRes.length; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = contractsRes.users;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`My Contracts (${totalUsers})`}
            description="Browse available contracts or create new one"
          />

          <Link
            href={'/dashboard/notes/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        {/* <Separator /> */}

        <ContractsTable
          searchKey="contract_id"
          pageNo={1}
          totalUsers={totalUsers}
          data={contractsRes}
          pageCount={0}
        />
        <PairTable data={sampleData} heading="Contract Details" />
        <PairTable data={sampleData2} heading="Financial Performance" />
      </div>
    </PageContainer>
  );
}
