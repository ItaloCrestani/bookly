import { HiMagnifyingGlass } from "react-icons/hi2";

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { getFeaturedBooks, getSuggestions } from "../../services/googleBooks";

import { MainCard } from "../../compoments/cards/mainCard";
import { Suggestion } from "../../compoments/suggestion";
import { MainCardSkeleton } from "../../compoments/skeleton/mainCardSkeleton";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from "swiper/modules"

export interface BooksProps {
  id: string;
  isbn: string;
  image: string;
  title: string;
  author: string;
  genre: string;
  year: string;
}

export function Home() {
  const { user, loadingAuth } = useContext(AuthContext)
  const [ featBooks, setFeatBooks ] = useState<BooksProps[]>([])
  const [ search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState<BooksProps[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [ loadingBooks, setLoadingBooks ] = useState(true)

  useEffect(() => {
    if(loadingAuth) {
      return console.log('carregando...')
    }
  }, [user, loadingAuth])

  useEffect(() => {
    loadBooks();
  }, [])

  useEffect(() => {
    if(search.trim().length === 0) {
      setSuggestions([])
      return
    }

    if (search.trim().length < 2) return

    const delay = setTimeout(() => {
      searchBooks()
    }, 400)

    return () => clearTimeout(delay)
  }, [search])

  async function loadBooks() {
    try {
      setLoadingBooks(true)
      
      const booksData = await getFeaturedBooks()
      
      setFeatBooks(booksData)
    } finally {
      setLoadingBooks(false)
    }
  }

  async function searchBooks() {
    const suggestionsData = await getSuggestions(search)

    setSuggestions(suggestionsData)
  }


  return(
   <div className="text-(--text)">
    <div className="relative flex gap-4 px-5 py-4 mb-10 bg-(--bg-2) border border-(--border-2) rounded-lg has-focus:border-(--border-focus) transition-colors duration-100">
      <HiMagnifyingGlass size={26}/>
      <input
      className="w-full outline-0 placeholder:text-(--text-3)"
      type="text"
      placeholder="Buscar por título, autor ou gênero..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setShowSuggestions(false)}
      />

      {showSuggestions && <Suggestion data={suggestions} />}
    </div>

    <div className="flex flex-col gap-1 mb-4">
      <h2 className="text-[20px] text-(--text-2) font-semibold">Em destaque</h2>
      <p className="text-[12px] text-(--text-3)">Livros populares para descobrir</p>
    </div>

    <Swiper
    className="relative"
    modules={[Navigation]}
    slidesPerGroupAuto
    navigation
    spaceBetween={16}
    slidesPerView={"auto"}
    >
      {
      loadingBooks 
      ? Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide className="w-fit!" key={index}>
            <MainCardSkeleton />
          </SwiperSlide>
        ))
      : featBooks.map(book => (
        <SwiperSlide className="w-fit!" key={book.id}>
          <MainCard
          image={book.image}
          title={book.title}
          author={book.author}
          genre={book.genre}
          id={book.id}
          />
        </SwiperSlide>
      ))}
      <span className="absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
    </Swiper>

   </div> 
  )
}