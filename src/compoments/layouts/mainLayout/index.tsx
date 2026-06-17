import { Outlet } from "react-router";
import { Sidebar } from "../../sidebar";
import { MainHeader } from "../../headers/mainHeader";
import { BottomNav } from "../../BottomNavigation";

export function MainLayout() {
  return (
    <div className="flex min-h-dvh bg-(--bg)">
      <Sidebar/>

      <div className="flex-1 min-w-0 px-5 pb-28 lg:pb-4 lg:px-10">
      <MainHeader/>
      <Outlet/>
      <BottomNav/>
      </div>
    </div>
  )
}