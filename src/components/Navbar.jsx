// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// function Navbar() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("token");
//   const BASE_URL = import.meta.env.VITE_BASE_URL;
  
//   const [notifications, setNotifications] = useState([
//     { id: 1, text: 'New lead assigned to you', time: '10m ago' },
//     { id: 2, text: 'Meeting with Client XYZ', time: '1h ago' },
//     { id: 3, text: 'Task deadline approaching', time: '3h ago' }
//   ]);
//   const [showNotifications, setShowNotifications] = useState(false);

//   // Fetch user details
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!token) return;

//       try {
//         const response = await axios.get(`${BASE_URL}/api/v1/auth/getUser`, {
//           headers: { Authorization: `${token}` },
//         });
//         setUser(response.data);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to fetch user details");
//       }
//     };

//     fetchUser();
//   }, [token]);

//   const firstLetter = user?.firstName ? user.firstName.charAt(0).toUpperCase() : '?';

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-gray-900">CRM</h1>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button 
//                 onClick={() => setShowNotifications(!showNotifications)} 
//                 className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
//               >
//                 <div className="relative">
//                   <BellIcon className="h-6 w-6" />
//                   <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">{notifications.length}</span>
//                 </div>
//               </button>
//               {showNotifications && (
//                 <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
//                   <div className="px-4 py-2 border-b border-gray-200">
//                     <p className="text-sm font-medium text-gray-700">Notifications</p>
//                   </div>
//                   {notifications.map((notification) => (
//                     <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
//                       <p className="text-sm text-gray-700">{notification.text}</p>
//                       <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
//                     </div>
//                   ))}
//                   <div className="px-4 py-2 border-t border-gray-200 text-center">
//                     <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</button>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             <button 
//               className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
//               onClick={() => navigate('/settings')}
//             >
//               <Cog6ToothIcon className="h-6 w-6" />
//             </button>
            
//             <div className="relative">
//               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-700 font-bold text-lg cursor-pointer">
//                 {firstLetter}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, Cog6ToothIcon, Bars3Icon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New lead assigned to you', time: '10m ago' },
    { id: 2, text: 'Meeting with Client XYZ', time: '1h ago' },
    { id: 3, text: 'Task deadline approaching', time: '3h ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${BASE_URL}/api/v1/auth/getUser`, {
          headers: { Authorization: `${token}` },
        });
        setUser(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch user details");
      }
    };

    fetchUser();
  }, [token]);

  const firstLetter = user?.firstName ? user.firstName.charAt(0).toUpperCase() : '?';

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 lg:hidden"
              onClick={toggleSidebar}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 ml-2">CRM</h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative notifications-container">
              <button 
                onClick={() => setShowNotifications(!showNotifications)} 
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="relative">
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">{notifications.length}</span>
                </div>
              </button>
              {showNotifications && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 sm:w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700">Notifications</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <p className="text-sm text-gray-700">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 text-center">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</button>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate('/settings')}
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 text-gray-700 font-bold text-base sm:text-lg cursor-pointer">
                {firstLetter}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;