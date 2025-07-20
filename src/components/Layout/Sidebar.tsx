import React from 'react';
import { 
  Home, 
  Globe, 
  Package, 
  Users, 
  Star, 
  Briefcase, 
  Mail, 
  Settings,
  ShoppingCart,
  LogOut
} from 'lucide-react';
import { supabase } from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home Content', icon: Home },
  { id: 'services', label: 'Services', icon: Globe },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'reviews-stats', label: 'Reviews Stats', icon: Star },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'contact', label: 'Contact Info', icon: Settings }
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('access_token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-white border-r border-gray-200 h-screen fixed left-0 top-0 w-64 z-50 flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              Minimind
            </div>
            <div className="text-xs text-gray-500">
              Admin Panel
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="py-4 flex-1 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium ${
                activeSection === item.id 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}
      </nav>
      
      {/* Logout */}
      <div className="p-3 border-t border-gray-200">
        <div 
          onClick={handleLogout} 
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 transition-all duration-200 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;