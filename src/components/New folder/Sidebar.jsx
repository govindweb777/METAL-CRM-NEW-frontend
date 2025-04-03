import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  UserPlus,
  Contact2,
  Image,
  ListTodo,
  DollarSign,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('accountType') || '{}');
  console.log(userInfo);

  const menuItems = {
    SuperAdmin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'User Management', icon: Users, path: '/user-management' },
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Customers', icon: Contact2, path: '/customers' },
      // { name: 'Gallery', icon: Image, path: '/gallery' },
      // { name: 'Work Queue', icon: ListTodo, path: '/work-queue' },
      { name: 'Financial', icon: DollarSign, path: '/financial' }
    ],
    Admin: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Customers', icon: Contact2, path: '/customers' },
      // { name: 'Gallery', icon: Image, path: '/gallery' },
      // { name: 'Work Queue', icon: ListTodo, path: '/work-queue' },
      { name: 'Financial', icon: DollarSign, path: '/financial' }
    ],
    Graphics: [
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Customers', icon: Contact2, path: '/customers' },
      { name: 'Gallery', icon: Image, path: '/gallery' },
      // { name: 'Work Queue', icon: ListTodo, path: '/work-queue' }
    ],
    Display: [
      { name: 'Orders', icon: FileText, path: '/orders' },
      // { name: 'Work Queue', icon: ListTodo, path: '/work-queue' }
    ],
    Accounts: [
      { name: 'Orders', icon: FileText, path: '/orders' },
      { name: 'Accounts', icon: DollarSign, path: '/accounts' }
    ]
  };

  const currentUserMenu = menuItems[userInfo] || [];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accountType');
    navigate('/login');
  };


  return (
    <div className="w-64 bg-gray-900 shadow-lg h-screen flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
          <h1 className="text-2xl font-bold text-indigo-400">{userInfo}</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {currentUserMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-200' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center py-3 text-sm font-medium text-white rounded-lg hover:bg-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
