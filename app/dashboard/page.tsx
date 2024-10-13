import ButtonLinkIcon from '@/components/custom/button-link-icon';
import PageContainer from '@/components/layout/page-container';
import AccountSummaryCards from '@/components/summary/account-summary-cards';
import MyAccountBalances from '@/components/summary/my-account-balances';
import MyNotesAtGlance from '@/components/summary/my-notes-at-glance';
import { columns } from '@/components/tables/open-notes-table/columns';
import { OpenNotesTable } from '@/components/tables/open-notes-table/open-notes-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';

export default function page() {
  return (
    <PageContainer>
      <div className="no-scrollbar thin-scrollbar h-[90vh] w-full space-y-2 overflow-y-auto">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          {/* <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div> */}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList> */}
          <TabsContent value="overview" className="space-y-4">
            <AccountSummaryCards />
            <div className="flex flex-col gap-4 md:flex-row">
              <Card className="flex-1 px-6 py-8">
                <MyAccountBalances />
              </Card>
              <Card className="flex-1 px-6 py-8">
                <MyNotesAtGlance />
              </Card>
            </div>
            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              
              <div className="col-span-4">
                <AreaGraph />
              </div>
              <div className="col-span-4 md:col-span-4">
                <PieGraph />
              </div>
            </div> */}
            <div className="flex justify-center gap-2">
              <ButtonLinkIcon title="Add Funds" href="/" />
              <ButtonLinkIcon title="Get Support" href="/support" />
              <ButtonLinkIcon title="Browse Notes" href="/dashboard/notes" />
            </div>
          </TabsContent>
        </Tabs>

        <div className="">
          <div className="mb-6 mt-12 flex items-center gap-3">
            <h2 className="text-3xl font-semibold">Open Sell Orders</h2>
            <Button>Reprice</Button>

            <Button variant="secondary">Cancel Order</Button>
          </div>
          <OpenNotesTable
            searchKey="contract_id"
            pageNo={1}
            columns={columns}
            totalUsers={0}
            data={[]}
            pageCount={0}
          />
        </div>
      </div>
    </PageContainer>
  );
}
