import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { type BookProps } from "../../../pages/bookshelf";


export function ReadingCard({ book }: { book: BookProps }) {
  const navigate = useNavigate();
  
  const percentage = (book.progress / book.pages) * 100;

  return(
    <motion.button
    onClick={() => navigate(`/shelf/${book.id}`)}
    className="flex shrink-0 w-72 h-34 md:w-96 md:h-44 bg-(--bg-3) border border-(--border) rounded-xl overflow-hidden cursor-pointer"
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}
    transition={{duration: 0.2}}
    >
      <img
      className="h-full object-cover object-center rounded-xl"
      src={book.image}
      />
        
      <div className="flex flex-col justify-between w-full px-3 py-3 md:py-4">
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className="text-[12px] md:text-[14px] text-(--text) font-medium line-clamp-2 text-left">{book.title}</h1>
          <p className="text-[10px] md:text-[13px] text-(--text-3) line-clamp-1 text-left">{book.author}</p>
        </div>

        <div className="flex flex-col gap-1 md:gap-1.5 text-[9px] md:text-[12px]">
          <div className="flex justify-between">
            <p className="text-(--text-3)">Progresso</p>
            <span className="text-(--text-1)">{percentage.toFixed(0)}%</span>
          </div>
          
          <div className="w-full h-2 bg-(--bg-4) rounded-full">
            <div
            className="h-2 rounded-full bg-(--color)"
            style={{ width: `${percentage}%` }}
            />
          </div>
          
          <span className="text-(--text-3) text-left">Página {book.progress} de {book.pages}</span>
        </div>
      </div>
    </motion.button>
  )
}