import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Dataset } from '@/data/datasets';

interface CartItem {
  dataset: Dataset;
  addedAt: Date;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (dataset: Dataset) => void;
  removeFromCart: (datasetId: string) => void;
  clearCart: () => void;
  isInCart: (datasetId: string) => boolean;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'datanexus_cart';

/**
 * Provider component for cart state management
 * Persists cart data to localStorage
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        })));
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }, [items]);

  const addToCart = (dataset: Dataset) => {
    setItems((prev) => {
      // Check if already in cart
      if (prev.some((item) => item.dataset.id === dataset.id)) {
        return prev;
      }
      return [...prev, { dataset, addedAt: new Date() }];
    });
  };

  const removeFromCart = (datasetId: string) => {
    setItems((prev) => prev.filter((item) => item.dataset.id !== datasetId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const isInCart = (datasetId: string) => {
    return items.some((item) => item.dataset.id === datasetId);
  };

  const itemCount = items.length;

  const value = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to access cart state and operations
 * Must be used within CartProvider
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
