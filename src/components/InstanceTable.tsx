import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { useInstances } from '@/hooks/useInstances';
import type { Instance } from '@/api/instance-api';

const columnHelper = createColumnHelper<Instance>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('account', {
    header: 'Account',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('code', {
    header: 'Code',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('port', {
    header: 'Port',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('proxy_name', {
    header: 'Proxy Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('created_at', {
    header: 'Created At',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export function InstanceTable() {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Add search state
  const [globalFilter, setGlobalFilter] = React.useState('');
  
  // Debounced search value to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = React.useState('');

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(globalFilter);
      // Reset to first page when searching
      setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [globalFilter]);

  const { data, isLoading, isError, error, isFetching } = useInstances({
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
    search: debouncedSearch || undefined, // Only send if not empty
  });

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    pageCount: data ? Math.ceil(data.count / pagination.pageSize) : -1,
    state: {
      pagination,
      globalFilter, // Add global filter state
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter, // Add filter change handler
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true, // Tell table we handle filtering server-side
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Error: {error instanceof Error ? error.message : 'Failed to load'}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search instances..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {isFetching && (
          <span className="text-sm text-gray-500">Searching...</span>
        )}
      </div>

      <div className="overflow-x-auto text-black rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  No results found
                  {debouncedSearch && ` for "${debouncedSearch}"`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Page {pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <span className="text-sm text-gray-500">
            ({data?.count} total items)
          </span>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm bg-white border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Last
          </button>
        </div>

        <select
          value={pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="px-3 py-1 text-sm border rounded"
        >
          {[5, 10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}