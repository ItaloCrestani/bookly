import { CiBookmark } from "react-icons/ci";

interface ProgressCardProps {
  pages: number | undefined;
  currentPage: number;
  setCurrentPage: Function;
  updateProgress: Function;
}

export function ProgressCard({ pages, currentPage, setCurrentPage, updateProgress }: ProgressCardProps) {
  const percent = (currentPage / (pages ?? 1)) * 100

  return (
    <div className="flex flex-col items-center p-4 bg-(--bg-1) border border-(--border) rounded-xl">
      <h2 className="w-full mb-3 text-[14px] text-(--text-1) font-semibold">Progresso da leitura</h2>
      
      <div className="flex flex-col items-center mb-3">
        <p className="text-[12px] text-(--text-3) font-semibold">Página atual</p>
        <span className="text-2xl text-(--color) font-semibold">{currentPage}</span>
      </div>

      <input 
      type="range" 
      min={0} 
      max={pages ?? 0}
      step={1} 
      value={currentPage}
      onChange={(e) => setCurrentPage(Number(e.target.value))} 
      className="appearance-none w-full h-2 mb-1 rounded-full cursor-pointer outline-none"
      style={{ background: `linear-gradient(to right, var(--color) 0%, var(--color) ${percent}%, var(--bg-4) ${percent}%, var(--bg-4) 100%` }}
      />

      <div className="flex w-full mb-3 justify-between text-[12px] text-(--text-3) font-semibold">
        <span>0</span>
        <span>{pages ?? 0}</span>
      </div>

      <div className="flex w-full justify-between mt-3 pt-4 border-t border-(--border)">
        <div className="hidden lg:flex items-center gap-3">
          <div className="p-2 bg-(--bg-button-hover) rounded-full">
            <CiBookmark size={24} color="var(--text-button)" />
          </div>
          <div className="text-[12px]">
            <p className="text-(--text-1)">Marcar página atual</p>
            <p className="text-(--text-3)">Atualize para não se perder</p>
          </div>
        </div>

        <div className="flex w-full md:w-fit justify-evenly gap-6">
          <div className="flex text-(--text-1) border border-(--border) rounded-xl overflow-hidden">
            <button 
            onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 0))}
            className="px-5 bg-(--bg-3) cursor-pointer"
            >
              -
            </button>

            <input
            type="number"
            min={0}
            max={pages ?? 0}
            value={currentPage}
            onChange={(e) => {
              const value = Number(e.target.value)
              const maxPages = pages ?? 0
              setCurrentPage(Math.min(value, maxPages))
            }}
            className="w-22 text-[14px] text-center bg-(--bg) outline-none"
            />

            <button
            onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, pages ?? 0))}
            className="px-5 bg-(--bg-3) cursor-pointer"
            >
              +
            </button>
          </div>

          <button
          onClick={() => updateProgress(currentPage)}
          className="px-4 py-2 font-semibold text-[12px] text-(--text-button) bg-(--bg-button) rounded-md cursor-pointer hover:bg-(--bg-button-hover) duration-300"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}