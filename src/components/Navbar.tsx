import React from 'react';
import { ShoppingCart, User, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  cartTotal: number;
  username: string;
  tokenBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartTotal, username, tokenBalance }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">FitMate Shopping</Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">₹{tokenBalance.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">{username}</span>
            </div>
            <Link to="/cart" className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800">₹{cartTotal.toLocaleString('en-IN')}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};