import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'support' | 'editor';
  avatar?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  features: string[];
  basePrice: number;
  packages: Package[];
  deliveryEstimate: string;
  revisions: number;
  images: string[];
  videoPreview?: string;
  maintenanceCost?: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
  type: 'service' | 'website' | 'app' | 'video' | 'editing' | 'simulator' | 'product';
  tags: string[];
  previews?: Preview[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  features: string[];
  deliveryDays: number;
  revisions: number;
  isPopular?: boolean;
}

export interface Preview {
  id: string;
  title: string;
  imageUrl: string;
  type: 'desktop' | 'tablet' | 'mobile' | 'interactive' | 'video';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  images: string[];
  category: string;
  stock: number;
  tags: string[];
  type: 'physical' | 'digital' | 'template' | 'asset';
  specifications?: string[];
}

export interface Booking {
  id: string;
  userId: string;
  serviceId?: string;
  productId?: string;
  serviceName: string;
  packageId?: string;
  packageName?: string;
  quantity: number;
  basePrice: number;
  maintenanceCost: number;
  discount: number;
  estimatedTotal: number;
  status: 'new' | 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'pending' | 'paid' | 'partially_paid' | 'refunded' | 'failed';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  projectDescription: string;
  deadline?: string;
  referenceLinks?: string[];
  additionalInstructions?: string;
  createdAt: string;
  updatedAt: string;
  revisions?: Revision[];
  files?: UploadedFile[];
}

export interface Revision {
  id: string;
  bookingId: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  response?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  bookingId: string;
  serviceName: string;
  rating: number;
  review: string;
  isVerified: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
  createdAt: string;
  adminResponse?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxDiscount?: number;
  minOrder?: number;
  applicableServices?: string[];
  expiryDate: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'project' | 'revision' | 'message' | 'offer' | 'system';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  video?: string;
  technologies: string[];
  services: string[];
  features: string[];
  livePreview?: string;
  isPublished: boolean;
  isFeatured: boolean;
}

// Store Interfaces
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (data: Partial<User> & { password: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string; discount: number };
  appliedCoupon: Coupon | null;
}

interface CartItem {
  id: string;
  serviceId?: string;
  productId?: string;
  name: string;
  type: 'service' | 'product' | 'package';
  packageId?: string;
  packageName?: string;
  price: number;
  quantity: number;
  maintenanceCost: number;
  image?: string;
}

interface BookingState {
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  getBookingsByUser: (userId: string) => Booking[];
}

interface WishlistState {
  items: string[];
  toggleItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

interface ReviewState {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;
  getApprovedReviews: (serviceName?: string) => Review[];
  getAverageRating: (serviceName?: string) => number;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (userId: string) => void;
  getUnreadCount: (userId: string) => number;
}

interface AdminState {
  services: Service[];
  products: Product[];
  portfolio: PortfolioItem[];
  coupons: Coupon[];
  settings: AdminSettings;
  updateService: (id: string, data: Partial<Service>) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  deleteService: (id: string) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (id: string, data: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usedCount'>) => void;
  updateCoupon: (id: string, data: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
  updateSettings: (settings: Partial<AdminSettings>) => void;
}

export interface AdminSettings {
  companyName: string;
  companyEmail: string;
  companyPhone1: string;
  companyPhone2: string;
  qrCodeUrl: string;
  qrDestination: string;
  maintenanceCosts: number[];
  defaultDeliveryDays: number;
  enablePayments: boolean;
  paymentProvider: string;
  enableWhatsApp: boolean;
  whatsappNumber: string;
  socialLinks: { platform: string; url: string }[];
  policies: {
    privacy: string;
    terms: string;
    refund: string;
    booking: string;
    maintenance: string;
    review: string;
  };
}

// Initial Data
const initialServices: Service[] = [
  {
    id: 'svc-001',
    name: 'Professional Business Website',
    category: 'websites',
    subcategory: 'normal',
    description: 'A clean, responsive, professional website for your business. Includes modern design, SEO optimization, contact forms, and mobile responsiveness.',
    features: ['Responsive Design', 'SEO Optimized', 'Contact Form', 'Up to 5 Pages', 'Mobile Friendly', 'Fast Loading', 'SSL Ready'],
    basePrice: 15000,
    packages: [
      { id: 'pkg-001a', name: 'Basic', price: 15000, features: ['Up to 5 pages', 'Responsive design', 'Contact form', 'Basic SEO'], deliveryDays: 5, revisions: 2 },
      { id: 'pkg-001b', name: 'Standard', price: 25000, features: ['Up to 10 pages', 'Custom animations', 'Blog integration', 'Advanced SEO', 'Social media links'], deliveryDays: 7, revisions: 3, isPopular: true },
      { id: 'pkg-001c', name: 'Premium', price: 40000, features: ['Up to 20 pages', 'Custom illustrations', 'CMS integration', 'Analytics dashboard', 'Priority support', '3 months maintenance'], deliveryDays: 14, revisions: 5 }
    ],
    deliveryEstimate: '5-14 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 3000,
    isFeatured: true,
    type: 'website',
    tags: ['business', 'responsive', 'professional'],
    previews: [
      { id: 'prev-001a', title: 'Desktop View', imageUrl: '', type: 'desktop' },
      { id: 'prev-001b', title: 'Mobile View', imageUrl: '', type: 'mobile' }
    ]
  },
  {
    id: 'svc-002',
    name: '3D Interactive Website',
    category: 'websites',
    subcategory: '3d',
    description: 'Immersive 3D website experience with WebGL, Three.js animations, interactive product showcases, and stunning visual effects.',
    features: ['3D Animations', 'WebGL/Three.js', 'Interactive Elements', 'Product Showcase', 'Parallax Effects', 'Custom 3D Models'],
    basePrice: 50000,
    packages: [
      { id: 'pkg-002a', name: 'Basic 3D', price: 50000, features: ['Single 3D scene', 'Basic interactions', 'Responsive', 'Optimized performance'], deliveryDays: 14, revisions: 2 },
      { id: 'pkg-002b', name: 'Advanced 3D', price: 80000, features: ['Multiple 3D scenes', 'Custom models', 'Scroll animations', 'Interactive product viewer'], deliveryDays: 21, revisions: 3, isPopular: true },
      { id: 'pkg-002c', name: 'Hyper-Realistic', price: 150000, features: ['Full 3D experience', 'Photorealistic models', 'Physics simulation', 'Custom shaders', 'AR integration ready'], deliveryDays: 30, revisions: 5 }
    ],
    deliveryEstimate: '14-30 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 6000,
    isFeatured: true,
    isTrending: true,
    type: 'website',
    tags: ['3d', 'interactive', 'immersive', 'webgl'],
    previews: [
      { id: 'prev-002a', title: '3D Desktop', imageUrl: '', type: 'desktop' },
      { id: 'prev-002b', title: 'Interactive Demo', imageUrl: '', type: 'interactive' }
    ]
  },
  {
    id: 'svc-003',
    name: 'AI Video Production',
    category: 'ai-videos',
    subcategory: 'ai-generated',
    description: 'Professional AI-generated videos for marketing, social media, product showcases, and creative content using cutting-edge AI tools.',
    features: ['AI-Generated Content', 'Custom Scripts', 'Voice Over', 'Background Music', 'Multiple Formats', 'HD/4K Quality'],
    basePrice: 8000,
    packages: [
      { id: 'pkg-003a', name: 'Short Form', price: 8000, features: ['Up to 60 seconds', 'AI visuals', 'Background music', '1 format'], deliveryDays: 3, revisions: 2 },
      { id: 'pkg-003b', name: 'Standard', price: 15000, features: ['Up to 3 minutes', 'Custom script', 'AI voiceover', 'Multiple formats', 'Social media ready'], deliveryDays: 5, revisions: 3, isPopular: true },
      { id: 'pkg-003c', name: 'Premium', price: 30000, features: ['Up to 10 minutes', 'Full production', 'Custom AI models', 'Multiple languages', 'Unlimited formats'], deliveryDays: 10, revisions: 5 }
    ],
    deliveryEstimate: '3-10 working days',
    revisions: 3,
    images: [],
    type: 'video',
    tags: ['ai', 'video', 'marketing', 'social-media'],
  },
  {
    id: 'svc-004',
    name: 'Mobile App Development',
    category: 'apps',
    subcategory: 'cross-platform',
    description: 'Native-quality cross-platform mobile applications for Android and iOS. Built with modern frameworks for performance and scalability.',
    features: ['Cross-Platform', 'Native Performance', 'Push Notifications', 'Offline Support', 'API Integration', 'App Store Ready'],
    basePrice: 60000,
    packages: [
      { id: 'pkg-004a', name: 'MVP', price: 60000, features: ['Core features', 'Single platform', 'Basic UI', 'API integration'], deliveryDays: 21, revisions: 2 },
      { id: 'pkg-004b', name: 'Full App', price: 120000, features: ['All features', 'Both platforms', 'Custom UI/UX', 'Admin panel', 'Analytics'], deliveryDays: 45, revisions: 4, isPopular: true },
      { id: 'pkg-004c', name: 'Enterprise', price: 250000, features: ['Unlimited features', 'Both platforms', 'Custom design system', 'Advanced security', 'Scalable architecture', '12 months support'], deliveryDays: 90, revisions: 10 }
    ],
    deliveryEstimate: '21-90 working days',
    revisions: 4,
    images: [],
    maintenanceCost: 8000,
    isFeatured: true,
    type: 'app',
    tags: ['mobile', 'android', 'ios', 'cross-platform'],
  },
  {
    id: 'svc-005',
    name: 'Professional Video Editing',
    category: 'editing',
    subcategory: 'video',
    description: 'Professional video editing services including color grading, motion graphics, transitions, sound design, and cinematic finishing.',
    features: ['Color Grading', 'Motion Graphics', 'Sound Design', 'Transitions', 'Subtitles', 'Multiple Formats'],
    basePrice: 3000,
    packages: [
      { id: 'pkg-005a', name: 'Basic Edit', price: 3000, features: ['Cut & trim', 'Basic transitions', 'Background music', 'Up to 5 min'], deliveryDays: 2, revisions: 1 },
      { id: 'pkg-005b', name: 'Professional', price: 8000, features: ['Color grading', 'Motion graphics', 'Sound design', 'Custom transitions', 'Up to 15 min'], deliveryDays: 4, revisions: 2, isPopular: true },
      { id: 'pkg-005c', name: 'Cinematic', price: 20000, features: ['Full post-production', 'VFX', 'Custom animations', 'Professional color', 'Up to 30 min', 'Unlimited revisions'], deliveryDays: 7, revisions: 5 }
    ],
    deliveryEstimate: '2-7 working days',
    revisions: 2,
    images: [],
    type: 'editing',
    tags: ['editing', 'video', 'cinematic', 'motion-graphics'],
  },
  {
    id: 'svc-006',
    name: 'UI/UX Simulator',
    category: 'simulators',
    subcategory: 'concept',
    description: 'Interactive UI/UX simulators demonstrating future concept interfaces, OS designs, and application prototypes.',
    features: ['Interactive Prototype', 'Gesture Support', 'Multiple Screens', 'Animation Transitions', 'Concept Design'],
    basePrice: 25000,
    packages: [
      { id: 'pkg-006a', name: 'Basic Simulator', price: 25000, features: ['5-10 screens', 'Basic interactions', 'Single concept'], deliveryDays: 7, revisions: 2 },
      { id: 'pkg-006b', name: 'Advanced', price: 45000, features: ['15-25 screens', 'Complex interactions', 'Multiple concepts', 'Gesture support'], deliveryDays: 14, revisions: 3, isPopular: true },
      { id: 'pkg-006c', name: 'Full Experience', price: 80000, features: ['Unlimited screens', 'Full OS simulation', 'Custom animations', 'Voice commands demo'], deliveryDays: 21, revisions: 5 }
    ],
    deliveryEstimate: '7-21 working days',
    revisions: 3,
    images: [],
    type: 'simulator',
    tags: ['simulator', 'prototype', 'concept', 'ui-ux'],
  },
  {
    id: 'svc-007',
    name: 'Logo & Brand Identity',
    category: 'branding',
    subcategory: 'logo',
    description: 'Professional logo design and complete brand identity packages including color palette, typography, and brand guidelines.',
    features: ['Custom Logo', 'Brand Colors', 'Typography', 'Brand Guidelines', 'Multiple Formats', 'Social Media Kit'],
    basePrice: 5000,
    packages: [
      { id: 'pkg-007a', name: 'Logo Only', price: 5000, features: ['3 concepts', '2 revisions', 'PNG/SVG formats'], deliveryDays: 3, revisions: 2 },
      { id: 'pkg-007b', name: 'Brand Kit', price: 12000, features: ['5 concepts', 'Brand colors', 'Typography', 'Social media kit', 'Unlimited revisions'], deliveryDays: 5, revisions: 5, isPopular: true },
      { id: 'pkg-007c', name: 'Full Identity', price: 25000, features: ['Complete brand system', 'Brand guidelines PDF', 'Stationery design', 'Social templates', 'Business cards'], deliveryDays: 10, revisions: 10 }
    ],
    deliveryEstimate: '3-10 working days',
    revisions: 5,
    images: [],
    type: 'service',
    tags: ['logo', 'branding', 'design', 'identity'],
  },
  {
    id: 'svc-008',
    name: 'E-Commerce Website',
    category: 'websites',
    subcategory: 'ecommerce',
    description: 'Full-featured online store with product management, payment integration, inventory tracking, and customer management.',
    features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Order Management', 'Inventory System', 'Customer Accounts'],
    basePrice: 35000,
    packages: [
      { id: 'pkg-008a', name: 'Starter Store', price: 35000, features: ['Up to 50 products', 'Basic payment', 'Order management', 'Responsive design'], deliveryDays: 10, revisions: 2 },
      { id: 'pkg-008b', name: 'Growth Store', price: 65000, features: ['Unlimited products', 'Multiple payments', 'Inventory system', 'Customer accounts', 'Analytics'], deliveryDays: 21, revisions: 3, isPopular: true },
      { id: 'pkg-008c', name: 'Enterprise Store', price: 120000, features: ['Multi-vendor', 'Advanced analytics', 'Custom features', 'API integrations', 'Mobile app ready'], deliveryDays: 45, revisions: 5 }
    ],
    deliveryEstimate: '10-45 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 4500,
    isFeatured: true,
    type: 'website',
    tags: ['ecommerce', 'store', 'online-shop', 'payments'],
  },
  {
    id: 'svc-009',
    name: 'YouTube Video Editing',
    category: 'editing',
    subcategory: 'youtube',
    description: 'Professional YouTube video editing with engaging intros, outros, thumbnails, chapters, and optimized formatting.',
    features: ['Custom Intro/Outro', 'Thumbnail Design', 'Chapter Markers', 'Color Grading', 'Sound Enhancement', 'SEO Optimization'],
    basePrice: 2500,
    packages: [
      { id: 'pkg-009a', name: 'Basic YouTube', price: 2500, features: ['Cut & trim', 'Basic effects', 'Background music', 'Up to 15 min'], deliveryDays: 2, revisions: 1 },
      { id: 'pkg-009b', name: 'Pro YouTube', price: 6000, features: ['Custom intro/outro', 'Thumbnail', 'Color grading', 'Chapters', 'Up to 30 min'], deliveryDays: 3, revisions: 2, isPopular: true },
      { id: 'pkg-009c', name: 'Premium YouTube', price: 12000, features: ['Full production', 'Motion graphics', 'VFX', 'Multiple thumbnails', 'Series branding'], deliveryDays: 5, revisions: 3 }
    ],
    deliveryEstimate: '2-5 working days',
    revisions: 2,
    images: [],
    type: 'editing',
    tags: ['youtube', 'editing', 'video', 'content-creator'],
  },
  {
    id: 'svc-010',
    name: 'SEO & Digital Marketing',
    category: 'marketing',
    subcategory: 'seo',
    description: 'Complete SEO and digital marketing services to boost your online presence, drive traffic, and increase conversions.',
    features: ['Keyword Research', 'On-Page SEO', 'Off-Page SEO', 'Content Strategy', 'Social Media', 'Analytics Reports'],
    basePrice: 10000,
    packages: [
      { id: 'pkg-010a', name: 'Basic SEO', price: 10000, features: ['Keyword research', 'On-page optimization', 'Monthly report'], deliveryDays: 7, revisions: 1 },
      { id: 'pkg-010b', name: 'Growth Marketing', price: 20000, features: ['Full SEO', 'Social media management', 'Content calendar', 'Bi-weekly reports'], deliveryDays: 14, revisions: 2, isPopular: true },
      { id: 'pkg-010c', name: 'Complete Digital', price: 40000, features: ['Everything in Growth', 'Paid ads management', 'Email marketing', 'Conversion optimization', 'Weekly strategy calls'], deliveryDays: 30, revisions: 5 }
    ],
    deliveryEstimate: '7-30 working days',
    revisions: 2,
    images: [],
    maintenanceCost: 4000,
    type: 'service',
    tags: ['seo', 'marketing', 'digital', 'growth'],
  }
];

const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Business Website Template Pack',
    description: 'Collection of 10 premium business website templates. Fully responsive, easy to customize, and ready to deploy.',
    price: 2999,
    discount: 20,
    images: [],
    category: 'templates',
    stock: 999,
    tags: ['template', 'website', 'business'],
    type: 'template',
    specifications: ['10 Templates', 'HTML/CSS/JS', 'Responsive', 'Easy Customization']
  },
  {
    id: 'prod-002',
    name: 'Social Media Design Kit',
    description: 'Complete social media design kit with 100+ templates for Instagram, Facebook, Twitter, and LinkedIn.',
    price: 1499,
    images: [],
    category: 'design-assets',
    stock: 999,
    tags: ['social-media', 'design', 'templates'],
    type: 'digital',
    specifications: ['100+ Templates', 'PSD/Figma', 'All Platforms', 'Editable']
  },
  {
    id: 'prod-003',
    name: 'Video Editing Preset Bundle',
    description: 'Professional video editing presets for Premiere Pro, After Effects, and DaVinci Resolve.',
    price: 1999,
    discount: 15,
    images: [],
    category: 'design-assets',
    stock: 999,
    tags: ['video', 'presets', 'editing'],
    type: 'digital',
    specifications: ['50+ Presets', 'Color LUTs', 'Transitions', 'Motion Graphics']
  }
];

const initialPortfolio: PortfolioItem[] = [
  {
    id: 'port-001',
    title: 'TechStart Landing Page',
    description: 'Modern landing page for a tech startup with 3D elements and smooth animations.',
    category: 'websites',
    images: [],
    technologies: ['React', 'Three.js', 'Tailwind CSS'],
    services: ['Website Development', '3D Design'],
    features: ['3D Hero Section', 'Smooth Animations', 'Responsive', 'Fast Loading'],
    isPublished: true,
    isFeatured: true
  },
  {
    id: 'port-002',
    title: 'FoodDelivery App',
    description: 'Cross-platform food delivery application with real-time tracking and payment integration.',
    category: 'apps',
    images: [],
    technologies: ['React Native', 'Node.js', 'Firebase'],
    services: ['App Development', 'UI/UX Design'],
    features: ['Real-time Tracking', 'Payment Integration', 'Push Notifications', 'Rating System'],
    isPublished: true,
    isFeatured: true
  },
  {
    id: 'port-003',
    title: 'AI Product Showcase Video',
    description: 'AI-generated promotional video for a SaaS product launch.',
    category: 'ai-videos',
    images: [],
    video: '',
    technologies: ['AI Video Generation', 'After Effects'],
    services: ['AI Video Production', 'Motion Graphics'],
    features: ['AI-Generated Scenes', 'Custom Voiceover', 'Brand Consistency'],
    isPublished: true,
    isFeatured: false
  }
];

const initialCoupons: Coupon[] = [
  { id: 'coup-001', code: 'WELCOME10', type: 'percentage', value: 10, maxDiscount: 5000, minOrder: 5000, expiryDate: '2026-12-31', usageLimit: 100, usedCount: 0, isActive: true },
  { id: 'coup-002', code: 'FIRST20', type: 'percentage', value: 20, maxDiscount: 10000, minOrder: 10000, expiryDate: '2026-06-30', usageLimit: 50, usedCount: 0, isActive: true },
  { id: 'coup-003', code: 'SAVE500', type: 'fixed', value: 500, minOrder: 3000, expiryDate: '2026-12-31', usageLimit: 200, usedCount: 0, isActive: true }
];

const defaultSettings: AdminSettings = {
  companyName: 'ZKR Corporate',
  companyEmail: 'mayank.zkrcorporat@gmail.com',
  companyPhone1: '8141427749',
  companyPhone2: '7043961379',
  qrCodeUrl: '',
  qrDestination: 'contact',
  maintenanceCosts: [3000, 4000, 4500, 6000, 8000],
  defaultDeliveryDays: 7,
  enablePayments: false,
  paymentProvider: '',
  enableWhatsApp: false,
  whatsappNumber: '',
  socialLinks: [],
  policies: {
    privacy: 'Your privacy is important to us. We collect only necessary information to provide our services.',
    terms: 'By using our services, you agree to these terms and conditions.',
    refund: 'Refund requests must be made within 7 days of booking. Refunds are subject to project progress review.',
    booking: 'All bookings are subject to confirmation. We will contact you within 24 hours of your booking.',
    maintenance: 'Maintenance costs are separate from development costs. Plans can be monthly, yearly, or one-time as configured.',
    review: 'Reviews are only accepted from verified customers who have completed a purchase.'
  }
};

// Stores
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        // Demo: accept any login with demo accounts
        const users: User[] = JSON.parse(localStorage.getItem('zkr_users') || '[]');
        const user = users.find(u => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        // Auto-create demo admin
        if (email === 'admin@zkr.com') {
          const admin: User = { id: uuidv4(), name: 'Admin', email, phone: '8141427749', role: 'admin', createdAt: new Date().toISOString() };
          const allUsers = [...users, admin];
          localStorage.setItem('zkr_users', JSON.stringify(allUsers));
          set({ user: admin, isAuthenticated: true });
          return true;
        }
        // Auto-create demo customer
        if (email.includes('@')) {
          const customer: User = { id: uuidv4(), name: email.split('@')[0], email, phone: '', role: 'customer', createdAt: new Date().toISOString() };
          const allUsers = [...users, customer];
          localStorage.setItem('zkr_users', JSON.stringify(allUsers));
          set({ user: customer, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: (data) => {
        const users: User[] = JSON.parse(localStorage.getItem('zkr_users') || '[]');
        if (users.find(u => u.email === data.email)) return false;
        const newUser: User = {
          id: uuidv4(),
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          role: 'customer',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('zkr_users', JSON.stringify([...users, newUser]));
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => {
        const user = get().user;
        if (user) {
          const updated = { ...user, ...data };
          set({ user: updated });
          const users: User[] = JSON.parse(localStorage.getItem('zkr_users') || '[]');
          const idx = users.findIndex(u => u.id === user.id);
          if (idx >= 0) { users[idx] = updated; localStorage.setItem('zkr_users', JSON.stringify(users)); }
        }
      }
    }),
    { name: 'zkr-auth' }
  )
);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,
      addItem: (item) => {
        const items = get().items;
        const existing = items.find(i => i.id === item.id);
        if (existing) {
          set({ items: items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i) });
        } else {
          set({ items: [...items, item] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      updateQuantity: (id, qty) => set({ items: get().items.map(i => i.id === id ? { ...i, quantity: qty } : i) }),
      clearCart: () => set({ items: [], appliedCoupon: null }),
      applyCoupon: (code) => {
        const coupons: Coupon[] = JSON.parse(localStorage.getItem('zkr_coupons') || '[]');
        const initialCouponsStored = JSON.parse(localStorage.getItem('zkr_coupons_init') || 'false');
        let allCoupons = coupons;
        if (!initialCouponsStored) {
          localStorage.setItem('zkr_coupons', JSON.stringify(initialCoupons));
          localStorage.setItem('zkr_coupons_init', 'true');
          allCoupons = initialCoupons;
        }
        const coupon = allCoupons.find(c => c.code === code.toUpperCase());
        if (!coupon) return { success: false, message: 'Invalid coupon code', discount: 0 };
        if (!coupon.isActive) return { success: false, message: 'This coupon is no longer active', discount: 0 };
        if (new Date(coupon.expiryDate) < new Date()) return { success: false, message: 'This coupon has expired', discount: 0 };
        const subtotal = get().items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        if (coupon.minOrder && subtotal < coupon.minOrder) return { success: false, message: `Minimum order amount is ₹${coupon.minOrder.toLocaleString()}`, discount: 0 };
        let discount = coupon.type === 'percentage' ? (subtotal * coupon.value / 100) : coupon.value;
        if (coupon.maxDiscount && discount > coupon.maxDiscount) discount = coupon.maxDiscount;
        set({ appliedCoupon: coupon });
        return { success: true, message: `Coupon applied! You save ₹${discount.toLocaleString()}`, discount };
      }
    }),
    { name: 'zkr-cart' }
  )
);

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      createBooking: (bookingData) => {
        const booking: Booking = {
          ...bookingData,
          id: `BKG-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        set({ bookings: [...get().bookings, booking] });
        return booking;
      },
      updateBookingStatus: (id, status) => {
        set({ bookings: get().bookings.map(b => b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b) });
      },
      getBookingsByUser: (userId) => get().bookings.filter(b => b.userId === userId)
    }),
    { name: 'zkr-bookings' }
  )
);

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (id) => {
        const items = get().items;
        if (items.includes(id)) {
          set({ items: items.filter(i => i !== id) });
        } else {
          set({ items: [...items, id] });
        }
      },
      isInWishlist: (id) => get().items.includes(id),
      clearWishlist: () => set({ items: [] })
    }),
    { name: 'zkr-wishlist' }
  )
);

export const useReviewStore = create<ReviewState>()(
  persist(
    (set, get) => ({
      reviews: [],
      addReview: (review) => {
        const newReview: Review = { ...review, id: `REV-${Date.now()}`, createdAt: new Date().toISOString() };
        set({ reviews: [...get().reviews, newReview] });
      },
      approveReview: (id) => set({ reviews: get().reviews.map(r => r.id === id ? { ...r, status: 'approved' } : r) }),
      rejectReview: (id) => set({ reviews: get().reviews.map(r => r.id === id ? { ...r, status: 'rejected' } : r) }),
      deleteReview: (id) => set({ reviews: get().reviews.filter(r => r.id !== id) }),
      getApprovedReviews: (serviceName) => {
        let reviews = get().reviews.filter(r => r.status === 'approved');
        if (serviceName) reviews = reviews.filter(r => r.serviceName === serviceName);
        return reviews;
      },
      getAverageRating: (serviceName) => {
        const reviews = get().getApprovedReviews(serviceName);
        if (reviews.length === 0) return 0;
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      }
    }),
    { name: 'zkr-reviews' }
  )
);

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (notification) => {
        const newNotif: Notification = { ...notification, id: uuidv4(), createdAt: new Date().toISOString(), isRead: false };
        set({ notifications: [...get().notifications, newNotif] });
      },
      markAsRead: (id) => set({ notifications: get().notifications.map(n => n.id === id ? { ...n, isRead: true } : n) }),
      markAllAsRead: (userId) => set({ notifications: get().notifications.map(n => n.userId === userId ? { ...n, isRead: true } : n) }),
      getUnreadCount: (userId) => get().notifications.filter(n => n.userId === userId && !n.isRead).length
    }),
    { name: 'zkr-notifications' }
  )
);

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      services: initialServices,
      products: initialProducts,
      portfolio: initialPortfolio,
      coupons: initialCoupons,
      settings: defaultSettings,
      updateService: (id, data) => set({ services: get().services.map(s => s.id === id ? { ...s, ...data } : s) }),
      addService: (service) => set({ services: [...get().services, { ...service, id: `svc-${Date.now()}` }] }),
      deleteService: (id) => set({ services: get().services.filter(s => s.id !== id) }),
      updateProduct: (id, data) => set({ products: get().products.map(p => p.id === id ? { ...p, ...data } : p) }),
      addProduct: (product) => set({ products: [...get().products, { ...product, id: `prod-${Date.now()}` }] }),
      deleteProduct: (id) => set({ products: get().products.filter(p => p.id !== id) }),
      addPortfolioItem: (item) => set({ portfolio: [...get().portfolio, { ...item, id: `port-${Date.now()}` }] }),
      updatePortfolioItem: (id, data) => set({ portfolio: get().portfolio.map(p => p.id === id ? { ...p, ...data } : p) }),
      deletePortfolioItem: (id) => set({ portfolio: get().portfolio.filter(p => p.id !== id) }),
      addCoupon: (coupon) => set({ coupons: [...get().coupons, { ...coupon, id: `coup-${Date.now()}`, usedCount: 0 }] }),
      updateCoupon: (id, data) => set({ coupons: get().coupons.map(c => c.id === id ? { ...c, ...data } : c) }),
      deleteCoupon: (id) => set({ coupons: get().coupons.filter(c => c.id !== id) }),
      updateSettings: (settings) => set({ settings: { ...get().settings, ...settings } })
    }),
    { name: 'zkr-admin' }
  )
);

// Initialize data in localStorage
if (typeof window !== 'undefined') {
  if (!localStorage.getItem('zkr_services_init')) {
    localStorage.setItem('zkr_services', JSON.stringify(initialServices));
    localStorage.setItem('zkr_services_init', 'true');
  }
  if (!localStorage.getItem('zkr_coupons_init')) {
    localStorage.setItem('zkr_coupons', JSON.stringify(initialCoupons));
    localStorage.setItem('zkr_coupons_init', 'true');
  }
}
