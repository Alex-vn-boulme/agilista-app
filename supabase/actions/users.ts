"use server";

import type { Database } from "@/types/supabase";
import { createClient } from "../server";

type DbUser = Database["public"]["Tables"]["users"]["Row"];
export type UserRole = Database["public"]["Tables"]["users"]["Row"]["role"];

export type User = DbUser;

export type GetUsersResponse = {
  users: User[];
  total: number;
  page: number;
  perPage: number;
};

export type UserUpdates = {
  status?: User["status"];
  plan?: User["plan"];
  role?: UserRole;
};

// Helper function to get admin Supabase client
async function getAdminClient() {
  try {
    // Use the standard client first to check if the current user is an admin
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Not authenticated");
    }

    // Check if user is a platform admin
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (userData?.role !== "platform_admin") {
      throw new Error("Not authorized");
    }

    // We confirmed the user is an admin, so return the client
    return supabase;
  } catch (error) {
    console.error("Error getting admin client:", error);
    throw new Error("Not authorized");
  }
}

export async function getUsers(params?: {
  page?: number;
  perPage?: number;
  filter?: string;
  search?: string;
}): Promise<GetUsersResponse | User[]> {
  // Get the admin client
  const supabase = await getAdminClient();

  // First get the total count of users to verify we have multiple
  const { count: totalCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  console.log("Total users in database:", totalCount);

  let query = supabase.from("users").select("*", { count: "exact" });

  if (params?.filter) {
    if (params.filter === "active") {
      query = query.or(`status.is.null,status.eq.active`);
    } else if (params.filter === "inactive") {
      query = query.eq("status", "inactive");
    } else if (params.filter === "premium") {
      query = query.eq("plan", "premium");
    }
  }

  if (params?.search) {
    query = query.or(
      `email.ilike.%${params.search}%,full_name.ilike.%${params.search}%`
    );
  }

  if (params?.page && params?.perPage) {
    const start = (params.page - 1) * params.perPage;
    query = query.range(start, start + params.perPage - 1);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }

  console.log("Users fetched:", data?.length);
  console.log("Count returned:", count);

  const users = data as User[];

  if (params?.page && params?.perPage) {
    return {
      users,
      total: count || 0,
      page: params.page,
      perPage: params.perPage,
    };
  }

  return users;
}

export async function getUserStats() {
  const supabase = await getAdminClient();

  const [
    { count: totalUsers },
    { count: activeUsers },
    { count: premiumUsers },
    { count: inactiveUsers },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact" }),
    supabase
      .from("users")
      .select("*", { count: "exact" })
      .or(`status.is.null,status.eq.active`),
    supabase
      .from("users")
      .select("*", { count: "exact" })
      .eq("plan", "premium"),
    supabase
      .from("users")
      .select("*", { count: "exact" })
      .eq("status", "inactive"),
  ]);

  return {
    total: totalUsers || 0,
    active: activeUsers || 0,
    premium: premiumUsers || 0,
    inactive: inactiveUsers || 0,
  };
}

type UpdateUserData = {
  status?: User["status"];
  plan?: User["plan"];
  updated_at: string;
  raw_user_meta_data?: {
    role: UserRole;
  };
};

export async function updateUser(userId: string, updates: UserUpdates) {
  const supabase = await getAdminClient();

  const updateData: UpdateUserData = {
    updated_at: new Date().toISOString(),
  };

  if (updates.status) {
    updateData.status = updates.status;
  }

  if (updates.plan) {
    updateData.plan = updates.plan;
  }

  if (updates.role) {
    updateData.raw_user_meta_data = {
      role: updates.role,
    };
  }

  const { error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId);

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(userId: string) {
  const supabase = await getAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
}

export async function createTestUsers() {
  const supabase = await getAdminClient();

  // First check if users already exist
  const { count } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  if (count && count > 1) {
    console.log("Multiple users already exist, skipping test users creation");
    return { success: true, message: "Users already exist" };
  }

  // Create 3 test users
  const testUsers = [
    {
      id: crypto.randomUUID(),
      email: "test1@example.com",
      full_name: "Test User 1",
      role: "org_member" as UserRole,
      status: "active",
      plan: "free",
      created_at: new Date().toISOString(),
      token_identifier: crypto.randomUUID(),
      user_id: crypto.randomUUID(), // Adding user_id as text
    },
    {
      id: crypto.randomUUID(),
      email: "test2@example.com",
      full_name: "Test User 2",
      role: "org_admin" as UserRole,
      status: "active",
      plan: "premium",
      created_at: new Date().toISOString(),
      token_identifier: crypto.randomUUID(),
      user_id: crypto.randomUUID(), // Adding user_id as text
    },
    {
      id: crypto.randomUUID(),
      email: "test3@example.com",
      full_name: "Test User 3",
      role: "platform_admin" as UserRole,
      status: "inactive",
      plan: "free",
      created_at: new Date().toISOString(),
      token_identifier: crypto.randomUUID(),
      user_id: crypto.randomUUID(), // Adding user_id as text
    },
  ];

  const { error } = await supabase.from("users").insert(testUsers);

  if (error) {
    console.error("Error creating test users:", error);
    return { success: false, message: "Failed to create test users" };
  }

  return { success: true, message: "Test users created successfully" };
}
