import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { LuBook } from "react-icons/lu";
import { PiPaperclipLight } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { formatDetailsBook, getBooksId, getBooksAuthor, formatAuthorBooks } from "../../services/googleBooks";
import { db } from "../../services/firebaseConnection";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ book, setBook ] = useState<ReturnType<typeof formatDetailsBook> | null>(null);
  const [ authorBooks, setAuthorBooks ] = useState<ReturnType<typeof formatAuthorBooks>[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ showDescription, setShowDescription ] = useState(false);
  const [ showTitle, setShowTitle ] = useState(false);

  useEffect(() => {
    loadBook();
  }, [id])

  useEffect(() => {
    setImageLoaded(false);
  }, [id])


  async function loadBook() {
    if (!id) return;

    try {
      setLoading(true)

      const details = await getBooksId(id);
      setBook(details);

      const author = await getBooksAuthor(details.author);
      setAuthorBooks(author);
    } catch(e) {
      toast.error("Livro não encontrado")
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  async function AddRead() {
    if (!user || !book) return;

    await setDoc(doc(db, "users", user.uid, "bookshelf", book.id), {
      title: book.title,
      author: book.author,
      image: book.image,
      pages: book.pages,
      description: book.description,
      year: book.year,
      genre: book.genre,
      publisher: book.publisher,
      progress: 0,
      stars: 0,
      status: "wantToRead",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    toast.success("Livro adicionado à estante")
    navigate('/shelf')
  }
  
  async function AddReading() {
    if (!user || !book) return;

    await setDoc(doc(db, "users", user.uid, "bookshelf", book.id), {
      title: book.title,
      author: book.author,
      image: book.image,
      pages: book.pages,
      description: book.description,
      year: book.year,
      genre: book.genre,
      publisher: book.publisher,
      progress: 0,
      stars: 0,
      status: "Reading",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    toast.success("Livro adicionado à estante")
    navigate('/shelf')
  }

  async function AddReaded() {
    if (!user || !book) return;

    await setDoc(doc(db, "users", user.uid, "bookshelf", book.id), {
      title: book.title,
      author: book.author,
      image: book.image,
      pages: book.pages,
      description: book.description,
      year: book.year,
      genre: book.genre,
      publisher: book.publisher,
      progress: 0,
      stars: 0,
      status: "Readed",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    toast.success("Livro adicionado à estante")
    navigate('/shelf')
  }

  return (
    <div className="flex flex-col md:flex-row text-(--text-1) ">
      <div className="flex w-full md:w-60 gap-2 md:gap-0 md:block shrink-0 md:mr-10 text-(--text-2) font-medium">
        <div className="w-full h-64 md:h-88 md:mb-6 rounded-xl overflow-hidden">
          {(!book?.image || !imageLoaded) && (
            <Skeleton className="w-full h-63 md:h-87 border-2 border-(--border-3) rounded-xl!" />
          )}

          {book?.image && (
            <img
              className={`w-full h-64 md:h-88 object-cover border-2 border-(--border-3) rounded-xl ${imageLoaded ? 'block' : 'hidden'}`}
              src={book.image}
              alt={book.title}
              onLoad={() => setImageLoaded(true)}
            />
          )}
        </div>

        <div className="flex flex-col w-120 gap-3 md:w-full">
          <div className="md:hidden">
            {book?.genre ? (
              <div className="w-fit mt-auto mb-1 px-2.5 py-1 text-[9px] text-(--text-genre) font-medium bg-(--bg-genre) rounded-xl">
                <span className="line-clamp-1">{book.genre}</span>
              </div>
            ) :
              <Skeleton  width="40%"/>
            }
            <h1 
            className={`mb-1 text-[16px] font-medium ${showTitle ? '' : 'line-clamp-2'}`}
            onClick={() => setShowTitle(prev => !prev)}
            >
              {book?.title || <Skeleton />}
            </h1>
            <p className="text-[12px] text-(--text-3)">{book?.author || <Skeleton width="60%" />}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="hidden md:block text-[14px] font-semibold">Adicionar à minha estante</p>
            
            <button
            className={`flex items-center gap-2 px-2 py-2.5 md:px-4 md:py-3 bg-(--bg-read) border border-(--border-read) rounded-lg hover:bg-(--hover-read) active:bg-(--hover-read) transition-colors ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={loading}
            onClick={AddRead}
            >
              <CiBookmark className="size-5 md:size-7.5" color="var(--text-read)" />
              <div className="flex flex-col items-start gap-0.5">
                <p className="text-[14px] text-(--text-read)">Quero ler</p>
                <p className="hidden md:block text-[10px]">Adicionar à sua lista de desejos</p>
              </div>
            </button>

            <button
            className={`flex items-center gap-2 px-2 py-2.5 md:px-4 md:py-3 bg-(--bg-reading) border border-(--border-reading) rounded-lg hover:bg-(--hover-reading) active:bg-(--hover-reading) transition-colors ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={loading}
            onClick={AddReading}
            >
              <HiOutlineBookOpen className="size-5 md:size-7.5" color="var(--text-reading)" />
              <div className="flex flex-col items-start gap-0.5">
                <p className="text-[14px] text-(--text-reading)">Estou lendo</p>
                <p className="hidden md:block text-[10px]">Acompanhar sua leitura</p>
              </div>
            </button>

            <button
            className={`flex items-center gap-2 px-2 py-2.5 md:px-4 md:py-3 bg-(--bg-readed) border border-(--border-readed) rounded-lg hover:bg-(--hover-readed) active:bg-(--hover-readed) transition-colors ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={loading}
            onClick={AddReaded}
            >
              <IoIosCheckmarkCircleOutline className="size-5 md:size-7.5" color="var(--text-readed)" />
              <div className="flex flex-col items-start gap-0.5">
                <p className="text-[14px] text-(--text-readed)">Já li</p>
                <p className="hidden md:block text-[10px]">Marcar como concluído</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-160 min-w-0 overflow-hidden">
        <div className="hidden md:block">
          {book?.genre && (
            <div className="w-fit mt-auto px-2.5 py-1 text-[12px] text-(--text-genre) font-medium bg-(--bg-genre) rounded-xl">
              {book.genre}
            </div>
          )}
          <h1 className="text-[28px] font-medium line-clamp-2">{book?.title || <Skeleton />}</h1>
          <p className="text-[18px] text-(--text-3)">{book?.author || <Skeleton width="40%" />}</p>
        </div>

        <div className="flex flex-col gap-2 py-6 mt-6 border-t border-b border-(--border)">
          <h2 className="text-[14px] md:text-[16px] text-(--text-1) font-semibold">Sinopse</h2>
          
          {!book ? (
            <Skeleton width={640} count={9} />
          ) : book.description ? (
            <p className={`text-[12px] text-(--text-3) ${!showDescription ? "line-clamp-9" : ""}`}>
              {book.description.replace(/<[^>]*>/g, '')}
            </p>
          ) : (
            <p className="text-[12px] text-(--text-3)">
              Este livro não possui descrição.
            </p>
          )
        }

          {book?.description && (
            <button 
            className="w-fit text-[12px] text-(--color) font-medium cursor-pointer"
            onClick={() => setShowDescription(prev => !prev)}
            >
              {showDescription ? "Ler menos" : "Ler mais"}
            </button>
          )}
        </div>

        <div className="flex gap-16 py-6 border-b border-(--border) text-[12px] md:text-[14px] text-(--text-3) font-medium">
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

        <div className="pt-6">
          <h2 className="mb-2 text-[14px] md:text-[16px] text-(--text-1) font-semibold">Outros livros do autor</h2>

          <Swiper
          navigation
          slidesPerGroupAuto
          spaceBetween={16}
          slidesPerView={"auto"}
          >
            {authorBooks.map(book => (
              <SwiperSlide className="w-16!" key={book.id}>
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