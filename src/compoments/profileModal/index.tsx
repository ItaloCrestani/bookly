import { GoSignIn, GoSignOut } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import toast from "react-hot-toast";

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

export function ProfileModal() {
  const { user, signed } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate();
  const [ modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setModalOpen(false);
      }
    }

    document.addEventListener('click', clickOutside)

    return () => {
      document.removeEventListener('click', clickOutside)
    }
  }, [])

  async function loginOut() {
    await signOut(auth)
    navigate('/login')
    toast.success("Conta deslogada")
  }

  return (
    <div className="relative" ref={modalRef}>
      <button
      className="w-7 h-7 md:w-10 md:h-10 lg:w-8 lg:h-8 flex items-center justify-center font-semibold text-[16px] md:text-[20px] text-[#e9eeff] bg-(--color-2) rounded-full cursor-pointer hover:bg-(--color-2)/80 duration-200"
      onClick={() => setModalOpen(!modalOpen)}
      >
        {signed ? user?.name?.charAt(0).toUpperCase() : <FaRegUser size={16}/>}
      </button>

      {modalOpen && (
        <div 
        className="absolute -top-22 lg:top-9 right-0 flex flex-col gap-4 w-42 p-3 bg-(--bg-3) border border-(--border) rounded-xl">
          <button 
          className={`flex gap-1 cursor-pointer ${!signed && "hidden"}`}
          onClick={loginOut}
          >
            <GoSignOut size={18} color="var(--text-2)"/>
            <p className="text-[14px] text-(--text-2)">Sair da conta</p>
          </button>

          <button
          className={`flex gap-1 cursor-pointer ${signed && "hidden"}`}
          onClick={() => navigate('/login')}
          >
            <GoSignIn size={18} color="var(--text-2)"/>
            <p className="text-[14px] text-(--text-2)">Entrar na conta</p>
          </button>

          <div className="flex items-center gap-1 font-medium text-(--text-2) text-[14px] lg:hidden">
            <p>Modo escuro</p>

            <button 
            className="flex items-center justify-center w-8 h-4.5 p-1 bg-(--bg-button) rounded-full cursor-pointer"
            onClick={toggleTheme}
            >
              <span className={`bg-white w-3 h-3 rounded-full transition-transform duration-300 ${theme === "light" ? '-translate-x-2' : 'translate-x-2'}`}/>
            </button>
              
          </div>
        </div>
      )}
    </div>
  )
}