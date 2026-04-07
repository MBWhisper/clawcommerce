-- =============================================
-- ClawCommerce Database Schema
-- =============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================
-- 1. PROFILES TABLE
-- =============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- 2. STORES TABLE
-- =============================================
CREATE TABLE public.stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  currency TEXT DEFAULT 'SAR' NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')) NOT NULL,
  settings JSONB DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster lookups
CREATE INDEX idx_stores_user_id ON public.stores(user_id);
CREATE INDEX idx_stores_slug ON public.stores(slug);

-- Enable RLS
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Stores policies
CREATE POLICY "Users can view own stores" ON public.stores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own stores" ON public.stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stores" ON public.stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own stores" ON public.stores
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- 3. CATEGORIES TABLE
-- =============================================
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(store_id, slug)
);

-- Create indexes
CREATE INDEX idx_categories_store_id ON public.categories(store_id);
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Users can view own store categories" ON public.categories
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = categories.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can create categories in own stores" ON public.categories
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can update own store categories" ON public.categories
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = categories.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can delete own store categories" ON public.categories
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = categories.store_id AND stores.user_id = auth.uid())
  );

-- =============================================
-- 4. PRODUCTS TABLE
-- =============================================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  compare_price DECIMAL(10, 2) CHECK (compare_price >= 0),
  cost_price DECIMAL(10, 2) CHECK (cost_price >= 0),
  sku TEXT,
  barcode TEXT,
  quantity INTEGER DEFAULT 0 NOT NULL,
  track_quantity BOOLEAN DEFAULT true NOT NULL,
  allow_backorder BOOLEAN DEFAULT false NOT NULL,
  weight DECIMAL(10, 2),
  images JSONB DEFAULT '[]' NOT NULL,
  options JSONB DEFAULT '[]' NOT NULL,
  variants JSONB DEFAULT '[]' NOT NULL,
  tags TEXT[] DEFAULT '{}' NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')) NOT NULL,
  is_featured BOOLEAN DEFAULT false NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(store_id, slug),
  UNIQUE(store_id, sku)
);

-- Create indexes
CREATE INDEX idx_products_store_id ON public.products(store_id);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_is_featured ON public.products(is_featured);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Users can view own store products" ON public.products
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can create products in own stores" ON public.products
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can update own store products" ON public.products
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can delete own store products" ON public.products
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = products.store_id AND stores.user_id = auth.uid())
  );

-- =============================================
-- 5. CUSTOMERS TABLE
-- =============================================
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  addresses JSONB DEFAULT '[]' NOT NULL,
  notes TEXT,
  tags TEXT[] DEFAULT '{}' NOT NULL,
  total_orders INTEGER DEFAULT 0 NOT NULL,
  total_spent DECIMAL(10, 2) DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(store_id, email)
);

-- Create indexes
CREATE INDEX idx_customers_store_id ON public.customers(store_id);
CREATE INDEX idx_customers_email ON public.customers(email);

-- Enable RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Customers policies
CREATE POLICY "Users can view own store customers" ON public.customers
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = customers.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can create customers in own stores" ON public.customers
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can update own store customers" ON public.customers
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = customers.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can delete own store customers" ON public.customers
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = customers.store_id AND stores.user_id = auth.uid())
  );

-- =============================================
-- 6. ORDERS TABLE
-- =============================================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')) NOT NULL,
  payment_method TEXT,
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  discount DECIMAL(10, 2) DEFAULT 0 NOT NULL CHECK (discount >= 0),
  shipping_cost DECIMAL(10, 2) DEFAULT 0 NOT NULL CHECK (shipping_cost >= 0),
  tax DECIMAL(10, 2) DEFAULT 0 NOT NULL CHECK (tax >= 0),
  total DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  currency TEXT DEFAULT 'SAR' NOT NULL,
  items JSONB NOT NULL,
  shipping_address JSONB DEFAULT '{}' NOT NULL,
  billing_address JSONB DEFAULT '{}' NOT NULL,
  notes TEXT,
  tracking_number TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(store_id, order_number)
);

-- Create indexes
CREATE INDEX idx_orders_store_id ON public.orders(store_id);
CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders policies
CREATE POLICY "Users can view own store orders" ON public.orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can create orders in own stores" ON public.orders
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can update own store orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can delete own store orders" ON public.orders
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = orders.store_id AND stores.user_id = auth.uid())
  );

-- =============================================
-- 7. SUBSCRIPTIONS TABLE
-- =============================================
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'professional', 'enterprise')) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing', 'expired')) NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_store_id ON public.subscriptions(store_id);
CREATE INDEX idx_subscriptions_stripe_customer_id ON public.subscriptions(stripe_customer_id);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- 8. COUPONS TABLE
-- =============================================
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  type TEXT CHECK (type IN ('percentage', 'fixed')) NOT NULL,
  value DECIMAL(10, 2) NOT NULL CHECK (value > 0),
  min_order_amount DECIMAL(10, 2),
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0 NOT NULL,
  starts_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(store_id, code)
);

-- Create indexes
CREATE INDEX idx_coupons_store_id ON public.coupons(store_id);
CREATE INDEX idx_coupons_code ON public.coupons(code);

-- Enable RLS
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

-- Coupons policies
CREATE POLICY "Users can view own store coupons" ON public.coupons
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = coupons.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can create coupons in own stores" ON public.coupons
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can update own store coupons" ON public.coupons
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = coupons.store_id AND stores.user_id = auth.uid())
  );

CREATE POLICY "Users can delete own store coupons" ON public.coupons
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.stores WHERE stores.id = coupons.store_id AND stores.user_id = auth.uid())
  );

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON public.stores FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to create profile and default store on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  store_slug TEXT;
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  
  -- Generate unique store slug
  store_slug := lower(regexp_replace(split_part(NEW.email, '@', 1), '[^a-zA-Z0-9]', '-', 'g')) || '-' || substr(NEW.id::text, 1, 8);
  
  -- Create default store
  INSERT INTO public.stores (user_id, name, slug)
  VALUES (
    NEW.id,
    'متجري',
    store_slug
  );
  
  -- Create default subscription (free plan)
  INSERT INTO public.subscriptions (user_id, store_id, plan, status)
  SELECT NEW.id, id, 'free', 'active'
  FROM public.stores
  WHERE user_id = NEW.id
  LIMIT 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number(store_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  order_count INTEGER;
  order_num TEXT;
BEGIN
  SELECT COUNT(*) + 1 INTO order_count FROM public.orders WHERE store_id = store_uuid;
  order_num := 'CLW-' || to_char(NOW(), 'YYYYMMDD') || '-' || lpad(order_count::text, 4, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Function to update customer stats after order
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.customer_id IS NOT NULL THEN
    UPDATE public.customers
    SET 
      total_orders = (SELECT COUNT(*) FROM public.orders WHERE customer_id = NEW.customer_id),
      total_spent = (SELECT COALESCE(SUM(total), 0) FROM public.orders WHERE customer_id = NEW.customer_id AND payment_status = 'paid')
    WHERE id = NEW.customer_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_customer_stats_trigger
  AFTER INSERT OR UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_customer_stats();

-- =============================================
-- STORAGE BUCKETS
-- =============================================

-- Create storage buckets (run in Supabase Dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('store-assets', 'store-assets', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policies would be:
-- CREATE POLICY "Users can upload to own store folder" ON storage.objects
--   FOR INSERT WITH CHECK (
--     bucket_id = 'store-assets' AND
--     (storage.foldername(name))[1] IN (
--       SELECT id::text FROM public.stores WHERE user_id = auth.uid()
--     )
--   );
