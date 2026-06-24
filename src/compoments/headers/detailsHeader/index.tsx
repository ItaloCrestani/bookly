import { GoArrowLeft } from "react-icons/go";

import { Navigate, useMatch, useNavigate } from "react-router";
import { ProfileModal } from "../../profileModal";

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
    <header className="flex flex-1 justify-between py-5 md:py-8">
      <button 
      className="flex gap-2 items-center text-[12px] md:text-[14px] text-[#8C929B] cursor-pointer hover:text-[#8849EE] active:text-[#8849EE] transition-colors"
      onClick={() => navigate(buttonContent.path)}
      >
        <GoArrowLeft/>
        {buttonContent.label}
      </button>

    <div className="hidden lg:block">
      <ProfileModal />
    </div>
  </header>
)
}