"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronDown, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { User as UserType } from '@/lib/auth';
import type { MenuItem } from '@/data/menu-config';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserType;
  menuItems: MenuItem[];
}

export function DashboardLayout({ children, user, menuItems }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleLogout = () => {
    document.cookie = 'auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Gulf App by Co-pilot</h1>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`border-r bg-white transition-all duration-300 ${
            sidebarOpen ? 'w-64' : 'w-16'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-8 w-8"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              <ul className="space-y-1">
                {menuItems.map(item => (
                  <li key={item.id}>
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => toggleMenu(item.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm"
                        >
                          {sidebarOpen && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  expandedMenus.includes(item.id) ? 'rotate-180' : ''
                                }`}
                              />
                            </>
                          )}
                          {!sidebarOpen && <span>•</span>}
                        </button>
                        {expandedMenus.includes(item.id) && sidebarOpen && (
                          <ul className="ml-4 mt-1 space-y-1">
                            {item.children.map(child => (
                              <li key={child.id}>
                                <Link
                                  href={child.path || '#'}
                                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.path || '#'}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent text-sm"
                      >
                        {sidebarOpen ? item.label : <span>•</span>}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
