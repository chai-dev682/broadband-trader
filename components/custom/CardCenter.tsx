'use client';
import React, { ReactNode } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '@/components/ui/card';


interface CardCenterProps {
    header: ReactNode;
    content: ReactNode;
    footer: ReactNode;
}
const CardCenter:React.FC<CardCenterProps> = ({header, content, footer}) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-center text-sm font-medium">
          {header}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-2xl font-bold">{content}</div>
        <p className="text-sm text-muted-foreground">{footer}</p>
      </CardContent>
    </Card>
  );
};

export default CardCenter;
