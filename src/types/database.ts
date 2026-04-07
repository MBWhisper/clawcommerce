export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
      };
      stores: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          cover_url: string | null;
          currency: string;
          status: 'active' | 'inactive' | 'suspended';
          settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          currency?: string;
          status?: 'active' | 'inactive' | 'suspended';
          settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          cover_url?: string | null;
          currency?: string;
          status?: 'active' | 'inactive' | 'suspended';
          settings?: Json;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          store_id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          store_id: string;
          category_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          price: number;
          compare_price: number | null;
          cost_price: number | null;
          sku: string | null;
          barcode: string | null;
          quantity: number;
          track_quantity: boolean;
          allow_backorder: boolean;
          weight: number | null;
          images: Json;
          options: Json;
          variants: Json;
          tags: string[];
          status: 'active' | 'draft' | 'archived';
          is_featured: boolean;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          price: number;
          compare_price?: number | null;
          cost_price?: number | null;
          sku?: string | null;
          barcode?: string | null;
          quantity?: number;
          track_quantity?: boolean;
          allow_backorder?: boolean;
          weight?: number | null;
          images?: Json;
          options?: Json;
          variants?: Json;
          tags?: string[];
          status?: 'active' | 'draft' | 'archived';
          is_featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          price?: number;
          compare_price?: number | null;
          cost_price?: number | null;
          sku?: string | null;
          barcode?: string | null;
          quantity?: number;
          track_quantity?: boolean;
          allow_backorder?: boolean;
          weight?: number | null;
          images?: Json;
          options?: Json;
          variants?: Json;
          tags?: string[];
          status?: 'active' | 'draft' | 'archived';
          is_featured?: boolean;
          seo_title?: string | null;
          seo_description?: string | null;
          updated_at?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          store_id: string;
          email: string;
          full_name: string;
          phone: string | null;
          addresses: Json;
          notes: string | null;
          tags: string[];
          total_orders: number;
          total_spent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          email: string;
          full_name: string;
          phone?: string | null;
          addresses?: Json;
          notes?: string | null;
          tags?: string[];
          total_orders?: number;
          total_spent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string;
          phone?: string | null;
          addresses?: Json;
          notes?: string | null;
          tags?: string[];
          total_orders?: number;
          total_spent?: number;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          store_id: string;
          customer_id: string | null;
          order_number: string;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_method: string | null;
          subtotal: number;
          discount: number;
          shipping_cost: number;
          tax: number;
          total: number;
          currency: string;
          items: Json;
          shipping_address: Json;
          billing_address: Json;
          notes: string | null;
          tracking_number: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          customer_id?: string | null;
          order_number: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_method?: string | null;
          subtotal: number;
          discount?: number;
          shipping_cost?: number;
          tax?: number;
          total: number;
          currency?: string;
          items: Json;
          shipping_address?: Json;
          billing_address?: Json;
          notes?: string | null;
          tracking_number?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          customer_id?: string | null;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
          payment_method?: string | null;
          subtotal?: number;
          discount?: number;
          shipping_cost?: number;
          tax?: number;
          total?: number;
          items?: Json;
          shipping_address?: Json;
          billing_address?: Json;
          notes?: string | null;
          tracking_number?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          store_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan: 'free' | 'starter' | 'professional' | 'enterprise';
          status: 'active' | 'cancelled' | 'past_due' | 'trialing' | 'expired';
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          store_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: 'free' | 'starter' | 'professional' | 'enterprise';
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing' | 'expired';
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: 'free' | 'starter' | 'professional' | 'enterprise';
          status?: 'active' | 'cancelled' | 'past_due' | 'trialing' | 'expired';
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          updated_at?: string;
        };
      };
      coupons: {
        Row: {
          id: string;
          store_id: string;
          code: string;
          type: 'percentage' | 'fixed';
          value: number;
          min_order_amount: number | null;
          max_uses: number | null;
          used_count: number;
          starts_at: string | null;
          expires_at: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          code: string;
          type: 'percentage' | 'fixed';
          value: number;
          min_order_amount?: number | null;
          max_uses?: number | null;
          used_count?: number;
          starts_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          code?: string;
          type?: 'percentage' | 'fixed';
          value?: number;
          min_order_amount?: number | null;
          max_uses?: number | null;
          used_count?: number;
          starts_at?: string | null;
          expires_at?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Store = Database['public']['Tables']['stores']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Customer = Database['public']['Tables']['customers']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type Coupon = Database['public']['Tables']['coupons']['Row'];

export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderUpdate = Database['public']['Tables']['orders']['Update'];
