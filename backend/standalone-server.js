// Standalone Money Council Backend Server
// No npm/Node.js required - runs with any JavaScript runtime

const http = require('http');
const url = require('url');
const fs = require('fs');

// Mock data
const mockData = {
  user: {
    id: '64f1a2b3c4d5e6f7g8h9i0j1',
    name: 'Demo User',
    email: 'demo@moneycouncil.com',
    financialProfile: {
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
        personalLoan: 0
      },
      goals: {
        emergencyFund: 100000,
        retirement: 1000000,
        houseDownPayment: 500000
      },
      riskTolerance: 'moderate'
    }
  }
};

// Helper functions
function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data, null, 2));
}

function parsePostData(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      callback(null, data);
    } catch (error) {
      callback(error, null);
    }
  });
}

// API Routes
const routes = {
  'GET /api/v1/health': (req, res) => {
    sendJSON(res, {
      status: 'success',
      message: 'Money Council API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  },

  'GET /api/v1/dashboard': (req, res) => {
    const monthlyIncome = 50000;
    const expenses = {
      housing: 15000, food: 8000, transportation: 5000,
      entertainment: 3000, utilities: 2000, other: 2000
    };
    const debts = {
      creditCards: 5000, studentLoans: 50000, carLoan: 200000, personalLoan: 0
    };
    const recommendedExpenses = {
      housing: 15000, food: 6500, transportation: 4000,
      entertainment: 2400, utilities: 1800, other: 1800
    };

    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    const totalDebts = Object.values(debts).reduce((sum, val) => sum + val, 0);
    const monthlySavings = monthlyIncome - totalExpenses;
    const savingsRate = ((monthlySavings / monthlyIncome) * 100).toFixed(1);

    const totalRecommendedExpenses = Object.values(recommendedExpenses).reduce((sum, val) => sum + val, 0);
    const recommendedSavings = monthlyIncome - totalRecommendedExpenses;
    const recommendedSavingsRate = ((recommendedSavings / monthlyIncome) * 100).toFixed(1);

    sendJSON(res, {
      status: 'success',
      message: 'Dashboard data retrieved successfully',
      data: {
        metrics: {
          monthlyIncome, totalExpenses, monthlySavings, totalDebts,
          savingsRate: parseFloat(savingsRate)
        },
        recommendations: {
          recommendedExpenses, recommendedSavings,
          recommendedSavingsRate: parseFloat(recommendedSavingsRate),
          additionalMonthlySavings: recommendedSavings - monthlySavings,
          additionalAnnualSavings: (recommendedSavings - monthlySavings) * 12
        },
        actionPlan: [
          "Reduce entertainment expenses by 20% to save an additional ₹600/month",
          "Set up automatic transfer of ₹10,000 to emergency fund",
          "Consider refinancing car loan to potentially save ₹1,500/month",
          "Increase retirement contribution by 5% when income increases"
        ],
        chartData: {
          expensePieChart: {
            labels: Object.keys(expenses).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
            data: Object.values(expenses),
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
          },
          debtDoughnutChart: {
            labels: ['Credit Cards', 'Student Loans', 'Car Loan'],
            data: [5000, 50000, 200000],
            backgroundColor: ['#DC2626', '#F59E0B', '#3B82F6']
          },
          cashFlowBarChart: {
            labels: ['Income', 'Expenses', 'Savings'],
            data: [monthlyIncome, -totalExpenses, monthlySavings],
            backgroundColor: ['#10B981', '#EF4444', '#3B82F6']
          },
          recommendedExpensePieChart: {
            labels: Object.keys(recommendedExpenses).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
            data: Object.values(recommendedExpenses),
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
          }
        }
      }
    });
  },

  'GET /api/v1/profile': (req, res) => {
    sendJSON(res, {
      status: 'success',
      data: {
        profile: mockData.user.financialProfile
      }
    });
  },

  'GET /api/v1/auth/me': (req, res) => {
    sendJSON(res, {
      status: 'success',
      data: {
        user: mockData.user
      }
    });
  },

  'POST /api/v1/scenario/calculate': (req, res) => {
    parsePostData(req, (error, data) => {
      if (error) {
        return sendJSON(res, {
          status: 'error',
          message: 'Invalid JSON data'
        }, 400);
      }

      const monthlyIncome = data.monthlyIncome || 50000;
      const currentExpenses = data.currentExpenses || {
        housing: 15000, food: 8000, transportation: 5000,
        entertainment: 3000, utilities: 2000, other: 2000
      };
      const optimizationGoals = data.optimizationGoals || {
        housing: 0, food: 15, transportation: 20,
        entertainment: 20, utilities: 10, other: 10
      };

      const currentTotalExpenses = Object.values(currentExpenses).reduce((sum, val) => sum + val, 0);
      const currentSavings = monthlyIncome - currentTotalExpenses;

      const optimizedExpenses = {};
      const improvements = [];

      Object.entries(currentExpenses).forEach(([category, current]) => {
        const reductionPercent = (optimizationGoals[category] || 0) / 100;
        const optimized = Math.round(current * (1 - reductionPercent));
        const savings = current - optimized;
        
        optimizedExpenses[category] = optimized;
        improvements.push({
          category: category.charAt(0).toUpperCase() + category.slice(1),
          current,
          optimized,
          savings
        });
      });

      const optimizedTotalExpenses = Object.values(optimizedExpenses).reduce((sum, val) => sum + val, 0);
      const optimizedSavings = monthlyIncome - optimizedTotalExpenses;
      const totalMonthlySavings = improvements.reduce((sum, item) => sum + item.savings, 0);

      const currentPath = {
        monthlyIncome,
        expenses: currentTotalExpenses,
        savings: currentSavings,
        netWorth3Months: currentSavings * 3
      };

      const optimizedPath = {
        monthlyIncome,
        expenses: optimizedTotalExpenses,
        savings: optimizedSavings,
        netWorth3Months: optimizedSavings * 3
      };

      sendJSON(res, {
        status: 'success',
        message: 'Scenario calculated successfully',
        data: {
          userInput: { monthlyIncome, currentExpenses, optimizationGoals },
          currentPath,
          optimizedPath,
          improvements,
          summary: {
            totalMonthlySavings,
            totalAnnualSavings: totalMonthlySavings * 12,
            savingsRateCurrent: ((currentSavings / monthlyIncome) * 100).toFixed(1),
            savingsRateOptimized: ((optimizedSavings / monthlyIncome) * 100).toFixed(1)
          }
        }
      });
    });
  },

  'POST /api/v1/auth/register': (req, res) => {
    parsePostData(req, (error, data) => {
      sendJSON(res, {
        status: 'success',
        message: 'User registered successfully',
        data: {
          user: {
            id: 'new-user-id',
            name: data.name || 'New User',
            email: data.email || 'user@example.com',
            financialProfile: mockData.user.financialProfile
          },
          token: 'mock-jwt-token'
        }
      });
    });
  },

  'POST /api/v1/auth/login': (req, res) => {
    parsePostData(req, (error, data) => {
      sendJSON(res, {
        status: 'success',
        message: 'Login successful',
        data: {
          user: {
            ...mockData.user,
            email: data.email || mockData.user.email
          },
          token: 'mock-jwt-token'
        }
      });
    });
  },

  'POST /api/v1/profile/persona': (req, res) => {
    parsePostData(req, (error, data) => {
      const personas = {
        '₹20k Student': {
          monthlyIncome: 20000,
          expenses: { housing: 5000, food: 4000, transportation: 2000, entertainment: 1500, utilities: 1000, other: 500 },
          debts: { creditCards: 1000, studentLoans: 100000, carLoan: 0, personalLoan: 0 },
          goals: { emergencyFund: 30000, retirement: 500000, houseDownPayment: 200000 },
          riskTolerance: 'conservative'
        },
        '₹50k Salaried': {
          monthlyIncome: 50000,
          expenses: { housing: 15000, food: 8000, transportation: 5000, entertainment: 3000, utilities: 2000, other: 2000 },
          debts: { creditCards: 5000, studentLoans: 50000, carLoan: 200000, personalLoan: 0 },
          goals: { emergencyFund: 100000, retirement: 1000000, houseDownPayment: 500000 },
          riskTolerance: 'moderate'
        },
        '₹35k Freelancer': {
          monthlyIncome: 35000,
          expenses: { housing: 10000, food: 6000, transportation: 4000, entertainment: 2500, utilities: 1500, other: 1000 },
          debts: { creditCards: 3000, studentLoans: 0, carLoan: 150000, personalLoan: 0 },
          goals: { emergencyFund: 75000, retirement: 800000, houseDownPayment: 400000 },
          riskTolerance: 'aggressive'
        }
      };

      const selectedPersona = personas[data.persona] || personas['₹50k Salaried'];
      
      sendJSON(res, {
        status: 'success',
        message: `${data.persona} persona loaded successfully`,
        data: {
          profile: selectedPersona
        }
      });
    });
  }
};

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;
  const routeKey = `${method} ${path}`;

  console.log(`${method} ${path}`);

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // Route matching
  if (routes[routeKey]) {
    routes[routeKey](req, res);
  } else {
    // Try to match with query parameters
    let found = false;
    for (const route in routes) {
      if (route.startsWith(method) && path.startsWith(route.split(' ')[1])) {
        routes[route](req, res);
        found = true;
        break;
      }
    }
    
    if (!found) {
      sendJSON(res, {
        status: 'error',
        message: 'Route not found'
      }, 404);
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('🚀 Money Council Backend Server is running!');
  console.log(`📊 Server: http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(`📈 Dashboard API: http://localhost:${PORT}/api/v1/dashboard`);
  console.log(`🎯 Scenario API: http://localhost:${PORT}/api/v1/scenario/calculate`);
  console.log(`👤 Profile API: http://localhost:${PORT}/api/v1/profile`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/v1/auth/me`);
  console.log('\n🎯 Frontend should connect to this server!');
  console.log('🛑 Press Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
