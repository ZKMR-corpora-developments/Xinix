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
  complexity?: 'basic' | 'intermediate' | 'advanced' | 'expert';
  level?: 'basic' | 'advanced' | 'professional' | 'premium';
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

// ============ COMPREHENSIVE SERVICE DATA ============

const initialServices: Service[] = [
  // === WEBSITE SERVICES ===
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
    complexity: 'intermediate',
    previews: [
      { id: 'prev-001a', title: 'Desktop View', imageUrl: '', type: 'desktop' },
      { id: 'prev-001b', title: 'Mobile View', imageUrl: '', type: 'mobile' },
      { id: 'prev-001c', title: 'Tablet View', imageUrl: '', type: 'tablet' }
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
    complexity: 'expert',
    previews: [
      { id: 'prev-002a', title: '3D Desktop', imageUrl: '', type: 'desktop' },
      { id: 'prev-002b', title: 'Interactive Demo', imageUrl: '', type: 'interactive' }
    ]
  },
  {
    id: 'svc-011',
    name: 'Advanced Website',
    category: 'websites',
    subcategory: 'advanced',
    description: 'Feature-rich website with custom functionality, API integrations, user authentication, and dynamic content management.',
    features: ['Custom Functionality', 'API Integration', 'User Authentication', 'Dynamic Content', 'Admin Panel', 'Database'],
    basePrice: 30000,
    packages: [
      { id: 'pkg-011a', name: 'Standard', price: 30000, features: ['Custom features', 'API integration', 'User login', '5 dynamic pages'], deliveryDays: 10, revisions: 2 },
      { id: 'pkg-011b', name: 'Pro', price: 55000, features: ['Advanced features', 'Multiple APIs', 'Admin dashboard', 'Unlimited pages', 'Analytics'], deliveryDays: 18, revisions: 3, isPopular: true },
      { id: 'pkg-011c', name: 'Enterprise', price: 90000, features: ['Full custom system', 'Microservices', 'Load balancing', 'CDN', '24/7 monitoring'], deliveryDays: 30, revisions: 5 }
    ],
    deliveryEstimate: '10-30 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 4500,
    isFeatured: true,
    type: 'website',
    tags: ['advanced', 'custom', 'dynamic'],
    complexity: 'advanced'
  },
  {
    id: 'svc-012',
    name: '2D Animated Website',
    category: 'websites',
    subcategory: '2d',
    description: 'Engaging 2D animated website with smooth transitions, scroll-triggered animations, and interactive illustrations.',
    features: ['2D Animations', 'Scroll Effects', 'Interactive Illustrations', 'Smooth Transitions', 'Lottie Animations', 'Engaging UX'],
    basePrice: 25000,
    packages: [
      { id: 'pkg-012a', name: 'Basic', price: 25000, features: ['5 animated sections', 'Basic transitions', 'Responsive'], deliveryDays: 7, revisions: 2 },
      { id: 'pkg-012b', name: 'Creative', price: 40000, features: ['Full page animations', 'Custom illustrations', 'Scroll-triggered', 'Micro-interactions'], deliveryDays: 12, revisions: 3, isPopular: true },
      { id: 'pkg-012c', name: 'Premium', price: 65000, features: ['Complete animated experience', 'Custom characters', 'Story-driven', 'Sound effects'], deliveryDays: 20, revisions: 5 }
    ],
    deliveryEstimate: '7-20 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 4000,
    type: 'website',
    tags: ['2d', 'animated', 'creative', 'illustrations'],
    complexity: 'advanced'
  },
  {
    id: 'svc-013',
    name: 'Motion Website',
    category: 'websites',
    subcategory: 'motion',
    description: 'Cinematic motion-driven website with fluid animations, parallax scrolling, and immersive storytelling experience.',
    features: ['Cinematic Motion', 'Parallax Scrolling', 'Fluid Transitions', 'Story-driven', 'Video Integration', 'Immersive UX'],
    basePrice: 35000,
    packages: [
      { id: 'pkg-013a', name: 'Standard', price: 35000, features: ['Motion sections', 'Parallax', 'Video backgrounds'], deliveryDays: 10, revisions: 2 },
      { id: 'pkg-013b', name: 'Cinematic', price: 60000, features: ['Full motion experience', 'Custom animations', 'Scroll storytelling', 'Sound design'], deliveryDays: 18, revisions: 3, isPopular: true },
      { id: 'pkg-013c', name: 'Award-Winning', price: 100000, features: ['Complete cinematic site', 'Custom video', 'Award-level design', 'Performance optimized'], deliveryDays: 30, revisions: 5 }
    ],
    deliveryEstimate: '10-30 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 4500,
    isTrending: true,
    type: 'website',
    tags: ['motion', 'cinematic', 'parallax', 'storytelling'],
    complexity: 'expert'
  },
  {
    id: 'svc-014',
    name: 'Cursor Interactive Website',
    category: 'websites',
    subcategory: 'cursor-interactive',
    description: 'Cutting-edge website with cursor-following effects, interactive particles, and unique mouse-driven experiences.',
    features: ['Cursor Effects', 'Particle Systems', 'Interactive Elements', 'Mouse Tracking', 'Custom Cursor', 'Reactive Design'],
    basePrice: 40000,
    packages: [
      { id: 'pkg-014a', name: 'Basic Interactive', price: 40000, features: ['Cursor effects', 'Basic particles', 'Hover interactions'], deliveryDays: 10, revisions: 2 },
      { id: 'pkg-014b', name: 'Advanced', price: 70000, features: ['Custom cursor', 'Particle systems', 'Reactive elements', 'Gesture support'], deliveryDays: 16, revisions: 3, isPopular: true },
      { id: 'pkg-014c', name: 'Immersive', price: 120000, features: ['Full interactive experience', 'AI-driven responses', 'Multi-touch', 'Voice interaction'], deliveryDays: 25, revisions: 5 }
    ],
    deliveryEstimate: '10-25 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 6000,
    isNew: true,
    type: 'website',
    tags: ['cursor', 'interactive', 'particles', 'cutting-edge'],
    complexity: 'expert'
  },
  {
    id: 'svc-015',
    name: 'Hyper-Realistic Website',
    category: 'websites',
    subcategory: 'hyper-realistic',
    description: 'Ultra-premium website with photorealistic 3D renders, real-time lighting, and immersive virtual experiences.',
    features: ['Photorealistic 3D', 'Real-time Rendering', 'Virtual Tours', 'Dynamic Lighting', 'PBR Materials', 'VR Ready'],
    basePrice: 100000,
    packages: [
      { id: 'pkg-015a', name: 'Standard', price: 100000, features: ['3D product viewer', 'Real-time rendering', 'Basic interactions'], deliveryDays: 21, revisions: 2 },
      { id: 'pkg-015b', name: 'Premium', price: 180000, features: ['Virtual tour', 'Custom environments', 'Dynamic lighting', 'AR ready'], deliveryDays: 35, revisions: 3, isPopular: true },
      { id: 'pkg-015c', name: 'Ultimate', price: 300000, features: ['Full VR experience', 'Photorealistic scenes', 'Physics engine', 'Multi-platform'], deliveryDays: 60, revisions: 5 }
    ],
    deliveryEstimate: '21-60 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 8000,
    isFeatured: true,
    type: 'website',
    tags: ['hyper-realistic', 'vr', '3d', 'photorealistic'],
    complexity: 'expert'
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
    complexity: 'advanced'
  },

  // === APP SERVICES ===
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
    complexity: 'expert'
  },
  {
    id: 'svc-016',
    name: 'Android App Development',
    category: 'apps',
    subcategory: 'android',
    description: 'Native Android applications built with Kotlin/Java. Optimized for performance, material design, and Play Store deployment.',
    features: ['Native Android', 'Material Design', 'Play Store Ready', 'Offline Mode', 'Background Services', 'Push Notifications'],
    basePrice: 45000,
    packages: [
      { id: 'pkg-016a', name: 'Basic App', price: 45000, features: ['5-10 screens', 'Basic features', 'Material design'], deliveryDays: 14, revisions: 2 },
      { id: 'pkg-016b', name: 'Professional', price: 85000, features: ['15-25 screens', 'API integration', 'Offline support', 'Analytics'], deliveryDays: 30, revisions: 3, isPopular: true },
      { id: 'pkg-016c', name: 'Enterprise', price: 150000, features: ['Unlimited screens', 'Advanced features', 'Custom architecture', 'Testing suite'], deliveryDays: 60, revisions: 5 }
    ],
    deliveryEstimate: '14-60 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 6000,
    type: 'app',
    tags: ['android', 'native', 'kotlin', 'material-design'],
    complexity: 'advanced'
  },
  {
    id: 'svc-017',
    name: 'iOS App Development',
    category: 'apps',
    subcategory: 'ios',
    description: 'Native iOS applications built with Swift. Beautiful, performant apps following Apple Human Interface Guidelines.',
    features: ['Native iOS', 'Swift', 'HIG Compliant', 'App Store Ready', 'Core ML', 'ARKit Support'],
    basePrice: 50000,
    packages: [
      { id: 'pkg-017a', name: 'Basic App', price: 50000, features: ['5-10 screens', 'Swift UI', 'Basic features'], deliveryDays: 14, revisions: 2 },
      { id: 'pkg-017b', name: 'Professional', price: 95000, features: ['15-25 screens', 'Advanced features', 'CloudKit', 'Widgets'], deliveryDays: 30, revisions: 3, isPopular: true },
      { id: 'pkg-017c', name: 'Premium', price: 170000, features: ['Full app', 'AR features', 'Apple Watch', 'CarPlay ready'], deliveryDays: 60, revisions: 5 }
    ],
    deliveryEstimate: '14-60 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 6000,
    type: 'app',
    tags: ['ios', 'swift', 'apple', 'native'],
    complexity: 'advanced'
  },
  {
    id: 'svc-018',
    name: 'Business Management App',
    category: 'apps',
    subcategory: 'business',
    description: 'Custom business management application with CRM, inventory, invoicing, team management, and analytics dashboard.',
    features: ['CRM System', 'Inventory Management', 'Invoicing', 'Team Management', 'Analytics', 'Role-based Access'],
    basePrice: 80000,
    packages: [
      { id: 'pkg-018a', name: 'Starter', price: 80000, features: ['Basic CRM', 'Simple inventory', 'Invoicing'], deliveryDays: 21, revisions: 2 },
      { id: 'pkg-018b', name: 'Business', price: 150000, features: ['Full CRM', 'Advanced inventory', 'Multi-user', 'Reports', 'Integrations'], deliveryDays: 45, revisions: 3, isPopular: true },
      { id: 'pkg-018c', name: 'Enterprise', price: 300000, features: ['Complete ERP', 'Custom modules', 'API ecosystem', 'White-label'], deliveryDays: 90, revisions: 5 }
    ],
    deliveryEstimate: '21-90 working days',
    revisions: 3,
    images: [],
    maintenanceCost: 8000,
    type: 'app',
    tags: ['business', 'crm', 'management', 'enterprise'],
    complexity: 'expert'
  },

  // === AI VIDEO SERVICES ===
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
    complexity: 'intermediate'
  },
  {
    id: 'svc-019',
    name: 'YouTube Video (AI)',
    category: 'ai-videos',
    subcategory: 'youtube',
    description: 'AI-produced YouTube videos with engaging visuals, professional voiceover, and optimized formatting for maximum engagement.',
    features: ['AI Visuals', 'Professional Voiceover', 'YouTube Optimized', 'Thumbnail Design', 'Chapters', 'SEO Description'],
    basePrice: 5000,
    packages: [
      { id: 'pkg-019a', name: 'Basic', price: 5000, features: ['Up to 5 min', 'AI visuals', 'Background music'], deliveryDays: 2, revisions: 1 },
      { id: 'pkg-019b', name: 'Pro', price: 12000, features: ['Up to 15 min', 'Custom script', 'AI voiceover', 'Thumbnail'], deliveryDays: 4, revisions: 2, isPopular: true },
      { id: 'pkg-019c', name: 'Premium', price: 25000, features: ['Up to 30 min', 'Full production', 'Series branding', 'End screens'], deliveryDays: 7, revisions: 3 }
    ],
    deliveryEstimate: '2-7 working days',
    revisions: 2,
    images: [],
    type: 'video',
    tags: ['youtube', 'ai', 'content', 'video'],
    complexity: 'intermediate'
  },
  {
    id: 'svc-020',
    name: 'AI YouTube Shorts / Reels',
    category: 'ai-videos',
    subcategory: 'shorts',
    description: 'Viral-ready AI-generated short-form videos optimized for YouTube Shorts, Instagram Reels, and TikTok.',
    features: ['Vertical Format', 'Trending Styles', 'AI Effects', 'Viral Hooks', 'Multiple Platforms', 'Quick Delivery'],
    basePrice: 3000,
    packages: [
      { id: 'pkg-020a', name: 'Single Short', price: 3000, features: ['Up to 60 sec', 'AI visuals', '1 platform'], deliveryDays: 1, revisions: 1 },
      { id: 'pkg-020b', name: 'Pack of 5', price: 12000, features: ['5 shorts', 'Consistent branding', 'All platforms'], deliveryDays: 3, revisions: 2, isPopular: true },
      { id: 'pkg-020c', name: 'Monthly Pack', price: 35000, features: ['20 shorts', 'Content calendar', 'Analytics', 'Trend adaptation'], deliveryDays: 15, revisions: 3 }
    ],
    deliveryEstimate: '1-15 working days',
    revisions: 2,
    images: [],
    isTrending: true,
    type: 'video',
    tags: ['shorts', 'reels', 'tiktok', 'viral', 'ai'],
    complexity: 'basic'
  },
  {
    id: 'svc-021',
    name: 'AI Promotional Video',
    category: 'ai-videos',
    subcategory: 'promotional',
    description: 'AI-crafted promotional videos for product launches, brand awareness, and marketing campaigns.',
    features: ['Product Showcase', 'Brand Storytelling', 'AI Animation', 'Call-to-Action', 'Multiple Versions', 'A/B Ready'],
    basePrice: 10000,
    packages: [
      { id: 'pkg-021a', name: 'Basic Promo', price: 10000, features: ['30 sec video', 'Product showcase', 'Background music'], deliveryDays: 3, revisions: 2 },
      { id: 'pkg-021b', name: 'Brand Promo', price: 22000, features: ['60 sec', 'Brand story', 'Custom AI', 'Multiple cuts'], deliveryDays: 5, revisions: 3, isPopular: true },
      { id: 'pkg-021c', name: 'Campaign', price: 45000, features: ['Full campaign', 'Multiple videos', 'A/B versions', 'Social cuts'], deliveryDays: 10, revisions: 5 }
    ],
    deliveryEstimate: '3-10 working days',
    revisions: 3,
    images: [],
    type: 'video',
    tags: ['promotional', 'marketing', 'brand', 'ai'],
    complexity: 'intermediate'
  },
  {
    id: 'svc-022',
    name: 'AI Explainer Video',
    category: 'ai-videos',
    subcategory: 'explainer',
    description: 'Clear, engaging AI-generated explainer videos that simplify complex concepts and showcase your product or service.',
    features: ['Script Writing', 'AI Animation', 'Voiceover', 'Infographics', 'Clear Messaging', 'Engaging Visuals'],
    basePrice: 8000,
    packages: [
      { id: 'pkg-022a', name: 'Basic', price: 8000, features: ['60 sec', 'Simple animation', 'AI voice'], deliveryDays: 3, revisions: 2 },
      { id: 'pkg-022b', name: 'Standard', price: 18000, features: ['2 min', 'Custom animation', 'Professional VO', 'Infographics'], deliveryDays: 5, revisions: 3, isPopular: true },
      { id: 'pkg-022c', name: 'Premium', price: 35000, features: ['3 min', 'Full custom', 'Multiple languages', 'Interactive version'], deliveryDays: 10, revisions: 5 }
    ],
    deliveryEstimate: '3-10 working days',
    revisions: 3,
    images: [],
    type: 'video',
    tags: ['explainer', 'educational', 'ai', 'animation'],
    complexity: 'intermediate'
  },
  {
    id: 'svc-023',
    name: 'AI Cinematic Video',
    category: 'ai-videos',
    subcategory: 'cinematic',
    description: 'Stunning AI-generated cinematic videos with film-quality visuals, dramatic lighting, and professional storytelling.',
    features: ['Cinematic Quality', 'AI Film Effects', 'Dramatic Lighting', 'Color Grading', 'Sound Design', 'Story-driven'],
    basePrice: 15000,
    packages: [
      { id: 'pkg-023a', name: 'Short Cinematic', price: 15000, features: ['60 sec', 'Cinematic look', 'AI effects'], deliveryDays: 4, revisions: 2 },
      { id: 'pkg-023b', name: 'Full Cinematic', price: 35000, features: ['3 min', 'Full production', 'Sound design', 'Color grade'], deliveryDays: 8, revisions: 3, isPopular: true },
      { id: 'pkg-023c', name: 'Epic', price: 70000, features: ['5+ min', 'Film quality', 'Original score', 'VFX'], deliveryDays: 15, revisions: 5 }
    ],
    deliveryEstimate: '4-15 working days',
    revisions: 3,
    images: [],
    type: 'video',
    tags: ['cinematic', 'film', 'ai', 'premium'],
    complexity: 'expert'
  },
  {
    id: 'svc-024',
    name: 'AI Educational Video',
    category: 'ai-videos',
    subcategory: 'educational',
    description: 'AI-produced educational content with clear explanations, engaging visuals, and structured learning modules.',
    features: ['Structured Content', 'AI Visuals', 'Clear Explanations', 'Quiz Integration', 'Multi-language', 'Accessible'],
    basePrice: 6000,
    packages: [
      { id: 'pkg-024a', name: 'Single Lesson', price: 6000, features: ['5 min', 'AI visuals', 'Clear audio'], deliveryDays: 2, revisions: 1 },
      { id: 'pkg-024b', name: 'Course Module', price: 20000, features: ['30 min', 'Multiple lessons', 'Quizzes', 'Resources'], deliveryDays: 7, revisions: 3, isPopular: true },
      { id: 'pkg-024c', name: 'Full Course', price: 60000, features: ['2+ hours', 'Complete curriculum', 'Assessments', 'Certificate'], deliveryDays: 21, revisions: 5 }
    ],
    deliveryEstimate: '2-21 working days',
    revisions: 3,
    images: [],
    type: 'video',
    tags: ['educational', 'course', 'learning', 'ai'],
    complexity: 'intermediate'
  },

  // === EDITING SERVICES (50+) ===
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
    level: 'professional'
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
    level: 'professional'
  },
  // 50+ Editing Services
  ...generateEditingServices(),
  
  // === SIMULATOR SERVICES ===
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
    complexity: 'advanced'
  },
  {
    id: 'svc-025',
    name: 'Android Concept Simulator',
    category: 'simulators',
    subcategory: 'android-concept',
    description: 'Interactive Android-style simulator showcasing custom UI concepts, future Android features, and unique interface designs. [Concept/Prototype]',
    features: ['Android-style UI', 'Custom Launcher', 'App Drawer', 'Notification System', 'Widget Concepts', 'Gesture Navigation'],
    basePrice: 30000,
    packages: [
      { id: 'pkg-025a', name: 'Basic Concept', price: 30000, features: ['Home screen', 'App drawer', 'Basic navigation'], deliveryDays: 7, revisions: 2 },
      { id: 'pkg-025b', name: 'Advanced', price: 55000, features: ['Full UI system', 'Settings app', 'Notifications', 'Multi-tasking'], deliveryDays: 14, revisions: 3, isPopular: true },
      { id: 'pkg-025c', name: 'Complete OS', price: 95000, features: ['Full OS simulation', 'All system apps', 'Custom animations', 'Voice assistant demo'], deliveryDays: 25, revisions: 5 }
    ],
    deliveryEstimate: '7-25 working days',
    revisions: 3,
    images: [],
    type: 'simulator',
    tags: ['android', 'concept', 'simulator', 'prototype'],
    complexity: 'expert'
  },
  {
    id: 'svc-026',
    name: 'iOS Concept Simulator',
    category: 'simulators',
    subcategory: 'ios-concept',
    description: 'Interactive iOS-style simulator with custom interface concepts, widget designs, and futuristic Apple-inspired experiences. [Concept/Prototype]',
    features: ['iOS-style UI', 'Widget System', 'Control Center', 'App Library', 'Dynamic Island', 'Focus Modes'],
    basePrice: 30000,
    packages: [
      { id: 'pkg-026a', name: 'Basic Concept', price: 30000, features: ['Home screen', 'Basic apps', 'iOS styling'], deliveryDays: 7, revisions: 2 },
      { id: 'pkg-026b', name: 'Advanced', price: 55000, features: ['Widget system', 'Control center', 'App switcher', 'Animations'], deliveryDays: 14, revisions: 3, isPopular: true },
      { id: 'pkg-026c', name: 'Complete', price: 95000, features: ['Full iOS simulation', 'All system features', 'Siri demo', 'AR concepts'], deliveryDays: 25, revisions: 5 }
    ],
    deliveryEstimate: '7-25 working days',
    revisions: 3,
    images: [],
    type: 'simulator',
    tags: ['ios', 'apple', 'concept', 'simulator'],
    complexity: 'expert'
  },
  {
    id: 'svc-027',
    name: 'Future OS Concept Simulator',
    category: 'simulators',
    subcategory: 'future-os',
    description: 'Experimental futuristic operating system concept simulator showcasing next-gen UI paradigms, AI integration, and holographic interfaces. [Experimental/Concept]',
    features: ['Futuristic UI', 'AI Integration', 'Holographic Concepts', 'Voice/Gesture Control', 'Adaptive Layout', 'Neural Interface Demo'],
    basePrice: 40000,
    packages: [
      { id: 'pkg-027a', name: 'Concept Demo', price: 40000, features: ['5 concept screens', 'Basic interactions', 'Futuristic design'], deliveryDays: 10, revisions: 2 },
      { id: 'pkg-027b', name: 'Prototype', price: 75000, features: ['15+ screens', 'AI features', 'Gesture control', 'Adaptive UI'], deliveryDays: 18, revisions: 3, isPopular: true },
      { id: 'pkg-027c', name: 'Full Simulation', price: 140000, features: ['Complete OS concept', 'All features', 'Voice assistant', 'AR/VR ready'], deliveryDays: 30, revisions: 5 }
    ],
    deliveryEstimate: '10-30 working days',
    revisions: 3,
    images: [],
    isNew: true,
    type: 'simulator',
    tags: ['future', 'os', 'concept', 'experimental', 'holographic'],
    complexity: 'expert'
  },
  {
    id: 'svc-028',
    name: 'Educational Simulator',
    category: 'simulators',
    subcategory: 'educational',
    description: 'Interactive educational simulators for learning concepts in science, math, programming, and more through hands-on experience.',
    features: ['Interactive Learning', 'Visual Simulations', 'Progress Tracking', 'Quizzes', 'Multi-subject', 'Gamification'],
    basePrice: 20000,
    packages: [
      { id: 'pkg-028a', name: 'Single Topic', price: 20000, features: ['1 subject', '5 simulations', 'Basic quizzes'], deliveryDays: 7, revisions: 2 },
      { id: 'pkg-028b', name: 'Module', price: 40000, features: ['3 subjects', '15 simulations', 'Progress tracking', 'Certificates'], deliveryDays: 14, revisions: 3, isPopular: true },
      { id: 'pkg-028c', name: 'Platform', price: 80000, features: ['Full platform', 'Unlimited topics', 'Admin panel', 'Student management'], deliveryDays: 30, revisions: 5 }
    ],
    deliveryEstimate: '7-30 working days',
    revisions: 3,
    images: [],
    type: 'simulator',
    tags: ['education', 'learning', 'interactive', 'simulator'],
    complexity: 'advanced'
  },

  // === BRANDING & DESIGN ===
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
    complexity: 'intermediate'
  },

  // === MARKETING ===
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
    complexity: 'intermediate'
  },
  {
    id: 'svc-029',
    name: 'Social Media Management',
    category: 'marketing',
    subcategory: 'social-media',
    description: 'Complete social media management including content creation, scheduling, engagement, and growth strategies.',
    features: ['Content Creation', 'Scheduling', 'Engagement', 'Growth Strategy', 'Analytics', 'Community Management'],
    basePrice: 8000,
    packages: [
      { id: 'pkg-029a', name: 'Starter', price: 8000, features: ['2 platforms', '12 posts/month', 'Basic engagement'], deliveryDays: 7, revisions: 1 },
      { id: 'pkg-029b', name: 'Growth', price: 18000, features: ['4 platforms', '30 posts/month', 'Full management', 'Monthly reports'], deliveryDays: 14, revisions: 2, isPopular: true },
      { id: 'pkg-029c', name: 'Enterprise', price: 35000, features: ['All platforms', 'Daily content', 'Influencer outreach', 'Crisis management'], deliveryDays: 30, revisions: 3 }
    ],
    deliveryEstimate: '7-30 working days',
    revisions: 2,
    images: [],
    maintenanceCost: 3000,
    type: 'service',
    tags: ['social-media', 'management', 'content', 'growth'],
    complexity: 'intermediate'
  },
];

// Generate 50+ editing services
function generateEditingServices(): Service[] {
  const editingServices: { name: string; subcategory: string; desc: string; features: string[]; basePrice: number; tags: string[]; level: 'basic' | 'advanced' | 'professional' | 'premium' }[] = [
    { name: 'Shorts/Reels Editing', subcategory: 'shorts', desc: 'Trendy short-form video editing optimized for Instagram Reels, YouTube Shorts, and TikTok.', features: ['Trending Effects', 'Music Sync', 'Text Overlays', 'Vertical Format', 'Quick Cuts', 'Viral Hooks'], basePrice: 1500, tags: ['shorts', 'reels', 'tiktok', 'trending'], level: 'basic' },
    { name: 'Gaming Video Editing', subcategory: 'gaming', desc: 'Dynamic gaming video editing with highlights, effects, memes, and engaging commentary sync.', features: ['Highlight Reels', 'Gaming Effects', 'Meme Inserts', 'Kill Compilations', 'Stream Highlights', 'Custom Overlays'], basePrice: 2000, tags: ['gaming', 'highlights', 'esports', 'streaming'], level: 'basic' },
    { name: 'Color Grading', subcategory: 'color-grading', desc: 'Professional color grading to give your footage a cinematic, consistent, and professional look.', features: ['Cinematic LUTs', 'Color Correction', 'Mood Setting', 'Skin Tones', 'Consistency', 'HDR Support'], basePrice: 3000, tags: ['color', 'grading', 'cinematic', 'lut'], level: 'advanced' },
    { name: 'Motion Graphics', subcategory: 'motion-graphics', desc: 'Eye-catching motion graphics including animated titles, lower thirds, infographics, and visual effects.', features: ['Animated Titles', 'Lower Thirds', 'Infographics', 'Logo Animation', 'Transitions', 'Visual Effects'], basePrice: 5000, tags: ['motion', 'graphics', 'animation', 'titles'], level: 'advanced' },
    { name: 'Thumbnail Design', subcategory: 'thumbnail', desc: 'Click-worthy thumbnail designs that boost CTR and make your videos stand out in search results.', features: ['Custom Design', 'Eye-catching', 'Brand Consistent', 'A/B Variants', 'Text Overlay', 'Face Enhancement'], basePrice: 500, tags: ['thumbnail', 'youtube', 'design', 'ctr'], level: 'basic' },
    { name: 'Photo Editing & Retouching', subcategory: 'photo', desc: 'Professional photo editing including retouching, background manipulation, and creative enhancements.', features: ['Skin Retouching', 'Background Edit', 'Color Correction', 'Object Removal', 'Creative Effects', 'Batch Processing'], basePrice: 800, tags: ['photo', 'retouching', 'editing', 'portrait'], level: 'basic' },
    { name: 'Background Removal', subcategory: 'background', desc: 'Clean, precise background removal and replacement for product photos, portraits, and marketing materials.', features: ['Precise Cutout', 'Transparent PNG', 'Custom Backgrounds', 'Batch Processing', 'Shadow Retention', 'Hair Detail'], basePrice: 300, tags: ['background', 'removal', 'cutout', 'product'], level: 'basic' },
    { name: 'Object Removal', subcategory: 'object-removal', desc: 'Seamless removal of unwanted objects, people, or elements from photos and videos.', features: ['Clean Removal', 'Fill Reconstruction', 'Video Object Removal', 'Batch Processing', 'Natural Results', 'High Resolution'], basePrice: 500, tags: ['object', 'removal', 'cleanup', 'editing'], level: 'basic' },
    { name: 'AI Photo Enhancement', subcategory: 'ai-enhance', desc: 'AI-powered photo enhancement including upscaling, noise reduction, and intelligent improvements.', features: ['AI Upscaling', 'Noise Reduction', 'Sharpening', 'Color Enhancement', 'Face Recovery', 'Batch AI Processing'], basePrice: 1000, tags: ['ai', 'enhancement', 'upscale', 'improve'], level: 'advanced' },
    { name: 'Video Upscaling (4K/8K)', subcategory: 'upscaling', desc: 'Professional video upscaling to 4K or 8K resolution with AI-enhanced detail and clarity.', features: ['4K Upscaling', '8K Available', 'AI Enhancement', 'Detail Recovery', 'Noise Reduction', 'Frame Interpolation'], basePrice: 3000, tags: ['upscaling', '4k', '8k', 'resolution'], level: 'advanced' },
    { name: 'Transition Effects Pack', subcategory: 'transitions', desc: 'Custom transition effects including zoom, spin, glitch, morph, and creative transitions.', features: ['Custom Transitions', 'Smooth Animations', 'Glitch Effects', 'Zoom Transitions', 'Morph Effects', 'Pack Delivery'], basePrice: 2000, tags: ['transitions', 'effects', 'creative', 'smooth'], level: 'advanced' },
    { name: 'VFX & Visual Effects', subcategory: 'vfx', desc: 'Professional visual effects including compositing, green screen, particle effects, and CGI integration.', features: ['Green Screen', 'Compositing', 'Particle Effects', 'CGI Integration', 'Tracking', 'Lighting Match'], basePrice: 8000, tags: ['vfx', 'visual-effects', 'compositing', 'cgi'], level: 'professional' },
    { name: 'Sound Design', subcategory: 'sound', desc: 'Professional sound design including foley, ambient sounds, sound effects, and audio mixing.', features: ['Sound Effects', 'Foley', 'Ambient Sound', 'Audio Mixing', 'Mastering', 'Surround Sound'], basePrice: 3000, tags: ['sound', 'design', 'audio', 'mixing'], level: 'advanced' },
    { name: 'Subtitles & Captions', subcategory: 'subtitles', desc: 'Accurate subtitles and captions with custom styling, animations, and multi-language support.', features: ['Auto-transcription', 'Custom Styling', 'Animated Captions', 'Multi-language', 'SRT Export', 'Burned-in Option'], basePrice: 1000, tags: ['subtitles', 'captions', 'transcription', 'accessibility'], level: 'basic' },
    { name: 'Intro & Outro Creation', subcategory: 'intro-outro', desc: 'Custom branded intro and outro animations for YouTube, podcasts, and video content.', features: ['Custom Animation', 'Brand Integration', 'Music Sync', 'Multiple Versions', 'Animated Logo', 'Call-to-Action'], basePrice: 2000, tags: ['intro', 'outro', 'branding', 'animation'], level: 'basic' },
    { name: 'Logo Animation', subcategory: 'logo-animation', desc: 'Dynamic logo animations for video intros, website headers, and brand presentations.', features: ['2D Animation', '3D Animation', 'Particle Effects', 'Morphing', 'Sound Design', 'Multiple Formats'], basePrice: 3000, tags: ['logo', 'animation', 'brand', 'motion'], level: 'advanced' },
    { name: 'Product Video Editing', subcategory: 'product', desc: 'Professional product video editing showcasing features, benefits, and use cases compellingly.', features: ['Product Showcase', 'Feature Highlights', 'Lifestyle Shots', 'Text Overlays', 'Music Selection', 'CTA Integration'], basePrice: 4000, tags: ['product', 'showcase', 'commercial', 'marketing'], level: 'professional' },
    { name: 'Social Media Video Editing', subcategory: 'social-media', desc: 'Platform-optimized video editing for Instagram, Facebook, Twitter, LinkedIn, and more.', features: ['Platform Optimized', 'Multiple Formats', 'Trending Styles', 'Brand Consistent', 'Quick Turnaround', 'Bulk Editing'], basePrice: 1500, tags: ['social-media', 'instagram', 'facebook', 'optimized'], level: 'basic' },
    { name: 'Wedding Video Editing', subcategory: 'wedding', desc: 'Beautiful wedding video editing with cinematic storytelling, highlight reels, and full ceremony coverage.', features: ['Cinematic Edit', 'Highlight Reel', 'Full Ceremony', 'Same-day Edit', 'Drone Footage', 'Custom Music'], basePrice: 8000, tags: ['wedding', 'cinematic', 'highlight', 'ceremony'], level: 'professional' },
    { name: 'Corporate Video Editing', subcategory: 'corporate', desc: 'Professional corporate video editing for presentations, training, internal communications, and brand videos.', features: ['Professional Look', 'Brand Guidelines', 'Graphics Integration', 'Interview Editing', 'Data Visualization', 'Multi-language'], basePrice: 5000, tags: ['corporate', 'business', 'professional', 'training'], level: 'professional' },
    { name: 'Podcast Video Editing', subcategory: 'podcast', desc: 'Podcast video editing with multi-camera switching, audio enhancement, and clip creation.', features: ['Multi-camera', 'Audio Enhancement', 'Clip Creation', 'Show Notes', 'Waveform Visuals', 'Chapter Markers'], basePrice: 3000, tags: ['podcast', 'audio', 'multi-camera', 'clips'], level: 'advanced' },
    { name: 'Drone Video Editing', subcategory: 'drone', desc: 'Cinematic drone footage editing with color grading, stabilization, and aerial storytelling.', features: ['Stabilization', 'Color Grading', 'Aerial Storytelling', 'Speed Ramps', 'Maps Integration', '4K Delivery'], basePrice: 4000, tags: ['drone', 'aerial', 'cinematic', 'footage'], level: 'advanced' },
    { name: 'Music Video Editing', subcategory: 'music-video', desc: 'Creative music video editing with beat-synced cuts, visual effects, and artistic storytelling.', features: ['Beat Sync', 'Visual Effects', 'Creative Cuts', 'Color Grading', 'Performance Edit', 'Story Integration'], basePrice: 6000, tags: ['music', 'video', 'creative', 'beat-sync'], level: 'professional' },
    { name: 'Documentary Editing', subcategory: 'documentary', desc: 'Professional documentary editing with narrative structure, interview integration, and archival footage.', features: ['Narrative Structure', 'Interview Editing', 'Archival Integration', 'B-Roll Management', 'Fact-check Graphics', 'Long-form'], basePrice: 10000, tags: ['documentary', 'narrative', 'interview', 'long-form'], level: 'professional' },
    { name: 'Animation Editing', subcategory: 'animation', desc: '2D and 3D animation editing including character animation, explainer animations, and motion design.', features: ['2D Animation', '3D Animation', 'Character Animation', 'Explainer Style', 'Motion Design', 'Lip Sync'], basePrice: 8000, tags: ['animation', '2d', '3d', 'character'], level: 'professional' },
    { name: 'Live Stream Editing', subcategory: 'livestream', desc: 'Post-production editing of live stream content into polished videos, highlights, and compilations.', features: ['Highlight Extraction', 'Dead Space Removal', 'Multi-cam Sync', 'Chat Integration', 'Clip Creation', 'Series Editing'], basePrice: 3000, tags: ['livestream', 'highlights', 'twitch', 'youtube'], level: 'advanced' },
    { name: 'Real Estate Video Editing', subcategory: 'real-estate', desc: 'Professional real estate video editing with virtual tours, property showcases, and drone footage.', features: ['Property Showcase', 'Virtual Tour', 'Drone Integration', 'Floor Plans', 'Agent Intro', 'Music Selection'], basePrice: 4000, tags: ['real-estate', 'property', 'tour', 'showcase'], level: 'advanced' },
    { name: 'Food Video Editing', subcategory: 'food', desc: 'Appetizing food video editing with close-ups, slow-motion, and appetizing color grading.', features: ['Close-up Shots', 'Slow Motion', 'Appetizing Colors', 'Recipe Steps', 'Ingredient Showcase', 'Music Selection'], basePrice: 2500, tags: ['food', 'cooking', 'recipe', 'appetizing'], level: 'advanced' },
    { name: 'Fitness Video Editing', subcategory: 'fitness', desc: 'Dynamic fitness video editing with rep counters, form overlays, and energetic pacing.', features: ['Rep Counters', 'Form Overlays', 'Timer Graphics', 'Energetic Pacing', 'Before/After', 'Workout Plans'], basePrice: 2500, tags: ['fitness', 'workout', 'exercise', 'dynamic'], level: 'advanced' },
    { name: 'Travel Vlog Editing', subcategory: 'travel', desc: 'Cinematic travel vlog editing with location titles, map animations, and storytelling flow.', features: ['Cinematic Edit', 'Location Titles', 'Map Animations', 'Drone Integration', 'Music Selection', 'Story Flow'], basePrice: 3500, tags: ['travel', 'vlog', 'cinematic', 'adventure'], level: 'advanced' },
    { name: 'Testimonial Video Editing', subcategory: 'testimonial', desc: 'Professional testimonial and case study video editing with clean graphics and compelling narratives.', features: ['Clean Graphics', 'Name Titles', 'Company Logos', 'Stats Overlays', 'Clean Audio', 'Brand Consistent'], basePrice: 2000, tags: ['testimonial', 'case-study', 'review', 'professional'], level: 'basic' },
    { name: 'Event Highlight Editing', subcategory: 'event', desc: 'Event highlight reels capturing the best moments with energetic editing and music sync.', features: ['Highlight Reel', 'Multi-camera', 'Music Sync', 'Quick Cuts', 'Emotional Moments', 'Same-day Option'], basePrice: 5000, tags: ['event', 'highlight', 'conference', 'celebration'], level: 'advanced' },
    { name: 'Green Screen Editing', subcategory: 'green-screen', desc: 'Professional green screen keying, background replacement, and compositing services.', features: ['Clean Keying', 'Background Replace', 'Edge Refinement', 'Color Match', 'Shadow Retention', 'Motion Tracking'], basePrice: 3000, tags: ['green-screen', 'keying', 'compositing', 'background'], level: 'advanced' },
    { name: 'Speed Ramp Editing', subcategory: 'speed-ramp', desc: 'Dynamic speed ramp editing with smooth transitions between slow-motion and fast-forward.', features: ['Smooth Ramps', 'Slow Motion', 'Fast Forward', 'Beat Sync', 'Optical Flow', 'Creative Timing'], basePrice: 2000, tags: ['speed', 'ramp', 'slow-motion', 'dynamic'], level: 'advanced' },
    { name: 'Split Screen Editing', subcategory: 'split-screen', desc: 'Creative split screen editing for comparisons, tutorials, and multi-perspective content.', features: ['Multi-panel', 'Synced Playback', 'Custom Layouts', 'Animated Borders', 'Comparison View', 'Tutorial Format'], basePrice: 2500, tags: ['split-screen', 'comparison', 'tutorial', 'multi-panel'], level: 'advanced' },
    { name: 'Text Animation Editing', subcategory: 'text-animation', desc: 'Dynamic text animations including kinetic typography, animated titles, and creative text effects.', features: ['Kinetic Typography', 'Animated Titles', 'Text Effects', 'Lower Thirds', 'Call-outs', 'Brand Fonts'], basePrice: 2000, tags: ['text', 'animation', 'typography', 'titles'], level: 'advanced' },
    { name: 'Meme & Comedy Editing', subcategory: 'meme', desc: 'Funny meme-style video editing with sound effects, zoom effects, and comedic timing.', features: ['Sound Effects', 'Zoom Effects', 'Meme Templates', 'Comedic Timing', 'Text Overlays', 'Reaction Cuts'], basePrice: 1500, tags: ['meme', 'comedy', 'funny', 'viral'], level: 'basic' },
    { name: 'Infographic Video', subcategory: 'infographic', desc: 'Data-driven infographic videos with animated charts, statistics, and visual data storytelling.', features: ['Animated Charts', 'Data Visualization', 'Statistics', 'Clean Design', 'Brand Colors', 'Export Formats'], basePrice: 4000, tags: ['infographic', 'data', 'charts', 'visualization'], level: 'advanced' },
    { name: 'Whiteboard Animation', subcategory: 'whiteboard', desc: 'Engaging whiteboard animation videos perfect for explainers, education, and marketing.', features: ['Hand Drawing Effect', 'Custom Illustrations', 'Voiceover Sync', 'Script Integration', 'Brand Colors', 'HD Delivery'], basePrice: 5000, tags: ['whiteboard', 'animation', 'explainer', 'education'], level: 'advanced' },
    { name: 'Talking Head Editing', subcategory: 'talking-head', desc: 'Clean talking head video editing with jump cut removal, B-roll integration, and graphics.', features: ['Jump Cut Removal', 'B-roll Integration', 'Graphics Overlay', 'Audio Enhancement', 'Lower Thirds', 'Clean Background'], basePrice: 1500, tags: ['talking-head', 'interview', 'clean', 'professional'], level: 'basic' },
    { name: 'Multi-camera Editing', subcategory: 'multi-camera', desc: 'Professional multi-camera editing with synchronized angles, switching, and audio mixing.', features: ['Angle Switching', 'Audio Sync', 'Multi-angle', 'Live-style Edit', 'Highlight Reel', 'Full Coverage'], basePrice: 5000, tags: ['multi-camera', 'switching', 'sync', 'professional'], level: 'professional' },
    { name: 'HDR Video Editing', subcategory: 'hdr', desc: 'HDR video editing with expanded dynamic range, vivid colors, and premium visual quality.', features: ['HDR Grading', 'Wide Color Gamut', 'Dolby Vision', 'HDR10+', 'Tone Mapping', 'Premium Quality'], basePrice: 5000, tags: ['hdr', 'dolby', 'premium', 'color'], level: 'professional' },
    { name: '360° Video Editing', subcategory: '360', desc: '360-degree video editing with reframing, stabilization, and interactive hotspot integration.', features: ['Reframing', 'Stabilization', 'Hotspots', 'Multiple Outputs', 'VR Ready', 'Flat + 360'], basePrice: 6000, tags: ['360', 'vr', 'immersive', 'video'], level: 'professional' },
    { name: 'Timelapse Editing', subcategory: 'timelapse', desc: 'Professional timelapse video editing with smooth motion, color grading, and music integration.', features: ['Smooth Motion', 'Color Grading', 'Music Sync', 'Hyperlapse', 'Day-to-Night', '4K Delivery'], basePrice: 3000, tags: ['timelapse', 'hyperlapse', 'smooth', 'cinematic'], level: 'advanced' },
    { name: 'Before/After Editing', subcategory: 'before-after', desc: 'Compelling before/after video edits for transformations, renovations, and makeovers.', features: ['Split Screen', 'Smooth Transitions', 'Side-by-side', 'Slider Effect', 'Stats Overlay', 'Music Selection'], basePrice: 2000, tags: ['before-after', 'transformation', 'comparison', 'slider'], level: 'basic' },
    { name: 'Reaction Video Editing', subcategory: 'reaction', desc: 'Engaging reaction video editing with picture-in-picture, timing, and comedic enhancements.', features: ['PiP Layout', 'Timing Enhancement', 'Zoom Effects', 'Sound Effects', 'Text Reactions', 'Clean Audio'], basePrice: 1500, tags: ['reaction', 'pip', 'youtube', 'entertainment'], level: 'basic' },
    { name: 'Course/Tutorial Editing', subcategory: 'tutorial', desc: 'Professional course and tutorial video editing with clear structure, graphics, and chapter markers.', features: ['Chapter Markers', 'Screen Recording', 'Graphics Overlay', 'Quiz Integration', 'Clean Audio', 'Resource Links'], basePrice: 3000, tags: ['course', 'tutorial', 'education', 'learning'], level: 'advanced' },
    { name: 'Advertisement Editing', subcategory: 'advertisement', desc: 'High-impact advertisement video editing for TV, digital, and social media campaigns.', features: ['High Impact', 'Brand Consistent', 'Multiple Cuts', 'CTA Integration', 'A/B Versions', 'Platform Optimized'], basePrice: 5000, tags: ['advertisement', 'commercial', 'ad', 'campaign'], level: 'professional' },
    { name: 'Compilation Video Editing', subcategory: 'compilation', desc: 'Entertaining compilation video editing with seamless transitions and consistent pacing.', features: ['Seamless Transitions', 'Consistent Pacing', 'Music Sync', 'Intro/Outro', 'Branding', 'Series Ready'], basePrice: 2000, tags: ['compilation', 'best-of', 'collection', 'entertainment'], level: 'basic' },
    { name: 'ASMR Video Editing', subcategory: 'asmr', desc: 'ASMR video editing with enhanced audio, clean visuals, and trigger-optimized content.', features: ['Audio Enhancement', 'Noise Reduction', 'Clean Visuals', 'Trigger Focus', 'Binaural Audio', 'Calm Pacing'], basePrice: 2500, tags: ['asmr', 'audio', 'relaxing', 'trigger'], level: 'advanced' },
    { name: 'News/Report Editing', subcategory: 'news', desc: 'Professional news and report video editing with graphics, lower thirds, and broadcast quality.', features: ['News Graphics', 'Lower Thirds', 'Clean Audio', 'B-Roll Integration', 'Broadcast Quality', 'Quick Turnaround'], basePrice: 3000, tags: ['news', 'report', 'broadcast', 'professional'], level: 'advanced' },
    { name: 'Music Remix/Edit', subcategory: 'music-edit', desc: 'Audio editing and remixing for music content, podcasts, and creative audio projects.', features: ['Audio Mixing', 'Beat Matching', 'Effects Processing', 'Mastering', 'Stem Separation', 'Format Export'], basePrice: 3000, tags: ['music', 'remix', 'audio', 'mixing'], level: 'advanced' },
  ];

  return editingServices.map((svc, i) => ({
    id: `svc-edit-${String(i + 1).padStart(3, '0')}`,
    name: svc.name,
    category: 'editing',
    subcategory: svc.subcategory,
    description: svc.desc,
    features: svc.features,
    basePrice: svc.basePrice,
    packages: [
      { id: `pkg-edit-${i}a`, name: 'Basic', price: svc.basePrice, features: [svc.features[0], svc.features[1], 'Standard delivery'], deliveryDays: 2, revisions: 1 },
      { id: `pkg-edit-${i}b`, name: 'Professional', price: Math.round(svc.basePrice * 2.5), features: [...svc.features, 'Priority delivery', 'Source files'], deliveryDays: 4, revisions: 2, isPopular: true },
      { id: `pkg-edit-${i}c`, name: 'Premium', price: Math.round(svc.basePrice * 5), features: [...svc.features, 'Rush delivery', 'Source files', 'Unlimited revisions', 'Commercial license'], deliveryDays: 7, revisions: 5 }
    ],
    deliveryEstimate: '2-7 working days',
    revisions: 2,
    images: [],
    type: 'editing' as const,
    tags: svc.tags,
    level: svc.level,
    complexity: svc.level === 'basic' ? 'basic' as const : svc.level === 'advanced' ? 'intermediate' as const : 'advanced' as const,
  }));
}

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
  },
  {
    id: 'prod-004',
    name: 'UI/UX Design System',
    description: 'Complete design system with 200+ components, design tokens, and documentation for Figma.',
    price: 4999,
    discount: 25,
    images: [],
    category: 'design-assets',
    stock: 999,
    tags: ['ui', 'ux', 'design-system', 'figma'],
    type: 'digital',
    specifications: ['200+ Components', 'Figma File', 'Design Tokens', 'Documentation']
  },
  {
    id: 'prod-005',
    name: 'E-Commerce Starter Kit',
    description: 'Complete e-commerce starter with product templates, checkout flow, and admin dashboard design.',
    price: 3499,
    images: [],
    category: 'templates',
    stock: 999,
    tags: ['ecommerce', 'template', 'store'],
    type: 'template',
    specifications: ['Product Pages', 'Cart & Checkout', 'Admin Panel', 'Responsive']
  },
  {
    id: 'prod-006',
    name: 'YouTube Thumbnail Pack',
    description: '50 eye-catching YouTube thumbnail templates designed for maximum CTR. Fully editable in Canva and Photoshop.',
    price: 999,
    discount: 30,
    images: [],
    category: 'design-assets',
    stock: 999,
    tags: ['youtube', 'thumbnail', 'template', 'canva'],
    type: 'digital',
    specifications: ['50 Templates', 'Canva + PSD', 'High CTR Design', 'All Niches']
  },
  {
    id: 'prod-007',
    name: 'Logo Template Collection',
    description: '200 professional logo templates across 20 industries. Editable vector files ready for customization.',
    price: 1999,
    discount: 10,
    images: [],
    category: 'design-assets',
    stock: 999,
    tags: ['logo', 'template', 'vector', 'branding'],
    type: 'digital',
    specifications: ['200 Logos', 'AI/EPS/SVG', '20 Industries', 'Fully Editable']
  },
  {
    id: 'prod-008',
    name: 'React Dashboard Template',
    description: 'Production-ready React admin dashboard with 50+ pages, charts, tables, and authentication flow.',
    price: 5999,
    discount: 20,
    images: [],
    category: 'templates',
    stock: 999,
    tags: ['react', 'dashboard', 'admin', 'template'],
    type: 'template',
    specifications: ['50+ Pages', 'React + TypeScript', 'Charts & Tables', 'Auth Flow']
  },
  {
    id: 'prod-009',
    name: 'Motion Graphics Pack',
    description: '100+ After Effects motion graphics templates including lower thirds, titles, transitions, and intros.',
    price: 2499,
    images: [],
    category: 'design-assets',
    stock: 999,
    tags: ['motion', 'after-effects', 'graphics', 'templates'],
    type: 'digital',
    specifications: ['100+ Templates', 'After Effects', '4K Ready', 'Easy Customize']
  },
  {
    id: 'prod-010',
    name: 'Business Card Design Pack',
    description: '50 modern business card designs in minimal, creative, and corporate styles. Print-ready files included.',
    price: 799,
    discount: 15,
    images: [],
    category: 'design-assets',
    stock: 999,
    tags: ['business-card', 'print', 'design', 'branding'],
    type: 'digital',
    specifications: ['50 Designs', 'Print Ready', 'CMYK', 'Multiple Styles']
  },
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
  },
  {
    id: 'port-004',
    title: 'E-Commerce Fashion Store',
    description: 'Full-featured online fashion store with product filtering, wishlist, and seamless checkout experience.',
    category: 'websites',
    images: [],
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    services: ['E-Commerce Development', 'UI/UX Design'],
    features: ['Product Filtering', 'Wishlist', 'Stripe Payments', 'Order Tracking', 'Admin Dashboard'],
    isPublished: true,
    isFeatured: true
  },
  {
    id: 'port-005',
    title: 'Fitness Tracker App',
    description: 'Health and fitness tracking application with workout plans, progress charts, and social features.',
    category: 'apps',
    images: [],
    technologies: ['Flutter', 'Firebase', 'HealthKit'],
    services: ['App Development', 'UI/UX Design'],
    features: ['Workout Plans', 'Progress Charts', 'Social Features', 'Health Integration'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 'port-006',
    title: 'Brand Identity — Luxe Hotel',
    description: 'Complete brand identity design for a luxury hotel chain including logo, stationery, and digital assets.',
    category: 'branding',
    images: [],
    technologies: ['Illustrator', 'Photoshop', 'InDesign'],
    services: ['Logo Design', 'Brand Identity'],
    features: ['Custom Logo', 'Brand Guidelines', 'Stationery Design', 'Digital Assets'],
    isPublished: true,
    isFeatured: true
  },
  {
    id: 'port-007',
    title: 'YouTube Channel Editing',
    description: 'Complete video editing package for a tech review YouTube channel with 500K+ subscribers.',
    category: 'editing',
    images: [],
    technologies: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    services: ['Video Editing', 'Motion Graphics', 'Thumbnail Design'],
    features: ['Cinematic Editing', 'Custom Intros', 'Thumbnail Design', 'Color Grading'],
    isPublished: true,
    isFeatured: false
  },
  {
    id: 'port-008',
    title: '3D Product Configurator',
    description: 'Interactive 3D product configurator allowing customers to customize colors, materials, and features in real-time.',
    category: 'websites',
    images: [],
    technologies: ['Three.js', 'React', 'WebGL', 'GSAP'],
    services: ['3D Website', 'Interactive Development'],
    features: ['Real-time 3D', 'Material Switching', 'Color Picker', 'AR Preview'],
    isPublished: true,
    isFeatured: true
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
    privacy: 'Your privacy is important to us. We collect only necessary information to provide our services. All data is stored securely and never shared with third parties without consent.',
    terms: 'By using our services, you agree to these terms and conditions. All bookings are subject to confirmation and project scope agreement.',
    refund: 'Refund requests must be made within 7 days of booking. Refunds are subject to project progress review. Completed work is non-refundable.',
    booking: 'All bookings are subject to confirmation. We will contact you within 24 hours of your booking to discuss project details and timeline.',
    maintenance: 'Maintenance costs are separate from development costs. Plans can be monthly, yearly, or one-time as configured per service. Maintenance includes bug fixes, minor updates, and security patches.',
    review: 'Reviews are only accepted from verified customers who have completed a purchase. All reviews are moderated before publication.'
  }
};

// Stores
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        const users: User[] = JSON.parse(localStorage.getItem('zkr_users') || '[]');
        const user = users.find(u => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        if (email === 'admin@zkr.com') {
          const admin: User = { id: uuidv4(), name: 'Admin', email, phone: '8141427749', role: 'admin', createdAt: new Date().toISOString() };
          const allUsers = [...users, admin];
          localStorage.setItem('zkr_users', JSON.stringify(allUsers));
          set({ user: admin, isAuthenticated: true });
          return true;
        }
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
