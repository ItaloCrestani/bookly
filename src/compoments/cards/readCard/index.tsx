import { MdMoreHoriz } from "react-icons/md";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

import { useNavigate } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseConnection";
import { AuthContext } from "../../../context/AuthContext";
import { type BookProps } from "../../../pages/bookshelf";
import type { BookStatus } from "../../../utils/bookStatus";

export function ReadCard({ book }: { book: BookProps }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ modalOpen, setModalOpen ] = useState(false);
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
  
    async function updateStatus(status: BookStatus) {
    if (!user || !book) return;

    if (status === 'Reading') {
      await updateDoc(doc(db, "users", user.uid, "bookshelf", book.id), 
        {
          status,
          updatedAt: serverTimestamp()
        }
      );
    }

    if (status === 'Readed') {
      await updateDoc(doc(db, "users", user.uid, "bookshelf", book.id), 
        {
          status,
          progress: book.pages,
          updatedAt: serverTimestamp()
        }
      );
    }

    toast.success("Livro movido")

  }

  return(
    <motion.div 
    className={`relative shrink-0 w-30 h-58 md:w-36 md:h-68 bg-(--bg-3) border border-(--border) rounded-xl cursor-pointer`}
    ref={modalRef}
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}
    transition={{duration: 0.2}}
    >
      <button
      onClick={() => navigate(`/shelf/${book.id}`)}
      className="flex flex-col w-full cursor-pointer overflow-hidden rounded-xl"
      >
        <img
        className="w-full h-36 md:h-44 object-cover object-center"
        src={book.image}
        />
      
        <div className="flex flex-col gap-2 w-full px-3 py-4">
          <h1 className="text-[12px] md:text-[14px] text-(--text) font-medium line-clamp-2 text-left">{book.title}</h1>
          <p className="max-w-19 md:max-w-22 text-[10px] md:text-[13px] text-(--text-3) line-clamp-1 text-left">{book.author}</p>
        </div>
      </button>

      <button 
      className="absolute bottom-1 right-2 p-1 text-(--text-1) rounded-2xl cursor-pointer duration-300 hover:bg-(--bg-4)"
      onClick={() => setModalOpen(!modalOpen)}
      >
        <MdMoreHoriz size={20}/>
      </button>

      {modalOpen && (
        <motion.div 
        className="absolute right-2 bottom-8 flex flex-col items-start md:p-1 text-[12px] text-(--text-1) bg-(--bg-modal) rounded-xl backdrop-blur-xs"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        >
          <button 
          className="flex items-center gap-1.5 w-full p-2 rounded-xl cursor-pointer hover:bg-(--hover-modal)"
          onClick={() => updateStatus('Reading')}
          >
            <HiOutlineBookOpen size={15}/>
            Estou lendo
          </button>

          <button 
          className="flex items-center gap-1.5 w-full p-2 rounded-xl cursor-pointer hover:bg-(--hover-modal)"
          onClick={() => updateStatus('Readed')}
          >
            <IoIosCheckmarkCircleOutline size={15}/>
            Já li
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}