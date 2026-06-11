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
    className={`flex items-center gap-2 px-4 py-3 bg-(${bg}) border border-(${border}) rounded-lg hover:bg-(${hover}) transition-colors ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
    disabled={loading}
    onClick={action}
    >
      {icon}
      <div className="flex flex-col items-start gap-0.5">
        <p className={`text-[14px] text-(${color})`}>{title}</p>
        <p className="text-[10px]">{subtitle}</p>
      </div>
    </button>
  )
}