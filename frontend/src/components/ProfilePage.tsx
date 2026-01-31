import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FinancialData {
  monthlyIncome: number;
  expenses: {
    housing: number;
    food: number;
    transportation: number;
    entertainment: number;
    utilities: number;
    other: number;
  };
  debts: {
    creditCards: number;
    studentLoans: number;
    carLoan: number;
    other: number;
  };
  goals: {
    emergencyFund: number;
    retirement: number;
    houseDownPayment: number;
    other: string;
  };
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

const ProfilePage: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    monthlyIncome: 50000,
    expenses: {
      housing: 15000,
      food: 8000,
      transportation: 5000,
      entertainment: 3000,
      utilities: 2000,
      other: 2000
    },
    debts: {
      creditCards: 5000,
      studentLoans: 50000,
      carLoan: 200000,
      other: 0
    },
    goals: {
      emergencyFund: 100000,
      retirement: 1000000,
      houseDownPayment: 500000,
      other: ''
    },
    riskTolerance: 'moderate'
  });

  const [selectedPersona, setSelectedPersona] = useState<string>('');

  const personas = [
    {
      name: '₹20k Student',
      data: {
        monthlyIncome: 20000,
        expenses: { housing: 5000, food: 4000, transportation: 2000, entertainment: 1500, utilities: 1000, other: 500 },
        debts: { creditCards: 1000, studentLoans: 100000, carLoan: 0, other: 0 },
        goals: { emergencyFund: 30000, retirement: 500000, houseDownPayment: 200000, other: '' },
        riskTolerance: 'conservative' as const
      }
    },
    {
      name: '₹50k Salaried',
      data: {
        monthlyIncome: 50000,
        expenses: { housing: 15000, food: 8000, transportation: 5000, entertainment: 3000, utilities: 2000, other: 2000 },
        debts: { creditCards: 5000, studentLoans: 50000, carLoan: 200000, other: 0 },
        goals: { emergencyFund: 100000, retirement: 1000000, houseDownPayment: 500000, other: '' },
        riskTolerance: 'moderate' as const
      }
    },
    {
      name: '₹35k Freelancer',
      data: {
        monthlyIncome: 35000,
        expenses: { housing: 10000, food: 6000, transportation: 4000, entertainment: 2500, utilities: 1500, other: 1000 },
        debts: { creditCards: 3000, studentLoans: 0, carLoan: 150000, other: 0 },
        goals: { emergencyFund: 75000, retirement: 800000, houseDownPayment: 400000, other: '' },
        riskTolerance: 'aggressive' as const
      }
    }
  ];

  const loadPersona = (persona: typeof personas[0]) => {
    setFinancialData(persona.data);
    setSelectedPersona(persona.name);
  };

  const handleInputChange = (category: keyof FinancialData, field: string, value: string | number) => {
    setFinancialData(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object' 
        ? { ...prev[category], [field]: value }
        : value
    }));
  };

  const totalExpenses = Object.values(financialData.expenses).reduce((sum, val) => sum + val, 0);
  const totalDebts = Object.values(financialData.debts).reduce((sum, val) => sum + val, 0);
  const monthlySavings = financialData.monthlyIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Profile</h1>
          <p className="mt-2 text-gray-600">Enter your financial information to get personalized advice</p>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Start - Demo Personas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {personas.map((persona) => (
              <button
                key={persona.name}
                onClick={() => loadPersona(persona)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPersona === persona.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{persona.name}</div>
                <div className="text-sm text-gray-600 mt-1">Click to load sample data</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Income Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (₹)
                </label>
                <input
                  type="number"
                  value={financialData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome' as any, '', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
              <div className="space-y-4">
                {Object.entries(financialData.expenses).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()} (₹)
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleInputChange('expenses', key, Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total Expenses:</span>
                    <span>₹{totalExpenses.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Debts</h2>
              <div className="space-y-4">
                {Object.entries(financialData.debts).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()} (₹)
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleInputChange('debts', key, Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total Debts:</span>
                    <span>₹{totalDebts.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Financial Goals</h2>
              <div className="space-y-4">
                {Object.entries(financialData.goals).map(([key, value]) => (
                  key !== 'other' && (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()} (₹)
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleInputChange('goals', key, Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Risk Tolerance</h2>
              <div className="space-y-2">
                {['conservative', 'moderate', 'aggressive'].map((risk) => (
                  <label key={risk} className="flex items-center">
                    <input
                      type="radio"
                      value={risk}
                      checked={financialData.riskTolerance === risk}
                      onChange={(e) => handleInputChange('riskTolerance' as any, '', e.target.value)}
                      className="mr-2"
                    />
                    <span className="capitalize">{risk}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-gray-600">Monthly Income:</span>
              <span className="ml-2 font-semibold">₹{financialData.monthlyIncome.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Monthly Expenses:</span>
              <span className="ml-2 font-semibold">₹{totalExpenses.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Monthly Savings:</span>
              <span className={`ml-2 font-semibold ${monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{monthlySavings.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
