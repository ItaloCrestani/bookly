import { type ReactNode } from "react"


interface ButtonProps{
  loading: boolean,
  action: () => void | Promise<void>,
  icon: ReactNode,
  title: string,
  subtitle: string,
  color: string,
  bg: string,
  border: string,
  hover: string
}

export function ButtonAction({loading, action, icon, title, subtitle, color, bg, border, hover}: ButtonProps) {
  return(
    <button 
    className={`flex items-center gap-2 px-2 py-2.5 md:px-4 md:py-3 bg-(${bg}) border border-(${border}) rounded-lg hover:bg-(${hover}) active:bg-(${hover}) transition-colors ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
    disabled={loading}
    onClick={action}
    >
      {icon}
      <div className="flex flex-col items-start gap-0.5">
        <p className={`text-[14px] text-(${color})`}>{title}</p>
        <p className="hidden md:block text-[10px]">{subtitle}</p>
      </div>
    </button>
  )
}