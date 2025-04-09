import  { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { MainNav } from "../../components/MainNav";
import { ProductCard } from "../../components/ProductCard";
import { CartPage } from "../../components/CartPage";
import { CheckoutPage } from "../../components/CheckoutPage";
import { products } from "../../data/products";
import { Product, CartItem } from "../../types/product";
import {OrderHistory} from "../../components/OrderHistory";

export const Box = (): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tokenBalance, setTokenBalance] = useState(20000); // Initial balance of ₹20,000
  const [hasNewItems, setHasNewItems] = useState(false);
  const username = "John Doe";

  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    if (product.price > tokenBalance) return;
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    setHasNewItems(true);
  };

  const handleUpdateQuantity = (productId: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    if (cartTotal <= tokenBalance) {
      setTokenBalance(prev => prev - cartTotal);
      setCartItems([]);
      setHasNewItems(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <MainNav cartItemCount={cartItemCount} hasNewItems={hasNewItems} />
        
        <Routes>
          <Route path="/" element={
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    tokenBalance={tokenBalance}
                  />
                ))}
              </div>
            </main>
          } />
          <Route path="/history" element={
            <OrderHistory
              userId={username}
              tokenBalance={tokenBalance}
              
            />
          } />
          <Route path="/cart" element={
            <CartPage
              cartItems={cartItems}
              tokenBalance={tokenBalance}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          } />
          <Route path="/checkout" element={
            <CheckoutPage
              cartItems={cartItems}
              tokenBalance={tokenBalance}
              onCompleteCheckout={handleCheckout}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
};