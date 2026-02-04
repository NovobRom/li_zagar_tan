export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
      }
      admin_roles: {
        Row: {
          created_at: string | null
          id: string
          profile_id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_id: string
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_id?: string
          role?: string
        }
      }
      course_enrollments: {
        Row: {
          enrolled_at: string | null
          expires_at: string | null
          id: string
          payment_amount: number | null
          payment_method: string | null
          payment_status: string | null
          profile_id: string
        }
        Insert: {
          enrolled_at?: string | null
          expires_at?: string | null
          id?: string
          payment_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          profile_id: string
        }
        Update: {
          enrolled_at?: string | null
          expires_at?: string | null
          id?: string
          payment_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          profile_id?: string
        }
      }
      course_lessons: {
        Row: {
          content_en: string | null
          content_lt: string | null
          content_ru: string | null
          created_at: string | null
          display_order: number | null
          duration_minutes: number | null
          id: string
          is_free_preview: boolean | null
          is_published: boolean | null
          module_id: string
          title_en: string
          title_lt: string
          title_ru: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          content_en?: string | null
          content_lt?: string | null
          content_ru?: string | null
          created_at?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          is_published?: boolean | null
          module_id: string
          title_en: string
          title_lt: string
          title_ru: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          content_en?: string | null
          content_lt?: string | null
          content_ru?: string | null
          created_at?: string | null
          display_order?: number | null
          duration_minutes?: number | null
          id?: string
          is_free_preview?: boolean | null
          is_published?: boolean | null
          module_id?: string
          title_en?: string
          title_lt?: string
          title_ru?: string
          updated_at?: string | null
          video_url?: string | null
        }
      }
      course_modules: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_lt: string | null
          description_ru: string | null
          display_order: number | null
          id: string
          is_free_preview: boolean | null
          is_published: boolean | null
          thumbnail_url: string | null
          title_en: string
          title_lt: string
          title_ru: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_lt?: string | null
          description_ru?: string | null
          display_order?: number | null
          id?: string
          is_free_preview?: boolean | null
          is_published?: boolean | null
          thumbnail_url?: string | null
          title_en: string
          title_lt: string
          title_ru: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_lt?: string | null
          description_ru?: string | null
          display_order?: number | null
          id?: string
          is_free_preview?: boolean | null
          is_published?: boolean | null
          thumbnail_url?: string | null
          title_en?: string
          title_lt?: string
          title_ru?: string
          updated_at?: string | null
        }
      }
      gallery: {
        Row: {
          after_image_url: string | null
          alt_text_en: string | null
          alt_text_lt: string | null
          alt_text_ru: string | null
          before_image_url: string | null
          image_url: string | null
          storage_path: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          service_type: string | null
          updated_at: string | null
        }
        Insert: {
          after_image_url?: string | null
          alt_text_en?: string | null
          alt_text_lt?: string | null
          alt_text_ru?: string | null
          before_image_url?: string | null
          image_url?: string | null
          storage_path?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          service_type?: string | null
          updated_at?: string | null
        }
        Update: {
          after_image_url?: string | null
          alt_text_en?: string | null
          alt_text_lt?: string | null
          alt_text_ru?: string | null
          before_image_url?: string | null
          image_url?: string | null
          storage_path?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          service_type?: string | null
          updated_at?: string | null
        }
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          id: string
          lesson_id: string
          profile_id: string
          watch_time_seconds: number | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          lesson_id: string
          profile_id: string
          watch_time_seconds?: number | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          lesson_id?: string
          profile_id?: string
          watch_time_seconds?: number | null
        }
      }
      profiles: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          id: string
          marketing_consent: boolean | null
          notes: string | null
          phone: string | null
          preferred_language: string | null
          total_spent: number | null
          total_visits: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          marketing_consent?: boolean | null
          notes?: string | null
          phone?: string | null
          preferred_language?: string | null
          total_spent?: number | null
          total_visits?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          marketing_consent?: boolean | null
          notes?: string | null
          phone?: string | null
          preferred_language?: string | null
          total_spent?: number | null
          total_visits?: number | null
          updated_at?: string | null
        }
      }
      promo_usage: {
        Row: {
          discount_applied: number
          id: string
          profile_id: string
          promotion_id: string
          used_at: string | null
        }
        Insert: {
          discount_applied: number
          id?: string
          profile_id: string
          promotion_id: string
          used_at?: string | null
        }
        Update: {
          discount_applied?: number
          id?: string
          profile_id?: string
          promotion_id?: string
          used_at?: string | null
        }
      }
      promotions: {
        Row: {
          applicable_services: string[] | null
          code: string
          created_at: string | null
          description_en: string | null
          description_lt: string | null
          description_ru: string | null
          discount_type: string
          discount_value: number
          expires_at: string | null
          id: string
          is_active: boolean | null
          is_birthday_promo: boolean | null
          is_first_visit_only: boolean | null
          max_uses: number | null
          min_purchase: number | null
          name_en: string
          name_lt: string
          name_ru: string
          starts_at: string | null
          uses_per_user: number | null
        }
        Insert: {
          applicable_services?: string[] | null
          code: string
          created_at?: string | null
          description_en?: string | null
          description_lt?: string | null
          description_ru?: string | null
          discount_type: string
          discount_value: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_birthday_promo?: boolean | null
          is_first_visit_only?: boolean | null
          max_uses?: number | null
          min_purchase?: number | null
          name_en: string
          name_lt: string
          name_ru: string
          starts_at?: string | null
          uses_per_user?: number | null
        }
        Update: {
          applicable_services?: string[] | null
          code?: string
          created_at?: string | null
          description_en?: string | null
          description_lt?: string | null
          description_ru?: string | null
          discount_type?: string
          discount_value?: number
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_birthday_promo?: boolean | null
          is_first_visit_only?: boolean | null
          max_uses?: number | null
          min_purchase?: number | null
          name_en?: string
          name_lt?: string
          name_ru?: string
          starts_at?: string | null
          uses_per_user?: number | null
        }
      }
      reviews: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_published: boolean | null
          is_verified: boolean | null
          name: string
          profile_id: string | null
          rating: number
          review_date: string | null
          source: string | null
          source_url: string | null
          text_en: string | null
          text_lt: string | null
          text_ru: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_published?: boolean | null
          is_verified?: boolean | null
          name: string
          profile_id?: string | null
          rating: number
          review_date?: string | null
          source?: string | null
          source_url?: string | null
          text_en?: string | null
          text_lt?: string | null
          text_ru?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_published?: boolean | null
          is_verified?: boolean | null
          name?: string
          profile_id?: string | null
          rating?: number
          review_date?: string | null
          source?: string | null
          source_url?: string | null
          text_en?: string | null
          text_lt?: string | null
          text_ru?: string | null
        }
      }
      services: {
        Row: {
          created_at: string | null
          description_en: string | null
          description_lt: string | null
          description_ru: string | null
          display_order: number | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          is_popular: boolean | null
          name_en: string
          name_lt: string
          name_ru: string
          price: number
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description_en?: string | null
          description_lt?: string | null
          description_ru?: string | null
          display_order?: number | null
          duration_minutes: number
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name_en: string
          name_lt: string
          name_ru: string
          price: number
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description_en?: string | null
          description_lt?: string | null
          description_ru?: string | null
          display_order?: number | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          is_popular?: boolean | null
          name_en?: string
          name_lt?: string
          name_ru?: string
          price?: number
          slug?: string
          updated_at?: string | null
        }
      }
      site_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
      }
      visits: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          feedback: string | null
          final_price: number
          id: string
          notes: string | null
          original_price: number
          profile_id: string | null
          promotion_id: string | null
          rating: number | null
          service_id: string
          status: string | null
          visit_date: string
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          feedback?: string | null
          final_price: number
          id?: string
          notes?: string | null
          original_price: number
          profile_id?: string | null
          promotion_id?: string | null
          rating?: number | null
          service_id: string
          status?: string | null
          visit_date: string
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          feedback?: string | null
          final_price?: number
          id?: string
          notes?: string | null
          original_price?: number
          profile_id?: string | null
          promotion_id?: string | null
          rating?: number | null
          service_id?: string
          status?: string | null
          visit_date?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
