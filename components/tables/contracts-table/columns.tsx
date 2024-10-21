'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Contract } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Contract>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'Contract ID'
  },
  // {
  //   accessorKey: 'monthy_recurring_fee',
  //   header: 'Monthly Recurring Fee (MRF)'
  // },
  {
    accessorKey: 'term',
    header: 'Term'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  // {
  //   accessorKey: 'payments_score_change',
  //   header: 'Payments Score Change'
  // },
  // {
  //   accessorKey: 'days_since_payment',
  //   header: 'Days Since Payment '
  // },
  {
    accessorKey: 'monthlyFee',
    header: 'Monthly Fee'
  },
  {
    accessorKey: 'remainingPayments',
    header: 'Remaining Payments'
  },
  {
    accessorKey: 'remainingContractValue',
    header: 'Remaining Contract Value'
  },
  // {
  //   accessorKey: 'unpaid_mrf_payments',
  //   header: 'Unpaid MRF Payments'
  // },
  // {
  //   accessorKey: 'totalContractValue',
  //   header: 'Total Contract Value'
  // },
  {
    accessorKey: 'askingPrice',
    header: 'Asking Price'
  },
  // {
  //   accessorKey: 'discount',
  //   header: 'Discount'
  // },
  {
    accessorKey: 'maintenanceCost',
    header: 'Maintenance Cost'
  },
  {
    accessorKey: 'capacity',
    header: 'Capacity (MBPS)'
  },
  {
    accessorKey: 'usage',
    header: 'Usage (MBPS)'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
