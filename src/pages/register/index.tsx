import bg from "../../assets/bglogin.png"
import logo from "../../assets/logo.svg"
import { GiBookshelf } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { BiSolidQuoteRight } from "react-icons/bi";
import { GoPerson } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebaseConnection";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.email("Insira um email válido").min(1, "O campo email é obrigatório"),
  password: z.string().min(1, "O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

export function Register() {
  const navigate = useNavigate();

  const [ showPassword, setShowPassword ] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })

  function handleRegister(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user) => {
      await updateProfile(user.user, {
        displayName: data.name
      })

      toast.success("Conta criada!")
      navigate('/', { replace: true })
      toast.success("Logado!")
    })
    .catch(error => {
      console.log(error.code)
      toast.error("Erro ao cadastrar conta")
    })
  }

  function handleGoogleRegister() {
    signInWithPopup(auth, googleProvider)
    .then(() => {
      toast.success("Logado!")
      navigate('/', { replace: true })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return(
   <div className="flex min-h-dvh">
    <div
    className="relative -z-2 hidden flex-col flex-1 px-6 py-8 bg-cover bg-center lg:flex" 
    style={{backgroundImage: `url(${bg})`}}
    >
      <span className="absolute -z-1 inset-0 bg-linear-to-r from-[#04080ee9] from-50%"/>
      <img src={logo} className="h-9 w-fit"/>

      <div className="flex flex-col flex-1 justify-between pt-18 px-6">
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        >
          <h1 className="max-w-70 text-4xl text-[#E9EEFF] font-medium leading-tight">
            Sua estante, <span className="text-[#8C59FE]">sua história.</span>
          </h1>
          <p className="mt-2 max-w-84 text-[14px] text-[#8C929B]">
            Organize seus livros, acompanhe suas leituras e descubra novas histórias incríveis.
          </p>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex">
            <span className="w-12 h-12 rounded-xl bg-[#111827] flex items-center justify-center">
              <GiBookshelf size={25} color="#8C59FE"/>
            </span>
            <div className="flex flex-col gap-1.5 ml-4">
              <p className="text-[14px] text-[#dbe0ea]">Organize sua estante</p>
              <p className="text-[12px] text-[#8C929B] max-w-54">
                Separe seus livros em "Quero ler", "Lendo" e "Já li".
              </p>
            </div>
          </div>

          <div className="flex mt-6">
            <span className="w-12 h-12 rounded-xl bg-[#111827] flex items-center justify-center">
              <FaRegStar size={25} color="#8C59FE"/>
            </span>
            <div className="flex flex-col gap-1.5 ml-4">
              <p className="text-[14px] text-[#dbe0ea]">Acompanhe seu progresso</p>
              <p className="text-[12px] text-[#8C929B] max-w-54">
                Veja em que página parou, avalie e escreva seus reviews.
              </p>
            </div>
          </div>

          <div className="flex mt-6">
            <span className="w-12 h-12 rounded-xl bg-[#111827] flex items-center justify-center">
              <FaRegHeart size={25} color="#8C59FE"/>
            </span>
            <div className="flex flex-col gap-1.5 ml-4">
              <p className="text-[14px] text-[#dbe0ea]">Seus favoritos sempre com você</p>
              <p className="text-[12px] text-[#8C929B] max-w-54">
                Salve seus livros favoritos e tenha tudo sincronizado.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="w-fit px-6 py-4 bg-linear-to-r from-[#0D0D1C] to-[#07090F] border border-[#191D27] rounded-xl"
        >
          <span>
            <BiSolidQuoteRight size={20} color="#8C59FE"/>
          </span>
          <p className="mt-2 text-[12px] text-[#dbe0ea]">
            "Um leitor vive mil vidas antes de morrer."
          </p>
          <p className="mt-1 text-[12px] text-[#8C929B]">- George R. R. Martin</p>
        </motion.div>
      </div>
    </div>

    <div className="flex flex-col flex-1 justify-center bg-[#060A11] border-[#191D27] lg:px-12 lg:py-6 lg:border-l-2 lg:-ml-8 lg:rounded-l-3xl">
      <div className="flex flex-col flex-1 justify-center w-full overflow-y-auto px-4 py-6 bg-[#0C111A] border-[#191D27] md:border md:rounded-4xl md:px-24">
        <div className="text-white">
          <h1 className="text-2xl font-medium">Crie uma conta</h1>

          <form className="mt-8" onSubmit={handleSubmit(handleRegister)}>
            <p className="text-[14px] text-[#dbe0ea] mb-2">Nome</p>
            <div className="flex w-full gap-3 items-center p-4 bg-[#060A11] border border-[#191D27] rounded-xl">
              <GoPerson size={24} color="#8C929B"/>
              <input
                className="w-full text-[14px] outline-none placeholder:text-[#8C929B] autofill:[-webkit-text-fill-color:white] autofill:[-webkit-box-shadow:0_0_0_1000px_#060A11_inset]"
                type="text"
                placeholder="Seu nome completo"
                id="name"
                {...register("name")}
              />
            </div>
            {errors.name && <p className="text-[10px] my-1 text-red-400">{errors.name.message}</p>}

         
            <p className="text-[14px] text-[#dbe0ea] mt-6 mb-2">E-mail</p>
            <div className="flex w-full gap-3 items-center p-4 bg-[#060A11] border border-[#191D27] rounded-xl">
              <HiOutlineMail size={24} color="#8C929B"/>
              <input
                className="w-full text-[14px] outline-none placeholder:text-[#8C929B] autofill:[-webkit-text-fill-color:white] autofill:[-webkit-box-shadow:0_0_0_1000px_#060A11_inset]"
                type="email"
                placeholder="seuemail@exemplo.com"
                id="email"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-[10px] my-1 text-red-400">{errors.email.message}</p>}

            <p className="text-[14px] text-[#dbe0ea] mt-6 mb-2">Senha</p>
            <div className="flex w-full gap-3 items-center p-4 bg-[#060A11] border border-[#191D27] rounded-xl">
              <MdLockOutline size={24} color="#8C929B"/>
              <input
                className="w-full text-[14px] outline-none placeholder:text-[#8C929B] autofill:[-webkit-text-fill-color:white] autofill:[-webkit-box-shadow:0_0_0_1000px_#060A11_inset]"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                id="password"
                {...register("password")}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                { showPassword ? <FaRegEye size={20} color="#8C929B"/> : 
                <FaRegEyeSlash size={20} color="#8C929B"/>}
              </button>
            </div>
            {errors.password && <p className="text-[10px] my-1 text-red-400">{errors.password.message}</p>}
            
            <motion.button
            className="w-full py-4 mt-8 bg-linear-to-r from-[#5236D8] to-[#6748B9] rounded-xl cursor-pointer"
            whileHover={{scale: 1.02, boxShadow: "0px 0px 15px rgba(103,72,185,0.45)"}}
            whileTap={{scale: 0.98}}
            transition={{duration: 0.2}}
            >
              Entrar
            </motion.button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#191D27]" />

              <span className="text-xs text-[#8C929B] my-6">
                OU
              </span>

              <div className="flex-1 h-px bg-[#191D27]" />
            </div>

            <motion.button
            className="flex justify-center w-full py-4 gap-4 bg-[#111827] border-2 border-[#191D27] rounded-xl cursor-pointer"
            onClick={handleGoogleRegister}
            type="button"
            whileHover={{scale: 1.02}}
            whileTap={{scale: 0.98}}
            transition={{duration: 0.2}}
            >
              <FcGoogle size={24}/>
              Entrar com Google
            </motion.button>

            <p className="flex justify-center gap-2 mt-6 text-[#8C929B] text-[14px]">
              Já possui uma conta?<Link to="/login" className="text-[#8C59FE]">Faça login</Link>
            </p>
            
          </form>


        </div>
      </div>
    </div>
   </div> 
  )
}