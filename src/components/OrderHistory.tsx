import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { ChevronRight, PackageOpen, Truck, CheckCircle } from 'lucide-react';

// Define types for our order history data
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderDate: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  totalAmount: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

interface OrderHistoryProps {
  userId: string;
  tokenBalance?: number;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ userId, tokenBalance }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        // const response = await fetch(`/api/orders/user/${userId}`);
        // const data = await response.json();
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          const mockOrders: Order[] = [
            {
              id: "ORD-12345",
              orderDate: "2025-04-05T10:30:00",
              status: "Delivered",
              items: [
                {
                  product: {
                    id: 1,
                    name: "Whey Protein Powder",
                    price: 2499,
                    image: "https://placehold.co/300x300?text=Whey+Protein"
                  },
                  quantity: 2,
                  price: 2499
                },
                {
                  product: {
                    id: 8,
                    name: "Weightlifting Gloves",
                    price: 999,
                    image: "https://placehold.co/300x300?text=Lifting+Gloves"
                  },
                  quantity: 1,
                  price: 999
                }
              ],
              totalAmount: 5997,
              estimatedDelivery: "2025-04-02",
              trackingNumber: "TRK7890123"
            },
            {
              id: "ORD-12346",
              orderDate: "2025-03-22T14:15:00",
              status: "Shipped",
              items: [
                {
                  product: {
                    id: 5,
                    name: "Pre-Workout Energy Blend",
                    price: 1899,
                    image: "https://placehold.co/300x300?text=Pre-Workout"
                  },
                  quantity: 1,
                  price: 1899
                }
              ],
              totalAmount: 1899,
              estimatedDelivery: "2025-04-12",
              trackingNumber: "TRK7890124"
            },
            {
              id: "ORD-12347",
              orderDate: "2025-03-15T09:45:00",
              status: "Pending",
              items: [
                {
                  product: {
                    id: 12,
                    name: "Kettlebell 16kg",
                    price: 2499,
                    image: "https://placehold.co/300x300?text=Kettlebell"
                  },
                  quantity: 1,
                  price: 2499
                },
                {
                  product: {
                    id: 9,
                    name: "Foam Roller",
                    price: 1299,
                    image: "https://placehold.co/300x300?text=Foam+Roller"
                  },
                  quantity: 1,
                  price: 1299
                }
              ],
              totalAmount: 3798,
              estimatedDelivery: "2025-04-20"
            }
          ];
          
          setOrders(mockOrders);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load order history. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Function to render status icon based on order status
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
      case 'Processing':
        return <PackageOpen className="w-5 h-5 text-yellow-500" />;
      case 'Shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'Delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Cancelled':
        return <span className="w-5 h-5 text-red-500">✕</span>;
      default:
        return null;
    }
  };

  // Function to get status color class
  const getStatusColorClass = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      {tokenBalance !== undefined && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-xl mb-4">
            Token Balance: <span className="font-bold">₹{tokenBalance.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <Card key={order.id} className="w-full">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">Placed on {formatDate(order.orderDate)}</p>
                  </div>
                  <div className="mt-2 md:mt-0 flex items-center">
                    {getStatusIcon(order.status)}
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColorClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={`${order.id}-${item.product.id}-${index}`} className="flex flex-col items-center text-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg mb-2"
                        />
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-600">+{order.items.length - 3} more items</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row justify-between">
                  <div>
                    <p className="text-sm font-medium">Total: ₹{order.totalAmount.toLocaleString('en-IN')}</p>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-gray-600">
                        {order.status === 'Delivered' 
                          ? 'Delivered on ' 
                          : 'Est. delivery by '} 
                        {formatDate(order.estimatedDelivery)}
                      </p>
                    )}

                    {order.trackingNumber && order.status !== 'Delivered' && order.status !== 'Pending' && (
                      <p className="text-sm text-gray-600">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <div className="p-4 pt-0 flex justify-end">
                <Link to={`/order/${order.id}`}>
                  <button className="px-4 py-2 rounded-lg border border-gray-300 flex items-center hover:bg-gray-50">
                    View Details <ChevronRight className="ml-1 w-4 h-4" />
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;