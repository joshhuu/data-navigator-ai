import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '@/lib/auth';

/**
 * Custom hook to manage Firebase authentication state
 * Provides the current user and loading state
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      // Debugging: expose auth state in window for production diagnosis
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typeof window !== 'undefined') window.__AUTH_DEBUG = { user, loading: false };
        // also log to console so deployed site shows value
        // eslint-disable-next-line no-console
        console.debug('useAuth:onAuthStateChange', { user });
      } catch (e) {
        // ignore
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
}
