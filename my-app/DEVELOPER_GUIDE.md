# 🔧 Developer Guide - Expense Tracker

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── Analytics.jsx          # Charts and analytics views
│   │   ├── Dashboard.jsx          # Summary cards component
│   │   ├── TransactionForm.jsx    # Form for adding/editing transactions
│   │   └── TransactionList.jsx    # Table view of transactions
│   ├── context/
│   │   ├── ExpenseContext.jsx     # Main expense data management
│   │   └── ThemeContext.jsx       # Theme (dark/light) management
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # Additional component styles
│   ├── index.css                  # Global styles
│   └── main.jsx                   # React entry point
├── public/                        # Static assets
├── tailwind.config.js             # Tailwind CSS configuration
├── vite.config.js                 # Vite configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies
├── TRANSFORMATION_SUMMARY.md      # What's new overview
├── UI_ENHANCEMENTS.md            # Technical details
├── QUICK_START.md                # User guide
├── DESIGN_SYSTEM.md              # Design tokens and styles
└── DEVELOPER_GUIDE.md            # This file
```

---

## Tech Stack

### Frontend Framework
- **React 18:** UI library with hooks
- **Vite:** Lightning-fast build tool
- **Tailwind CSS:** Utility-first CSS framework
- **Recharts:** React charting library

### State Management
- **Context API:** useContext for theme and expenses
- **localStorage:** Persistent data storage
- **React Hooks:** useState, useEffect, useContext

### Build & Dev Tools
- **Node.js:** JavaScript runtime
- **npm:** Package manager
- **PostCSS:** CSS transformations
- **ESLint:** Code linting

---

## Getting Started

### Prerequisites
```bash
- Node.js 16+
- npm or yarn
- Modern web browser
```

### Installation
```bash
cd "e:\Expense Tracker\my-app"
npm install
```

### Development Server
```bash
npm run dev
# Runs on http://localhost:5173/
```

### Production Build
```bash
npm run build
# Creates optimized build in dist/
```

### Preview Build
```bash
npm run preview
# Preview production build locally
```

---

## Component Architecture

### App.jsx
**Purpose:** Main application wrapper
**Responsibilities:**
- Theme provider context
- Tab navigation logic
- Route rendering
- Header and footer

**Key Props:** None (context-based)
**State:** activeTab (current view)
**Hooks:** useTheme()

### Context Components

#### ExpenseContext.jsx
**Purpose:** Global expense data management
**Provides:**
- transactions (array)
- categories (array)
- addTransaction()
- editTransaction()
- deleteTransaction()
- getTotalIncome()
- getTotalExpenses()
- getBalance()
- searchTransactions()
- sortTransactions()
- getCategoryExpenses()
- getMonthlyExpenses()

**Storage:** localStorage with key "transactions"

#### ThemeContext.jsx
**Purpose:** Theme state management
**Provides:**
- isDark (boolean)
- toggleTheme()

**Storage:** localStorage with key "theme"
**Auto-detection:** System preference on first load

### Feature Components

#### Dashboard.jsx
**Purpose:** Financial summary cards
**Props:** None (uses context)
**State:** None (derived from context)
**Hooks:** useExpense(), useTheme()

**Features:**
- Income card
- Expenses card
- Balance card (color-changing)
- Animated reveal

#### TransactionForm.jsx
**Purpose:** Add/edit transactions
**Props:** 
- transaction (optional, for editing)
- onClose (optional callback)

**State:**
- formData (form values)
- errors (validation errors)

**Hooks:** useExpense(), useTheme()

**Features:**
- Form validation
- Required field indicators
- Error messages
- Category selection
- Income/Expense toggle

#### TransactionList.jsx
**Purpose:** View and manage transactions
**Props:** None (uses context)
**State:**
- searchQuery
- filterCategory
- filterType
- sortBy
- sortOrder
- editingId
- editingTitle
- editingAmount

**Hooks:** useExpense(), useTheme()

**Features:**
- Search functionality
- Category filter
- Type filter
- Sort by date/amount
- Edit inline
- Delete with confirmation

#### Analytics.jsx
**Purpose:** Data visualization and reports
**Props:** None (uses context)
**State:** activeTab (category or monthly view)
**Hooks:** useExpense(), useTheme()

**Features:**
- Pie chart by category
- Category summary list
- Bar chart monthly trend
- Percentage calculations
- Animated charts

---

## Styling Guide

### Tailwind CSS Usage

#### Responsive Design
```jsx
// Mobile first approach
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
// 1 col on mobile, 2 on tablet, 3 on desktop

className="px-4 sm:px-6 lg:px-8"
// Responsive padding
```

#### Dark Mode
```jsx
className={`
  bg-white text-gray-800        // Light mode
  dark:bg-slate-800 dark:text-gray-100  // Dark mode
  transition-colors duration-300 // Smooth transition
`}
```

#### Animations
```jsx
className="animate-slideIn"   // Slide from left
className="animate-fadeIn"    // Fade in
className="animate-slideUp"   // Slide up
className="hover:scale-105"   // Scale on hover
className="active:scale-95"   // Scale on click
```

---

## Adding New Features

### Adding a New Transaction Category

**File:** `src/context/ExpenseContext.jsx`

```jsx
const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Rent',
  'Bills',
  'Entertainment',
  'Salary',
  'Other',
  'NewCategory'  // Add here
];
```

### Adding a New Chart

**File:** `src/components/Analytics.jsx`

```jsx
// Import chart from recharts
import { LineChart, Line } from 'recharts';

// Add new tab button
<button onClick={() => setActiveTab('custom')}>
  Custom View
</button>

// Add chart rendering
{activeTab === 'custom' && (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={customData}>
      {/* Chart components */}
    </LineChart>
  </ResponsiveContainer>
)}
```

### Adding Custom Animations

**File:** `tailwind.config.js`

```javascript
animation: {
  slideIn: 'slideIn 0.5s ease-out',
  fadeIn: 'fadeIn 0.5s ease-out',
  slideUp: 'slideUp 0.5s ease-out',
  myCustom: 'myCustom 1s ease-in-out',  // Add here
},
keyframes: {
  myCustom: {
    '0%': { /* start state */ },
    '50%': { /* middle state */ },
    '100%': { /* end state */ }
  }
}
```

### Modifying Colors

**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Adding New Routes/Tabs

**File:** `src/App.jsx`

```jsx
const [activeTab, setActiveTab] = useState('dashboard');

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  // Add new tab here
];

// Add rendering logic
{activeTab === 'newTab' && <NewComponent />}
```

---

## Testing

### Manual Testing Checklist

- [ ] **Light Mode**
  - [ ] All colors correct
  - [ ] Text readable
  - [ ] Buttons work

- [ ] **Dark Mode**
  - [ ] All colors correct
  - [ ] Contrast adequate
  - [ ] Transitions smooth

- [ ] **Mobile (320px)**
  - [ ] Single column layout
  - [ ] Touch-friendly buttons
  - [ ] Forms work
  - [ ] No horizontal scroll

- [ ] **Tablet (768px)**
  - [ ] 2-column layout
  - [ ] Table readable
  - [ ] Spacing correct

- [ ] **Desktop (1024px+)**
  - [ ] 3-column layout
  - [ ] Charts render
  - [ ] Performance good

- [ ] **Animations**
  - [ ] Smooth 60fps
  - [ ] No jank
  - [ ] All working

- [ ] **Functionality**
  - [ ] Add transaction
  - [ ] Edit transaction
  - [ ] Delete transaction
  - [ ] Search works
  - [ ] Filter works
  - [ ] Sort works
  - [ ] Charts display
  - [ ] Data persists

---

## Performance Optimization

### Current Optimizations
- ✅ Tailwind CSS purging
- ✅ CSS-in-JS optimizations
- ✅ GPU-accelerated animations
- ✅ Efficient re-renders
- ✅ localStorage caching

### Future Optimizations
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Service workers
- [ ] Virtual scrolling for large lists

---

## Common Tasks

### Changing Color Scheme

1. Open `tailwind.config.js`
2. Modify primary/secondary colors
3. Update dark mode colors in `index.css`
4. Restart dev server

### Adding Form Validation

1. Open relevant component file
2. Add validation rules in `validateForm()`
3. Update error messages
4. Add error display in JSX

### Modifying Animation Speed

1. Open `tailwind.config.js`
2. Adjust duration in animation definitions
3. Or use inline: `animate-slideIn` → `duration-700`

### Changing Spacing

1. Use Tailwind utilities: `p-4`, `gap-6`, `m-8`
2. Or modify in `tailwind.config.js`
3. Restart dev server to see changes

---

## Debugging

### Browser DevTools

**Console:**
```javascript
// Check theme
document.documentElement.classList.contains('dark')

// Access context (if exported)
// Check localStorage
localStorage.getItem('transactions')
localStorage.getItem('theme')

// Clear data
localStorage.clear()
```

**Elements/Inspector:**
- Check computed styles
- Verify dark mode class
- Check class names
- Inspect animations

**Performance:**
- Check FPS during animations
- Profile component renders
- Check memory usage

### React DevTools
- Component hierarchy
- Props and state
- Hook values
- Context values

---

## Deployment

### Build for Production
```bash
npm run build
```

Creates optimized `dist/` folder.

### Deploy Options
- **Netlify:** Connect GitHub repo
- **Vercel:** Same as Netlify
- **GitHub Pages:** Push dist/ to gh-pages
- **Traditional Server:** Copy dist/ contents

### Environment Variables
Currently none required, but if needed:
```javascript
const API_URL = import.meta.env.VITE_API_URL
```

---

## Code Style

### Naming Conventions
- **Components:** PascalCase (Dashboard.jsx)
- **Functions:** camelCase (getTotalIncome)
- **Constants:** UPPER_SNAKE_CASE (COLORS)
- **CSS Classes:** kebab-case (animate-slideIn)
- **Variables:** camelCase (formData, isDark)

### File Organization
```jsx
// 1. Imports
import { useExpense } from '../context/ExpenseContext';

// 2. Component definition
export const MyComponent = ({ prop1, prop2 }) => {
  // 3. Hooks
  const { data } = useExpense();
  const [state, setState] = useState();

  // 4. Functions
  const handleClick = () => {};

  // 5. Render
  return (
    <div>JSX</div>
  );
};
```

---

## Resources

### Documentation
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Recharts](https://recharts.org)

### Tutorials
- React Hooks
- Tailwind Responsive Design
- Context API
- CSS Animations

---

## Support & Help

### Getting Help
1. Check browser console for errors
2. Review component props and state
3. Check localStorage for data
4. Restart dev server
5. Clear node_modules and reinstall

### Common Errors
- **Module not found:** npm install
- **Port 5173 in use:** Change port in vite.config.js
- **Styling not applying:** Check class names, restart server
- **Data not persisting:** Check localStorage, browser settings

---

**Developer Guide v1.0**  
**Last Updated:** January 10, 2026  
**Maintainer:** Development Team
