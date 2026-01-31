import React from 'react';
import { Link } from 'react-router-dom';

const ScenarioPage: React.FC = () => {
  const currentPath = {
    monthlyIncome: 50000,
    expenses: 35000,
    savings: 15000,
    netWorth3Months: 145500
  };

  const optimizedPath = {
    monthlyIncome: 50000,
    expenses: 31000,
    savings: 19000,
    netWorth3Months: 245000
  };

  const improvements = [
    { category: 'Entertainment', current: 3000, optimized: 2400, savings: 600 },
    { category: 'Food', current: 8000, optimized: 6500, savings: 1500 },
    { category: 'Transportation', current: 5000, optimized: 4000, savings: 1000 },
    { category: 'Utilities', current: 2000, optimized: 1800, savings: 200 }
  ];

  const totalMonthlySavings = improvements.reduce((sum, item) => sum + item.savings, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Scenario Comparison</h1>
          <p className="mt-2 text-gray-600">Compare your current financial path with an optimized strategy</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="text-green-600 text-2xl mr-4">✨</div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Potential Monthly Savings: ₹{totalMonthlySavings.toLocaleString()}</h3>
              <p className="text-green-700">Additional ₹{(totalMonthlySavings * 12).toLocaleString()} annually</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current Path</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Monthly Income:</span>
                <span className="font-semibold">₹{currentPath.monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Expenses:</span>
                <span className="font-semibold text-red-600">-₹{currentPath.expenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Savings:</span>
                <span className="font-semibold text-green-600">₹{currentPath.savings.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-medium">3-Month Net Worth:</span>
                  <span className="font-bold text-lg">₹{currentPath.netWorth3Months.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border-2 border-green-500">
            <h2 className="text-xl font-semibold mb-4">Optimized Path</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Monthly Income:</span>
                <span className="font-semibold">₹{optimizedPath.monthlyIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Expenses:</span>
                <span className="font-semibold text-green-600">-₹{optimizedPath.expenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Savings:</span>
                <span className="font-semibold text-green-600">₹{optimizedPath.savings.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-medium">3-Month Net Worth:</span>
                  <span className="font-bold text-lg text-green-600">₹{optimizedPath.netWorth3Months.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Optimization Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Current</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Optimized</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Savings</th>
                </tr>
              </thead>
              <tbody>
                {improvements.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2 text-sm font-medium">{item.category}</td>
                    <td className="px-4 py-2 text-sm">₹{item.current.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-green-600">₹{item.optimized.toLocaleString()}</td>
                    <td className="px-4 py-2 text-sm text-green-600 font-semibold">₹{item.savings.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-4 py-2 text-sm">Total</td>
                  <td className="px-4 py-2 text-sm">-</td>
                  <td className="px-4 py-2 text-sm">-</td>
                  <td className="px-4 py-2 text-sm text-green-600">₹{totalMonthlySavings.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">3-Month Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">₹99,500</div>
              <div className="text-sm text-gray-600">Additional Net Worth</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">18%</div>
              <div className="text-sm text-gray-600">Higher Savings Rate</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">1.1 years</div>
              <div className="text-sm text-gray-600">Faster Debt Freedom</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to="/dashboard"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/profile"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Update Strategy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;
