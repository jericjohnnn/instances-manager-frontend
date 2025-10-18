import { InstanceRow } from '@/components/ui/InstanceRow';
import { type Instance } from '@/api/instanceApi';

type Props = { data: Instance[] };

export function InstanceTable({ data }: Props) {

  return (
    <table className="min-w-full bg-white border rounded-lg shadow">
      <thead>
        <tr className="bg-gray-100 text-black text-left text-sm font-semibold">
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
          />
        ))}
      </tbody>
    </table>
  );
}
