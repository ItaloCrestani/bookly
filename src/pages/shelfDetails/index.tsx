import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiBookmark, CiCalendar } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { LuBook } from "react-icons/lu";
import { PiPaperclipLight } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router"
import { doc, getDoc, deleteDoc, updateDoc, serverTimestamp, FieldValue } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { formatAuthorBooks, getBooksAuthor } from "../../services/googleBooks";
import { db } from "../../services/firebaseConnection";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ButtonAction } from "../../compoments/buttonAction";

import { type BookProps } from "../bookshelf";
import { statusOptions, currentStatus, type BookStatus } from "../../utils/bookStatus";
import { ProgressCard } from "../../compoments/cards/updateProgress";
import { ProgressCircle } from "../../compoments/progressCircle";

type UpdateBookData = {
  status?: BookStatus;
  progress?: number;
  stars?: number;
  updatedAt?: FieldValue;
}


export function ShelfDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ book, setBook ] = useState<BookProps | null>(null);
  const [ authorBooks, setAuthorBooks ] = useState<ReturnType<typeof formatAuthorBooks>[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ imageLoaded, setImageLoaded ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(0);

  const availableActions = statusOptions.filter(
    status => status.value !== book?.status
  );

  const availableStatus = currentStatus.find(
    status => status.value === book?.status
  )

  const formattedCreated = book?.createdAt?.toDate().toLocaleDateString("pt-br", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const formattedUpdated = book?.updatedAt?.toDate().toLocaleDateString("pt-br", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const isReading = book?.status === 'Reading'
  const isWantRead = book?.status === 'wantToRead'
  const isReaded = book?.status === 'Readed'

  useEffect(() => {
    loadBook();
    setImageLoaded(false);
  }, [id, user])

  useEffect(() => {
    if(!book) return;
    setCurrentPage(book?.progress)
    console.log(availableStatus)
  }, [book])

  async function loadBook() {
    if (!id || !user) return;
    
    try {
      setLoading(true)

      const docRef = doc(db, "users", user.uid, "bookshelf", id);

      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        toast.error("Livro não encontrado")
        navigate('/shelf')
        return;
      }

      const bookData = {
        id: snapshot.id,
        ...snapshot.data()
      } as BookProps;
      
      setBook(bookData)

      const author = await getBooksAuthor(bookData.author)
      setAuthorBooks(author)

    } catch(e) {
      toast.error("Livro não encontrado")
      navigate('/shelf')
    } finally {
      setLoading(false)
    }
  }

  async function updateBook(data: UpdateBookData) {
    if (!user || !book) return;

    await updateDoc(doc(db, "users", user.uid, "bookshelf", book.id), 
      data
    );
  }

  async function updateStatus(status: BookStatus) {
    try {
      if (status === "Readed") {
        await updateBook({ status, progress: book?.pages, updatedAt: serverTimestamp() })
      }

      if (status !== "Readed") await updateBook({ status, updatedAt: serverTimestamp() })
    } catch(e) {
      toast.error("Erro ao mover livro")
      return;
    }
    
    toast.success("Livro movido")
    navigate('/shelf')
  }

  async function updateProgress(progress: number) {
    try {
      await updateBook({ progress })

    } catch(e) {
      toast.error("Erro ao salvar")
      return;
    }
    
    setBook(prev => prev ? {...prev, progress: currentPage} : null)
    toast.success("Progresso salvo")
  }

  async function deleteBook() {
    if (!user || !book) return;

    await deleteDoc(doc(db, "users", user.uid, "bookshelf", book.id))
    toast.success("Livro removido")
    navigate('/shelf')
  }


  return (
    <div className="flex gap-10 text-(--text-1) ">
      <div className="w-60 shrink-0 text-(--text-2) font-medium">
        <div className="w-full h-88 mb-6">
          {(!book?.image || !imageLoaded) && (
            <Skeleton className="w-full h-88 border-2 border-(--border-3) rounded-xl" />
          )}
          
          {book?.image && (
            <img
              className={`w-full border-2 border-(--border-3) rounded-xl ${imageLoaded ? 'block' : 'hidden'}`}
              src={book.image}
              alt={book.title}
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold">Mover para:</p>

          {availableActions.map(action => (
            <ButtonAction
            key={action.value}
            loading={loading}
            action={() => updateStatus(action.value)}
            icon={action.icon}
            title={action.title}
            subtitle={action.subtitle}
            color={action.color}
            bg={action.bg}
            border={action.border}
            hover={action.hover}
            />
          ))}

          <button 
          className={`flex items-center gap-2 px-4 py-3 bg-(--bg-delete) border border-(--border-delete) rounded-lg hover:bg-(--hover-delete) transition-colors ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={deleteBook}
          >
          <FaRegTrashAlt size={20} color="var(--text-delete)" />
          <p className="text-[14px] text-(--text-delete)">Excluir livro</p>
        </button>

        </div>
      </div>

      <div className="flex flex-col gap-6 w-160 min-w-0 overflow-hidden">
        <div>
          {book?.genre && (
            <div className="w-fit px-2.5 py-1 text-[12px] text-(--text-genre) font-medium bg-(--bg-genre) rounded-xl">
              {book.genre}
            </div>
          )}
          <h1 className="text-[28px] font-medium line-clamp-2">{book?.title || <Skeleton />}</h1>
          <p className="text-[18px] text-(--text-3)">{book?.author || <Skeleton width="40%" />}</p>
        </div>

        <div className="flex flex-col gap-2 py-6 border-t border-b border-(--border)">
          <h2 className="text-[16px] text-(--text-1) font-semibold">Sinopse</h2>
          <p className="text-[12px] text-(--text-3)">{book?.description ? book.description.replace(/<[^>]*>/g, '') : <Skeleton count={6} />}</p>
        </div>

        {isReading && (
          <ProgressCard 
          pages={book?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          updateProgress={updateProgress}
          />
        )}

        <div className="flex gap-16 text-[14px] text-(--text-3) font-medium">
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2">
              <FiUser size={16} />
              Autor
            </p>

            <p className="flex items-center gap-2">
              <LuBook size={16} />
              Editora
            </p>

            <p className="flex items-center gap-2">
              <PiPaperclipLight size={16} />
              Páginas
            </p>

            <p className="flex items-center gap-2">
              <IoCalendarClearOutline size={16} />
              Publicado em
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-(--color)">{book?.author || <Skeleton width={100}/>}</p>
            <p>{book?.publisher || <Skeleton width={100}/>}</p>
            <p>{book?.pages || <Skeleton width={100}/>}</p>
            <p>{book?.year || <Skeleton width={100}/>}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-3 p-4 bg-(--bg-1) border border-(--border) rounded-xl">
          {availableStatus?.icon || <Skeleton width={25} height={25}/>}
          <div className="flex flex-col gap-0.5">
            <p className={`text-[13px] text-(${availableStatus?.color})`}>{availableStatus?.title || <Skeleton width={100}/>}</p>
            <p className="text-[11px] text-(--text-3)">{availableStatus?.subtitle || <Skeleton width={160}/>} {formattedUpdated}</p>
          </div>
        </div>

        {!isWantRead && (
        <div className="flex flex-col items-center gap-3 p-4 bg-(--bg-1) border border-(--border) rounded-xl">
          <h2 className="w-full text-[14px] text-(--text-1) font-semibold">Resumo da leitura</h2>
          <ProgressCircle value={book?.progress ?? 0} max={book?.pages ?? 1} />
            <p className="text-[12px] text-(--text-3) font-semibold">Página {book?.progress ?? 0} de {book?.pages ?? 0}</p>
        </div>
        )}

         <div className="flex flex-col gap-2 p-4 bg-(--bg-1) border border-(--border) rounded-xl">
          <h2 className="w-full text-[14px] text-(--text-1) font-semibold">Na estante desde</h2>
          <div className="flex items-center gap-2 text-(--text-3)">
            <CiCalendar size={20}/>
            <p className="text-[12px] font-semibold">{formattedCreated || <Skeleton width={140}/>}</p>
          </div>
        </div>

        <div className="max-w-67 pt-4 px-4 bg-(--bg-1) border border-(--border) rounded-xl">
          <h2 className="mb-2 text-[16px] text-(--text-1) font-semibold">Outros livros do autor</h2>

          <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={3}
          slidesPerGroup={3}
          spaceBetween={16}
          className="pb-8!"
          >
            {loading 
            ? Array.from({ length: 10 }).map((_, index) => (
              <SwiperSlide className="w-fit!" key={index}>
                <div className="w-16">
                  <Skeleton height={96}/>
                </div>
                <p className="pt-1.5 text-[10px]"><Skeleton count={2}/></p>
              </SwiperSlide>
              ))
            : authorBooks.map(book => (
              <SwiperSlide className="w-fit!" key={book.id}>
                <motion.button
                className="w-16 cursor-pointer"
                onClick={() => navigate(`/book/${book.id}`)}
                whileHover={{scale: 1.02}} 
                whileTap={{scale: 0.98}}
                transition={{duration: 0.2}}
                >
                  <img
                  className="w-full h-24 object-cover border border-(--border) rounded"
                  src={book.image}
                  alt={book.title}
                  />
                  <p className="pt-1 text-center text-[10px] text-(--text-1) line-clamp-2 text-ellipsis">
                    {book.title}
                  </p>
                </motion.button>
            </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  )
}