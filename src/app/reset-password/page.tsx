import { updatePassword } from './actions';

export default function ResetPasswordPage() {
  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl">
      <h1 className="text-xl font-bold mb-4">Nueva contraseña</h1>
      <form className="flex flex-col gap-3">
        <input
          type="password"
          name="password"
          placeholder="Nueva contraseña"
          required
          className="border rounded p-2"
        />
        <button formAction={updatePassword} className="bg-blue-600 text-white rounded p-2 font-semibold">
          Actualizar contraseña
        </button>
      </form>
    </div>
  );
}