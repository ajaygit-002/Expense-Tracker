# 🚀 ExpenseTracker - Deployment Guide

## Build & Deployment Instructions

### Production Build

#### Build Command
```bash
npm run build
```

This command:
- Optimizes and minifies all JavaScript
- Processes and minifies CSS
- Optimizes images
- Generates source maps
- Creates production-ready files in `dist/` folder

#### Build Output
```
dist/
├── assets/
│   ├── index-[hash].js       # Optimized JavaScript
│   ├── index-[hash].css      # Optimized CSS
│   └── [images]              # Processed images
├── index.html                # Entry HTML file
└── vite.svg                  # Favicon
```

#### Preview Build Locally
```bash
npm run preview
```
This starts a local server to test the production build.

---

## Deployment Platforms

### 1. Netlify (Recommended) ⭐

#### Method A: GitHub Integration
1. Push code to GitHub repository
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher
6. Click "Deploy site"

#### Method B: Drag & Drop
1. Run `npm run build` locally
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page
4. Get instant URL

#### Netlify Configuration File
Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Custom Domain
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS (automatic)

---

### 2. Vercel

#### Quick Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### GitHub Integration
1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import project
4. Auto-detects Vite configuration
5. Deploy!

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

---

### 3. GitHub Pages

#### Setup
1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/expense-tracker",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.js`:
   ```javascript
   export default {
     base: '/expense-tracker/',
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

#### Enable GitHub Pages
1. Go to repository Settings
2. Pages section
3. Select `gh-pages` branch
4. Save

---

### 4. Firebase Hosting

#### Setup
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:
   ```bash
   firebase login
   firebase init hosting
   ```

3. Configure:
   - Public directory: `dist`
   - Single-page app: Yes
   - Rewrites: Yes

4. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

#### Firebase Configuration
`firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

### 5. AWS S3 + CloudFront

#### Setup S3 Bucket
1. Create S3 bucket
2. Enable static website hosting
3. Set bucket policy for public read
4. Upload `dist/` contents

#### CloudFront Distribution
1. Create CloudFront distribution
2. Origin: S3 bucket
3. Default root object: `index.html`
4. Error pages: Redirect 404 to `/index.html`

#### Deploy Script
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### 6. Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Build & Run
```bash
# Build image
docker build -t expense-tracker .

# Run container
docker run -d -p 80:80 expense-tracker
```

---

## Environment Configuration

### Environment Variables (if needed in future)
Create `.env.production`:
```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=ExpenseTracker
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Pre-Deployment Checklist

### Code Quality
- [ ] No console.log() statements
- [ ] No commented-out code
- [ ] All imports used
- [ ] No eslint warnings
- [ ] Code formatted consistently

### Performance
- [ ] Images optimized
- [ ] Bundle size checked
- [ ] Lazy loading implemented where needed
- [ ] No memory leaks in useEffect
- [ ] Three.js scene properly disposed

### Testing
- [ ] Test all features work
- [ ] Test on mobile devices
- [ ] Test in multiple browsers
- [ ] Test dark mode
- [ ] Test with no data (empty state)
- [ ] Test with lots of data (performance)

### SEO & Meta Tags
- [ ] Title tag updated in index.html
- [ ] Meta description added
- [ ] Open Graph tags (optional)
- [ ] Favicon configured
- [ ] robots.txt (if needed)

### Security
- [ ] No sensitive data in code
- [ ] No API keys exposed
- [ ] HTTPS enabled
- [ ] CORS configured (if using API)

---

## Post-Deployment Tasks

### Monitor Performance
1. **Lighthouse Score**
   - Run Lighthouse audit
   - Aim for 90+ in all categories
   - Fix any issues

2. **Analytics** (Optional)
   - Add Google Analytics
   - Track user behavior
   - Monitor errors with Sentry

3. **User Feedback**
   - Share with friends/colleagues
   - Collect feedback
   - Iterate on improvements

### Maintenance
- Regular dependency updates
- Security patches
- Bug fixes
- Feature additions

---

## Troubleshooting

### Common Deployment Issues

#### 1. 404 on Refresh
**Problem**: SPA routes return 404 on page refresh
**Solution**: Configure server to redirect all routes to index.html

#### 2. Assets Not Loading
**Problem**: CSS/JS files not found
**Solution**: Check `base` in vite.config.js matches deployment path

#### 3. Environment Variables Not Working
**Problem**: `import.meta.env.VITE_*` is undefined
**Solution**: Ensure variables start with `VITE_` prefix

#### 4. Build Fails
**Problem**: Build command fails
**Solution**: 
- Check Node.js version (18+)
- Clear node_modules and reinstall
- Check for build errors in terminal

#### 5. White Screen After Deploy
**Problem**: Application shows blank page
**Solution**:
- Check browser console for errors
- Verify all assets are uploaded
- Check base path configuration

---

## Performance Optimization Tips

### 1. Code Splitting
```javascript
// Lazy load heavy components
const ExpenseForm = lazy(() => import('./components/ExpenseForm'));
```

### 2. Image Optimization
- Use WebP format
- Implement lazy loading
- Use appropriate sizes
- CDN for images (Cloudinary, Imgix)

### 3. Caching Strategy
```javascript
// Service Worker (Progressive Web App)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### 4. Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({ open: true })
  ]
}
```

---

## CI/CD Pipeline Example

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

---

## Domain & SSL

### Custom Domain Setup
1. Purchase domain (GoDaddy, Namecheap, Google Domains)
2. Point DNS to hosting provider
3. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: [hosting IP]
   
   Type: CNAME
   Name: www
   Value: [hosting domain]
   ```
4. Enable SSL (Let's Encrypt - free)
5. Wait for propagation (up to 48 hours)

### SSL Certificate
Most platforms provide free SSL:
- Netlify: Automatic
- Vercel: Automatic
- Firebase: Automatic
- AWS: Use ACM (AWS Certificate Manager)

---

## Backup & Version Control

### Git Best Practices
```bash
# Never commit
- node_modules/
- dist/
- .env files
- .DS_Store

# Always commit
- src/
- public/
- package.json
- package-lock.json
- README.md
```

### GitHub Releases
Create releases for major versions:
```bash
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0
```

---

## Cost Breakdown

### Free Tier Hosting
- **Netlify**: 100GB bandwidth/month, 300 build minutes
- **Vercel**: Unlimited bandwidth, 100GB bandwidth/month
- **GitHub Pages**: Unlimited for public repos
- **Firebase**: 10GB storage, 360MB/day downloads

### Estimated Costs (if exceeding free tier)
- Netlify Pro: $19/month
- Vercel Pro: $20/month
- AWS: ~$1-5/month (depends on traffic)
- Custom domain: $10-15/year

---

## Support & Resources

### Getting Help
- [Vite Discord](https://chat.vitejs.dev/)
- [React Discord](https://discord.gg/react)
- Stack Overflow
- GitHub Issues

### Documentation
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment](https://react.dev/learn/start-a-new-react-project)

---

**Your ExpenseTracker is now ready for the world! 🌍🚀**
