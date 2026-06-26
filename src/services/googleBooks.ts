const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

function formatBook(book: any) {
  return {
    id: book.id,
    image: book.volumeInfo.imageLinks?.thumbnail,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors?.[0],
    genre: book.volumeInfo.categories?.[0],
    year: book.volumeInfo.publishedDate?.split('-')[0],
  }
}

export function formatDetailsBook(book: any) {
  return {
    id: book.id,
    image: book.volumeInfo.imageLinks?.thumbnail,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors?.[0],
    genre: book.volumeInfo.categories?.[0],
    year: book.volumeInfo.publishedDate?.split('-')[0],
    description: book.volumeInfo.description,
    pages: book.volumeInfo.pageCount,
    publisher: book.volumeInfo.publisher,
  }
}

export function formatAuthorBooks(book: any) {
  return {
    id: book.id,
    title: book.volumeInfo.title,
    image: book.volumeInfo.imageLinks?.thumbnail,
  }
}

// export async function getFeaturedBooks() {
//   const responses = await Promise.all(
//     fictionBooks.map(async (title) => {
//       const response = await fetch(
//           `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&printType=books&langRestrict=pt&maxResults=5&key=${API_KEY}`
//       )

//       const data = await response.json()

//       const validBook = data.items?.find((book: any) => {
//         return (
//           book.volumeInfo?.industryIdentifiers &&
//           book.volumeInfo?.imageLinks?.thumbnail &&
//           book.volumeInfo?.categories
//         )
//       })

//       if (!validBook) {
//         return null
//       }

//       return formatBook(validBook)
//     })
//   )

//   return responses.filter((book) => book !== null)
// }

export async function getSuggestions(title: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&printType=books&langRestrict=pt&maxResults=10&key=${API_KEY}`
  )

  const data = await response.json()

  const validBooks = data.items?.filter((book: any) => {
    return (book.volumeInfo?.industryIdentifiers && book.volumeInfo?.imageLinks?.thumbnail)
  }).slice(0, 5)

  return validBooks?.map((book: any) => formatBook(book)) || []
}

export async function getBooksId(id: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
  )

  if (response.status === 429) {
    throw new Error("REQUEST_LIMIT")
  }

  const data = await response.json()

  return formatDetailsBook(data);
}

export async function getBooksAuthor(author: string) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&printType=books&langRestrict=pt&maxResults=20&key=${API_KEY}`
  )

  if (response.status === 429) {
    throw new Error("REQUEST_LIMIT")
  }

  const data = await response.json()

  const validBooks = data.items?.filter((book: any) => {
    return (book.volumeInfo?.industryIdentifiers && book.volumeInfo?.imageLinks?.thumbnail)
  }).slice(0, 10)

  return validBooks?.map((book: any) => formatAuthorBooks(book)) || []
}
