import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/Home';
import ServicesPage, { ServiceDetailPage } from './pages/Services';
import BuildMyIdea from './pages/BuildMyIdea';
import ProductsPage from './pages/Products';
import PortfolioPage from './pages/Portfolio';
import AuthPage from './pages/Auth';
import DashboardPage from './pages/Dashboard';
import AdminPage from './pages/Admin';
import {
  ContactPage, AboutPage, OffersPage, CartPage,
  WishlistPage, CalculatorPage, SearchPage, FAQPage, LegalPage
} from './pages/OtherPages';
import ComparePage from './pages/Compare';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/build" element={<BuildMyIdea />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/notifications" element={<DashboardPage />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
          <Route path="/refund-policy" element={<LegalPage type="refund" />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
