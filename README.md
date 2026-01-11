# 💰 ExpenseTracker - Professional Finance Management Application

A modern, fully responsive expense tracking web application built with React.js, Vite, GSAP animations, and Three.js 3D effects. Track your finances with style and precision.

> 📚 **New to this project?** Check out the [Documentation Index](DOCUMENTATION_INDEX.md) to find the perfect guide for your needs!

## ✨ Features

### Core Functionality
- ➕ **Add, Edit & Delete Transactions** - Full CRUD operations for expenses and income
- 🏷️ **Smart Categorization** - Pre-defined categories with custom icons and colors
- 📅 **Date Management** - Track transactions by date with flexible date range filtering
- 📝 **Notes Support** - Add detailed notes to each transaction
- 💾 **Local Storage** - Persistent data storage with API-ready architecture
- 🔍 **Advanced Filtering** - Filter by category, date range, and search terms

### Visual & Analytics
- 📊 **Interactive Charts** - Monthly overview and category breakdown with Chart.js
- 📈 **Real-time Statistics** - Dynamic balance, income, and expense calculations
- 🎯 **Animated Counters** - Smooth number animations with GSAP
- 📱 **Responsive Design** - Optimized for mobile, tablet, laptop, and desktop

### Animations & Effects
- ✨ **GSAP Animations** - Smooth page transitions and micro-interactions
- 🎭 **Three.js Background** - Subtle 3D floating particles and abstract shapes
- 🎪 **Staggered Entrances** - Beautiful card animations with delays
- 🌟 **Modal Transitions** - Polished form animations

### Design
- 🎨 **Modern UI/UX** - Clean fintech-style interface
- 🌓 **Dark Mode Support** - Toggle between light and dark themes
- 🎴 **Card-based Layout** - Professional cards with shadows and hover effects
- 🖼️ **High-quality Images** - Optimized Unsplash images for visual appeal
- 📐 **Professional Typography** - Google Fonts (Inter & Poppins)

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2
- **Build Tool**: Vite 7.3
- **Animations**: GSAP 3.14
- **3D Graphics**: Three.js 0.182, @react-three/fiber, @react-three/drei
- **Charts**: Chart.js 4.5, react-chartjs-2
- **Date Handling**: date-fns 4.1
- **Styling**: Custom CSS with CSS Variables
- **Storage**: localStorage with API-ready structure

## 📦 Installation & Usage

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
expense-tracker/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── pages/            # Page components
│   ├── services/         # Data services (localStorage)
│   ├── utils/            # Helper functions
│   └── index.css         # Global styles & CSS variables
├── public/               # Static assets
└── package.json          # Dependencies & scripts
```

## 🎨 Key Features

### Animations
- Smooth GSAP animations for cards, counters, and modals
- Staggered entrance effects for expense lists
- Three.js particle background with parallax motion

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (laptop), 1280px (desktop)
- Adaptive layouts and font sizes

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference in localStorage
- Smooth color transitions

## 📝 Usage Guide

### Adding a Transaction
1. Click "Add Transaction" button
2. Select type (Income/Expense)
3. Fill in details (title, amount, category, date)
4. Add optional notes
5. Submit the form

### Filtering Transactions
- Use search bar for text filtering
- Select category from dropdown
- Choose date range with From/To dates
- Click "Reset Filters" to clear

### Theme Toggle
- Click the moon/sun icon in the navbar to switch themes

## ⚡ Performance

- Optimized Three.js rendering
- Lazy loading for images
- Debounced search
- Memoized calculations
- Efficient localStorage operations

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 🎯 Future Enhancements

- Export to CSV/PDF
- Budget goals and alerts
- Recurring transactions
- Cloud sync with backend API
- Receipt attachments

## 📄 License

MIT License - Open source and free to use

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Modern fintech UI inspiration

---

**Built with ❤️ using modern web technologies!**

