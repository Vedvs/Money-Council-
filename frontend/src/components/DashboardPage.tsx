import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const monthlyIncome = 50000;
  const expenses = {
    housing: 15000,
    food: 8000,
    transportation: 5000,
    entertainment: 3000,
    utilities: 2000,
    other: 2000
  };
  
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const monthlySavings = monthlyIncome - totalExpenses;
  const savingsRate = ((monthlySavings / monthlyIncome) * 100).toFixed(1);

  const actionPlan = [
    "Reduce entertainment expenses by 20% to save an additional ₹600/month",
    "Set up automatic transfer of ₹10,000 to emergency fund",
    "Consider refinancing car loan to potentially save ₹1,500/month",
    "Increase retirement contribution by 5% when income increases"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="mt-2 text-gray-600">Your personalized financial insights and recommendations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                <div className="text-green-600 text-xl">💰</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">₹{monthlyIncome.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-3">
                <div className="text-red-600 text-xl">💳</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <div className="text-blue-600 text-xl">📈</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Savings</p>
                <p className={`text-2xl font-bold ${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{monthlySavings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                <div className="text-purple-600 text-xl">📊</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                <p className="text-2xl font-bold text-gray-900">{savingsRate}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
            <div className="space-y-3">
              {Object.entries(expenses).map(([category, amount]) => {
                const percentage = ((amount / totalExpenses) * 100).toFixed(1);
                return (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-gray-600">₹{amount.toLocaleString()} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Savings & Debt Summary</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-900">Emergency Fund</h3>
                <p className="text-sm text-gray-600">Target: ₹100,000</p>
                <p className="text-sm text-gray-600">Current: ₹45,000 (45%)</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-medium text-gray-900">Total Debt</h3>
                <p className="text-sm text-gray-600">Outstanding: ₹255,000</p>
                <p className="text-sm text-gray-600">Monthly Payment: ₹8,500</p>
                <p className="text-sm text-green-600">On track for payoff in 3.2 years</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">Retirement</h3>
                <p className="text-sm text-gray-600">Target: ₹1,000,000</p>
                <p className="text-sm text-gray-600">Current: ₹125,000 (12.5%)</p>
                <p className="text-sm text-blue-600">On track for retirement at 65</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">This Month's Action Plan</h2>
          <div className="space-y-3">
            {actionPlan.map((action, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 text-xs font-semibold">{index + 1}</span>
                </div>
                <p className="text-gray-700">{action}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to="/profile"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
          >
            Update Profile
          </Link>
          <Link
            to="/scenario"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            View Scenarios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
