import notfound from '../../assets/notfound.png'
import { LiaHomeSolid } from "react-icons/lia";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-screen w-full bg-linear-to-r from-(--bg) to-(--bg-3)">
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='w-105 h-74'
      >
        <img
        src={notfound}
        className='w-105'
        />
      </motion.div>

      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='flex flex-col gap-3 text-center'
      >
        <h1 className='text-3xl text-(--text) font-medium'>
          Página não encontrada
        </h1>

        <div className='flex flex-col gap-1'>
          <p className='text-[14px] text-(--text-3)'>
            Parece que esta página se perdeu entre as páginas do livro.
          </p>

          <p className='text-[14px] text-(--text-3)'>
            Mas não se preocupe, vamos te ajudar a voltar ao caminho certo.
          </p>
        </div>
      </motion.div>

        <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='flex gap-2 py-3 px-5 mt-3 text-(--text-button) font-medium bg-(--bg-button) rounded-xl cursor-pointer hover:bg-(--bg-button-hover) duration-200'
        onClick={() => navigate('/')}
        >
          <LiaHomeSolid size={20}/>
          Voltar para o Explorar
        </motion.button>

    </div>
  )
}