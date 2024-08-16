import Icon from '@/shared/Icon'

export default function CloudTagSearchButton ({ setOpenCloudTagSearch, openCloudTagSearch }) {
  return (
    <>
      <button
        className="w-[110px] flex items-center justify-between relative border-b border-solid border-gray-gray7 py-1 mr-2"
        onClick={() => { setOpenCloudTagSearch(!openCloudTagSearch) }}
        >
        <span className='whitespace-nowrap text-lg text-primary-blue1 font-bold'>熱門快搜</span>
        <Icon.UpArrow style={{ width: 20, transition: 'all .15s', transform: openCloudTagSearch ? '' : 'rotate(180deg)' }} />
      </button>
    </>
  )
}
