# ZKR Corporate - Digital Services Platform

## 🎯 Platform Overview

**ZKR Corporate** is a complete digital services marketplace and booking platform built with React, TypeScript, and Tailwind CSS. It provides a professional, production-ready solution for offering and booking digital services including websites, apps, AI videos, editing, simulators, and more.

**Tagline:** "Your Ideas. Our Technology."

---

## ✨ Key Features

### 🎨 Real Interactive Previews
Every service category has a **realistic, interactive preview** that demonstrates the actual quality and style customers can expect:

- **3D Websites**: Interactive 3D product viewer with mouse-controlled rotation, studio lighting, and product switching
- **2D Animated Websites**: Live animated landing page with SVG illustrations, moving clouds, birds, and parallax effects
- **Motion Websites**: Cinematic motion-driven experience with floating orbs, rotating rings, and dynamic text animations
- **Cursor Interactive**: Eyes follow cursor movement, floating elements react to mouse position, click ripples
- **Hyper-Realistic**: Photorealistic 3D product showcase with auto-rotation and drag-to-rotate
- **Normal Websites**: Professional business website with navigation, hero section, features, and stats
- **E-Commerce**: Fully functional online store with product grid, cart system, and checkout flow
- **Mobile Apps**: Realistic mobile app interface with tabs, transactions, and interactive elements
- **AI Videos**: AI generation visualization with neural network background and character creation
- **Video Editing**: Professional video editor interface with timeline, playhead, and effects
- **Simulators**: Interactive OS simulator with multiple screens and smooth transitions

### 🛍️ Complete Marketplace
- **70+ Services** across 8 categories
- **10 Digital Products** (templates, design assets, presets)
- **8 Portfolio Items** showcasing real work
- **3 Active Coupons** with discount system

### 📦 Service Categories

#### 1. **Websites** (7 types)
- Normal Business Website
- Advanced Website (with dashboard preview)
- 2D Animated Website
- 3D Interactive Website
- Motion Website
- Cursor Interactive Website
- Hyper-Realistic Website
- E-Commerce Website

#### 2. **Apps** (4 types)
- Mobile App Development (Cross-platform)
- Android App
- iOS App
- Business Management App

#### 3. **AI Videos** (7 types)
- AI Video Production
- YouTube Video
- YouTube Shorts / Reels
- Promotional Video
- Explainer Video
- Cinematic Video
- Educational Video

#### 4. **Editing** (50+ services)
- Professional Video Editing
- YouTube Video Editing
- Shorts/Reels Editing
- Gaming Video Editing
- Color Grading
- Motion Graphics
- Thumbnail Design
- Photo Editing
- Background Removal
- Object Removal
- AI Enhancement
- Video Upscaling
- Transitions
- VFX
- Sound Design
- Subtitles & Captions
- Intro & Outro
- Logo Animation
- Product Video
- Social Media Video
- Wedding Video
- Corporate Video
- Podcast Video
- Drone Video
- Music Video
- Documentary
- Animation
- Live Stream
- Real Estate
- Food Video
- Fitness Video
- Travel Vlog
- Testimonial
- Event Highlight
- Green Screen
- Speed Ramp
- Split Screen
- Text Animation
- Meme & Comedy
- Infographic
- Whiteboard Animation
- Talking Head
- Multi-camera
- HDR Video
- 360° Video
- Timelapse
- Before/After
- Reaction Video
- Course/Tutorial
- Advertisement
- Compilation
- ASMR
- News/Report
- Music Remix

#### 5. **Simulators** (5 types)
- UI/UX Simulator
- Android Concept Simulator
- iOS Concept Simulator
- Future OS Concept
- Educational Simulator

#### 6. **Branding**
- Logo & Brand Identity

#### 7. **Marketing**
- SEO & Digital Marketing
- Social Media Management

### 🎯 Core Functionality

#### Customer Features
- **Browse Services**: Filter by category, price range, sort options
- **Interactive Previews**: Experience service quality before booking
- **Service Comparison**: Compare 2-4 services side-by-side
- **Price Calculator**: Get instant estimates with maintenance costs
- **Build My Idea**: AI-powered service recommendations
- **Wishlist**: Save favorite services
- **Shopping Cart**: Add services/products, apply coupons
- **Booking System**: Multi-step booking with package selection
- **Customer Dashboard**: Track bookings, notifications, reviews
- **Review System**: Leave verified reviews after completion

#### Admin Features
- **Dashboard**: Analytics, revenue, pending bookings
- **Service Management**: Add/edit/delete services
- **Product Management**: Manage digital products
- **Portfolio Management**: Showcase completed work
- **Booking Management**: Update status, assign team
- **Review Moderation**: Approve/reject reviews
- **Coupon Management**: Create discount codes
- **Settings**: Company info, policies, QR code

### 💰 Pricing System
- **Base Price**: Starting price for each service
- **Package Tiers**: Basic, Standard/Professional, Premium
- **Maintenance Cost**: Separate from development (₹3,000 - ₹8,000)
- **Discounts**: Coupon system with percentage/fixed discounts
- **Combo Packages**: Bundled services with savings

### 🔐 Authentication & Roles
- **Customer**: Browse, book, review
- **Admin**: Full platform management
- **Support**: Customer assistance
- **Editor**: Content management

### 📱 Responsive Design
- Desktop optimized
- Tablet friendly
- Mobile bottom navigation
- Touch-friendly interactions
- Dark/Light theme support

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Demo Accounts
- **Admin**: Login with `admin@zkr.com` (any password)
- **Customer**: Login with any email (auto-creates account)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Cards.tsx              # Service, Product, Portfolio cards
│   ├── Layout.tsx             # Header, Footer, Navigation
│   └── PreviewShowcase.tsx    # All interactive previews
├── pages/
│   ├── Home.tsx               # Homepage with hero & gallery
│   ├── Services.tsx           # Service listing & detail
│   ├── Products.tsx           # Product marketplace
│   ├── Portfolio.tsx          # Portfolio showcase
│   ├── BuildMyIdea.tsx        # AI service advisor
│   ├── Compare.tsx            # Service comparison
│   ├── Dashboard.tsx          # Customer dashboard
│   ├── Admin.tsx              # Admin panel
│   ├── Auth.tsx               # Login/Register
│   └── OtherPages.tsx         # Contact, About, Cart, etc.
├── store/
│   └── index.ts               # Zustand state management
├── App.tsx                    # Router setup
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

---

## 🎨 Preview System

Each service type has a dedicated preview component that demonstrates real functionality:

### 3D Website Preview (`Preview3D`)
- Mouse-controlled 3D rotation
- Product showcase with lighting
- Interactive product selector
- Price display
- Grid floor with perspective

### 2D Animated Preview (`Preview2D`)
- SVG animated landscape
- Moving clouds and birds
- Animated house with smoke
- Driving car
- Swaying tree
- Scroll effects

### Motion Preview (`PreviewMotion`)
- 4-phase animation cycle
- Text reveal animations
- Parallax card slides
- Video-like scene with shapes
- Scrolling text effects

### Cursor Interactive (`PreviewCursor`)
- Eyes follow mouse cursor
- Face reacts to cursor position
- Floating tech badges
- Click ripple effects
- Custom cursor glow

### Hyper-Realistic (`PreviewHyperRealistic`)
- Auto-rotating 3D product
- Drag-to-rotate interaction
- Studio lighting effects
- Product info overlay
- Color options

### Normal Website (`PreviewWebsite`)
- Browser chrome
- Navigation bar
- Hero section with CTA
- Feature cards
- Stats section

### E-Commerce (`PreviewEcommerce`)
- Product grid
- Add to cart functionality
- Cart counter
- Sale banner
- Product details

### Mobile App (`PreviewApp`)
- Phone frame mockup
- Status bar
- App header
- Balance card
- Quick actions
- Transaction list
- Bottom navigation

### AI Video (`PreviewAIVideo`)
- Neural network background
- AI character generation
- Particle effects
- Progress indicator
- Generation status

### Video Editing (`PreviewEditing`)
- Editor toolbar
- Preview area with effects
- Timeline with tracks
- Animated playhead
- Audio waveform

### Simulator (`PreviewSimulator`)
- Phone frame
- Multiple screens (Home, Apps, Settings)
- Smooth transitions
- Interactive icons
- Status bar

---

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **date-fns** - Date utilities
- **UUID** - Unique IDs

---

## 📊 Data Storage

The platform uses **localStorage** for data persistence (simulating a database):

- `zkr-auth` - User authentication
- `zkr-cart` - Shopping cart
- `zkr-bookings` - Booking records
- `zkr-wishlist` - Saved items
- `zkr-reviews` - Customer reviews
- `zkr-notifications` - Notifications
- `zkr-admin` - Services, products, settings
- `zkr-users` - User accounts
- `zkr-coupons` - Discount codes

**Note:** For production deployment, replace localStorage with a real backend database (PostgreSQL, MongoDB, etc.)

---

## 🎯 Key Principles

1. **Real Previews**: Every service shows actual quality, not fake screenshots
2. **No Fake Data**: Reviews, ratings, and statistics are real (empty until customers add them)
3. **Transparent Pricing**: Clear breakdown of development + maintenance costs
4. **Customer-First**: Easy booking flow, clear communication, verified reviews
5. **Scalable**: Admin can add unlimited services, products, and categories
6. **Professional**: Clean design, smooth animations, responsive layout

---

## 📞 Contact Information

- **Email**: mayank.zkrcorporat@gmail.com
- **Phone**: 8141427749, 7043961379
- **Company**: ZKR Corporate

---

## 🔒 Security Notes

For production deployment:
- Replace localStorage with secure backend database
- Implement proper authentication (JWT, OAuth)
- Add rate limiting to prevent abuse
- Use environment variables for sensitive data
- Implement server-side validation
- Add payment gateway integration (Razorpay, Stripe)
- Set up email service for notifications
- Configure file upload with proper validation
- Add CSRF protection
- Implement proper error handling

---

## 🚀 Future Enhancements

- [ ] Real backend API (Node.js/Express or Django)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] Email notifications (SendGrid/AWS SES)
- [ ] File upload system (AWS S3/Cloudinary)
- [ ] Real-time chat support (WebSocket)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)

---

## 📄 License

This is a custom-built platform for ZKR Corporate.

---

## 🙏 Credits

Built with modern web technologies and best practices. Designed to be production-ready and scalable.

**"IF IT IS LISTED ON THE WEBSITE, THE CUSTOMER SHOULD BE ABLE TO BOOK, ORDER, OR REQUEST IT."**
