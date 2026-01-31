const express = require('express');
const router = express.Router();

// @route   GET /api/v1/dashboard
// @desc    Get dashboard data with charts and recommendations
router.get('/', async (req, res) => {
  try {
    // Mock data matching the frontend exactly
    const monthlyIncome = 50000;
    const expenses = {
      housing: 15000,
      food: 8000,
      transportation: 5000,
      entertainment: 3000,
      utilities: 2000,
      other: 2000
    };
    
    const debts = {
      creditCards: 5000,
      studentLoans: 50000,
      carLoan: 200000,
      personalLoan: 0
    };

    const recommendedExpenses = {
      housing: 15000,
      food: 6500,
      transportation: 4000,
      entertainment: 2400,
      utilities: 1800,
      other: 1800
    };

    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    const totalDebts = Object.values(debts).reduce((sum, val) => sum + val, 0);
    const monthlySavings = monthlyIncome - totalExpenses;
    const savingsRate = ((monthlySavings / monthlyIncome) * 100).toFixed(1);

    const totalRecommendedExpenses = Object.values(recommendedExpenses).reduce((sum, val) => sum + val, 0);
    const recommendedSavings = monthlyIncome - totalRecommendedExpenses;
    const recommendedSavingsRate = ((recommendedSavings / monthlyIncome) * 100).toFixed(1);

    const actionPlan = [
      "Reduce entertainment expenses by 20% to save an additional ₹600/month",
      "Set up automatic transfer of ₹10,000 to emergency fund",
      "Consider refinancing car loan to potentially save ₹1,500/month",
      "Increase retirement contribution by 5% when income increases"
    ];

    // Chart data for frontend
    const chartData = {
      expensePieChart: {
        labels: Object.keys(expenses).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
        data: Object.values(expenses),
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // yellow
          '#EF4444', // red
          '#8B5CF6', // purple
          '#6B7280'  // gray
        ]
      },
      debtDoughnutChart: {
        labels: Object.keys(debts).filter(key => debts[key] > 0).map(key => 
          key.charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').trim()
        ),
        data: Object.values(debts).filter(val => val > 0),
        backgroundColor: [
          '#DC2626', // red
          '#F59E0B', // yellow
          '#3B82F6', // blue
          '#10B981'  // green
        ]
      },
      cashFlowBarChart: {
        labels: ['Income', 'Expenses', 'Savings'],
        data: [monthlyIncome, -totalExpenses, monthlySavings],
        backgroundColor: [
          '#10B981', // green for income
          '#EF4444', // red for expenses
          '#3B82F6'  // blue for savings
        ]
      },
      recommendedExpensePieChart: {
        labels: Object.keys(recommendedExpenses).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
        data: Object.values(recommendedExpenses),
        backgroundColor: [
          '#3B82F6', // blue
          '#10B981', // green
          '#F59E0B', // yellow
          '#EF4444', // red
          '#8B5CF6', // purple
          '#6B7280'  // gray
        ]
      }
    };

    const dashboardData = {
      metrics: {
        monthlyIncome,
        totalExpenses,
        monthlySavings,
        totalDebts,
        savingsRate: parseFloat(savingsRate)
      },
      recommendations: {
        recommendedExpenses,
        recommendedSavings,
        recommendedSavingsRate: parseFloat(recommendedSavingsRate),
        additionalMonthlySavings: recommendedSavings - monthlySavings,
        additionalAnnualSavings: (recommendedSavings - monthlySavings) * 12
      },
      actionPlan,
      chartData
    };

    res.status(200).json({
      status: 'success',
      message: 'Dashboard data retrieved successfully',
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching dashboard data'
    });
  }
});

// @route   GET /api/v1/dashboard/metrics
// @desc    Get dashboard metrics only
router.get('/metrics', async (req, res) => {
  try {
    const monthlyIncome = 50000;
    const expenses = {
      housing: 15000,
      food: 8000,
      transportation: 5000,
      entertainment: 3000,
      utilities: 2000,
      other: 2000
    };
    
    const debts = {
      creditCards: 5000,
      studentLoans: 50000,
      carLoan: 200000,
      personalLoan: 0
    };

    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    const totalDebts = Object.values(debts).reduce((sum, val) => sum + val, 0);
    const monthlySavings = monthlyIncome - totalExpenses;
    const savingsRate = ((monthlySavings / monthlyIncome) * 100).toFixed(1);

    const metrics = {
      monthlyIncome,
      totalExpenses,
      monthlySavings,
      totalDebts,
      savingsRate: parseFloat(savingsRate)
    };

    res.status(200).json({
      status: 'success',
      data: { metrics }
    });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching dashboard metrics'
    });
  }
});

module.exports = router;
