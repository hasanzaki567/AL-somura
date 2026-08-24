import { create } from 'zustand';
import { Product } from '../types';

interface WishlistState {
  wishlistItems: Product[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistItems: JSON.parse(localStorage.getItem('wishlistItems') || '[]'),
  isWishlistOpen: false,

  setIsWishlistOpen: (open) => set({ isWishlistOpen: open }),

  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlistItems.some((item) => item.id === product.id);
    let updated: Product[];
    if (exists) {
      updated = state.wishlistItems.filter((item) => item.id !== product.id);
    } else {
      updated = [...state.wishlistItems, product];
    }
    localStorage.setItem('wishlistItems', JSON.stringify(updated));
    return { wishlistItems: updated };
  }),

  isInWishlist: (productId) => {
    return get().wishlistItems.some((item) => item.id === productId);
  },

  removeItem: (productId) => set((state) => {
    const updated = state.wishlistItems.filter((item) => item.id !== productId);
    localStorage.setItem('wishlistItems', JSON.stringify(updated));
    return { wishlistItems: updated };
  }),

  clearWishlist: () => {
    localStorage.setItem('wishlistItems', '[]');
    set({ wishlistItems: [] });
  },
}));
