import { useLocation } from "react-router"

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
    <header className="flex flex-1 justify-between py-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-2xl text-(--text-2)">{current.title}</h1>
        <p className="text-[14px] text-(--text-3)">
          {current.subtitle}
        </p>
      </div>

      <button className="w-8 h-8 font-bold text-[20px] text-white bg-(--color-2) rounded-full">
        L
      </button>
  </header>
)
}