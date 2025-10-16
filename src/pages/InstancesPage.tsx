import { useInstances } from '@/hooks/useInstances';
import { InstanceTable } from '@/components/InstanceTable';
import { Loader } from '@/components/Loader';

export default function InstancesPage() {
  const { data, isLoading, isError, error } = useInstances();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Instances</h1>
      <InstanceTable data={data ?? []} />
    </main>
  );
}
