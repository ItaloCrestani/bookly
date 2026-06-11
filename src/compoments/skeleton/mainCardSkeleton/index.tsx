import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function MainCardSkeleton() {
  return (
    <div className="w-46">
      <Skeleton
        height={260}
        borderRadius={12}
      />

      <div className="mt-3">
        <Skeleton height={16} />

        <Skeleton
          height={12}
          width="60%"
          className="mt-2"
        />

        <Skeleton
          height={12}
          width="40%"
          className="mt-2"
        />
      </div>
    </div>
  )
}