import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import ButtonLinkIcon from '@/components/custom/button-link-icon';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { RecentSales } from '@/components/recent-sales';
import AccountSummaryCards from '@/components/summary/account-summary-cards';
import MyAccountBalances from '@/components/summary/my-account-balances';
import MyNotesAtGlance from '@/components/summary/my-notes-at-glance';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useToast } from '@/components/ui/use-toast';

export default function page() {

  // const {toast} = useToast();
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
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
            <div className='flex flex-col md:flex-row gap-4'>
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
            <div className='flex justify-center gap-2'>
              <ButtonLinkIcon title='Add Funds' href='/'/>
              <ButtonLinkIcon title='Get Support' href='/support'/>
              <ButtonLinkIcon title='Browse Notes' href='/dashboard/notes'/>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
