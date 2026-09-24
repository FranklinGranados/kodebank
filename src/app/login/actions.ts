'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect('/login?error=' + encodeURIComponent('Credenciales incorrectas'));
  }

  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message));
  }

  redirect('/login?message=' + encodeURIComponent('Revisa tu correo para confirmar tu cuenta'));
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/auth/confirm?next=/reset-password',
  });

  if (error) {
    redirect('/login?error=' + encodeURIComponent('No se pudo enviar el correo'));
  }

  redirect('/login?message=' + encodeURIComponent('Revisa tu correo para restablecer tu contraseña'));
}