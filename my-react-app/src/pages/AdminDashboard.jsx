import React from 'react';
import { useShop } from '../context/ShopContext';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
  const {
    getTotalRevenue,
    getTotalSales,
    getTotalProducts,
    getTotalCustomers,
    orders,
    products
  } = useShop();

  const totalRevenue = getTotalRevenue();
  const totalSales = getTotalSales();
  const totalProducts = getTotalProducts();
  const totalCustomers = getTotalCustomers();

  // Mock data for demonstration - in a real app, you'd calculate these from actual data
  const monthlyRevenue = 45230;
  const previousMonthRevenue = 38910;
  const revenueChange = ((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1);

  const monthlySales = 89;
  const previousMonthSales = 76;
  const salesChange = ((monthlySales - previousMonthSales) / previousMonthSales * 100).toFixed(1);

  const lowStockProducts = products.filter(product => product.quantity && product.quantity[0] <= 10).length;

  const recentOrders = orders.slice(0, 5);

  const statsCards = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive',
      description: 'vs last month'
    },
    {
      title: 'Total Sales',
      value: totalSales.toString(),
      icon: ShoppingBag,
      change: '+8.2%',
      changeType: 'positive',
      description: 'vs last month'
    },
    {
      title: 'Products',
      value: totalProducts.toString(),
      icon: Package,
      change: `${lowStockProducts} low stock`,
      changeType: 'warning',
      description: 'items in inventory'
    },
    {
      title: 'Customers',
      value: totalCustomers.toString(),
      icon: Users,
      change: '+15.3%',
      changeType: 'positive',
      description: 'registered users'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl p-8 border border-gray-200/60">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Good morning!</h1>
            <p className="text-gray-600 mt-2 text-lg">Here's what's happening with your store today.</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Last updated</span>
            </div>
            <p className="text-lg font-bold text-gray-800 mt-3">
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const gradientColors = [
            'from-emerald-400 to-teal-500',
            'from-blue-400 to-indigo-500',
            'from-purple-400 to-pink-500',
            'from-orange-400 to-red-500'
          ];
          const bgColors = [
            'bg-gradient-to-br from-emerald-50 to-teal-50',
            'bg-gradient-to-br from-blue-50 to-indigo-50',
            'bg-gradient-to-br from-purple-50 to-pink-50',
            'bg-gradient-to-br from-orange-50 to-red-50'
          ];
          return (
            <div key={index} className={`${bgColors[index % bgColors.length]} rounded-3xl shadow-xl p-8 border border-gray-200/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-3">{stat.value}</p>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${gradientColors[index % gradientColors.length]} rounded-2xl flex items-center justify-center shadow-lg transform rotate-3`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="flex items-center">
                {stat.changeType === 'positive' ? (
                  <div className="flex items-center bg-green-100 px-3 py-1 rounded-full mr-3">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                ) : stat.changeType === 'negative' ? (
                  <div className="flex items-center bg-red-100 px-3 py-1 rounded-full mr-3">
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  </div>
                ) : (
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full mr-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className={`text-sm font-bold ${
                    stat.changeType === 'positive' ? 'text-green-700' :
                    stat.changeType === 'negative' ? 'text-red-700' : 'text-yellow-700'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{stat.description}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl p-8 border border-gray-200/60">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Recent Orders</h2>
            <p className="text-gray-600 mt-1">Latest order activity</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-2xl font-medium hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 border border-indigo-200/50">
            View all
          </button>
        </div>

        {recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200/80">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase text-sm tracking-wider">Order ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase text-sm tracking-wider">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase text-sm tracking-wider">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase text-sm tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 uppercase text-sm tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={order.id} className="border-b border-gray-100/80 hover:bg-white/80 transition-all duration-200">
                    <td className="py-5 px-6">
                      <span className="font-bold text-gray-800 text-lg">#{order.id.slice(-6)}</span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="font-medium text-gray-800">{order.customerName || 'Customer'}</div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xl font-bold text-gray-800">₹{order.totalAmount}</span>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center px-4 py-2 text-xs font-bold rounded-full ${
                        order.status === 'completed' ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200' :
                        order.status === 'pending' ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200' :
                        order.status === 'cancelled' ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200' :
                        'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-gray-600 font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">Orders will appear here when customers make purchases. Get ready for your first sale!</p>
          </div>
        )}
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts > 0 && (
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/60 rounded-3xl shadow-xl p-8 backdrop-blur-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="ml-6 flex-1">
              <h3 className="text-lg font-bold text-amber-800 mb-2">⚠️ Low Stock Alert</h3>
              <p className="text-amber-700 font-medium mb-4">
                {lowStockProducts} product{lowStockProducts > 1 ? 's' : ''} {lowStockProducts === 1 ? 'is' : 'are'} running low on stock.
                Time to restock your inventory to keep sales flowing smoothly!
              </p>
              <div className="flex items-center space-x-4">
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-2xl font-bold hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <Package className="w-4 h-4 mr-2" />
                  View Products
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-white/80 text-amber-700 rounded-xl font-medium hover:bg-white transition-all duration-200 border border-amber-200/60">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
