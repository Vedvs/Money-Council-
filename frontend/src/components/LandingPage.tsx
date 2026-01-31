import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Money Council
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your AI-powered financial advisor that analyzes your income, expenses, and goals 
            to provide personalized financial guidance and scenario planning.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/auth"
              className="block w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/dashboard"
              className="block w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition duration-200"
            >
              Try Demo
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
            <p className="text-gray-600">
              AI-powered analysis of your financial data to identify patterns and opportunities
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Goal Planning</h3>
            <p className="text-gray-600">
              Set and track financial goals with personalized recommendations
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-3xl mb-4">🔮</div>
            <h3 className="text-xl font-semibold mb-2">Scenario Modeling</h3>
            <p className="text-gray-600">
              Compare different financial paths and see the impact of your decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
