import { useState } from 'react';
import { InstanceRow } from '@/components/ui/InstanceRow';
import { type Instance } from '@/api/instanceApi';

type Props = { data: Instance[] };

export function InstanceTable({ data }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <table className="min-w-full bg-white border rounded-lg shadow">
      <thead>
        <tr className="bg-gray-100 text-left text-sm font-semibold">
          <th className="p-3">ID</th>
          <th className="p-3">Account</th>
          <th className="p-3">Code</th>
          <th className="p-3">Port</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((inst) => (
          <InstanceRow
            key={inst.id}
            instance={inst}
            isSelected={selectedId === inst.id}
            onSelect={() => setSelectedId(inst.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
