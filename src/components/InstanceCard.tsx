type Props = {
  name: string;
  status: string;
};

export const InstanceCard = ({ name, status }: Props) => {
  return (
    <article className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className={`mt-1 text-sm ${status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
        {status}
      </p>
    </article>
  );
};
