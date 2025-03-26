export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "platform_admin" | "org_admin" | "org_member";

export type Database = {
  public: {
    Tables: {
      subscriptions: {
        Row: {
          id: string;
          user_id: string | null;
          stripe_id: string | null;
          price_id: string | null;
          stripe_price_id: string | null;
          currency: string | null;
          interval: string | null;
          status: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean | null;
          amount: number | null;
          started_at: number | null;
          ends_at: number | null;
          ended_at: number | null;
          canceled_at: number | null;
          customer_cancellation_reason: string | null;
          customer_cancellation_comment: string | null;
          metadata: Json | null;
          custom_field_data: Json | null;
          customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          stripe_id?: string | null;
          price_id?: string | null;
          stripe_price_id?: string | null;
          currency?: string | null;
          interval?: string | null;
          status?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean | null;
          amount?: number | null;
          started_at?: number | null;
          ends_at?: number | null;
          ended_at?: number | null;
          canceled_at?: number | null;
          customer_cancellation_reason?: string | null;
          customer_cancellation_comment?: string | null;
          metadata?: Json | null;
          custom_field_data?: Json | null;
          customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          stripe_id?: string | null;
          price_id?: string | null;
          stripe_price_id?: string | null;
          currency?: string | null;
          interval?: string | null;
          status?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean | null;
          amount?: number | null;
          started_at?: number | null;
          ends_at?: number | null;
          ended_at?: number | null;
          canceled_at?: number | null;
          customer_cancellation_reason?: string | null;
          customer_cancellation_comment?: string | null;
          metadata?: Json | null;
          custom_field_data?: Json | null;
          customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["user_id"];
          },
        ];
      };
      users: {
        Row: {
          id: string;
          avatar_url: string | null;
          user_id: string | null;
          token_identifier: string;
          subscription: string | null;
          credits: string | null;
          image: string | null;
          created_at: string;
          updated_at: string | null;
          email: string | null;
          name: string | null;
          full_name: string | null;
          first_name: string | null;
          last_name: string | null;
          company: string | null;
          industry: string | null;
          address: string | null;
          role: UserRole;
          phone: string | null;
          status: "active" | "inactive";
          plan: "free" | "premium";
          raw_user_meta_data: Json | null;
        };
        Insert: {
          id: string;
          avatar_url?: string | null;
          user_id?: string | null;
          token_identifier: string;
          subscription?: string | null;
          credits?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string | null;
          email?: string | null;
          name?: string | null;
          full_name?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          company?: string | null;
          industry?: string | null;
          address?: string | null;
          role?: UserRole;
          phone?: string | null;
          status?: "active" | "inactive";
          plan?: "free" | "premium";
          raw_user_meta_data?: Json | null;
        };
        Update: {
          id?: string;
          avatar_url?: string | null;
          user_id?: string | null;
          token_identifier?: string;
          subscription?: string | null;
          credits?: string | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string | null;
          email?: string | null;
          name?: string | null;
          full_name?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          company?: string | null;
          industry?: string | null;
          address?: string | null;
          role?: UserRole;
          phone?: string | null;
          status?: "active" | "inactive";
          plan?: "free" | "premium";
          raw_user_meta_data?: Json | null;
        };
        Relationships: [];
      };
      webhook_events: {
        Row: {
          id: string;
          event_type: string;
          type: string;
          stripe_event_id: string | null;
          data: Json | null;
          created_at: string;
          modified_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          type: string;
          stripe_event_id?: string | null;
          data?: Json | null;
          created_at?: string;
          modified_at?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          type?: string;
          stripe_event_id?: string | null;
          data?: Json | null;
          created_at?: string;
          modified_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
