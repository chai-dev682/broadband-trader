'use client';
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';

const AccountSummaryCards = () => {

    const {testToast, toast} = useToast();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-center text-sm font-medium">
            Net Annualized Return
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold">0%</div>
          <p
            className="text-sm text-blue-600 dark:text-red-500 cursor-pointer"
            onClick={()=>{toast({
                variant: 'success',
                title: 'Title: Comming Soon!',
                description: 'Description: Description will be available soon!'
              });}}
          >
            What is Net Annualized Return?
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-center text-sm font-medium">
            Revenue Received
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-2xl font-bold">0$</div>
          <p className="text-center text-sm text-muted-foreground">
            Total Payments <br />
            (Principal & Revenue) $0
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-center text-sm font-medium">
            Account Total
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-2xl font-bold">0$</div>
          <p className="text-center text-sm text-muted-foreground">
            Available Cash ${0}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSummaryCards;
