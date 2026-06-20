import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

interface CardProps {
  image: string;
  title: string;
  author: string | undefined;
  genre: string;
  id: string;
}

export function MainCard({image, title, author, genre, id}: CardProps) {
  const navigate = useNavigate();
  const [ imageLoaded, setImageLoaded ] = useState(false);

  return(
    <motion.button
    onClick={() => navigate(`/book/${id}`)}
    className="flex flex-col shrink-0 w-30 h-72 md:w-46 md:h-94 bg-(--bg-3) border border-(--border) rounded-xl overflow-hidden cursosr-pointer"
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}
    transition={{duration: 0.2}}
    >

      <div className="hidden md:block">
        {!imageLoaded && (
            <Skeleton
              height={248}
              className="-mb-1"
            />
        )}
      </div>

      <div className="block md:hidden">
        {!imageLoaded && (
            <Skeleton
              height={184}
              className="-mb-1"
            />
        )}
      </div>

        <img
        className={`w-full h-46 md:h-62 object-cover object-center ${imageLoaded ? '' : 'hidden'}`}
        src={image}
        onLoad={() => setImageLoaded(true)}
        />

        
      <div className="flex flex-col flex-1 gap-1 px-2 py-2">
        <h1 className="text-[12px] md:text-[14px] text-(--text) font-medium line-clamp-2 text-left">{title}</h1>
        <p className="text-[10px] md:text-[13px] text-(--text-3) line-clamp-1 text-left">{author ?? "Autor desconhecido"}</p>
        
        <div className="w-fit mt-auto px-2 md:px-2.5 py-1 text-[8px] md:text-[12px] text-(--text-genre) font-medium bg-(--bg-genre) rounded-xl">
          <p className="line-clamp-1">{genre}</p>
        </div>
      </div>
    </motion.button>
  )
}