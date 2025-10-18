import { type Instance } from '@/api/instanceApi';

type Props = {
  instance: Instance;
};

export function InstanceRow({ instance }: Props) {
  return (
    <tr
      className={`text-black`}
    >
      <td className="p-3">{instance.id}</td>
      <td className="p-3">{instance.account}</td>
      <td className="p-3">{instance.code}</td>
      <td className="p-3">{instance.port}</td>
      <td className="p-3">{instance.proxy_name}</td>
    </tr>
  );
}
