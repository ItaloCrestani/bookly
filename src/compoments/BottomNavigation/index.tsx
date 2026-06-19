import { MdOutlineExplore } from "react-icons/md";
import {  RiBookShelfLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";
import { ProfileModal } from "../profileModal";

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

    function renderButtons() {
    const buttons = [
      { path: '/', label: 'Explorar', icon: <MdOutlineExplore className="size-7 md:size-10"/> },
      { path: '/shelf', label: 'Minha Estante', icon: <RiBookShelfLine className="size-7 md:size-10"/> },
      // { path: '/favoritos', label: 'Favoritos', icon: <RiHeartLine size="20px"/> },
    ]

    return buttons.map(button => {
      const isActive = button.path === '/' ? pathname === '/' || pathname.startsWith('/book') : pathname.startsWith(button.path);

      return (
        <button
          key={button.path}
          onClick={() => navigate(button.path)}
          className={`flex flex-col items-center gap-1 font-medium text-[10px] md:text-[12px] cursor-pointer ease-in-out duration-400 ${isActive ? 'text-(--color-2)' : 'text-(--text-3)'}`}
        >
          {button.icon}
          {button.label}
        </button>
      )
    })
  }

  return (
    <div className="fixed z-10 bottom-0 left-1/2 -translate-x-1/2 flex w-[95%] md:w-[75%] gap-2 py-2 mb-2 md:mb-5 justify-evenly items-center bg-(--bg-4) border border-(--border-2) rounded-3xl lg:hidden">
      {renderButtons()}

      <div className="flex flex-col items-center justify-center gap-1 font-medium text-[10px] md:text-[12px] text-(--text-3) cursor-pointer">
      <ProfileModal />
      <p>Perfil</p>
      </div>
    </div>
  )
}