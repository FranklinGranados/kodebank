import { createClient } from '@/utils/supabase/server';
import { logout } from '../login/actions';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 border rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Panel de KodeBank</h1>
      <p className="text-gray-600 mb-6">
        Sesión iniciada como: <strong>{user?.email}</strong>
      </p>

      <form>
        <button
          formAction={logout}
          className="bg-red-600 text-white rounded p-2 font-semibold w-full"
        >
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}