import { InstanceTable } from '@/components/InstanceTable';

export function InstancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-7xl flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">n8n Instances</h1>
        </div>

        <InstanceTable />
      </div>
    </div>
  );
}