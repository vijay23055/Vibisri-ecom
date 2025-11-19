import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, TrendingUp, Users, UserPlus, Mail, Phone } from 'lucide-react';

const AdminCustomers = () => {
  const { customers } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Mock customer data for demonstration since we don't have real customers yet
  const mockCustomers = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      totalOrders: 5,
      totalSpent: 2450,
      joinedAt: '2024-01-15T10:30:00Z',
      lastOrder: '2024-11-10T14:20:00Z'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      totalOrders: 3,
      totalSpent: 1800,
      joinedAt: '2024-03-22T09:15:00Z',
      lastOrder: '2024-11-08T16:45:00Z'
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      totalOrders: 8,
      totalSpent: 4200,
      joinedAt: '2023-11-05T11:20:00Z',
      lastOrder: '2024-11-12T13:30:00Z'
    }
  ];

  // Use mock data if no real customers exist
  const displayCustomers = customers.length > 0 ? customers.map(customer => ({
    ...customer,
    totalOrders: customer.totalOrders || 0,
    totalSpent: customer.totalSpent || 0,
    lastOrder: customer.lastOrder || customer.joinedAt
  })) : mockCustomers;

  const filteredDisplay = displayCustomers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  const totalRevenue = displayCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageOrderValue = displayCustomers.length > 0 ?
    displayCustomers.reduce((sum, customer) => sum + (customer.totalSpent / customer.totalOrders), 0) / displayCustomers.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
            <p className="text-gray-600 mt-1">Manage your customer database</p>
          </div>
          <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
            <Users className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-green-800">Total Customers</p>
              <p className="text-xl font-bold text-green-800">{displayCustomers.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm text-gray-500">From all customers</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{formatCurrency(averageOrderValue)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm text-gray-500">Per customer order</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {displayCustomers.filter(c => c.totalOrders > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm text-gray-500">Made at least one order</span>
          </div>
        </div>
      </div>

      {/* Search and Customers Table */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredDisplay.length} of {displayCustomers.length} customers
          </div>
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredDisplay.length > 0 ? (
                filteredDisplay.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                          <span className="text-gray-600 font-medium">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{customer.name}</p>
                          <p className="text-sm text-gray-500">ID: {customer.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-800">{customer.totalOrders}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-800">{formatCurrency(customer.totalSpent)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600">
                        {formatDate(customer.joinedAt)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-600">
                        {customer.lastOrder ? formatDate(customer.lastOrder) : 'Never'}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500">No customers found</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {searchTerm ? 'Try adjusting your search terms' : 'Customers will appear here when they register or make purchases'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
