import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function ReadingCardSkeleton() {
  return (
    <div className="flex items-center w-96 h-44 bg-(--bg-3) border border-(--border) rounded-xl overflow-hidden">
      <Skeleton
        width={150}
        height={176}
        borderRadius={12}
      />

      <div className="flex-1 flex flex-col justify-between h-full py-4 px-3">
        <div>
          <Skeleton height={16} />
          <Skeleton
            height={12}
            width="60%"
            className="mt-2"
          />
        </div>

        <Skeleton
          height={20}
          className='mb-2'
        />
      </div>
    </div>
  )
}