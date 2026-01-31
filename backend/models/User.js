const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  financialProfile: {
    monthlyIncome: {
      type: Number,
      default: 50000,
      min: [0, 'Income must be positive']
    },
    expenses: {
      housing: { type: Number, default: 15000, min: 0 },
      food: { type: Number, default: 8000, min: 0 },
      transportation: { type: Number, default: 5000, min: 0 },
      entertainment: { type: Number, default: 3000, min: 0 },
      utilities: { type: Number, default: 2000, min: 0 },
      other: { type: Number, default: 2000, min: 0 }
    },
    debts: {
      creditCards: { type: Number, default: 5000, min: 0 },
      studentLoans: { type: Number, default: 50000, min: 0 },
      carLoan: { type: Number, default: 200000, min: 0 },
      personalLoan: { type: Number, default: 0, min: 0 }
    },
    goals: {
      emergencyFund: { type: Number, default: 100000, min: 0 },
      retirement: { type: Number, default: 1000000, min: 0 },
      houseDownPayment: { type: Number, default: 500000, min: 0 }
    },
    riskTolerance: {
      type: String,
      enum: ['conservative', 'moderate', 'aggressive'],
      default: 'moderate'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updatedAt on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Calculate total expenses
userSchema.methods.getTotalExpenses = function() {
  return Object.values(this.financialProfile.expenses).reduce((sum, val) => sum + val, 0);
};

// Calculate total debts
userSchema.methods.getTotalDebts = function() {
  return Object.values(this.financialProfile.debts).reduce((sum, val) => sum + val, 0);
};

// Calculate monthly savings
userSchema.methods.getMonthlySavings = function() {
  return this.financialProfile.monthlyIncome - this.getTotalExpenses();
};

// Calculate savings rate
userSchema.methods.getSavingsRate = function() {
  return ((this.getMonthlySavings() / this.financialProfile.monthlyIncome) * 100).toFixed(1);
};

module.exports = mongoose.model('User', userSchema);
