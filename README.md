# 💰 Expense Tracker

A modern, responsive expense tracking application built with React and Vite. Manage your finances, track transactions, and visualize your spending patterns with interactive charts.

## ✨ Features

### 1. 📊 User Interface
- **Clean and Modern Design**: Intuitive interface with a professional look
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop devices
- **Dashboard**: Real-time display of total balance, income, and expenses
- **Tab-based Navigation**: Easy navigation between Dashboard, Transactions, and Analytics

### 2. 📝 Expense Management
- **Add Transactions**: Record both income and expenses
- **Edit Transactions**: Modify existing transactions
- **Delete Transactions**: Remove unwanted transactions with confirmation
- **Form Validation**: Ensures all required fields are filled and values are positive
- **Transaction Fields**:
  - Title
  - Amount
  - Category
  - Date
  - Type (Income/Expense)

### 3. 🏷️ Categories
- **Predefined Categories**:
  - Food
  - Transport
  - Shopping
  - Rent
  - Bills
  - Entertainment
  - Salary
  - Other
- **Filter by Category**: View transactions for specific categories
- **Filter by Type**: View only income or expense transactions

### 4. 📋 Transaction History
- **Complete List**: View all transactions with details
- **Search**: Search transactions by title
- **Sort Options**: Sort by date or amount in ascending/descending order
- **Category Display**: Each transaction shows its category
- **Date Display**: Formatted dates for easy reading

### 5. 📈 Analytics & Charts
- **Category Breakdown**: Pie chart showing expenses by category
- **Category Summary**: Detailed breakdown with percentages
- **Monthly Trend**: Bar chart showing monthly expense patterns
- **Interactive Charts**: Hover over charts to see detailed values

### 6. 💾 Data Persistence
- **localStorage Integration**: All data is automatically saved to browser storage
- **Auto-load**: Data is automatically loaded when you refresh the page
- **No Backend Required**: Everything works offline

### 7. 🎨 Tech Stack
- **Frontend**: React.js with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API + Hooks
- **Storage**: Browser localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd my-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Navigate to `http://localhost:5173/`
   - The app will automatically reload as you make changes

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx        # Summary cards with totals
│   │   ├── TransactionForm.jsx  # Add/Edit transaction form
│   │   ├── TransactionList.jsx  # Transaction history with filters
│   │   └── Analytics.jsx        # Charts and analytics
│   ├── context/
│   │   └── ExpenseContext.jsx   # Global state management
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── main.jsx                 # App entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 How to Use

### Adding a Transaction

1. Navigate to the **Dashboard** or **Transactions** tab
2. Fill in the transaction form:
   - **Title**: Name of the transaction (e.g., "Grocery Shopping")
   - **Amount**: Transaction amount
   - **Category**: Select from predefined categories
   - **Date**: Pick a date
   - **Type**: Choose "Income" or "Expense"
3. Click **"Add Transaction"** button
4. The transaction appears immediately in the list

### Editing a Transaction

1. Go to the **Transactions** tab
2. Scroll to find the transaction you want to edit
3. Click the **"Edit"** button
4. Modify the details and save
5. Changes are saved automatically

### Deleting a Transaction

1. Go to the **Transactions** tab
2. Find the transaction
3. Click **"Delete"**
4. Confirm the deletion

### Filtering Transactions

Use the filter controls in the **Transactions** tab:
- **Search Box**: Type to filter by title
- **Category Filter**: Select a category to show only those transactions
- **Type Filter**: Show only Income or Expense transactions
- **Sort Options**: Sort by date or amount, ascending or descending

### Viewing Analytics

1. Go to the **Analytics** tab
2. Switch between:
   - **Category Breakdown**: Pie chart and category list with percentages
   - **Monthly Summary**: Bar chart showing spending trends over time

### Dashboard Overview

The **Dashboard** displays:
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions
- **Balance**: Income minus expenses
- Quick access to add new transactions

## 🔒 Data Storage

- All data is stored in **browser localStorage**
- No data is sent to any server
- Data persists across browser sessions
- Clear browser data to reset the app

## 🎨 Customization

### Change Colors

Edit the Tailwind CSS classes in components to customize colors:
- Primary Blue: `blue-600`
- Success Green: `green-600`
- Danger Red: `red-600`

### Add New Categories

Edit `src/context/ExpenseContext.jsx` and update the `categories` array:

```javascript
const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Rent',
  'Bills',
  'Entertainment',
  'Salary',
  'Custom Category',  // Add here
  'Other'
];
```

### Modify Dashboard Cards

Edit `src/components/Dashboard.jsx` to change card styling or add more metrics.

## 🐛 Troubleshooting

### Data not saving?
- Check if localStorage is enabled in your browser
- Open browser DevTools → Application → LocalStorage
- You should see a key called `transactions`

### Charts not showing?
- Ensure you have added some expense transactions
- Go to the Transactions tab and add at least one expense
- Then navigate to Analytics

### Port 5173 already in use?
```bash
npm run dev -- --port 5174
```

## 📝 Notes

- The app works completely offline
- No personal data is sent anywhere
- Clearing browser data will delete all transactions
- Consider exporting data before clearing browser storage

## 🚀 Future Enhancements

Possible improvements:
- Export data to CSV/PDF
- Budget planning and alerts
- Multiple user profiles
- Email notifications
- Recurring transactions
- Tags for transactions
- Advanced filtering options

## 📄 License

This project is open source and available for personal use.

## 🤝 Support

For issues or feature requests, please create an issue in the project repository.

---

**Happy Tracking! 💰**
