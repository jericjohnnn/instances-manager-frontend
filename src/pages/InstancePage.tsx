import { InstanceTable } from '@/components/InstanceTable';

export function InstancePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Instances</h1>
        <p className="text-gray-600 mt-2">Manage your application instances</p>
      </div>
      
      <InstanceTable />
    </div>
  );
}