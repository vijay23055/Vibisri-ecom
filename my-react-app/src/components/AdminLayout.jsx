import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Package, ShoppingCart, Users, Home, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      path: '/admin/products',
      label: 'Products',
      icon: Package,
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      path: '/admin/orders',
      label: 'Orders',
      icon: ShoppingCart,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      path: '/admin/customers',
      label: 'Customers',
      icon: Users,
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  const handleLogout = () => {
    // You can implement proper logout logic here
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      {/* Sidebar */}
      <div className="w-68 bg-white shadow-2xl border-r border-gray-200/60 backdrop-blur-xl">
        {/* Header */}
        <div className="p-8 border-b border-gray-200/80">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Vibishri</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`group flex items-center px-5 py-4 rounded-2xl transition-all duration-300 transform ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl scale-105`
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white hover:text-gray-900 hover:shadow-lg hover:scale-102 border border-transparent hover:border-gray-200/60'
                  }`}
                >
                  <div className={`p-2 rounded-xl mr-4 ${
                    isActive(item.path)
                      ? 'bg-white/20'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-white'
                  }`}>
                    <item.icon className={`w-5 h-5 ${
                      isActive(item.path) ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`} />
                  </div>
                  <span className="font-semibold tracking-wide">{item.label}</span>
                  {isActive(item.path) && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-68 p-6 border-t border-gray-200/80 bg-gradient-to-t from-white to-transparent">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-5 py-3 text-gray-600 rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-700 transition-all duration-200 transform hover:scale-102 border border-transparent hover:border-red-200/60"
          >
            <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-xl mr-4 group-hover:from-red-200 group-hover:to-red-300">
              <LogOut className="w-4 h-4 text-red-600" />
            </div>
            <span className="font-semibold tracking-wide">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/60 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-600 mt-1 font-medium">
                Manage your {menuItems.find(item => isActive(item.path))?.label.toLowerCase() || 'dashboard'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-2xl border border-green-200/50">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">All systems operational</span>
              </div>
              <Link
                to="/"
                className="flex items-center px-5 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-2xl font-semibold hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 transform hover:scale-105 border border-indigo-200/60 shadow-lg"
              >
                <Home className="w-5 h-5 mr-3" />
                View Store
              </Link>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
