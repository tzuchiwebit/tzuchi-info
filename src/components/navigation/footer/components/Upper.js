'use client'
import Icon from '@/shared/Icon'

export default function Upper({ data }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const openSocial = (name) => {
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.[0] === name) {
        window.open(data[i][1], name, 'noopener=yes')
        break;
      }
    }
  }

  return (
    <div className='flex flex-row justify-between items-center border-b border-solid border-gray-gray7 pb-3 px-1'>
      <div className='flex flex-row items-center gap-x-1'>
        <div className='bg-primary-blue1 w-10 h-10 flex items-end justify-end pr-[7px] rounded-[5px] cursor-pointer' onClick={() => openSocial('社群FB')}>
          <Icon.Facebook></Icon.Facebook>
        </div>
        <div className='cursor-pointer' onClick={() => openSocial('社群IG')}>
          <Icon.Instagram></Icon.Instagram>
        </div>
        <div className='cursor-pointer' onClick={() => openSocial('社群YT')}>
          <Icon.Youtube></Icon.Youtube>
        </div>
        <div className='bg-primary-blue1 w-10 h-10 flex items-center justify-center rounded-[5px] cursor-pointer' onClick={() => openSocial('社群TT')}>
          <Icon.Tictok></Icon.Tictok>
        </div>
        <div className='cursor-pointer' onClick={() => window.open(`${process.env.NEXT_PUBLIC_URL}/rss`, "_blank")}>
          <Icon.RSSDark></Icon.RSSDark>
        </div>
      </div>
      <div className='flex flex-row items-center gap-x-2' onClick={scrollToTop}>
        <span className='text-xl text-primary-blue1 font-bold tablet:block hidden'>回最上面</span>
        <div className='bg-white rounded-full shadow-lg shadow-gray-300 p-2 cursor-pointer'>
          <Icon.ArrowUp></Icon.ArrowUp>
        </div>
      </div>
    </div>
  )
}
