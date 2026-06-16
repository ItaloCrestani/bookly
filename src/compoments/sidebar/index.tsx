import logo from "../../assets/logo.svg"
import logoLight from "../../assets/logolight.svg"
import { MdOutlineExplore } from "react-icons/md";
import {  RiBookShelfLine, RiHeartLine } from "react-icons/ri";
import { LuBookOpen } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import { motion, useScroll, useTransform } from "framer-motion";
import 'react-loading-skeleton/dist/skeleton.css'

import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Sidebar() {
  const [ lightMode, setLightMode] = useState(document.documentElement.classList.contains('light'));
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signed, loadingAuth } = useContext(AuthContext)

  const { scrollY } = useScroll()

  const radius = useTransform(
    scrollY,
    [0, 300],
    [0, 24]
  )

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme === 'light') {
      document.documentElement.classList.add('light')
      setLightMode(true)
    }
  }, [])
  
  function toggleTheme() {
    document.documentElement.classList.toggle('light')

    const isLight = document.documentElement.classList.contains('light')

    setLightMode(isLight)

    localStorage.setItem('theme', isLight ? 'light' : 'dark')

  }
  
  function renderButtons() {
    const buttons = [
      { path: '/', label: 'Explorar', icon: <MdOutlineExplore size="20px"/> },
      { path: '/shelf', label: 'Minha Estante', icon: <RiBookShelfLine size="20px"/> },
      // { path: '/favoritos', label: 'Favoritos', icon: <RiHeartLine size="20px"/> },
    ]

    return buttons.map(button => {
      const isActive = button.path === '/' ? pathname === '/' || pathname.startsWith('/book') : pathname.startsWith(button.path);

      return (
        <button
          key={button.path}
          onClick={() => navigate(button.path)}
          className={`flex gap-2 px-2 py-3 font-medium text-[14px] rounded-md cursor-pointer ease-in-out duration-400 ${isActive ? 'bg-(--bg-active) text-(--color-2)' : 'text-(--text-3)'}`}
        >
          {button.icon}
          {button.label}
        </button>
      )
    })
  }

  return(
    <motion.div
    style={{
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    }}
    className="sticky top-0 lg:flex flex-col w-52.5 h-dvh px-4 py-8 bg-(--bg-2) border-r-2 border-(--border) hidden"
    >
      <div className="px-2">
        <img src={lightMode ? logoLight : logo} className="w-fit h-8"/>
      </div>
      
      <nav className="flex flex-col gap-5 pt-15">
        {renderButtons()}
      </nav>

      <div className="h-px px-2 my-10 bg-(--border)"/>

      { loadingAuth ? (
        <div className="h-52 mb-10 rounded-xl bg-(--bg-3) border border-(--border)">
        </div>
      ) : signed ?
       <div className="flex flex-col items-center px-2 py-4 mb-10 font-medium text-(--text-3) text-[12px] bg-(--bg-3) border border-(--border) rounded-xl">
        <LuBookOpen size={26}/>
        <p className="text-(--text-2) mt-4 mb-2">Organize sua estante</p>
        <p className="text-center mb-6">
          Salve livros, acompanhe suas leituras e mantenha tudo sempre com você.
        </p>

        <motion.button 
          className="w-full py-2.5 font-semibold text-[14px] text-(--text-button) bg-(--bg-button) rounded-md cursor-pointer" 
          onClick={() => navigate("/")}            
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          transition={{duration: 0.2}}
          >
            Explorar livros
          </motion.button>
       </div> : 
        <div className="flex flex-col items-center gap-4 px-2 pb-10 font-medium text-(--text-3) text-[12px]">
          <LuBookOpen size={26}/>
          <p className="px-4 text-center">
            Faça login para salvar seus livros e acessar sua estante em qualquer lugar.
          </p>

          <motion.button 
          className="w-full py-2.5 font-semibold text-[14px] text-(--text-button) bg-(--bg-button) rounded-md cursor-pointer" 
          onClick={() => navigate("/login")}            
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          transition={{duration: 0.2}}
          >
            Entrar
          </motion.button>

          <motion.button 
          className="w-full py-2.5 font-semibold text-[14px] text-(--text-2) border border-(--border-2) rounded-md cursor-pointer"
          onClick={() => navigate("/register")}            
          whileHover={{scale: 1.02}}
          whileTap={{scale: 0.98}}
          transition={{duration: 0.2}}
          >
            Criar conta
          </motion.button>
        </div> }

      <div className="flex items-center gap-2 px-2 mt-auto font-medium text-(--text-3) text-[12px]">
        <IoMoonOutline size={20}/>
        <p>Modo escuro</p>
        
        <button 
        className="flex items-center justify-center w-11 h-5 p-1 bg-(--bg-button) rounded-full cursor-pointer"
        onClick={toggleTheme}
        >
          <span className={`bg-white w-3 h-3 rounded-full transition-transform duration-300 ${lightMode ? '-translate-x-3' : 'translate-x-3'}`}></span>
        </button>
      </div>
    </motion.div>
  )
}