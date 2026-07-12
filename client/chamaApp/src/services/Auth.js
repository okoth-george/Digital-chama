import { supabase } from '../supabaseClient';

const configErrorMessage = 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.';

export async function loginUser({ email, password }) {
  if (!supabase) {
    throw new Error(configErrorMessage);
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signUpUser({ email, password, fullName, phoneNumber }) {
  if (!supabase) {
    throw new Error(configErrorMessage);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber,
      },
    },
  });

  if (error) {
    throw error;
  }

  // No active session yet (email confirmation pending) — don't fetch profiles as anon
  if (!data.session) {
    return {
      authData: data,
      profile: null,
      needsConfirmation: true,
    };
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, full_name, phone_number, role')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    throw new Error('Auth user created, but profile fetch failed: ' + profileError.message);
  }

  return { authData: data, profile: profileData, needsConfirmation: false };
}