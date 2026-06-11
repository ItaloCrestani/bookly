import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";

import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../context/AuthContext";

import { ReadingCard } from "../../compoments/cards/readingCard";
import { ReadCard } from "../../compoments/cards/readCard";
import { ReadedCard } from "../../compoments/cards/readedCard";
import { ReadingCardSkeleton } from "../../compoments/skeleton/readingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { ReadCardSkeleton } from "../../compoments/skeleton/readCard";
import { EmptyCard } from "../../compoments/cards/emptyCard";

export interface BookProps{
  id: string;
  title: string;
  author: string;
  image: string;
  pages: number;
  progress: number;
  stars: number;
  status: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  description: string;
  year: string | number;
  genre: string,
  publisher: string,
}

export function Bookshelf() {
  const { user } = useContext(AuthContext)
  const [ books, setBooks ] = useState<BookProps[] | null>(null);
  const [ loadingBooks, setLoadingBooks ] = useState(true);

  const readingBooks = books?.filter(
    book => book.status === "Reading"
  ) ?? [];

  const readBooks = books?.filter(
    book => book.status === "wantToRead"
  ) ?? [];

  const readedBooks = books?.filter(
    book => book.status === "Readed"
  ) ?? [];

  useEffect(() => {
    loadBooks();
  }, [user])

  function loadBooks() {
    if (!user) return

    try {
      setLoadingBooks(true);

      const queryRef = query(
        collection(db, "users", user.uid, "bookshelf"),
        orderBy("createdAt", "asc")
      );
      
      const unsub = onSnapshot(queryRef, (snapshot) => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BookProps[];
        
        setBooks(list);
      })

      return () => unsub();
    } finally {
      setLoadingBooks(false)
    }
      
  }

  return (
    <div className="flex flex-col gap-9 pb-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-(--text-reading)">
          <HiOutlineBookOpen size={20}/>
          <h2 className="font-semibold text-[16px]">Estou lendo</h2>
          <span className="px-4 py-1 font-medium text-[12px] bg-(--bg-3) rounded-xl">{readingBooks.length}</span>
        </div>

        {loadingBooks || books === null ? (
          <Swiper
          className="relative w-full"
          slidesPerGroupAuto
          navigation
          spaceBetween={16}
          slidesPerView={"auto"}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide className="w-fit!" key={index}>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                >
                  <ReadingCardSkeleton />
                </motion.div>
              </SwiperSlide>
            ))}
            <span className="absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
          </Swiper>
        ) : readingBooks.length === 0 ? (
          <EmptyCard
          icon={<HiOutlineBookOpen size={40} color="var(--text-reading)"/>}
          title="Nenhum livro em leitura"
          description="Adicione um livro para acompanhar seu progresso."
          />
        ) : (
          <Swiper
          className="relative w-full"
          slidesPerGroupAuto
          navigation
          spaceBetween={16}
          slidesPerView={"auto"}
          >
            {readingBooks.map((book) => (
              <SwiperSlide className="w-fit!">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                >
                  <ReadingCard book={book} />
                </motion.div>
              </SwiperSlide>
            ))}
            <span className="absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
          </Swiper>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-(--text-read)">
          <CiBookmark size={20}/>
          <h2 className="font-semibold text-[16px]">Quero ler</h2>
          <span className="px-4 py-1 font-medium text-[12px] bg-(--bg-3) rounded-xl">{readBooks.length}</span>
        </div>

        {loadingBooks || books === null ? (
          <Swiper
          className="relative w-full"
          slidesPerGroupAuto
          navigation
          spaceBetween={16}
          slidesPerView={"auto"}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide className="w-fit!" key={index}>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                >
                  <ReadCardSkeleton />
                </motion.div>
              </SwiperSlide>
            ))}
            <span className="absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
          </Swiper>
        ) : readBooks.length === 0 ? (
          <EmptyCard
          icon={<CiBookmark size={40} color="var(--text-read)"/>}
          title="Nenhum livro em lista"
          description="Adicione um livro que deseja ler."
          />
        ) : (
          <Swiper
          className="relative w-full"
          slidesPerGroupAuto
          navigation
          spaceBetween={16}
          slidesPerView={"auto"}
          >
            {readBooks.map((book) => (
              <SwiperSlide className="w-fit!">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                >
                  <ReadCard book={book} />
                </motion.div>
              </SwiperSlide>
            ))}
            <span className="absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
          </Swiper>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-(--text-readed)">
          <IoIosCheckmarkCircleOutline size={20}/>
          <h2 className="font-semibold text-[16px]">Já li</h2>
          <span className="px-4 py-1 font-medium text-[12px] bg-(--bg-3) rounded-xl">{readedBooks.length}</span>
        </div>

        {loadingBooks || books === null ? (
          <Swiper
          className="relative w-full"
          slidesPerGroupAuto
          navigation
          spaceBetween={16}
          slidesPerView={"auto"}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide className="w-fit!" key={index}>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                >
                  <ReadCardSkeleton />
                </motion.div>
              </SwiperSlide>
            ))}
            <span className="absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
          </Swiper>
        ) : readedBooks.length === 0 ? (
          <EmptyCard
          icon={<IoIosCheckmarkCircleOutline size={40} color="var(--text-readed)"/>}
          title="Nenhum livro concluído"
          description="Adicione um livro que já leu."
          />
        ) : (
          <Swiper
          className="relative w-full"
          slidesPerGroupAuto
          navigation
          spaceBetween={16}
          slidesPerView={"auto"}
          >
            {readedBooks.map((book) => (
              <SwiperSlide className="w-fit!">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                >
                  <ReadedCard book={book} />
                </motion.div>
              </SwiperSlide>
            ))}
            <span className="absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
          </Swiper>
        )}
      </div>

    </div>
  )
}