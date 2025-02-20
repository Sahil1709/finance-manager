"use client";

import { BarChart3, CreditCard, Home, PieChart, Settings } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    title: "Overview",
    links: [
      { title: "Dashboard", icon: Home, href: "/" },
      { title: "Transactions", icon: CreditCard, href: "/transactions" },
      { title: "Budgets", icon: PieChart, href: "/budgets" },
      { title: "Analytics", icon: BarChart3, href: "/analytics" },
    ],
  },
  {
    title: "Settings",
    links: [
      { title: "Preferences", icon: Settings, href: "/settings" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <h1 className="px-4 text-xl font-bold">Finance Manager</h1>
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.links.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === link.href}
                    >
                      <Link href={link.href}>
                        <link.icon className="mr-2 h-4 w-4" />
                        {link.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <div className="flex items-center p-4 border-t">
        <UserButton />
        <div className="ml-2">
          <p className="text-sm font-medium">{user?.fullName}</p>
        </div>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}