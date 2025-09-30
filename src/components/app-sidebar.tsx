import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  User,
  Eye,
  Info,
  ListOrdered,
  FileSearch2,
  CreditCard,
  Inbox,
  type LucideIcon,
  Package2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

type NavItem = {
  title: string
  url: string
  Icon?: LucideIcon
}
type NavGroup = {
  title: string
  url: string
  items: NavItem[]
}

const data: { navMain: NavGroup[] } = {
  navMain: [
    {
      title: "PERSONAL",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/Home",
          Icon: Home,
        },
        {
          title: "MyLeaves",
          url: "/MyLeaves",
          Icon: User,
        },
      ],
    },
    {
      title: "ATTENDANCE",
      url: "#",
      items: [
        {
          title: "View Attendance",
          url: "#",
          Icon: Eye,
        },
        {
          title: "Interviews",
          url: "#",
          Icon: Inbox,
        },
      ],
    },
    {
      title: "INFORMATION",
      url: "#",
      items: [
        {
          title: "Email & Information",
          url: "#",
          Icon: Info,
        },
        {
          title: "Documents",
          url: "#",
          Icon: Package2,
        },
      ],
    },
    {
      title: "EXPENSE",
      url: "#",
      items: [
        {
          title: "Add Expenses",
          url: "#",
          Icon: CreditCard,
        },
        {
          title: "Expenses Reports",
          url: "#",
          Icon: FileSearch2,
        },
        {
          title: "Statements",
          url: "#",
          Icon: ListOrdered,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const currentPath = location.pathname

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center ">
                  <img className="h-8 w-10" src="mst-logo.png" alt="" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span>
                    <img className="h-4 w-30" src="mst-txt.png" alt="" />
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span className="font-medium">{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const IconComp = subItem.Icon
                      const isActive = currentPath === subItem.url 
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={isActive}>
                        <Link
  to={subItem.url}
  className={`flex items-center gap-2 ${
    isActive
      ? "text-[#FCC28E] font-semibold"   
      : "text-gray-400 hover:text-[#FCC28E]" 
  }`}
>
  {IconComp && <IconComp className="h-4 w-4" />}
  <span>{subItem.title}</span>
</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
