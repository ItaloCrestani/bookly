import { useNavigate } from "react-router";
import { motion } from "framer-motion";

interface CardProps {
  image: string;
  title: string;
  author: string;
  genre: string;
  id: string;
}

export function MainCard({image, title, author, genre, id}: CardProps) {
  const navigate = useNavigate();

  return(
    <motion.button
    onClick={() => navigate(`/book/${id}`)}
    className="flex flex-col shrink-0 w-46 h-94 bg-(--bg-3) border border-(--border) rounded-xl overflow-hidden cursosr-pointer"
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}
    transition={{duration: 0.2}}
    >
      <img
      className="w-full h-62 object-cover object-center"
      src={image}
      />
        
      <div className="flex flex-col flex-1 gap-1 px-2 py-2">
        <h1 className="text-[14px] text-(--text) font-medium line-clamp-2 text-left">{title}</h1>
        <p className="text-[13px] text-(--text-3) line-clamp-1 text-left">{author ?? "Autor desconhecido"}</p>
        
        <div className="w-fit mt-auto px-2.5 py-1 text-[12px] text-(--text-genre) font-medium bg-(--bg-genre) rounded-xl">
          {genre}
        </div>
      </div>
    </motion.button>
  )
}