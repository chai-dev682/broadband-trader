import { Breadcrumbs } from '@/components/breadcrumbs';
import ContractCreationForm from '@/components/forms/contract-creation-form';
import NoteCreationForm from '@/components/forms/create-note-form';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Notes', link: '/dashboard/notes' },
  { title: 'Create', link: '/dashboard/create' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const totalUsers = 100; //employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  //const employee: Employee[] = employeeRes.users;
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-col space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Separator />
        {/* <NoteCreationForm /> */}
        <ContractCreationForm />
      </div>
    </PageContainer>
  );
}
