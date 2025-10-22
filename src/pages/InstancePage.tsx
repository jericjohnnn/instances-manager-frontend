import { InstanceTable } from '@/components/InstanceTable';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

export function InstancePage() {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-7xl flex flex-col items-center gap-6">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">n8n Instances</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 !bg-red-600 text-white rounded hover:!bg-red-700 transition-colors font-medium"
          >
            Logout
          </button>
        </div>

        <InstanceTable />
      </div>
    </div>
  );
}