import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 gap-8 ml-2 mr-2">
          <div className="text-2xl font-bold">Prediction App</div>
          <div className="text-2xl space-x-4">
            <Link to="/features" className="hover:text-blue-200 transition-colors">
              Features
            </Link>
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
