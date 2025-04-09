import React from 'react';
import { Product } from '../types/product';
import { Card, CardContent } from './ui/card';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  tokenBalance: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, tokenBalance }) => {
  const canAddToCart = product.inStock && product.price <= tokenBalance;

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          <div className="flex flex-col items-end">
            <span className={`text-sm mb-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
            <button
              onClick={() => onAddToCart(product)}
              disabled={!canAddToCart}
              className={`px-4 py-2 rounded-lg transition-colors ${
                canAddToCart
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};