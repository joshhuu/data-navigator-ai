/**
 * Login Modal State Management Hook
 * 
 * Provides a simple way to control the login modal from anywhere in the app
 * without prop drilling or complex state management.
 * 
 * Usage:
 *   import { useLoginModal } from '@/hooks/useLoginModal';
 *   
 *   function MyComponent() {
 *     const { openLoginModal } = useLoginModal();
 *     return <Button onClick={openLoginModal}>Login</Button>;
 *   }
 */

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoginModalContextType {
  isOpen: boolean;
  redirectTo: string;
  openLoginModal: (redirectTo?: string) => void;
  closeLoginModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

/**
 * Provider component for login modal state
 * Wrap your app with this to enable login modal functionality
 */
export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState('/search');

  /**
   * Open the login modal
   * @param redirectPath - Optional path to redirect after successful login
   */
  const openLoginModal = (redirectPath = '/search') => {
    setRedirectTo(redirectPath);
    setIsOpen(true);
  };

  /**
   * Close the login modal
   */
  const closeLoginModal = () => {
    setIsOpen(false);
  };

  const value = {
    isOpen,
    redirectTo,
    openLoginModal,
    closeLoginModal,
  };

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
}

/**
 * Hook to access login modal state and controls
 * Must be used within LoginModalProvider
 */
export function useLoginModal(): LoginModalContextType {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
}
