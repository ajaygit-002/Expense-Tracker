# ExpenseTracker - Development Guide

## Project Overview

ExpenseTracker is a modern, professional expense tracking web application built with cutting-edge technologies including React, GSAP animations, and Three.js 3D effects.

## Technology Stack Details

### Core Technologies
- **React 19.2**: Latest React version with improved performance
- **Vite 7.3**: Lightning-fast build tool and dev server
- **JavaScript (ES6+)**: Modern JavaScript features

### Animation Libraries
- **GSAP 3.14**: Professional-grade animation library
  - Used for: Card entrances, counter animations, modal transitions
  - Benefits: Smooth 60fps animations, cross-browser compatibility
  
- **Three.js 0.182**: 3D graphics library
  - Used for: Background particle effects, floating shapes
  - Optimized for performance with minimal impact

### Data Visualization
- **Chart.js 4.5**: Flexible charting library
- **react-chartjs-2**: React wrapper for Chart.js
  - Bar chart for monthly income/expense overview
  - Doughnut chart for category-wise breakdown

### Utilities
- **date-fns 4.1**: Modern date utility library
  - Date formatting and manipulation
  - Lightweight alternative to Moment.js

## Component Architecture

### Context API
The application uses React Context API for global state management:

```javascript
ExpenseContext
├── expenses (array)
├── categories (array)
├── settings (object)
├── statistics (object)
└── methods (add, update, delete, etc.)
```

### Component Hierarchy

```
App
└── ExpenseProvider (Context)
    └── Dashboard
        ├── ThreeBackground (3D effects)
        ├── Navbar (sticky header)
        ├── Hero (landing section)
        ├── StatCard × 3 (balance, income, expenses)
        ├── FilterBar (search & filters)
        ├── MonthlyChart (bar chart)
        ├── CategoryChart (doughnut chart)
        ├── ExpenseCard × n (transaction list)
        └── ExpenseForm (modal)
```

## State Management

### Local Storage Structure
```javascript
{
  expenses: [
    {
      id: "unique-id",
      title: "Grocery Shopping",
      amount: 150.50,
      category: "food",
      date: "2026-01-11",
      type: "expense",
      notes: "Weekly groceries",
      createdAt: "2026-01-11T10:30:00.000Z",
      updatedAt: "2026-01-11T10:30:00.000Z"
    }
  ],
  categories: [...],
  settings: {
    currency: "USD",
    theme: "light"
  }
}
```

## Animation Details

### GSAP Animations

#### 1. Card Entrance (StatCard)
```javascript
gsap.fromTo(element,
  { opacity: 0, y: 30, scale: 0.9 },
  { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
)
```

#### 2. Counter Animation
```javascript
gsap.to(obj, {
  value: targetValue,
  duration: 1.5,
  ease: 'power2.out',
  onUpdate: () => { /* update display */ }
})
```

#### 3. Staggered List Items
```javascript
gsap.fromTo(cards,
  { opacity: 0, x: -50 },
  { opacity: 1, x: 0, stagger: 0.05, ease: 'power2.out' }
)
```

#### 4. Modal Transitions
```javascript
// Entrance
gsap.fromTo(modal,
  { opacity: 0, scale: 0.8, y: -50 },
  { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.7)' }
)

// Exit
gsap.to(modal,
  { opacity: 0, scale: 0.8, y: -50, ease: 'back.in(1.7)' }
)
```

### Three.js Setup

#### Scene Configuration
- **Camera**: PerspectiveCamera with FOV 75
- **Renderer**: WebGL with alpha transparency
- **Optimization**: Max 2x pixel ratio for performance

#### Particle System
- 50 floating particles with random colors
- Individual velocity vectors for organic motion
- Boundary detection for continuous movement

#### Abstract Shapes
- Torus, Octahedron, and Tetrahedron
- Wireframe rendering for subtle effect
- Slow rotation for dynamic background

#### Mouse Parallax
- Smooth camera movement following mouse position
- 5% interpolation for natural feel
- Enhances depth perception

## Styling System

### CSS Variables
All colors, spacing, and other design tokens are defined as CSS variables in `index.css`:

```css
:root {
  --primary-color: #6366F1;
  --secondary-color: #10B981;
  --spacing-md: 1rem;
  --radius-lg: 0.75rem;
  /* ... more variables */
}
```

### Dark Mode Implementation
Theme is toggled by setting `data-theme` attribute on document root:

```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

CSS automatically switches colors:
```css
[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #F9FAFB;
  /* ... dark theme colors */
}
```

## Filtering & Search

### Filter Logic Flow
1. User inputs search term or selects filters
2. `onFilterChange` callback updates parent state
3. `useMemo` recalculates filtered expenses
4. Only matching expenses are rendered

### Filter Types
- **Category**: Exact match on category ID
- **Date Range**: Checks if date is within start/end dates
- **Search**: Case-insensitive substring match on title and notes

## Performance Optimizations

### React Optimizations
- `useMemo` for expensive calculations (filtered lists)
- Context prevents prop drilling
- Minimal re-renders with proper state structure

### Three.js Optimizations
- Limited particle count (50)
- Simple geometries
- No complex materials or textures
- `powerPreference: 'high-performance'`

### Image Optimizations
- Lazy loading with `loading="lazy"`
- Optimized URLs from Unsplash (`w=800&q=80`)
- WebP format support where available

### Storage Optimizations
- Batch operations where possible
- Error handling for localStorage failures
- JSON parsing with try-catch

## Responsive Design Strategy

### Mobile-First Approach
Base styles are for mobile, then enhanced for larger screens:

```css
/* Mobile (default) */
.grid { grid-template-columns: 1fr; }

/* Tablet */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Laptop**: 1024px - 1280px
- **Desktop**: > 1280px

## Development Workflow

### File Naming Conventions
- **Components**: PascalCase (e.g., `ExpenseCard.jsx`)
- **Utils**: camelCase (e.g., `helpers.js`)
- **Styles**: Match component name (e.g., `ExpenseCard.css`)

### Code Organization
- Keep components focused and single-purpose
- Extract reusable logic to utils
- Use context for global state only
- Keep styles component-scoped

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push and create PR
git push origin feature/new-feature
```

## Testing Recommendations

### Manual Testing Checklist
- [ ] Add expense (income & expense types)
- [ ] Edit existing transaction
- [ ] Delete transaction
- [ ] Filter by category
- [ ] Filter by date range
- [ ] Search functionality
- [ ] Theme toggle
- [ ] Responsive layouts (mobile, tablet, desktop)
- [ ] Chart rendering with data
- [ ] Empty state display
- [ ] LocalStorage persistence (refresh page)

### Browser Testing
Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)

## Deployment

### Build for Production
```bash
npm run build
```

This creates optimized files in `dist/` folder.

### Deploy to Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Environment Variables
Currently none needed. Future API integration would require:
```
VITE_API_URL=https://api.example.com
```

## Troubleshooting

### Common Issues

#### 1. Three.js Not Rendering
**Symptom**: Background is blank
**Solution**: Check browser WebGL support
```javascript
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
console.log('WebGL supported:', !!gl);
```

#### 2. Charts Not Displaying
**Symptom**: Empty chart containers
**Solution**: Ensure Chart.js is properly registered
```javascript
import { Chart as ChartJS, ... } from 'chart.js';
ChartJS.register(...);
```

#### 3. LocalStorage Quota Exceeded
**Symptom**: Can't save new transactions
**Solution**: Implement data cleanup or pagination

#### 4. GSAP Animations Not Working
**Symptom**: Elements appear without animation
**Solution**: Ensure GSAP is imported and elements are mounted
```javascript
useEffect(() => {
  if (!elementRef.current) return;
  gsap.from(elementRef.current, { ... });
}, []);
```

## Future API Integration

### Planned Backend Structure
```javascript
// API Service (future)
class ExpenseAPI {
  async getExpenses() {
    return fetch('/api/expenses').then(r => r.json());
  }
  
  async addExpense(expense) {
    return fetch('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense)
    });
  }
  
  // ... more methods
}
```

### Migration Path
Current `storageService.js` is designed to easily swap localStorage with API calls:
1. Create new `apiService.js`
2. Implement same method signatures
3. Update Context to use API service
4. Add loading states and error handling

## Contributing Guidelines

### Code Style
- Use 2 spaces for indentation
- Use single quotes for strings
- Add comments for complex logic
- Keep functions small and focused

### Pull Request Process
1. Create descriptive branch name
2. Write clear commit messages
3. Update README if needed
4. Test thoroughly before submitting
5. Request review from maintainers

## Resources

### Documentation Links
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [GSAP Docs](https://greensock.com/docs/)
- [Three.js Docs](https://threejs.org/docs/)
- [Chart.js Docs](https://www.chartjs.org/docs/)

### Design Resources
- [Unsplash](https://unsplash.com) - Free images
- [Coolors](https://coolors.co) - Color palettes
- [Google Fonts](https://fonts.google.com) - Typography

### Tools
- [Figma](https://figma.com) - Design mockups
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debugging
- [React DevTools](https://react.dev/learn/react-developer-tools) - React debugging

---

**Happy Coding! 🚀**
