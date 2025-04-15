"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createTestUsers,
  deleteUser,
  getUsers,
  getUserStats,
  updateUser,
  type GetUsersResponse,
  type User,
  type UserUpdates,
} from "../../../../supabase/actions/users";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data: stats } = useQuery({
    queryKey: ["user-stats"],
    queryFn: () => getUserStats(),
  });

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useQuery<GetUsersResponse>({
    queryKey: ["users", debouncedSearch, filter, page],
    queryFn: () =>
      getUsers({
        search: debouncedSearch,
        filter,
        page,
        perPage: 10,
      }) as Promise<GetUsersResponse>,
  });

  useEffect(() => {
    if (usersData) {
      console.log("Users data:", usersData);
      console.log("Number of users:", usersData.users.length);
      console.log("Total count:", usersData.total);
    }
  }, [usersData]);

  const handleUpdateUser = useCallback(
    async (userId: string, updates: UserUpdates) => {
      try {
        await updateUser(userId, updates);
        await refetch();
        toast.success("User updated successfully");
      } catch (error) {
        toast.error("Failed to update user");
      }
    },
    [refetch]
  );

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      try {
        await deleteUser(userId);
        await refetch();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
      }
    },
    [refetch]
  );

  const handleCreateTestUsers = useCallback(async () => {
    try {
      const result = await createTestUsers();
      await refetch();
      toast.success(result.message);
    } catch (error) {
      toast.error("Failed to create test users");
    }
  }, [refetch]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleCreateTestUsers} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Test Users
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All Users ({stats?.total || 0})
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => setFilter("active")}
        >
          Active ({stats?.active || 0})
        </Button>
        <Button
          variant={filter === "premium" ? "default" : "outline"}
          onClick={() => setFilter("premium")}
        >
          Premium ({stats?.premium || 0})
        </Button>
        <Button
          variant={filter === "inactive" ? "default" : "outline"}
          onClick={() => setFilter("inactive")}
        >
          Inactive ({stats?.inactive || 0})
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : usersData?.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              usersData?.users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.status ?? "active"}
                      onValueChange={(value) =>
                        handleUpdateUser(user.id, {
                          status: value as User["status"],
                        })
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.status ?? "active"}
                      onValueChange={(value) =>
                        handleUpdateUser(user.id, {
                          status: value as User["status"],
                        })
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={user.status ?? "active"}
                      onValueChange={(value) =>
                        handleUpdateUser(user.id, {
                          status: value as User["status"],
                        })
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="org_member">Member</SelectItem>
                        <SelectItem value="org_admin">Org Admin</SelectItem>
                        <SelectItem value="platform_admin">
                          Platform Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {usersData?.users.length || 0} of {usersData?.total || 0}{" "}
            users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            {Array.from(
              { length: Math.min(3, Math.ceil((usersData?.total || 0) / 10)) },
              (_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              )
            )}
            <Button
              variant="outline"
              disabled={
                page === Math.ceil((usersData?.total || 0) / 10) ||
                !usersData?.total
              }
              onClick={() =>
                setPage((p) =>
                  Math.min(Math.ceil((usersData?.total || 0) / 10), p + 1)
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
