import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">Prediction App</div>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link to="/results" className="hover:text-blue-200 transition-colors">
              Results
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
