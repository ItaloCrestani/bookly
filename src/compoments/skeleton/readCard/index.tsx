import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function ReadCardSkeleton() {
  return (
    <div className="w-36 h-68 bg-(--bg-3) border border-(--border) leading-none rounded-xl overflow-hidden">
      <Skeleton
        height={176}
        borderRadius={0}
      />

      <div className="py-4 px-3">
          <Skeleton height={16} />
          <Skeleton
            height={12}
            width="60%"
            className="mt-2"
          />
      </div>
    </div>
  )
}