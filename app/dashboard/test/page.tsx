import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import ButtonLinkIcon from '@/components/custom/button-link-icon';

const breadcrumbItems = [
  { title: 'Order Submission', link: '/dashboard/test/submission' }
];
export default async function page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl font-bold">This page is to test components</h1>
        <div className="flex flex-wrap gap-6">
          {breadcrumbItems.map((item) => (
            <ButtonLinkIcon title={item.title} href={item.link} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}