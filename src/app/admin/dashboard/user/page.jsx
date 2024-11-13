// Page.tsx
import React from "react";
import connectToDatabase from "@/dbconfig/dbconfig";
import User from "@/models/userModels";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import DeleteUser from "./_components/UserDeleteButton";

export const metadata = {
  title: "Dashboard : Employees",
};

export default async function Page({ searchParams }) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");
  await connectToDatabase();
  const filter = {};
  const offset = (page - 1) * limit;
  const users = await User.find(filter).skip(offset).limit(limit).lean();
  const totalUsers = await User.countDocuments(filter);

  return (
    <div className="p-4">
      <div className="flex  justify-between ">
        <div>
          <h1 className="text-xl font-semibold mb-4">
            User List (Page {page})
          </h1>
          <p className="mb-4">Total Users: {totalUsers}</p>
        </div>
        <Link
          href={"/admin/dashboard/user/add"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>

      {users.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.name || "N/A"}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
                <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {user.isAdmin ? "N/A" : <DeleteUser userId={user._id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
