import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Layout/Sidebar';
import Header from './Layout/Header';
import HomePageManager from "./Sections/HomePageManager";
import Services from './Sections/Services';
import Packages from './Sections/Packages';
import Orders from './Sections/Orders';
import Team from './Sections/Team';
import Reviews from './Sections/Reviews';
import Portfolio from './Sections/Portfolio';
import Messages from './Sections/Messages';
import ContactInfo from './Sections/ContactInfo';
import ReviewsStatsManager from './Sections/ReviewsStatsManager';
import { supabase } from '../utils/supabase';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem('activeAdminSection');
    return savedSection || 'home';
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('activeAdminSection', activeSection);
  }, [activeSection]);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-sm w-full mx-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getSectionTitle = () => {
    const titles = {
      'home': 'Home Content',
      'services': 'Services',
      'packages': 'Packages',
      'orders': 'Orders',
      'team': 'Team',
      'reviews': 'Reviews',
      'reviews-stats': 'Reviews Stats',
      'portfolio': 'Portfolio',
      'messages': 'Messages',
      'contact': 'Contact Info'
    };
    return titles[activeSection as keyof typeof titles] || 'Dashboard';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePageManager />;
      case 'services':
        return <Services />;
      case 'packages':
        return <Packages />;
      case 'orders':
        return <Orders />;
      case 'team':
        return <Team />;
      case 'reviews':
        return <Reviews />;
      case 'reviews-stats':
        return <ReviewsStatsManager />;
      case 'portfolio':
        return <Portfolio />;
      case 'messages':
        return <Messages />;
      case 'contact':
        return <ContactInfo />;
      default:
        return <HomePageManager />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 ml-64">
        <Header title={getSectionTitle()} />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;