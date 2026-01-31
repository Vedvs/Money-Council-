const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/v1/profile
// @desc    Get user's financial profile
router.get('/', async (req, res) => {
  try {
    // For demo purposes, return mock data
    const mockProfile = {
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
    };

    res.status(200).json({
      status: 'success',
      data: {
        profile: mockProfile
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/v1/profile
// @desc    Update user's financial profile
router.put('/', [
  body('monthlyIncome').isNumeric().withMessage('Monthly income must be a number'),
  body('expenses.housing').isNumeric().withMessage('Housing expense must be a number'),
  body('expenses.food').isNumeric().withMessage('Food expense must be a number'),
  body('expenses.transportation').isNumeric().withMessage('Transportation expense must be a number'),
  body('expenses.entertainment').isNumeric().withMessage('Entertainment expense must be a number'),
  body('expenses.utilities').isNumeric().withMessage('Utilities expense must be a number'),
  body('expenses.other').isNumeric().withMessage('Other expense must be a number'),
  body('debts.creditCards').isNumeric().withMessage('Credit card debt must be a number'),
  body('debts.studentLoans').isNumeric().withMessage('Student loan debt must be a number'),
  body('debts.carLoan').isNumeric().withMessage('Car loan debt must be a number'),
  body('debts.personalLoan').isNumeric().withMessage('Personal loan debt must be a number'),
  body('goals.emergencyFund').isNumeric().withMessage('Emergency fund goal must be a number'),
  body('goals.retirement').isNumeric().withMessage('Retirement goal must be a number'),
  body('goals.houseDownPayment').isNumeric().withMessage('House down payment goal must be a number'),
  body('riskTolerance').isIn(['conservative', 'moderate', 'aggressive']).withMessage('Invalid risk tolerance')
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

    const {
      monthlyIncome,
      expenses,
      debts,
      goals,
      riskTolerance
    } = req.body;

    // Calculate totals and savings
    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
    const totalDebts = Object.values(debts).reduce((sum, val) => sum + val, 0);
    const monthlySavings = monthlyIncome - totalExpenses;
    const savingsRate = ((monthlySavings / monthlyIncome) * 100).toFixed(1);

    const updatedProfile = {
      monthlyIncome,
      expenses,
      debts,
      goals,
      riskTolerance,
      calculatedValues: {
        totalExpenses,
        totalDebts,
        monthlySavings,
        savingsRate: parseFloat(savingsRate)
      }
    };

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        profile: updatedProfile
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while updating profile'
    });
  }
});

// @route   POST /api/v1/profile/persona
// @desc    Load demo persona data
router.post('/persona', [
  body('persona').isIn(['₹20k Student', '₹50k Salaried', '₹35k Freelancer']).withMessage('Invalid persona')
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

    const { persona } = req.body;

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

    const selectedPersona = personas[persona];
    
    // Calculate totals and savings
    const totalExpenses = Object.values(selectedPersona.expenses).reduce((sum, val) => sum + val, 0);
    const totalDebts = Object.values(selectedPersona.debts).reduce((sum, val) => sum + val, 0);
    const monthlySavings = selectedPersona.monthlyIncome - totalExpenses;
    const savingsRate = ((monthlySavings / selectedPersona.monthlyIncome) * 100).toFixed(1);

    const personaWithCalculations = {
      ...selectedPersona,
      calculatedValues: {
        totalExpenses,
        totalDebts,
        monthlySavings,
        savingsRate: parseFloat(savingsRate)
      }
    };

    res.status(200).json({
      status: 'success',
      message: `${persona} persona loaded successfully`,
      data: {
        profile: personaWithCalculations
      }
    });
  } catch (error) {
    console.error('Load persona error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while loading persona'
    });
  }
});

module.exports = router;
