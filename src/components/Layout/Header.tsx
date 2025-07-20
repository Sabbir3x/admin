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
    <div className="bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <Calendar className="w-3 h-3" />
              {currentDate}
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <Clock className="w-3 h-3" />
              {currentTime}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        
        <button className="relative bg-gray-50 hover:bg-gray-100 rounded-lg w-10 h-10 flex items-center justify-center transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <Bell className="w-4 h-4 text-gray-600" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>
        
        <button className="bg-gray-50 hover:bg-gray-100 rounded-lg w-10 h-10 flex items-center justify-center transition-all duration-200 border border-gray-200 hover:border-gray-300">
          <User className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Header;