'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
};

type CartItem = Product & { quantidade: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantidade: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.findIndex(item => item.id === product.id);
      
      if (existing !== -1) {
        return current.map((item, index) =>
          index === existing ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...current, { ...product, quantidade: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantidade: number) => {
    if (quantidade < 1) return;
    setCart(current =>
      current.map(item =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};