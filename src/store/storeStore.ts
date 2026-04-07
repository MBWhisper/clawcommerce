import { create } from 'zustand';
import type { Product, Category, Customer, Order, Coupon } from '../types/database';
import { supabase } from '../lib/supabase';

interface StoreState {
  products: Product[];
  categories: Category[];
  customers: Customer[];
  orders: Order[];
  coupons: Coupon[];
  isLoading: boolean;
  
  // Stats
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    recentOrders: Order[];
    topProducts: Product[];
  };
  
  // Actions
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  setCustomers: (customers: Customer[]) => void;
  setOrders: (orders: Order[]) => void;
  setCoupons: (coupons: Coupon[]) => void;
  setLoading: (loading: boolean) => void;
  
  // Fetch methods
  fetchProducts: (storeId: string) => Promise<void>;
  fetchCategories: (storeId: string) => Promise<void>;
  fetchCustomers: (storeId: string) => Promise<void>;
  fetchOrders: (storeId: string) => Promise<void>;
  fetchCoupons: (storeId: string) => Promise<void>;
  fetchStats: (storeId: string) => Promise<void>;
  fetchAllData: (storeId: string) => Promise<void>;
  
  // Product CRUD
  createProduct: (product: Partial<Product>) => Promise<{ data: Product | null; error: Error | null }>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<{ error: Error | null }>;
  deleteProduct: (id: string) => Promise<{ error: Error | null }>;
  
  // Order CRUD
  createOrder: (order: Partial<Order>) => Promise<{ data: Order | null; error: Error | null }>;
  updateOrder: (id: string, updates: Partial<Order>) => Promise<{ error: Error | null }>;
  deleteOrder: (id: string) => Promise<{ error: Error | null }>;
  
  // Category CRUD
  createCategory: (category: Partial<Category>) => Promise<{ data: Category | null; error: Error | null }>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<{ error: Error | null }>;
  deleteCategory: (id: string) => Promise<{ error: Error | null }>;
}

export const useStoreStore = create<StoreState>()((set, get) => ({
  products: [],
  categories: [],
  customers: [],
  orders: [],
  coupons: [],
  isLoading: false,
  stats: {
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    topProducts: [],
  },
  
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setCustomers: (customers) => set({ customers }),
  setOrders: (orders) => set({ orders }),
  setCoupons: (coupons) => set({ coupons }),
  setLoading: (isLoading) => set({ isLoading }),
  
  fetchProducts: async (storeId) => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false });
    
    if (data) set({ products: data as Product[] });
  },
  
  fetchCategories: async (storeId) => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('store_id', storeId)
      .order('sort_order', { ascending: true });
    
    if (data) set({ categories: data as Category[] });
  },
  
  fetchCustomers: async (storeId) => {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false });
    
    if (data) set({ customers: data as Customer[] });
  },
  
  fetchOrders: async (storeId) => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false });
    
    if (data) set({ orders: data as Order[] });
  },
  
  fetchCoupons: async (storeId) => {
    const { data } = await supabase
      .from('coupons')
      .select('*')
      .eq('store_id', storeId)
      .order('created_at', { ascending: false });
    
    if (data) set({ coupons: data as Coupon[] });
  },
  
  fetchStats: async (_storeId) => {
    const { orders, products, customers } = get();
    
    const paidOrders = orders.filter(o => o.payment_status === 'paid');
    const totalRevenue = paidOrders.reduce((sum, o) => sum + Number(o.total), 0);
    
    set({
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: customers.length,
        recentOrders: orders.slice(0, 5),
        topProducts: products.filter(p => p.is_featured).slice(0, 5),
      },
    });
  },
  
  fetchAllData: async (storeId) => {
    set({ isLoading: true });
    
    await Promise.all([
      get().fetchProducts(storeId),
      get().fetchCategories(storeId),
      get().fetchCustomers(storeId),
      get().fetchOrders(storeId),
      get().fetchCoupons(storeId),
    ]);
    
    await get().fetchStats(storeId);
    
    set({ isLoading: false });
  },
  
  // Product CRUD
  createProduct: async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product as Record<string, unknown>)
        .select()
        .single();
      
      if (error) throw error;
      
      const newProduct = data as Product;
      set({ products: [newProduct, ...get().products] });
      return { data: newProduct, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  updateProduct: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(updates as Record<string, unknown>)
        .eq('id', id);
      
      if (error) throw error;
      
      set({
        products: get().products.map(p =>
          p.id === id ? { ...p, ...updates } as Product : p
        ),
      });
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
  
  deleteProduct: async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set({ products: get().products.filter(p => p.id !== id) });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
  
  // Order CRUD
  createOrder: async (order) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert(order as Record<string, unknown>)
        .select()
        .single();
      
      if (error) throw error;
      
      const newOrder = data as Order;
      set({ orders: [newOrder, ...get().orders] });
      return { data: newOrder, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  updateOrder: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update(updates as Record<string, unknown>)
        .eq('id', id);
      
      if (error) throw error;
      
      set({
        orders: get().orders.map(o =>
          o.id === id ? { ...o, ...updates } as Order : o
        ),
      });
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
  
  deleteOrder: async (id) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set({ orders: get().orders.filter(o => o.id !== id) });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
  
  // Category CRUD
  createCategory: async (category) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert(category as Record<string, unknown>)
        .select()
        .single();
      
      if (error) throw error;
      
      const newCategory = data as Category;
      set({ categories: [...get().categories, newCategory] });
      return { data: newCategory, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },
  
  updateCategory: async (id, updates) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update(updates as Record<string, unknown>)
        .eq('id', id);
      
      if (error) throw error;
      
      set({
        categories: get().categories.map(c =>
          c.id === id ? { ...c, ...updates } as Category : c
        ),
      });
      
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
  
  deleteCategory: async (id) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      set({ categories: get().categories.filter(c => c.id !== id) });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },
}));
