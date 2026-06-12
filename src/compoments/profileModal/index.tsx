import { GoSignOut } from "react-icons/go";

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export function ProfileModal() {
  const { user } = useContext(AuthContext);
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

  function loginOut() {
    navigate('/')
    signOut(auth)
    toast.success("Conta deslogada")
  }

  return (
    <div className="relative" ref={modalRef}>
      <button
      className="w-8 h-8 font-semibold text-[20px] text-[#e9eeff] bg-(--color-2) rounded-full cursor-pointer hover:bg-(--color-2)/80 duration-200"
      onClick={() => setModalOpen(!modalOpen)}
      >
        {user?.name?.charAt(0).toUpperCase()}
      </button>

      {modalOpen && (
        <div 
        className="absolute top-9 right-0 w-40 p-3 bg-(--bg-3) border border-(--border) rounded-xl">
          <button 
          className="flex gap-1 cursor-pointer"
          onClick={loginOut}
          >
            <GoSignOut size={18} color="var(--text-2)"/>
            <p className="text-[14px] text-(--text-2)">Sair da conta</p>
          </button>
        </div>
      )}
    </div>
  )
}