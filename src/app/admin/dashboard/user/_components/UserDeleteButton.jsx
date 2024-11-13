"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteUser({ userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { toast } = useToast();
  const handleDelete = async () => {
    setLoading(true);
    console.log(userId);
    try {
      const res = await fetch(`/api/users/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      const data = await res.json();
      if (res.ok) {
        toast({
          title: "User deleted successfully!",
        });
        router.push("/admin/dashboard/user"); // Redirect to user list page
      } else {
        toast({
          variant: "destructive",
          title: data.error || "Something went wrong",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to delete user");
      toast({
        variant: "destructive",
        title: "Failed to delete user",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => handleDelete("USER_ID_HERE")} disabled={loading}>
        {loading ? "Deleting..." : "Delete User"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
