import { MdOutlineExplore } from "react-icons/md";
import {  RiBookShelfLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router";
import { ProfileModal } from "../profileModal";

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

    function renderButtons() {
    const buttons = [
      { path: '/', label: 'Explorar', icon: <MdOutlineExplore className="size-8 md:size-10"/> },
      { path: '/shelf', label: 'Minha Estante', icon: <RiBookShelfLine className="size-8 md:size-10"/> },
      // { path: '/favoritos', label: 'Favoritos', icon: <RiHeartLine size="20px"/> },
    ]

    return buttons.map(button => {
      const isActive = button.path === '/' ? pathname === '/' || pathname.startsWith('/book') : pathname.startsWith(button.path);

      return (
        <button
          key={button.path}
          onClick={() => navigate(button.path)}
          className={`flex flex-col items-center w-40 gap-1 px-2 py-2 font-medium text-[10px] md:text-[12px] cursor-pointer ease-in-out duration-400 ${isActive ? 'text-(--color-2)' : 'text-(--text-3)'}`}
        >
          {button.icon}
          {button.label}
        </button>
      )
    })
  }

  return (
    <div className="fixed z-10 bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mb-5 justify-center items-center bg-(--bg-4) rounded-4xl lg:hidden">
      {renderButtons()}

      <div className="flex flex-col items-center justify-center w-40 gap-1 px-2 py-2 font-medium text-[10px] md:text-[12px] text-(--text-3) cursor-pointer">
      <ProfileModal />
      <p>Perfil</p>
      </div>
    </div>
  )
}