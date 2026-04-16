import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import LiveStats from "./components/LiveStats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Showcase from "./components/Showcase";
import Integrations from "./components/Integrations";
import SuccessStories from "./components/SuccessStories";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { AuthModal } from "./components/AuthModal";

import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProductsPage from "./pages/dashboard/ProductsPage";
import OrdersPage from "./pages/dashboard/OrdersPage";

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-slate-950 text-slate-50">
                <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
                <Navbar onAuthClick={() => setAuthOpen(true)} />
                <main className="flex flex-col gap-24 md:gap-32">
                  <Hero />
                  <TrustedBy />
                  <LiveStats />
                  <Features />
                  <HowItWorks />
                  <Showcase />
                  <Integrations />
                  <SuccessStories />
                  <Pricing />
                  <Testimonials />
                  <Blog />
                  <About />
                  <FAQ />
                  <Contact />
                  <CTA />
                </main>
                <Footer />
              </div>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="customers" element={<div className="text-center py-20"><h2 className="text-2xl font-bold mb-4">قسم العملاء</h2><p className="text-gray-500">قادم قريباً...</p></div>} />
            <Route path="categories" element={<div className="text-center py-20"><h2 className="text-2xl font-bold mb-4">قسم التصنيفات</h2><p className="text-gray-500">قادم قريباً...</p></div>} />
            <Route path="coupons" element={<div className="text-center py-20"><h2 className="text-2xl font-bold mb-4">قسم الكوبونات</h2><p className="text-gray-500">قادم قريباً...</p></div>} />
            <Route path="analytics" element={<div className="text-center py-20"><h2 className="text-2xl font-bold mb-4">قسم التحليلات</h2><p className="text-gray-500">قادم قريباً...</p></div>} />
            <Route path="settings" element={<div className="text-center py-20"><h2 className="text-2xl font-bold mb-4">قسم الإعدادات</h2><p className="text-gray-500">قادم قريباً...</p></div>} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>

      <Analytics />
    </>
  );
}