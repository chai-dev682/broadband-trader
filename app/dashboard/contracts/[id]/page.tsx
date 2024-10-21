import { Breadcrumbs } from '@/components/breadcrumbs';
import PairTable, { PairTableItemType } from '@/components/custom/pair-table';
import PageContainer from '@/components/layout/page-container';

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
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div>Details</div>
        <Breadcrumbs items={breadcrumbItems} />
        <PairTable data={sampleData} heading="Contract Details" />
        <PairTable data={sampleData2} heading="Financial Performance" />
      </div>
    </PageContainer>
  );
}
