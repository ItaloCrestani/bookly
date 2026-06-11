import { Outlet } from "react-router";
import { Sidebar } from "../../sidebar";
import { DetailsHeader } from "../../headers/detailsHeader";

export function DetailsLayout() {
  return (
    <div className="flex min-h-dvh bg-(--bg)">
      <Sidebar/>
      
      <div className="flex-1 min-w-0 px-10 pb-3">
      <DetailsHeader/>
      <Outlet/>
      </div>
    </div>
  )
}