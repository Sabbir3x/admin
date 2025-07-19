import React from 'react';
import { Bell, User, Search, Calendar, Clock } from 'lucide-react';

interface HeaderProps {
  title: string;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSearch }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {title}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {currentDate}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {currentTime}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full text-sm w-64 focus:outline-none focus:bg-white focus:shadow-md focus:w-80 transition-all duration-200"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        
        <button className="relative bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
          <Bell className="w-5 h-5 text-gray-600" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>
        
        <button className="bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;