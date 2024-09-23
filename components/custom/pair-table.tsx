'use client';
import React from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody
} from '@/components/ui/table';

export interface PairTableItemType {
  tag: string;
  value: string;
}

interface PairTableProps {
  data: PairTableItemType[];
  heading: string;
}

const PairTable: React.FC<PairTableProps> = ({ data, heading }) => {
  return (
    <div>
      <h4 className="border bg-secondary p-2 text-xl font-bold">{heading}</h4>
      <Table className="border border-2">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        {/* <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="">
              <TableCell className="w-[60%] bg-secondary/70 font-medium">
                {item.tag}
              </TableCell>
              <TableCell className="w-[40%]">{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PairTable;
