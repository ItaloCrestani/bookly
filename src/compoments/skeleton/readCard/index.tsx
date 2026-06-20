import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function ReadCardSkeleton() {
  return (
    <div className="w-30 h-58 md:w-36 md:h-68 bg-(--bg-3) border border-(--border) leading-none rounded-xl overflow-hidden">
      <div className='hidden md:block'>
        <Skeleton
          height={176}
          borderRadius={0}
        />
      </div>

      <div className='block md:hidden'>
        <Skeleton
          height={144}
          borderRadius={0}
        />
      </div>

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