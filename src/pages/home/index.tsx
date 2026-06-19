import { HiMagnifyingGlass } from "react-icons/hi2";

import { useEffect, useRef, useState } from "react"
import { getSuggestions } from "../../services/googleBooks";

import { MainCard } from "../../compoments/cards/mainCard";
import { Suggestion } from "../../compoments/suggestion";
import { classicBooks, featuredBooks, fictionBooks, nationalBooks } from "../../data/featuredBooks";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from "swiper/modules"

export interface BooksProps {
  id: string;
  image: string;
  title: string;
  author: string;
  genre: string;
  year: string | number;
}

export function Home() {
  const [ search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<BooksProps[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('click', clickOutside)

    return () => {
      document.removeEventListener('click', clickOutside)
    }
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


  async function searchBooks() {
    const suggestionsData = await getSuggestions(search)

    setSuggestions(suggestionsData)
  }

  return(
   <div className="text-(--text)">
    <div className="relative flex gap-4 px-5 py-4 mb-10 bg-(--bg-2) border border-(--border-2) rounded-lg has-focus:border-(--border-focus) transition-colors duration-100" ref={modalRef}>
      <HiMagnifyingGlass className="size-6 md:size-6.5"/>
      <input
      className="w-full outline-0 placeholder:text-(--text-3) text-[14px] md:text-[16px]"
      type="text"
      placeholder="Buscar por título, autor ou gênero..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onFocus={() => setShowSuggestions(true)}
      />

      {showSuggestions && <Suggestion data={suggestions} />}
    </div>

    <div className="flex flex-col gap-8">
      <div>
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-[16px] md:text-[20px] text-(--text-2) font-semibold">Em destaque</h2>
          <p className="text-[10px] md:text-[12px] text-(--text-3)">Livros populares para descobrir</p>
        </div>
        <Swiper
        className="relative"
        modules={[Navigation]}
        slidesPerGroupAuto
        navigation
        spaceBetween={16}
        slidesPerView={"auto"}
        >
          {featuredBooks.map(book => (
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
          <span className="hidden md:block absolute top-0 right-0 z-1 h-full w-24 bg-linear-to-l from-(--bg)" />
        </Swiper>
      </div>

      <div>
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-[16px] md:text-[20px] text-(--text-2) font-semibold">Clássicos</h2>
          <p className="text-[10px] md:text-[12px] text-(--text-3)">Clássicos da literatura mundial</p>
        </div>
        <Swiper
        className="relative"
        modules={[Navigation]}
        slidesPerGroupAuto
        navigation
        spaceBetween={16}
        slidesPerView={"auto"}
        >
          {classicBooks.map(book => (
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

      <div>
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-[16px] md:text-[20px] text-(--text-2) font-semibold">Nacionais</h2>
          <p className="text-[10px] md:text-[12px] text-(--text-3)">Principais da literatura brasileira</p>
        </div>
        <Swiper
        className="relative"
        modules={[Navigation]}
        slidesPerGroupAuto
        navigation
        spaceBetween={16}
        slidesPerView={"auto"}
        >
          {nationalBooks.map(book => (
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

      <div> 
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-[16px] md:text-[20px] text-(--text-2) font-semibold">Ficção</h2>
          <p className="text-[10px] md:text-[12px] text-(--text-3)">Mergulhe em novos mundos cheios de aventuras</p>
        </div>
        <Swiper
        className="relative"
        modules={[Navigation]}
        slidesPerGroupAuto
        navigation
        spaceBetween={16}
        slidesPerView={"auto"}
        >
          {fictionBooks.map(book => (
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
    </div>
   </div> 
  )
}