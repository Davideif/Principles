"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  BarChart2,
  Settings,
  Users,
  Bell,
  Menu,
  LogOut,
  UserCircle,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/log", label: "Situation Logs", icon: BarChart2 },
  { href: "/dashboard/principles", label: "Principles", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6">

        {/* Left — Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
              <span className="text-xs font-bold text-background">S</span>
            </span>
            <span className="text-sm font-semibold tracking-tight">Principles</span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-2">

          {/* Notification bell */}
          <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 justify-center rounded-full p-0 text-[10px]">
              3
            </Badge>
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hidden md:flex h-8 items-center gap-2 rounded-full pl-1 pr-2 hover:bg-muted"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="text-[10px]">JD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Jane Doe</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <p className="text-xs text-muted-foreground">Signed in as</p>
                <p className="text-sm font-medium truncate">jane@example.com</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
                    <span className="text-xs font-bold text-background">S</span>
                  </span>
                  <span className="text-sm font-semibold tracking-tight">Saascape</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="absolute bottom-0 left-0 right-0 border-t p-3">
                <div className="flex items-center gap-3 rounded-md px-3 py-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatar.png" alt="User" />
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">Jane Doe</p>
                    <p className="text-xs text-muted-foreground truncate">jane@example.com</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}