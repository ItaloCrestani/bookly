import { MdMoreHoriz } from "react-icons/md";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import { type BookProps } from "../../../pages/bookshelf";

export function ReadCard({ book }: { book: BookProps }) {
    const navigate = useNavigate();

  return(
    <motion.div 
    className="relative shrink-0 w-36 h-68 bg-(--bg-3) border border-(--border) rounded-xl overflow-hidden cursor-pointer"
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}
    transition={{duration: 0.2}}
    >
      <button
      onClick={() => navigate(`/shelf/${book.id}`)}
      className="flex flex-col w-full cursor-pointer"
      >
        <img
        className="w-full h-44 object-cover object-center"
        src={book.image}
        />
      
        <div className="flex flex-col gap-2 w-full px-3 py-4">
          <h1 className="text-[14px] text-(--text) font-medium line-clamp-2 text-left">{book.title}</h1>
          <p className="max-w-22 text-[13px] text-(--text-3) line-clamp-1 text-left">{book.author}</p>
        </div>
      </button>

      <button className="absolute bottom-1 right-2 p-1 text-(--text-1) rounded-2xl cursor-pointer duration-300 hover:bg-(--bg-4)">
        <MdMoreHoriz size={20}/>
      </button>
    </motion.div>
  )
}