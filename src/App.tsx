import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Product, ProductColor, MonogramConfig } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { ProductDetailView } from './components/ProductDetailView';
import { BespokeModal } from './components/BespokeModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LegalModal } from './components/LegalModal';
import { AuthView } from './components/AuthView';
import { CheckoutView } from './components/CheckoutView';
import { AccountView } from './components/AccountView';
import { AdminView } from './components/AdminView';
import { AdminLoginView } from './components/AdminLoginView';
import { useCartStore } from './store/cartStore';

export default function App() {
  const navigate = useNavigate();
  
  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | null>(null);

  const { cartItems, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeItem, clearCart } = useCartStore();
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenCustomization = () => {
    navigate('/shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#1b1c19] font-body selection:bg-[#fdc087] selection:text-[#090100]">
      <Header
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        setIsSearchOpen={setIsSearchOpen}
        setIsBespokeOpen={setIsBespokeOpen}
      />

      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomeView
                setActiveTab={() => {}}
                onSelectProduct={(product) => navigate(`/product/${product.id}`)}
                onQuickAddToCart={(prod, color) => addToCart(prod, color, 1)}
                setIsBespokeOpen={() => setIsBespokeOpen(true)}
              />
            } 
          />
          <Route 
            path="/shop" 
            element={
              <ShopView
                onSelectProduct={(product) => navigate(`/product/${product.id}`)}
                onQuickAddToCart={(prod, color) => addToCart(prod, color, 1)}
                setIsBespokeOpen={() => setIsBespokeOpen(true)}
              />
            } 
          />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetailViewWrapper 
                onBack={() => navigate('/shop')} 
                onAddToCart={addToCart} 
              />
            } 
          />
          <Route path="/login" element={<AuthView />} />
          <Route path="/register" element={<AuthView />} />
          <Route path="/checkout" element={<CheckoutView />} />
          <Route path="/account" element={<AccountView />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/admin-login" element={<AdminLoginView />} />
        </Routes>
      </main>

      <Footer
        setIsBespokeOpen={() => setIsBespokeOpen(true)}
        onOpenPrivacy={() => setLegalModalTab('privacy')}
        onOpenTerms={() => setLegalModalTab('terms')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => {
          setIsSearchOpen(false);
          navigate(`/product/${prod.id}`);
        }}
      />

      <LegalModal
        isOpen={legalModalTab !== null}
        onClose={() => setLegalModalTab(null)}
        initialTab={legalModalTab || 'privacy'}
      />
      
      {/* BespokeModal requires product/color which isn't managed globally here right now, 
          assuming it was handled inside views. Will keep as-is if unused at top level. */}
    </div>
  );
}

// Wrapper to parse the ID from URL and pass to ProductDetailView
import { useParams } from 'react-router-dom';

function ProductDetailViewWrapper({ onBack, onAddToCart }: any) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct({ ...data, id: data._id || data.id });
        } else {
          // Fallback
          const { PRODUCTS } = await import('./data/products');
          const p = PRODUCTS.find(p => p.id === id);
          if (p) setProduct(p);
        }
      } catch (err) {
        const { PRODUCTS } = await import('./data/products');
        const p = PRODUCTS.find(p => p.id === id);
        if (p) setProduct(p);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-20 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return <ProductDetailView product={product} onBack={onBack} onAddToCart={onAddToCart} />;
}
