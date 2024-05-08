"use client"
import Container from "@/shared/layout/Container"
import { useState, useMemo } from "react"
import Pagination from "@/shared/pagination/Pagination"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import Image from 'next/image'
import PrimaryCard from "@/shared/card/PrimaryCard"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import { useParams } from 'next/navigation'
import Skeleton from "react-loading-skeleton"
import joomlaGlobal from '@/api/joomlaGlobal'

const listData = Array(12).fill({
  "type": "articles",
  "id": "1844",
  "attributes": {
    "id": 1844,
    "asset_id": 1965,
    "title": "滷豆干護花蓮鄉親",
    "alias": "lu-dou-gan-hu-hua-lian-xiang-qin",
    "state": 1,
    "access": 1,
    "created": "2024-05-06 00:52:44",
    "created_by": 764,
    "created_by_alias": "慈濟基金會",
    "modified": "2024-05-07 02:17:01",
    "featured": 0,
    "language": "*",
    "hits": 1,
    "publish_up": "2024-05-06 00:52:44",
    "publish_down": null,
    "note": "",
    "images": {
      "image_intro": "https:\/\/webtest.tzuchi-org.tw\/images\/stories2\/master\/talk2024\/20240327.jpg",
      "image_intro_alt": "",
      "float_intro": "",
      "image_intro_caption": "",
      "image_fulltext": "",
      "image_fulltext_alt": "",
      "float_fulltext": "",
      "image_fulltext_caption": ""
    },
    "metakey": "",
    "metadesc": "從學校退休的英文老師看到部落孩子教育問題嚴重，居民因工作機會不足，許多家庭都是隔代教養，孩子長期面臨家庭教育資源缺乏和教養功能薄弱的難題，學校學習資源也相對不足，種種因素的影響，造成部落原住民學生的學業成就普遍低落。村內國小成績前三名的孩子，到了市區國中後變成後段班，尤其是英語、數學更為嚴重，更甚者，有的孩子因在學校學",
    "metadata": {
      "robots": "",
      "author": "",
      "rights": ""
    },
    "version": 2,
    "featured_up": null,
    "featured_down": null,
    "typeAlias": "com_content.article",
    "text": " ",
    "place": "",
    "like": "0",
    "share": "0",
    "yt-url": "https:\/\/www.youtube.com\/watch?v=0UIVTZYJMe4",
    "tags": {
      "1488": "0403地震",
      "226": "志工",
      "37": "慈濟"
    }
  },
  "relationships": {
    "category": {
      "data": {
        "type": "categories",
        "id": "20"
      }
    },
    "created_by": {
      "data": {
        "type": "users",
        "id": "764"
      }
    }
  }
});

const Breadcrumb = ({className}) => {
  const params = useParams();

  return (
    <div className={className}>
      <div className="flex gap-1 w-full">
        <PrimaryBreadcrumb
          items={[
            {
              label: '首頁',
              link: '/'
            },
            {
              label: '各據點消息 ',
              link: ''
            },
            {
              label: joomlaGlobal[params?.slug?.toString()]?.label,
              link: ''
            },
          ]} />
      </div>
    </div>
  )
}

export default function Page() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const banner = useMemo(() => {
    if (params?.slug) return require(`@/asset/image/place-${params?.slug}.jpeg`)
}, [params?.slug])

  return <Container>
    <FloatScrollTopButton />
    {/* filter options section */}
    <div className="flex flex-col w-full tablet:gap-y-6 gap-y-4">
      {/* breadcrumbs */}
      <Breadcrumb className="tablet:mt-6 mt-4"></Breadcrumb>

      {/* banner image */}
      <div className="w-full">
        {
          banner ?
          <Image
          src={banner}
          alt=""
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }} />:
          <Skeleton className="aspect-[1066/219]" />
        }
      </div>

      {/* result cards */}
      <div className="w-fit flex flex-wrap -mx-3">
        {
          listData.map((item, index) => <PrimaryCard
            item={item?.attributes}
            key={index}
            index={index}
          />)
        }
      </div>

      {/* pagination */}
      <div className="w-full">
        <Pagination currentPage={currentPage} totalPage={5} onPageChange={setCurrentPage} />
      </div>
    </div>

  </Container>
}

