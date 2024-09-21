'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Note } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Note>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'contract_id',
    header: 'Contract ID'
  },
  {
    accessorKey: 'note_id',
    header: 'Note ID'
  },
  {
    accessorKey: 'monthy_recurring_fee',
    header: 'Monthly Recurring Fee (MRF)'
  },
  {
    accessorKey: 'term',
    header: 'Term'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'payments_score_change',
    header: 'Payments Score Change'
  },
  {
    accessorKey: 'days_since_payment',
    header: 'Days Since Payment '
  },
  {
    accessorKey: 'remaining_payments',
    header: 'Remaining Payments'
  },
  {
    accessorKey: 'remaining_contract_value',
    header: 'Remaining Contract Value'
  },
  {
    accessorKey: 'unpaid_mrf_payments',
    header: 'Unpaid MRF Payments'
  },
  {
    accessorKey: 'total_contract_value',
    header: 'Total Contract Value'
  },
  {
    accessorKey: 'asking_price',
    header: 'Asking Price'
  },
  {
    accessorKey: 'discount',
    header: 'Discount'
  },
  {
    accessorKey: 'annualized_return',
    header: 'Annualized Return'
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
