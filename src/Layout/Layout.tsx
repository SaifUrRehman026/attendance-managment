import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { Power } from "lucide-react" 
export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-[#4F5467]">
          
          <div className="flex items-center gap-2">
            <SidebarTrigger className="text-white"/>
            <Separator orientation="vertical" className="mr-2 h-4 " />
           
          </div>

         
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                localStorage.removeItem("token") 
                window.location.href = "/login" 
              }}
              className="p-2 rounded-full cursor-pointer  text-[#FFFFFF] mr-3.5"
              title="Logout"
            >
              <Power size={22} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 bg-[#EDF1F5]">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
