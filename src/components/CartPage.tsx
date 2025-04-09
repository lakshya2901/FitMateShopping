import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types/product';
import { Card, CardContent } from './ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartPageProps {
  cartItems: CartItem[];
  tokenBalance: number;
  onUpdateQuantity: (productId: number, change: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  tokenBalance,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const navigate = useNavigate();
  const cartTotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const canCheckout = cartTotal <= tokenBalance && cartItems.length > 0;

  const handleProceedToCheckout = () => {
    if (canCheckout) {
      navigate('/checkout');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-xl mb-4">
          Token Balance: <span className="font-bold">₹{tokenBalance.toLocaleString('en-IN')}</span>
        </div>
        <div className="text-xl mb-4">
          Cart Total: <span className="font-bold">₹{cartTotal.toLocaleString('en-IN')}</span>
        </div>
        {cartTotal > tokenBalance && (
          <div className="text-red-600 mb-4">
            Insufficient balance! Remove some items to proceed.
          </div>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.product.id} className="w-full">
                <CardContent className="p-4 flex items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">₹{item.product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleProceedToCheckout}
              disabled={!canCheckout}
              className={`px-6 py-3 rounded-lg ${
                canCheckout
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};