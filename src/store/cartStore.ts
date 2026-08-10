import { create } from 'zustand';
import { Product, ProductColor, MonogramConfig, CartItem } from '../types';

interface CartState {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, selectedColor: ProductColor, quantity: number, monogram?: MonogramConfig) => void;
  updateQuantity: (index: number, newQty: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),
  
  addToCart: (product, selectedColor, quantity, monogram) => set((state) => {
    const existingIndex = state.cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor.name === selectedColor.name &&
        JSON.stringify(item.monogram) === JSON.stringify(monogram)
    );

    let newItems;
    if (existingIndex > -1) {
      newItems = [...state.cartItems];
      newItems[existingIndex].quantity += quantity;
    } else {
      newItems = [...state.cartItems, { product, selectedColor, quantity, monogram }];
    }
    
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    return { cartItems: newItems, isCartOpen: true };
  }),
  
  updateQuantity: (index, newQty) => set((state) => {
    const newItems = [...state.cartItems];
    newItems[index].quantity = newQty;
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    return { cartItems: newItems };
  }),
  
  removeItem: (index) => set((state) => {
    const newItems = state.cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cartItems', JSON.stringify(newItems));
    return { cartItems: newItems };
  }),
  
  clearCart: () => {
    localStorage.setItem('cartItems', '[]');
    set({ cartItems: [] });
  }
}));
