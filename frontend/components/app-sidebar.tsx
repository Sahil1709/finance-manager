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
import {Chip} from "@heroui/chip";
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

export const CheckIcon = ({size, height, width, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

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
      <div className="flex justify-center p-4">
      <Chip color="success" startContent={<CheckIcon size={18} />} size="lg">
        Version 1.0.0
      </Chip>
      </div>
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