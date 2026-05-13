# Personal Finance Application

A comprehensive personal finance management application built with modern web technologies. This app helps users track expenses, manage budgets, save towards goals, and monitor recurring bills.

## Features

### Dashboard Overview
- Financial summary showing current balance, income, and expenses
- Quick access to recent transactions
- Visual overview of budgets, savings pots, and upcoming bills

### Transaction Management
- Record both income and expenses
- Categorize transactions by type
- Advanced filtering and sorting capabilities
- Transactions between users

### Budgeting System
- Create custom budgets for different spending categories
- Track spending against budget limits
- Visual representation of budget usage
- Edit and delete budgets as needed

### Savings Pots
- Create savings goals with target amounts
- Track progress towards savings targets
- Add to or withdraw from savings pots
- Customizable pot themes

### Recurring Bills
- Track monthly bills and subscriptions
- Status tracking (paid, upcoming, due soon)
- Bill summary and overview

## Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Firebase Authentication
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form with Yup validation

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL database
- Firebase project (for authentication)

### Project Structure

```
src/
├── app/             # Next.js app router
├── components/      # React components organized by atomic design
│   ├── atoms/       # Basic UI components
│   ├── molecules/   # Composite components
│   └── organisms/   # Complex components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries
├── services/        # API service functions
├── types/           # TypeScript type definitions
└── utils/           # Utility functions

prisma/              # Prisma schema and migrations
public/              # Static assets
```

### Future Improvements
- Implement comprehensive testing
- Add accessibility improvements
- Performance optimizations
- Enhanced error handling
- Documentation improvements
