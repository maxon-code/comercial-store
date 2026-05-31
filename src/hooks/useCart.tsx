import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  totalItemsCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (productId) => set((state) => {
        const existingItem = state.cartItems.find((item) => item.id === productId);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cartItems: [...state.cartItems, { id: productId, quantity: 1 }] };
      }),

      updateQuantity: (productId, newQuantity) => set((state) => {
        if (newQuantity <= 0) {
          return { cartItems: state.cartItems.filter((item) => item.id !== productId) };
        }
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        };
      }),

      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId),
      })),

      // Функция динамического подсчета количества
      totalItemsCount: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'shopping_cart', // Имя ключа в localStorage
    }
  )
);