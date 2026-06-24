import { Outlet, ScrollRestoration } from "react-router";
import { Sidebar } from "../../sidebar";
import { DetailsHeader } from "../../headers/detailsHeader";
import { HeaderLogo } from "../../headers/headerLogo";
import { BottomNav } from "../../BottomNavigation";

export function DetailsLayout() {
  return (
    <div className="flex min-h-dvh bg-(--bg)">
      <ScrollRestoration/>
      <Sidebar/>
      
      <div className="flex-1 min-w-0 pb-22 md:pb-28 lg:pb-4">
        <HeaderLogo/>
        
        <div className="px-3 md:px-5 lg:px-10">
          <DetailsHeader/>
          <Outlet/>
        </div>

        <BottomNav/>
      </div>
    </div>
  )
}