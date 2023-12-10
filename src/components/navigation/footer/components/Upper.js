import Icon from '@/shared/Icon'

export default function Upper() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex flex-row justify-between items-center border-b border-solid border-gray-gray7 pb-3 px-1'>
      <div className='flex flex-row items-center gap-x-1'>
        <div className='bg-primary-blue1 w-10 h-10 flex items-end justify-end pr-[7px] rounded-[5px]'>
          <Icon.Facebook></Icon.Facebook>
        </div>
        <div>
          <Icon.Instagram></Icon.Instagram>
        </div>
        <div>
          <Icon.Youtube></Icon.Youtube>
        </div>
        <div className='bg-primary-blue1 w-10 h-10 flex items-center justify-center rounded-[5px]'>
          <Icon.Tictok></Icon.Tictok>
        </div>
      </div>
      <div className='flex flex-row items-center gap-x-2' onClick={scrollToTop}>
        <span className='text-xl text-primary-blue1 font-bold'>回最上面</span>
        <div className='bg-white rounded-full shadow-lg shadow-gray-300 p-2 cursor-pointer'>
          <Icon.ArrowUp></Icon.ArrowUp>
        </div>
      </div>
    </div>
  )
}
