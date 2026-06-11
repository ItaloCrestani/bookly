import type { ReactNode } from "react"

type EmptyProps = {
  icon: ReactNode,
  title: string,
  description: string,
}

export function EmptyCard({icon, title, description}: EmptyProps) {
  return(
    <div className="flex flex-col items-center justify-center gap-3 py-12 bg-(--bg-2) border border-dashed border-(--border-3) rounded-xl hover:bg-(--bg-3)/50 duration-300">
      {icon}

      <div className="text-center">
        <h3 className="font-medium text-(--text-1)">
          {title}
        </h3>

        <p className="text-sm text-(--text-3)">
          {description}
        </p>
      </div>
    </div>
  )
}
