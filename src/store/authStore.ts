import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile, Store, Subscription } from '../types/database';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  store: Store | null;
  subscription: Subscription | null;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setStore: (store: Store | null) => void;
  setSubscription: (subscription: Subscription | null) => void;
  setLoading: (loading: boolean) => void;
  
  // Auth methods
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: Error | null; needsEmailConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  fetchUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      store: null,
      subscription: null,
      isLoading: true,
      isInitialized: false,
      
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setProfile: (profile) => set({ profile }),
      setStore: (store) => set({ store }),
      setSubscription: (subscription) => set({ subscription }),
      setLoading: (isLoading) => set({ isLoading }),
      
      initialize: async () => {
        try {
          set({ isLoading: true });
          
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            set({ user: session.user, session });
            await get().fetchUserData();
          } else {
            // Clear any stale persisted auth state when no valid session exists
            set({
              user: null,
              session: null,
              profile: null,
              store: null,
              subscription: null,
            });
          }
          
          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            set({ user: session?.user ?? null, session });
            
            if (event === 'SIGNED_IN' && session?.user) {
              await get().fetchUserData();
            } else if (event === 'SIGNED_OUT') {
              set({ profile: null, store: null, subscription: null });
            }
          });
          
        } catch (error) {
          console.error('Auth initialization error:', error);
        } finally {
          set({ isLoading: false, isInitialized: true });
        }
      },
      
      signIn: async (email, password) => {
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          set({ user: data.user, session: data.session });
          await get().fetchUserData();
          
          return { error: null };
        } catch (error) {
          return { error: error as Error };
        } finally {
          set({ isLoading: false });
        }
      },
      
      signUp: async (email, password, fullName) => {
        try {
          set({ isLoading: true });
          
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
            },
          });
          
          if (error) throw error;
          
          if (data.user && data.session) {
            set({ user: data.user, session: data.session });
          } else {
            // If email confirmation is enabled, Supabase may return user without session.
            // Keep auth state clean until the user confirms and signs in.
            set({ user: null, session: null });
          }
          
          return {
            error: null,
            needsEmailConfirmation: !data.session,
          };
        } catch (error) {
          return { error: error as Error };
        } finally {
          set({ isLoading: false });
        }
      },
      
      signOut: async () => {
        await supabase.auth.signOut();
        set({
          user: null,
          session: null,
          profile: null,
          store: null,
          subscription: null,
        });
      },
      
      fetchUserData: async () => {
        const { user } = get();
        if (!user) return;
        
        try {
          // Fetch profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profile) set({ profile });
          
          // Fetch store
          const { data: store } = await supabase
            .from('stores')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (store) set({ store });
          
          // Fetch subscription
          const { data: subscription } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', user.id)
            .single();
          
          if (subscription) set({ subscription });
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);
