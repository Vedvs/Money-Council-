# Money Council Backend API

A complete Node.js/Express backend API for the Money Council AI Financial Advisor application.

## 🚀 Features

- **Authentication** - User registration and login with JWT
- **Profile Management** - Financial data storage and retrieval
- **Dashboard Analytics** - Charts, metrics, and recommendations
- **Scenario Planning** - Financial optimization calculations
- **Demo Personas** - Pre-configured user profiles
- **Data Validation** - Comprehensive input validation
- **Error Handling** - Robust error management
- **Security** - Helmet, CORS, rate limiting

## 📋 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user profile

### Profile Management
- `GET /api/v1/profile` - Get user's financial profile
- `PUT /api/v1/profile` - Update financial profile
- `POST /api/v1/profile/persona` - Load demo persona

### Dashboard
- `GET /api/v1/dashboard` - Get complete dashboard data
- `GET /api/v1/dashboard/metrics` - Get dashboard metrics only

### Scenario Planning
- `POST /api/v1/scenario/calculate` - Calculate financial scenarios
- `GET /api/v1/scenario/recommendations` - Get AI recommendations
- `GET /api/v1/scenario/personas` - Get available personas

### Health Check
- `GET /api/v1/health` - API health status

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone and navigate to backend folder**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy .env file and update values
cp .env.example .env
```

4. **Update .env file**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/money-council
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
API_VERSION=v1
CORS_ORIGIN=http://localhost:3000
```

5. **Start MongoDB**
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with Atlas connection string
```

6. **Start the server**
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  financialProfile: {
    monthlyIncome: Number,
    expenses: {
      housing: Number,
      food: Number,
      transportation: Number,
      entertainment: Number,
      utilities: Number,
      other: Number
    },
    debts: {
      creditCards: Number,
      studentLoans: Number,
      carLoan: Number,
      personalLoan: Number
    },
    goals: {
      emergencyFund: Number,
      retirement: Number,
      houseDownPayment: Number
    },
    riskTolerance: String // 'conservative', 'moderate', 'aggressive'
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Dashboard Data
```bash
curl -X GET http://localhost:5000/api/v1/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Calculate Scenario
```bash
curl -X POST http://localhost:5000/api/v1/scenario/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "monthlyIncome": 50000,
    "currentExpenses": {
      "housing": 15000,
      "food": 8000,
      "transportation": 5000,
      "entertainment": 3000,
      "utilities": 2000,
      "other": 2000
    },
    "optimizationGoals": {
      "housing": 0,
      "food": 15,
      "transportation": 20,
      "entertainment": 20,
      "utilities": 10,
      "other": 10
    }
  }'
```

## 🎯 Frontend Integration

The backend is perfectly aligned with the frontend:

### Data Structure Matching
- **Expenses**: 6 categories (housing, food, transportation, entertainment, utilities, other)
- **Debts**: 4 types (creditCards, studentLoans, carLoan, personalLoan)
- **Goals**: 3 targets (emergencyFund, retirement, houseDownPayment)
- **Risk Tolerance**: 3 levels (conservative, moderate, aggressive)

### Chart Data Format
```javascript
{
  expensePieChart: {
    labels: ["Housing", "Food", "Transportation", "Entertainment", "Utilities", "Other"],
    data: [15000, 8000, 5000, 3000, 2000, 2000],
    backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#6B7280"]
  }
}
```

### Demo Personas
- ₹20k Student
- ₹50k Salaried  
- ₹35k Freelancer

## 🔒 Security Features

- **Password Hashing** with bcryptjs
- **JWT Authentication** with configurable expiration
- **Input Validation** with express-validator
- **Rate Limiting** (100 requests per 15 minutes)
- **CORS Protection** with configurable origins
- **Helmet.js** for security headers
- **MongoDB Injection Protection** with Mongoose

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Response Format

All API responses follow this format:

### Success Response
```javascript
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```javascript
{
  "status": "error",
  "message": "Error description",
  "errors": [] // Validation errors (if applicable)
}
```

## 🚀 Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Production Setup
1. Set NODE_ENV to production
2. Use a strong JWT_SECRET
3. Configure production MongoDB
4. Set proper CORS_ORIGIN
5. Use HTTPS in production

## 📞 Support

For any issues or questions:
1. Check the console logs for detailed error messages
2. Verify MongoDB connection
3. Ensure all environment variables are set
4. Check network connectivity

## 🔄 Version History

- **v1.0.0** - Initial release with complete CRUD operations
- **v1.1.0** - Added scenario calculations and AI recommendations
- **v1.2.0** - Enhanced security and validation
