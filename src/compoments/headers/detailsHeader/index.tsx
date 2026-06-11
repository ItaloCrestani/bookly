import { GoArrowLeft } from "react-icons/go";

import { Navigate, useMatch, useNavigate } from "react-router";

export function DetailsHeader() {
  const navigate = useNavigate();
  
  const matchBook = useMatch("/book/:id");
  const matchShelf = useMatch("/shelf/:id")

  function getContent() {
    
    if (matchBook) {
      return {
        label: "Voltar para Explorar",
        path: "/"
      }
    }

    if (matchShelf) {
      return {
        label: "Voltar para Estante",
        path: "/shelf"
      }
    }

    return null;
  }

  const buttonContent = getContent();

  if(!buttonContent) return <Navigate to="/" replace />

  return (
    <header className="flex flex-1 justify-between py-8">
      <button 
      className="flex gap-2 items-center text-[14px] text-[#8C929B] cursor-pointer hover:text-[#8849EE] transition-colors"
      onClick={() => navigate(buttonContent.path)}
      >
        <GoArrowLeft/>
        {buttonContent?.label}
      </button>

    <button className="w-8 h-8 font-bold text-[20px] text-white bg-[#8849EE] rounded-full">
      L
    </button>
  </header>
)
}