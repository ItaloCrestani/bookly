import { useNavigate } from "react-router";
import { type BooksProps } from "../../pages/home";

interface SuggestionProps {
  data: BooksProps[]
}

export function Suggestion({ data }: SuggestionProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center absolute top-full left-0 z-50 w-full mt-2">
      <div className="max-w-[85%] bg-(--bg-2) border border-(--border-3) rounded-xl overflow-hidden">
        {data.map(item => (
        <button
        className="w-full px-8 hover:bg-(--bg-hover) transition"
        onMouseDown={() => navigate(`/book/${item.id}`)}
        key={item.id}
        >
          <div className="flex w-full gap-3 items-center py-2 border-b border-(--border-3)">
            <img
            src={item.image}
            className="h-14 rounded-md"/>
            <div className="text-left">
              <p className="text-(--text-2)">{item.title}</p>
              <p className="text-(--text-3)">{item.author}</p>
            </div>
            <p className="text-(--text-3) ml-auto">{item.year}</p>
          </div>
        </button>
        ))}
      </div>
    </div>
  )
}