'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/Spinner';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.'
  }),
  referral_code: z.string().optional(),
  isVerified: z.boolean(),
  monetization: z.boolean(),
  waiting_time: z.any(),
  isAdmin: z.boolean(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  confirmPassword: z.string().min(6, {
    message: 'Confirm password must be at least 6 characters.'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'], // Apply the error on the confirmPassword field
});


export default function UserForm() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      referral_code: '',
      isVerified: false,
      monetization: false,
      isAdmin: false,
      waiting_time: 0,
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "User created successfully!",
        });
        router.push('/admin/dashboard/user');
      } else {
        toast({
          variant: "destructive",
          title: data.message || "Failed to update password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "An error occurred while creating the user.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Referral Code Field */}
              <FormField
                control={form.control}
                name="referral_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Waiting Time Field */}
              <FormField
                control={form.control}
                name="waiting_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waiting Time (in days)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Verified Checkbox */}
              <FormField
                control={form.control}
                name="isVerified"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verified</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Monetization Checkbox */}
              <FormField
                control={form.control}
                name="monetization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monetization</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Admin Checkbox */}
              <FormField
                control={form.control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Spinner size="sm" /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
