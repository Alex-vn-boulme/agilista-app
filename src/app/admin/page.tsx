"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2, PlayCircle, Search, Trash2 } from "lucide-react";

interface Workflow {
  id: string;
  name: string;
  category: string;
  organization: string;
  lastRun: string;
  status: "active" | "inactive";
}

const workflows: Workflow[] = [
  {
    id: "1",
    name: "Slack Notifications",
    category: "Notification",
    organization: "Marketing",
    lastRun: "5 minutes ago",
    status: "active",
  },
  {
    id: "2",
    name: "GitHub Issues",
    category: "Integration",
    organization: "Development",
    lastRun: "2 hours ago",
    status: "active",
  },
  {
    id: "3",
    name: "Calendar Sync",
    category: "Automation",
    organization: "Sales",
    lastRun: "1 day ago",
    status: "inactive",
  },
];

export default function AdminPage() {
  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Workflow Overview</h1>
            <p className="text-gray-500">Monitor and manage your workflows</p>
          </div>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]">
            + New Workflow
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="text-sm text-gray-500 mb-2 block">Category</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="notification">Notification</SelectItem>
                <SelectItem value="integration">Integration</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">
              Organization
            </label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Organizations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Organizations</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">Status</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search workflows..." className="pl-10" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-medium">All Workflows</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Sort</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M4.93179 2.22083L4.93179 14.0041L3.93179 14.0041L3.93179 2.22083L1.27849 4.87413L0.571426 4.16706L4.43179 0.306641L8.29216 4.16706L7.58509 4.87413L4.93179 2.22083ZM10.0682 12.7874L10.0682 1.00415L11.0682 1.00415L11.0682 12.7874L13.7215 10.1341L14.4286 10.8412L10.5682 14.7016L6.70782 10.8412L7.41489 10.1341L10.0682 12.7874Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Download</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M7.50005 1.04999H7.51005V7.84999L9.89005 5.46999L10.6 6.17999L7.50005 9.27999L4.40005 6.17999L5.11005 5.46999L7.49005 7.84999V1.04999H7.50005ZM2.00005 10.05V13.95H13V10.05H14V14.95H1.00005V10.05H2.00005Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left text-sm font-medium text-gray-500 p-4">
                    Name
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500 p-4">
                    Category
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500 p-4">
                    Organization
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500 p-4">
                    Last Run
                  </th>
                  <th className="text-left text-sm font-medium text-gray-500 p-4">
                    Status
                  </th>
                  <th className="text-right text-sm font-medium text-gray-500 p-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {workflows.map((workflow) => (
                  <tr key={workflow.id} className="border-b last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {workflow.name === "Slack Notifications" && (
                          <div className="w-8 h-8 bg-[#4A154B] rounded-md flex items-center justify-center">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 54 54"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.7747 33.79C19.7747 36.3467 17.6997 38.4217 15.143 38.4217C12.5863 38.4217 10.5113 36.3467 10.5113 33.79C10.5113 31.2333 12.5863 29.1583 15.143 29.1583H19.7747V33.79ZM21.9372 33.79C21.9372 31.2333 24.0122 29.1583 26.5688 29.1583C29.1255 29.1583 31.2005 31.2333 31.2005 33.79V45.2167C31.2005 47.7733 29.1255 49.8483 26.5688 49.8483C24.0122 49.8483 21.9372 47.7733 21.9372 45.2167V33.79Z"
                                fill="white"
                              />
                              <path
                                d="M26.5688 19.775C24.0122 19.775 21.9372 17.7 21.9372 15.1433C21.9372 12.5867 24.0122 10.5117 26.5688 10.5117C29.1255 10.5117 31.2005 12.5867 31.2005 15.1433V19.775H26.5688ZM26.5688 21.9375C29.1255 21.9375 31.2005 24.0125 31.2005 26.5692C31.2005 29.1258 29.1255 31.2008 26.5688 31.2008H15.143C12.5863 31.2008 10.5113 29.1258 10.5113 26.5692C10.5113 24.0125 12.5863 21.9375 15.143 21.9375H26.5688Z"
                                fill="#36C5F0"
                              />
                              <path
                                d="M40.5947 26.5692C40.5947 24.0125 42.6697 21.9375 45.2264 21.9375C47.783 21.9375 49.858 24.0125 49.858 26.5692C49.858 29.1258 47.783 31.2008 45.2264 31.2008H40.5947V26.5692ZM38.4322 26.5692C38.4322 29.1258 36.3572 31.2008 33.8005 31.2008C31.2439 31.2008 29.1689 29.1258 29.1689 26.5692V15.1433C29.1689 12.5867 31.2439 10.5117 33.8005 10.5117C36.3572 10.5117 38.4322 12.5867 38.4322 15.1433V26.5692Z"
                                fill="#2EB67D"
                              />
                              <path
                                d="M33.8005 40.5842C36.3572 40.5842 38.4322 42.6592 38.4322 45.2158C38.4322 47.7725 36.3572 49.8475 33.8005 49.8475C31.2439 49.8475 29.1689 47.7725 29.1689 45.2158V40.5842H33.8005ZM33.8005 38.4217C31.2439 38.4217 29.1689 36.3467 29.1689 33.79C29.1689 31.2333 31.2439 29.1583 33.8005 29.1583H45.2264C47.783 29.1583 49.858 31.2333 49.858 33.79C49.858 36.3467 47.783 38.4217 45.2264 38.4217H33.8005Z"
                                fill="#ECB22E"
                              />
                            </svg>
                          </div>
                        )}
                        {workflow.name === "GitHub Issues" && (
                          <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 98 96"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        )}
                        {workflow.name === "Calendar Sync" && (
                          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                        <span className="font-medium">{workflow.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        className={
                          workflow.category === "Notification"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                            : workflow.category === "Integration"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-green-100 text-green-800 hover:bg-green-100"
                        }
                        variant="outline"
                      >
                        {workflow.category}
                      </Badge>
                    </td>
                    <td className="p-4">{workflow.organization}</td>
                    <td className="p-4">{workflow.lastRun}</td>
                    <td className="p-4">
                      <Badge
                        className={
                          workflow.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                        variant="outline"
                      >
                        {workflow.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <PlayCircle className="h-4 w-4" />
                          <span className="sr-only">Run</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
