const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// @route   POST /api/v1/scenario/calculate
// @desc    Calculate financial scenarios based on user input
router.post('/calculate', [
  body('monthlyIncome').isNumeric().withMessage('Monthly income must be a number'),
  body('currentExpenses.housing').isNumeric().withMessage('Housing expense must be a number'),
  body('currentExpenses.food').isNumeric().withMessage('Food expense must be a number'),
  body('currentExpenses.transportation').isNumeric().withMessage('Transportation expense must be a number'),
  body('currentExpenses.entertainment').isNumeric().withMessage('Entertainment expense must be a number'),
  body('currentExpenses.utilities').isNumeric().withMessage('Utilities expense must be a number'),
  body('currentExpenses.other').isNumeric().withMessage('Other expense must be a number'),
  body('optimizationGoals.housing').isNumeric().withMessage('Housing optimization must be a number'),
  body('optimizationGoals.food').isNumeric().withMessage('Food optimization must be a number'),
  body('optimizationGoals.transportation').isNumeric().withMessage('Transportation optimization must be a number'),
  body('optimizationGoals.entertainment').isNumeric().withMessage('Entertainment optimization must be a number'),
  body('optimizationGoals.utilities').isNumeric().withMessage('Utilities optimization must be a number'),
  body('optimizationGoals.other').isNumeric().withMessage('Other optimization must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { monthlyIncome, currentExpenses, optimizationGoals } = req.body;

    // Calculate current totals
    const currentTotalExpenses = Object.values(currentExpenses).reduce((sum, val) => sum + val, 0);
    const currentSavings = monthlyIncome - currentTotalExpenses;

    // Calculate optimized expenses
    const optimizedExpenses = {};
    const improvements = [];

    Object.entries(currentExpenses).forEach(([category, current]) => {
      const reductionPercent = optimizationGoals[category] / 100;
      const optimized = Math.round(current * (1 - reductionPercent));
      const savings = current - optimized;
      
      optimizedExpenses[category] = optimized;
      improvements.push({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        current,
        optimized,
        savings,
        reductionPercent: optimizationGoals[category]
      });
    });

    const optimizedTotalExpenses = Object.values(optimizedExpenses).reduce((sum, val) => sum + val, 0);
    const optimizedSavings = monthlyIncome - optimizedTotalExpenses;
    const totalMonthlySavings = improvements.reduce((sum, item) => sum + item.savings, 0);

    // Calculate 3-month projections
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

    // Calculate impact metrics
    const impactAnalysis = {
      additionalMonthlySavings: totalMonthlySavings,
      additionalAnnualSavings: totalMonthlySavings * 12,
      savingsRateImprovement: ((optimizedSavings / monthlyIncome) * 100) - ((currentSavings / monthlyIncome) * 100),
      netWorthImprovement3Months: optimizedPath.netWorth3Months - currentPath.netWorth3Months,
      debtPayoffAcceleration: totalMonthlySavings > 0 ? Math.floor(totalDebts / totalMonthlySavings) : 0
    };

    const scenarioData = {
      userInput: {
        monthlyIncome,
        currentExpenses,
        optimizationGoals
      },
      currentPath,
      optimizedPath,
      improvements,
      impactAnalysis,
      summary: {
        totalMonthlySavings,
        totalAnnualSavings: totalMonthlySavings * 12,
        savingsRateCurrent: ((currentSavings / monthlyIncome) * 100).toFixed(1),
        savingsRateOptimized: ((optimizedSavings / monthlyIncome) * 100).toFixed(1)
      }
    };

    res.status(200).json({
      status: 'success',
      message: 'Scenario calculated successfully',
      data: scenarioData
    });
  } catch (error) {
    console.error('Scenario calculation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while calculating scenario'
    });
  }
});

// @route   GET /api/v1/scenario/recommendations
// @desc    Get AI-powered optimization recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const recommendations = {
      expenseOptimization: {
        housing: {
          current: 15000,
          recommended: 15000,
          savings: 0,
          reasoning: "Housing is typically a fixed cost. Consider refinancing or moving to a cheaper area for long-term savings."
        },
        food: {
          current: 8000,
          recommended: 6500,
          savings: 1500,
          reasoning: "Meal planning and cooking at home can reduce food expenses by 15-20%."
        },
        transportation: {
          current: 5000,
          recommended: 4000,
          savings: 1000,
          reasoning: "Consider carpooling, public transport, or optimizing routes to save on fuel costs."
        },
        entertainment: {
          current: 3000,
          recommended: 2400,
          savings: 600,
          reasoning: "Look for free entertainment options and reduce subscription services."
        },
        utilities: {
          current: 2000,
          recommended: 1800,
          savings: 200,
          reasoning: "Energy-efficient appliances and mindful usage can reduce utility bills by 10%."
        },
        other: {
          current: 2000,
          recommended: 1800,
          savings: 200,
          reasoning: "Review miscellaneous expenses and cut non-essential items."
        }
      },
      generalAdvice: [
        "Set up automatic transfers to savings account on payday",
        "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
        "Build an emergency fund of 3-6 months expenses",
        "Review and cancel unused subscriptions regularly",
        "Consider increasing income through side hustles or skill development"
      ],
      debtStrategy: {
        priority: "Avalanche method (highest interest first)",
        monthlyAllocation: "Allocate extra savings to highest-interest debt",
        consolidation: "Consider debt consolidation for high-interest loans"
      }
    };

    res.status(200).json({
      status: 'success',
      message: 'Recommendations retrieved successfully',
      data: recommendations
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching recommendations'
    });
  }
});

// @route   GET /api/v1/scenario/personas
// @desc    Get available demo personas
router.get('/personas', async (req, res) => {
  try {
    const personas = [
      {
        name: '₹20k Student',
        description: 'Student with part-time income and student loans',
        data: {
          monthlyIncome: 20000,
          expenses: { housing: 5000, food: 4000, transportation: 2000, entertainment: 1500, utilities: 1000, other: 500 },
          optimizationGoals: { housing: 0, food: 10, transportation: 15, entertainment: 25, utilities: 5, other: 20 }
        }
      },
      {
        name: '₹50k Salaried',
        description: 'Full-time employee with stable income and mixed debts',
        data: {
          monthlyIncome: 50000,
          expenses: { housing: 15000, food: 8000, transportation: 5000, entertainment: 3000, utilities: 2000, other: 2000 },
          optimizationGoals: { housing: 0, food: 15, transportation: 20, entertainment: 20, utilities: 10, other: 10 }
        }
      },
      {
        name: '₹35k Freelancer',
        description: 'Freelancer with variable income and business expenses',
        data: {
          monthlyIncome: 35000,
          expenses: { housing: 10000, food: 6000, transportation: 4000, entertainment: 2500, utilities: 1500, other: 1000 },
          optimizationGoals: { housing: 0, food: 10, transportation: 15, entertainment: 30, utilities: 10, other: 15 }
        }
      }
    ];

    res.status(200).json({
      status: 'success',
      message: 'Personas retrieved successfully',
      data: personas
    });
  } catch (error) {
    console.error('Personas error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching personas'
    });
  }
});

module.exports = router;
