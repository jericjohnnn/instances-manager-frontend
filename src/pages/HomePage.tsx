import { InstanceCard } from '@/components/InstanceCard';
import { Loader } from '@/components/Loader';
import { useInstances } from '@/hooks/useInstances';

export default function HomePage() {
  const { data, isLoading, isError, error } = useInstances();

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-red-500">Error: {error?.message}</div>;

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Instances</h1>
      <div className="grid gap-4">
        {data?.map((inst) => (
          <InstanceCard key={inst.id} name={inst.account} status={inst.proxy_name} />
        ))}
      </div>
    </main>
  );
}
