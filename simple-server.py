#!/usr/bin/env python3
"""
Simple Python server for Money Council API
No installation required - Python comes with Windows!
"""

import http.server
import socketserver
import json
import urllib.parse
from datetime import datetime
import os

class MoneyCouncilAPIHandler(http.server.SimpleHTTPRequestHandler):
    
    def do_GET(self):
        """Handle GET requests"""
        if self.path == '/api/v1/health':
            self.send_json_response({
                'status': 'success',
                'message': 'Money Council API is running',
                'timestamp': datetime.now().isoformat(),
                'version': '1.0.0'
            })
        elif self.path == '/api/v1/dashboard':
            self.send_dashboard_data()
        elif self.path == '/api/v1/dashboard/metrics':
            self.send_metrics_data()
        elif self.path == '/api/v1/profile':
            self.send_profile_data()
        elif self.path == '/api/v1/auth/me':
            self.send_auth_data()
        elif self.path == '/api/v1/scenario/recommendations':
            self.send_recommendations()
        elif self.path == '/api/v1/scenario/personas':
            self.send_personas()
        elif self.path.startswith('/frontend/'):
            # Serve frontend files
            self.serve_frontend()
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'Route not found'
            }).encode())
    
    def do_POST(self):
        """Handle POST requests"""
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
        except:
            data = {}
        
        if self.path == '/api/v1/scenario/calculate':
            self.calculate_scenario(data)
        elif self.path == '/api/v1/auth/register':
            self.handle_register(data)
        elif self.path == '/api/v1/auth/login':
            self.handle_login(data)
        elif self.path == '/api/v1/profile':
            self.update_profile(data)
        elif self.path == '/api/v1/profile/persona':
            self.load_persona(data)
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                'status': 'error',
                'message': 'Route not found'
            }).encode())
    
    def send_json_response(self, data, status_code=200):
        """Send JSON response"""
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(data, indent=2).encode())
    
    def send_dashboard_data(self):
        """Send complete dashboard data"""
        monthlyIncome = 50000
        expenses = {
            'housing': 15000,
            'food': 8000,
            'transportation': 5000,
            'entertainment': 3000,
            'utilities': 2000,
            'other': 2000
        }
        
        debts = {
            'creditCards': 5000,
            'studentLoans': 50000,
            'carLoan': 200000,
            'personalLoan': 0
        }

        recommendedExpenses = {
            'housing': 15000,
            'food': 6500,
            'transportation': 4000,
            'entertainment': 2400,
            'utilities': 1800,
            'other': 1800
        }

        totalExpenses = sum(expenses.values())
        totalDebts = sum(debts.values())
        monthlySavings = monthlyIncome - totalExpenses
        savingsRate = (monthlySavings / monthlyIncome) * 100

        totalRecommendedExpenses = sum(recommendedExpenses.values())
        recommendedSavings = monthlyIncome - totalRecommendedExpenses
        recommendedSavingsRate = (recommendedSavings / monthlyIncome) * 100

        actionPlan = [
            "Reduce entertainment expenses by 20% to save an additional ₹600/month",
            "Set up automatic transfer of ₹10,000 to emergency fund",
            "Consider refinancing car loan to potentially save ₹1,500/month",
            "Increase retirement contribution by 5% when income increases"
        ]

        dashboard_data = {
            'metrics': {
                'monthlyIncome': monthlyIncome,
                'totalExpenses': totalExpenses,
                'monthlySavings': monthlySavings,
                'totalDebts': totalDebts,
                'savingsRate': round(savingsRate, 1)
            },
            'recommendations': {
                'recommendedExpenses': recommendedExpenses,
                'recommendedSavings': recommendedSavings,
                'recommendedSavingsRate': round(recommendedSavingsRate, 1),
                'additionalMonthlySavings': recommendedSavings - monthlySavings,
                'additionalAnnualSavings': (recommendedSavings - monthlySavings) * 12
            },
            'actionPlan': actionPlan,
            'chartData': {
                'expensePieChart': {
                    'labels': [key.capitalize() for key in expenses.keys()],
                    'data': list(expenses.values()),
                    'backgroundColor': ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
                },
                'debtDoughnutChart': {
                    'labels': ['Credit Cards', 'Student Loans', 'Car Loan'],
                    'data': [5000, 50000, 200000],
                    'backgroundColor': ['#DC2626', '#F59E0B', '#3B82F6']
                },
                'cashFlowBarChart': {
                    'labels': ['Income', 'Expenses', 'Savings'],
                    'data': [monthlyIncome, -totalExpenses, monthlySavings],
                    'backgroundColor': ['#10B981', '#EF4444', '#3B82F6']
                },
                'recommendedExpensePieChart': {
                    'labels': [key.capitalize() for key in recommendedExpenses.keys()],
                    'data': list(recommendedExpenses.values()),
                    'backgroundColor': ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
                }
            }
        }
        
        self.send_json_response({
            'status': 'success',
            'message': 'Dashboard data retrieved successfully',
            'data': dashboard_data
        })
    
    def send_metrics_data(self):
        """Send dashboard metrics only"""
        monthlyIncome = 50000
        expenses = {
            'housing': 15000,
            'food': 8000,
            'transportation': 5000,
            'entertainment': 3000,
            'utilities': 2000,
            'other': 2000
        }
        
        debts = {
            'creditCards': 5000,
            'studentLoans': 50000,
            'carLoan': 200000,
            'personalLoan': 0
        }

        totalExpenses = sum(expenses.values())
        totalDebts = sum(debts.values())
        monthlySavings = monthlyIncome - totalExpenses
        savingsRate = (monthlySavings / monthlyIncome) * 100

        metrics = {
            'monthlyIncome': monthlyIncome,
            'totalExpenses': totalExpenses,
            'monthlySavings': monthlySavings,
            'totalDebts': totalDebts,
            'savingsRate': round(savingsRate, 1)
        }

        self.send_json_response({
            'status': 'success',
            'data': {'metrics': metrics}
        })
    
    def send_profile_data(self):
        """Send user profile data"""
        profile = {
            'monthlyIncome': 50000,
            'expenses': {
                'housing': 15000,
                'food': 8000,
                'transportation': 5000,
                'entertainment': 3000,
                'utilities': 2000,
                'other': 2000
            },
            'debts': {
                'creditCards': 5000,
                'studentLoans': 50000,
                'carLoan': 200000,
                'personalLoan': 0
            },
            'goals': {
                'emergencyFund': 100000,
                'retirement': 1000000,
                'houseDownPayment': 500000
            },
            'riskTolerance': 'moderate'
        }
        
        self.send_json_response({
            'status': 'success',
            'data': {'profile': profile}
        })
    
    def send_auth_data(self):
        """Send auth user data"""
        user = {
            'id': '64f1a2b3c4d5e6f7g8h9i0j1',
            'name': 'Demo User',
            'email': 'demo@moneycouncil.com',
            'financialProfile': {
                'monthlyIncome': 50000,
                'expenses': {
                    'housing': 15000,
                    'food': 8000,
                    'transportation': 5000,
                    'entertainment': 3000,
                    'utilities': 2000,
                    'other': 2000
                },
                'debts': {
                    'creditCards': 5000,
                    'studentLoans': 50000,
                    'carLoan': 200000,
                    'personalLoan': 0
                },
                'goals': {
                    'emergencyFund': 100000,
                    'retirement': 1000000,
                    'houseDownPayment': 500000
                },
                'riskTolerance': 'moderate'
            }
        }
        
        self.send_json_response({
            'status': 'success',
            'data': {'user': user}
        })
    
    def calculate_scenario(self, data):
        """Calculate financial scenarios"""
        try:
            monthlyIncome = data.get('monthlyIncome', 50000)
            currentExpenses = data.get('currentExpenses', {
                'housing': 15000, 'food': 8000, 'transportation': 5000,
                'entertainment': 3000, 'utilities': 2000, 'other': 2000
            })
            optimizationGoals = data.get('optimizationGoals', {
                'housing': 0, 'food': 15, 'transportation': 20,
                'entertainment': 20, 'utilities': 10, 'other': 10
            })

            currentTotalExpenses = sum(currentExpenses.values())
            currentSavings = monthlyIncome - currentTotalExpenses

            optimizedExpenses = {}
            improvements = []

            for category, current in currentExpenses.items():
                reductionPercent = optimizationGoals.get(category, 0) / 100
                optimized = round(current * (1 - reductionPercent))
                savings = current - optimized
                
                optimizedExpenses[category] = optimized
                improvements.append({
                    'category': category.capitalize(),
                    'current': current,
                    'optimized': optimized,
                    'savings': savings
                })

            optimizedTotalExpenses = sum(optimizedExpenses.values())
            optimizedSavings = monthlyIncome - optimizedTotalExpenses
            totalMonthlySavings = sum(item['savings'] for item in improvements)

            currentPath = {
                'monthlyIncome': monthlyIncome,
                'expenses': currentTotalExpenses,
                'savings': currentSavings,
                'netWorth3Months': currentSavings * 3
            }

            optimizedPath = {
                'monthlyIncome': monthlyIncome,
                'expenses': optimizedTotalExpenses,
                'savings': optimizedSavings,
                'netWorth3Months': optimizedSavings * 3
            }

            scenario_data = {
                'userInput': {
                    'monthlyIncome': monthlyIncome,
                    'currentExpenses': currentExpenses,
                    'optimizationGoals': optimizationGoals
                },
                'currentPath': currentPath,
                'optimizedPath': optimizedPath,
                'improvements': improvements,
                'summary': {
                    'totalMonthlySavings': totalMonthlySavings,
                    'totalAnnualSavings': totalMonthlySavings * 12,
                    'savingsRateCurrent': round((currentSavings / monthlyIncome) * 100, 1),
                    'savingsRateOptimized': round((optimizedSavings / monthlyIncome) * 100, 1)
                }
            }

            self.send_json_response({
                'status': 'success',
                'message': 'Scenario calculated successfully',
                'data': scenario_data
            })
        except Exception as e:
            self.send_json_response({
                'status': 'error',
                'message': f'Error calculating scenario: {str(e)}'
            }, 500)
    
    def handle_register(self, data):
        """Handle user registration"""
        self.send_json_response({
            'status': 'success',
            'message': 'User registered successfully',
            'data': {
                'user': {
                    'id': 'new-user-id',
                    'name': data.get('name', 'New User'),
                    'email': data.get('email', 'user@example.com'),
                    'financialProfile': {
                        'monthlyIncome': 50000,
                        'expenses': {'housing': 15000, 'food': 8000, 'transportation': 5000, 'entertainment': 3000, 'utilities': 2000, 'other': 2000},
                        'debts': {'creditCards': 5000, 'studentLoans': 50000, 'carLoan': 200000, 'personalLoan': 0},
                        'goals': {'emergencyFund': 100000, 'retirement': 1000000, 'houseDownPayment': 500000},
                        'riskTolerance': 'moderate'
                    }
                },
                'token': 'mock-jwt-token'
            }
        })
    
    def handle_login(self, data):
        """Handle user login"""
        self.send_json_response({
            'status': 'success',
            'message': 'Login successful',
            'data': {
                'user': {
                    'id': 'user-id',
                    'name': 'Demo User',
                    'email': data.get('email', 'demo@moneycouncil.com'),
                    'financialProfile': {
                        'monthlyIncome': 50000,
                        'expenses': {'housing': 15000, 'food': 8000, 'transportation': 5000, 'entertainment': 3000, 'utilities': 2000, 'other': 2000},
                        'debts': {'creditCards': 5000, 'studentLoans': 50000, 'carLoan': 200000, 'personalLoan': 0},
                        'goals': {'emergencyFund': 100000, 'retirement': 1000000, 'houseDownPayment': 500000},
                        'riskTolerance': 'moderate'
                    }
                },
                'token': 'mock-jwt-token'
            }
        })
    
    def update_profile(self, data):
        """Update user profile"""
        self.send_json_response({
            'status': 'success',
            'message': 'Profile updated successfully',
            'data': {'profile': data}
        })
    
    def load_persona(self, data):
        """Load demo persona"""
        persona_name = data.get('persona', '₹50k Salaried')
        
        personas = {
            '₹20k Student': {
                'monthlyIncome': 20000,
                'expenses': {'housing': 5000, 'food': 4000, 'transportation': 2000, 'entertainment': 1500, 'utilities': 1000, 'other': 500},
                'debts': {'creditCards': 1000, 'studentLoans': 100000, 'carLoan': 0, 'personalLoan': 0},
                'goals': {'emergencyFund': 30000, 'retirement': 500000, 'houseDownPayment': 200000},
                'riskTolerance': 'conservative'
            },
            '₹50k Salaried': {
                'monthlyIncome': 50000,
                'expenses': {'housing': 15000, 'food': 8000, 'transportation': 5000, 'entertainment': 3000, 'utilities': 2000, 'other': 2000},
                'debts': {'creditCards': 5000, 'studentLoans': 50000, 'carLoan': 200000, 'personalLoan': 0},
                'goals': {'emergencyFund': 100000, 'retirement': 1000000, 'houseDownPayment': 500000},
                'riskTolerance': 'moderate'
            },
            '₹35k Freelancer': {
                'monthlyIncome': 35000,
                'expenses': {'housing': 10000, 'food': 6000, 'transportation': 4000, 'entertainment': 2500, 'utilities': 1500, 'other': 1000},
                'debts': {'creditCards': 3000, 'studentLoans': 0, 'carLoan': 150000, 'personalLoan': 0},
                'goals': {'emergencyFund': 75000, 'retirement': 800000, 'houseDownPayment': 400000},
                'riskTolerance': 'aggressive'
            }
        }
        
        selected_persona = personas.get(persona_name, personas['₹50k Salaried'])
        
        self.send_json_response({
            'status': 'success',
            'message': f'{persona_name} persona loaded successfully',
            'data': {'profile': selected_persona}
        })
    
    def send_recommendations(self):
        """Send AI recommendations"""
        recommendations = {
            'expenseOptimization': {
                'housing': {'current': 15000, 'recommended': 15000, 'savings': 0, 'reasoning': 'Housing is typically fixed cost'},
                'food': {'current': 8000, 'recommended': 6500, 'savings': 1500, 'reasoning': 'Meal planning can reduce costs by 15-20%'},
                'transportation': {'current': 5000, 'recommended': 4000, 'savings': 1000, 'reasoning': 'Carpooling and public transport savings'},
                'entertainment': {'current': 3000, 'recommended': 2400, 'savings': 600, 'reasoning': 'Free entertainment options'},
                'utilities': {'current': 2000, 'recommended': 1800, 'savings': 200, 'reasoning': 'Energy efficiency can save 10%'},
                'other': {'current': 2000, 'recommended': 1800, 'savings': 200, 'reasoning': 'Review miscellaneous expenses'}
            },
            'generalAdvice': [
                'Set up automatic transfers to savings account on payday',
                'Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings',
                'Build an emergency fund of 3-6 months expenses',
                'Review and cancel unused subscriptions regularly'
            ]
        }
        
        self.send_json_response({
            'status': 'success',
            'message': 'Recommendations retrieved successfully',
            'data': recommendations
        })
    
    def send_personas(self):
        """Send available personas"""
        personas = [
            {
                'name': '₹20k Student',
                'description': 'Student with part-time income and student loans',
                'data': {
                    'monthlyIncome': 20000,
                    'expenses': {'housing': 5000, 'food': 4000, 'transportation': 2000, 'entertainment': 1500, 'utilities': 1000, 'other': 500},
                    'optimizationGoals': {'housing': 0, 'food': 10, 'transportation': 15, 'entertainment': 25, 'utilities': 5, 'other': 20}
                }
            },
            {
                'name': '₹50k Salaried',
                'description': 'Full-time employee with stable income and mixed debts',
                'data': {
                    'monthlyIncome': 50000,
                    'expenses': {'housing': 15000, 'food': 8000, 'transportation': 5000, 'entertainment': 3000, 'utilities': 2000, 'other': 2000},
                    'optimizationGoals': {'housing': 0, 'food': 15, 'transportation': 20, 'entertainment': 20, 'utilities': 10, 'other': 10}
                }
            },
            {
                'name': '₹35k Freelancer',
                'description': 'Freelancer with variable income and business expenses',
                'data': {
                    'monthlyIncome': 35000,
                    'expenses': {'housing': 10000, 'food': 6000, 'transportation': 4000, 'entertainment': 2500, 'utilities': 1500, 'other': 1000},
                    'optimizationGoals': {'housing': 0, 'food': 10, 'transportation': 15, 'entertainment': 30, 'utilities': 10, 'other': 15}
                }
            }
        ]
        
        self.send_json_response({
            'status': 'success',
            'message': 'Personas retrieved successfully',
            'data': personas
        })
    
    def serve_frontend(self):
        """Serve frontend files"""
        # Change to frontend directory and serve index.html
        if self.path == '/frontend/' or self.path == '/frontend/index.html':
            try:
                with open('frontend/index.html', 'r') as f:
                    content = f.read()
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(content.encode())
            except FileNotFoundError:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b'Frontend file not found')
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'File not found')

def run_server():
    """Run the server"""
    PORT = 5000
    Handler = MoneyCouncilAPIHandler
    
    print(f"🚀 Money Council API Server starting on port {PORT}")
    print(f"📊 Frontend: http://localhost:{PORT}/frontend/")
    print(f"🔗 API Health: http://localhost:{PORT}/api/v1/health")
    print(f"📈 Dashboard API: http://localhost:{PORT}/api/v1/dashboard")
    print(f"🎯 Press Ctrl+C to stop the server")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            httpd.server_close()

if __name__ == "__main__":
    run_server()
