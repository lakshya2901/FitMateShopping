import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  
  Mail,
  ShoppingCart,
  Clock,
  
  Menu,
  X
} from 'lucide-react';

interface MainNavProps {
  cartItemCount: number;
  hasNewItems: boolean;
}

export const MainNav: React.FC<MainNavProps> = ({ cartItemCount, hasNewItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    
    { path: '/contact', icon: Mail, label: 'Contact' },
    { path: '/history', icon: Clock, label: 'Order History' },
  
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <nav className="bg-white shadow-md" role="navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-gray-800">
              FitMate
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">

          <NavLink
                
                to="/"
                className={({ isActive }) => `
                  flex items-center px-4 py-2 rounded-md text-sm font-medium
                  transition-all duration-300 ease-in-out
                  hover:scale-105 hover:bg-gray-100
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  min-h-[44px] min-w-[44px]
                  ${isActive ? 'text-blue-600 bg-blue-50 font-bold' : 'text-gray-600'}
                `}
              >
            
                <span>Home</span>
              </NavLink>
            
              <NavLink
                
                to="/history"
                className={({ isActive }) => `
                  flex items-center px-4 py-2 rounded-md text-sm font-medium
                  transition-all duration-300 ease-in-out
                  hover:scale-105 hover:bg-gray-100
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  min-h-[44px] min-w-[44px]
                  ${isActive ? 'text-blue-600 bg-blue-50 font-bold' : 'text-gray-600'}
                `}
              >
            
                <span>Order History</span>
              </NavLink>
            

            {/* Cart with Badge */}
            <NavLink
              to="/cart"
              className="relative flex items-center px-4 py-2 rounded-md text-sm font-medium
                transition-all duration-300 ease-in-out
                hover:scale-105 hover:bg-gray-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                min-h-[44px] min-w-[44px]"
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
              {hasNewItems && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              min-h-[44px] min-w-[44px]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col h-full py-6 space-y-2">
              {navItems.map(({ path, icon: Icon, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => `
                    flex items-center px-6 py-3 text-sm font-medium
                    transition-all duration-300 ease-in-out
                    hover:bg-gray-100
                    ${isActive ? 'text-blue-600 bg-blue-50 font-bold' : 'text-gray-600'}
                  `}
                  onClick={() => setIsOpen(false)}
                  aria-current={location.pathname === path ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              ))}

              {/* Mobile Cart Link */}
              <NavLink
                to="/cart"
                className="relative flex items-center px-6 py-3 text-sm font-medium text-gray-600
                  transition-all duration-300 ease-in-out hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
                aria-label={`Shopping cart with ${cartItemCount} items`}
              >
                <ShoppingCart className="w-5 h-5 mr-3" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};