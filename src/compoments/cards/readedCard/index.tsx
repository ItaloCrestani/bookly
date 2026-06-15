import { IoMdStarOutline, IoMdStar } from "react-icons/io";
import { motion } from "framer-motion";

import { useNavigate } from "react-router";
import { type BookProps } from "../../../pages/bookshelf";

export function ReadedCard({ book }: { book: BookProps }) {
  const navigate = useNavigate();

  return(
    <motion.button
    onClick={() => navigate(`/shelf/${book.id}`)}
    className="relative flex flex-col shrink-0 w-36 h-70 bg-(--bg-3) border border-(--border) rounded-xl overflow-hidden cursor-pointer"
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}
    transition={{duration: 0.2}}
    >
      <img
      className="w-full h-44 object-cover object-center"
      src={book.image}
      />

      <div className="flex flex-col flex-1 justify-between w-full pt-4 pb-2 px-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-[14px] text-(--text) font-medium line-clamp-2 text-left">{book.title}</h1>
          <p className="text-[13px] text-(--text-3) line-clamp-1 text-left">{book.author}</p>
        </div>
        
        <div className="hidden gap-1 text-(--text-3)">
          {Array.from({ length: book.stars }).map((_, index) => (
            <IoMdStar key={index} />
          ))}

          {Array.from({ length: 5 - book.stars }).map((_, index) => (
            <IoMdStarOutline key={index} />
          ))}

        </div>
      </div>
    </motion.button>
  )
}