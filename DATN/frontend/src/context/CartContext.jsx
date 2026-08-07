import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('camera_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('camera_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find(item => item.id === product.id && item.selectedColor === product.selectedColor);
    if (existing) toast.info(`Đã tăng số lượng "${product.name}" trong giỏ!`);
    else toast.success(`Đã thêm "${product.name}" vào giỏ!`);

    setCart(prev => {
      const isExist = prev.find(item => item.id === product.id && item.selectedColor === product.selectedColor);
      if (isExist) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === product.selectedColor) 
            ? { ...item, qty: item.qty + quantity } 
            : item
        );
      }
      return [...prev, { ...product, qty: quantity }];
    });
  };

  const updateQty = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + amount;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id, color) => {
    if(window.confirm("Bỏ sản phẩm này khỏi giỏ hàng?")) {
      setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color)));
    }
  };

  // NÂNG CẤP: Chỉ xóa những sản phẩm đã được thanh toán thành công
  const clearSelectedItems = (selectedItems) => {
    setCart(prev => prev.filter(cartItem => 
      !selectedItems.some(selItem => selItem.id === cartItem.id && selItem.selectedColor === cartItem.selectedColor)
    ));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, clearSelectedItems, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};