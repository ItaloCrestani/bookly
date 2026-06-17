import logo from '../../../assets/logo.svg'

import { useLocation } from "react-router"
import { ProfileModal } from "../../profileModal";

export function MainHeader() {
  const { pathname } = useLocation();

  const headerContent = {
    "/": {
      title: "Explorar",
      subtitle: "Encontre novos livros e adicione à sua estante."
    },
    "/shelf": {
      title: "Minha Estante",
      subtitle: "Organize e acompanhe todos os livros da sua estante."
    }
  } as const

  const current = headerContent[pathname as keyof typeof headerContent]

  return (
    <header className="flex flex-1 justify-between items-center py-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-2xl text-(--text-2)">{current.title}</h1>
        <p className="text-[14px] text-(--text-3)">
          {current.subtitle}
        </p>
      </div>

      <div className="hidden lg:block">
        <ProfileModal />
      </div>

      <div className="lg:hidden">
        <img src={logo} className='h-9' />
      </div>
  </header>
)
}