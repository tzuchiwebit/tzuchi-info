import Icon from '@/shared/Icon'

export default function Location({ data }) {
  const openSocial = (name) => {
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.[0] === name) {
        window.open(data[i][1], name, 'noopener=yes')
        break;
      }
    }
  }
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-1">
        <span className="text-xl text-primary-blue1 font-bold">花蓮本會</span>
        <span className="text-gray-text">花蓮縣新城鄉精舍街88巷1號</span>
        <span className="text-gray-text">(03)8266779</span>
      </div>
      <div className="flex flex-col gap-y-1">
        <span className="text-xl text-primary-blue1 font-bold">花蓮靜思堂</span>
        <span className="text-gray-text">花蓮縣花蓮市中央路三段703號</span>
        <span className="text-gray-text">(03)8560260</span>
      </div>
      <div>
        <button className='bg-primary-blue1 text-white flex flex-row justify-center items-center py-2 px-8 gap-x-2 rounded-lg cursor-pointer' onClick={() => openSocial('聯絡我們')}>
          <Icon.ShareEmail width="20px"></Icon.ShareEmail>
          <span className='font-bold'>聯絡我們</span>
        </button>
      </div>
    </div>
  )
}
