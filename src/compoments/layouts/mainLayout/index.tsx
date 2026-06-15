import { Outlet } from "react-router";
import { Sidebar } from "../../sidebar";
import { MainHeader } from "../../headers/mainHeader";

export function MainLayout() {
  return (
    <div className="flex min-h-dvh bg-(--bg)">
      <Sidebar/>

      <div className="flex-1 min-w-0 px-2 lg:px-10">
      <MainHeader/>
      <Outlet/>
      </div>
    </div>
  )
}