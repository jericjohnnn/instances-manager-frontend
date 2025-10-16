import { type Instance } from '@/api/instanceApi';

type Props = {
  instance: Instance;
  isSelected: boolean;
  onSelect: () => void;
};

export function InstanceRow({ instance, isSelected, onSelect }: Props) {
  return (
    <tr
      onClick={onSelect}
      className={`border-t ${isSelected ? 'bg-blue-50' : ''}`}
    >
      <td className="p-3">{instance.id}</td>
      <td className="p-3">{instance.account}</td>
      <td className="p-3">{instance.code}</td>
      <td className="p-3">{instance.port}</td>
      <td className="p-3">{instance.proxy_name}</td>
    </tr>
  );
}
