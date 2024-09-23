'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Note } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Note>[] = [
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
    accessorKey: 'contract_id',
    header: 'Contract ID'
  },
  {
    accessorKey: 'note_id',
    header: 'Note ID'
  },
  {
    accessorKey: 'investment',
    header: 'Investment'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'payments_received',
    header: 'Payments Received'
  },
  {
    accessorKey: 'remaining_payments',
    header: 'Remaining payments'
  },
  {
    accessorKey: 'outstanding_payments',
    header: 'Outstanding Payments'
  },
  {
    accessorKey: 'outstanding_principle',
    header: 'Outstanding Principle'
  },
  {
    accessorKey: 'accrued_revenue',
    header: 'Accrued Revenue'
  },
  {
    accessorKey: 'principal_plus_reveneue',
    header: 'Principal + Revenue'
  },
  {
    accessorKey: 'asking_price',
    header: 'Asking Price'
  },
  {
    accessorKey: 'expiry',
    header: 'Order Expires On'
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
