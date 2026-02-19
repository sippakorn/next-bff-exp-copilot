"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { TaskTable } from '@/components/task-table';
import { mockTasks } from '@/data/mock-tasks';
import type { User } from '@/lib/auth';
import type { MenuItem } from '@/data/menu-config';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Get user from cookie
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(c => c.trim().startsWith('auth-user='));
    
    if (!authCookie) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(decodeURIComponent(authCookie.split('=')[1]));
      setUser(userData);

      // Fetch menu items based on user role
      fetch(`/api/menu?role=${userData.role}`)
        .then(res => res.json())
        .then(data => {
          setMenuItems(data.menu);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching menu:', err);
          setLoading(false);
        });
    } catch (err) {
      console.error('Error parsing user data:', err);
      router.push('/login');
    }
  }, [router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <DashboardLayout user={user} menuItems={menuItems}>
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">My Tasks</h2>
          <p className="text-muted-foreground text-sm">
            Manage and track your assigned tasks
          </p>
        </div>
        <TaskTable tasks={mockTasks} />
      </div>
    </DashboardLayout>
  );
}
