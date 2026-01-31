# Money Council Frontend

A 5-page React frontend for AI-powered financial advisory application.

## Pages Overview

### 1. Landing Page (`/`)
- Hero section with value proposition
- Call-to-action buttons ("Get Started", "Try Demo")
- Feature highlights (Smart Analysis, Goal Planning, Scenario Modeling)

### 2. Authentication Page (`/auth`)
- Combined login/signup form
- Toggle between login and signup modes
- Skip to demo option

### 3. Profile Page (`/profile`)
- **Most Important Page** - Feeds all financial data to agents
- Income input
- Expense categories (housing, food, transportation, entertainment, utilities, other)
- Debt tracking (credit cards, student loans, car loan, other)
- Financial goals (emergency fund, retirement, house down payment)
- Risk tolerance selection
- **Demo Personas**: Quick-start buttons for ₹20k Student, ₹50k Salaried, ₹35k Freelancer

### 4. Dashboard Page (`/dashboard`) - **Main Page**
- **Key Metrics Cards**: Monthly Income, Expenses, Savings, Savings Rate
- **Expense Breakdown Chart**: Visual breakdown with percentages
- **Savings & Debt Summary**: Progress bars for goals
- **Monthly Action Plan**: Numbered list of actionable recommendations
- This is what evaluators will focus on

### 5. Scenario Page (`/scenario`)
- **Before/After Comparison**: Current Path vs Optimized Path
- **3-Month Projections**: Net worth impact
- **Expense Optimization Table**: Category-by-category savings opportunities
- **Visual Progress Bars**: Show improvement in key metrics
- **Big Wow Factor**: Demonstrates value of AI recommendations

## Technical Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **TailwindCSS** for styling (via CDN)
- **Responsive Design**: Mobile-first approach

## Key Features

### Navigation
- Clean header navigation with active state indicators
- Seamless routing between all pages

### Data Flow
- Profile page collects all financial inputs
- Dashboard displays analysis and recommendations
- Scenario page shows optimization potential

### Demo Experience
- Pre-populated demo personas for instant exploration
- Skip authentication for demo access
- Realistic financial data examples

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Open browser to `http://localhost:3000`

## Interview Talking Points

"We designed a minimal multi-page React frontend with clear separation between data input, advisory insights, and scenario analysis."

### Architecture Highlights
- **Component-based structure** for maintainability
- **TypeScript** for type safety
- **Responsive design** works on all devices
- **Demo personas** for instant user understanding
- **Visual data presentation** with charts and progress bars

### User Journey
1. **Landing** → Understand value proposition
2. **Profile** → Input financial data (or use demo persona)
3. **Dashboard** → View personalized insights and action plan
4. **Scenario** → See optimization potential and impact

This 5-page structure provides a complete, professional-looking application that demonstrates the full financial advisory workflow while remaining manageable to build and maintain.
