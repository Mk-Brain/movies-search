
export const BtnNeon = ({ title, width }: { title: string, width: number }) => {
  return (
    <div className="relative flex">
      <div style={{
        width: `${width}px`
      }} className={` h-10 border-2 bg-pink-800 border-pink-600 rounded-full shadow-[0_8px_8px] shadow-pink-800/20 z-30 flex items-center justify-center`}>
        <div className="w-full h-6 rounded-full bg-black blur-sm  shadow-[0_0_5px] text-shadow-pink-800"></div>
      </div>
      <div className='absolute bg-transparent h-10 flex items-center justify-center'
      style={{
        width: `${width}px`
      }}>
        <p className='text-shadow-[0_0_10px] z-50 left-7 top-2 text-gray-100'>
        {title}
      </p>
      </div>
    </div>
  )
}
