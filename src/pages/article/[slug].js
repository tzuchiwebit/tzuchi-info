"use client"
import { Fragment, useMemo, useState } from "react"
import Container from "@/shared/layout/Container"
import PrimaryBreadcrumb from "@/shared/breadcrumb/PrimaryBreadcrumb"
import styled from "styled-components"
import { BannerTitle } from "@/components/home/components"
import { SocialBar } from "@/components/article/components"
import FloatScrollTopButton from "@/shared/scrollTop/FloatScrollTopButton"
import screens from "@/shared/styles/screens";
import DataProvider from "@/components/article/DataProvider"
import useDataProvider from "@/components/article/useDataProvider"
import _ from 'lodash'
import dayjs from "dayjs"
import { useRouter, useParams } from 'next/navigation'
import joomlaContentCategory from '@/api/joomlaContentCategory'
import Spinner from "@/components/Spinner"
import Image from "next/image"
import styles from './article.module.css'
import * as classnames from "classnames"
import DefaultImage from '@/asset/image/default-article-intro.png'
import joomlaGlobal from '@/api/joomlaGlobal'
import { addHits } from "@/api/api"
import Icon from "@/shared/Icon"
import color from "@/shared/styles/color"
import FloatSizeToolbar from './float-size-toolbar';
import 'react-toastify/dist/ReactToastify.css';
import Errata from "@/components/Errata"

const Breadcrumb = ({ className }) => {
  const { pageData } = useDataProvider();

  const items = useMemo(() => {
    const target = _.find(pageData, { name: 'article' });
    const targetCategory = _.find(joomlaContentCategory, (i) => i.id.toString() === target?.data?.relationships?.category?.data?.id);
    const list = [
      {
        label: '首頁',
        link: '/'
      },
    ]
    if (targetCategory?.label_name) {
      const item = {
        label: targetCategory.label_name,
      }
      if (targetCategory?.category_name) {
        item.link = `/${targetCategory.category_name}`
      }
      list.push(item)
    }

    if (targetCategory?.id === 14) {
      for (const tag in (target?.data?.attributes?.tags || {})) {
        for (const global in joomlaGlobal) {
          if (joomlaGlobal[global].tag == tag) {
            const item = {
              label: joomlaGlobal[global].label,
              link: joomlaGlobal[global].link
            }
            list.push(item)
            break
          }
        }

      }
    }
    return list
  }, [pageData])

  return (
    <div className={className}>
      <div className="flex gap-1 w-full">
        <PrimaryBreadcrumb
          items={items} />
      </div>
    </div>
  )
}

const Article = () => {
  const { pageData } = useDataProvider();
  const [selectedFontSize, setSelectedFontSize] = useState(18)

  const { slug } = useParams();
  // console.log(`slug`);
  // console.log(slug);

  const articleData = useMemo(() => {
    const target = _.find(pageData, { name: 'article' });

    let titleValue
    // 1) Find the first match
    const regex = /<img\s+[^>]*title="([^"]*)"[^>]*>/i;
    const match = target?.data?.attributes?.text?.match(regex);

    if (match) {
        titleValue = match[1];
        console.log("Title value:", titleValue);

        // 2) insert "title" element
        const newRegex = /(<img\s+[^>]*>)/i;
        target.data.attributes.text = target?.data?.attributes?.text.replace(newRegex, `$1<p class="mt-1 pb-1 mb-4 text-gray-gray2 font-medium border-solid border-b border-gray-gray7">${titleValue}</p>`);
    } else {
        console.log("No img tag with title attribute found.");
    }

    return target?.data
  }, [pageData])

  const transformHtmlContent = (rawContent) => {
    if (!!rawContent) {
      return rawContent.replaceAll('src="images', `src="${process.env.NEXT_PUBLIC_CMS_URL}/images`)
    }
    return ''
  }

  const getActivityInfoBarWidth = (size) => {
    if (size >= 24) return 'border-l-[8px]'
    if (size >= 20) return 'border-l-[6px]'
    return 'border-l-[4px]'
  }

  return (
    <div style={{ gridArea: 'a' }}>
      <div className="text-[30px] font-bold text-primary-blue1">
        {articleData?.attributes?.title}
      </div>
      <div className="flex flex-row items-center gap-x-2 mt-2">
        {/* metadata: date, arthur, location */}
        <span className="text-[14px] text-gray-gray4 font-medium">{dayjs(articleData?.attributes?.publish_up).format('YYYY-MM-DD')}</span>
        <Fragment>
          <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
          <span className="text-[14px] text-gray-gray4 font-medium">{articleData?.attributes?.creator?.name}</span>
        </Fragment>
        {
          articleData?.attributes?.place &&
          articleData?.attributes?.place.toUpperCase() != 'NULL' &&
          <Fragment>
            <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
            <span className="text-[14px] text-gray-gray4 font-medium">{articleData?.attributes?.place}</span>
          </Fragment>
        }

        <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
        {/* <SocialBar
          articleId={slug}
          isMobileType={false}
          likes={articleData?.attributes?.like}
          shares={articleData?.attributes?.share}
        /> */}
      </div>
      <div className="laptop:mt-6 mt-4">
        <Image
          src={articleData?.attributes?.images?.image_intro ? articleData?.attributes?.images?.image_intro : DefaultImage}
          alt={articleData?.attributes?.images?.image_intro_alt}
          title={articleData?.attributes?.metadesc}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        {
          articleData?.attributes?.images?.image_intro_caption ?
          <>
            <div className="mt-1 pb-1 mb-4 text-gray-gray2 font-medium border-solid border-b border-gray-gray7" style={{ fontSize: selectedFontSize+'px' }}>{articleData?.attributes?.images?.image_intro_caption}</div>
          </>:
          <>
            <div className="mt-1 pb-1 mb-4"></div>
          </>
        }
        {
          articleData?.relationships?.category?.data?.id === '17' &&
            <div className={classnames('pl-2 border-solid border-primary-blue3 my-4', getActivityInfoBarWidth(selectedFontSize))} style={{fontSize: selectedFontSize+'px'}}>
              活動開始：2024-06-02  08:55 <br />
              活動結束：2024-06-03  08:55  <br />
              <span className="flex gap-2">活動地點：地點點位名稱 <Icon.LocationPin style={{ width: selectedFontSize+'px', color: color.primary.blue2, cursor: 'pointer' }} /></span>
            </div>
        }
        <div className={styles.content} id={'content-holder'} style={{ wordBreak: 'break-all', fontSize: selectedFontSize+'px' }} dangerouslySetInnerHTML={{ __html: transformHtmlContent(articleData?.attributes?.text) }} />
        {
          articleData?.relationships?.category?.data?.id !== '17' &&
          <Errata title={articleData?.attributes?.title}></Errata>
        }
      </div>
      <FloatSizeToolbar selectedFontSize={selectedFontSize} setSelectedFontSize={setSelectedFontSize}></FloatSizeToolbar>
    </div>
  )
}

const ExtendArticles = () => {
  const router = useRouter();
  const { pageData } = useDataProvider();
  const params = useParams();

  const extendArticles = useMemo(() => {
    const target = _.find(pageData, { name: 'extendArticles' });
    const list = (target?.data || []).filter((article) => {
      if (article.id.toString() !== params.slug.toString()) {
        return article
      }
    })
    if (list.length === 4) {
      list.pop()
    }
    return list
  }, [pageData])

  return (
    <div style={{ gridArea: 'c' }}>
      <BannerTitle title={"延伸閱讀"} />
      <div className="laptop:mt-6 mt-4 flex flex-col laptop:gap-y-4 gap-y-2">
        {
          (extendArticles || []).map((item, index) => (
            <div className="cursor-pointer" key={index} onClick={() => {
              addHits(item.id);
              router.push(`/article/${item.id}`)
            }}>
              <div className="text-[24px] font-bold text-primary-blue1">{item.attributes.title}</div>
              <div className="flex flex-row items-center gap-x-2 laptop:mt-2 mt-1">
                <span className="text-[14px] text-gray-gray4 font-medium">{dayjs(item.attributes?.publish_up).format('YYYY-MM-DD')}</span>
                <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                <span className="text-[14px] text-gray-gray4 font-medium">{item?.attributes?.creator?.name}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const RecommandArticles = () => {
  const router = useRouter();
  const { pageData } = useDataProvider();
  const params = useParams();

  const recommandArticles = useMemo(() => {
    const target = _.find(pageData, { name: 'recommandArticles' });
    const list = (target?.data || []).filter((article) => {
      if (article.id.toString() !== params.slug.toString()) {
        return article
      }
    })
    if (list.length === 4) {
      list.pop()
    }
    return list
  }, [pageData])

  return (
    <div style={{ gridArea: 'b' }}>
      <BannerTitle title={"推薦閱讀"} />
      <div className="laptop:mt-6 mt-4 flex flex-col laptop:gap-y-4 gap-y-2">
        {
          (recommandArticles || []).map((item, index) => (
            <div className="cursor-pointer" key={index} onClick={() => {
              addHits(item.id);
              router.push(`/article/${item.id}`)
            }}>
              <div className="text-[24px] font-bold text-primary-blue1">{item.attributes.title}</div>
              <div className="flex flex-row items-center gap-x-2 laptop:mt-2 mt-1">
                <span className="text-[14px] text-gray-gray4 font-medium">{dayjs(item.attributes?.publish_up).format('YYYY-MM-DD')}</span>
                <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                <span className="text-[14px] text-gray-gray4 font-medium">{item?.attributes?.creator?.name}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const MainContent = () => {
  const { loading } = useDataProvider();
  return (
    <Fragment>
      {
        loading ? <div className="h-96 flex justify-center items-center"><Spinner></Spinner></div> :
          <>
            <FloatScrollTopButton />
            {/* breadcrumb */}
            <Breadcrumb className="tablet:mt-8 mt-2"></Breadcrumb>
            <ArticleContainer className="mt-6">
              <Article></Article>
              <RecommandArticles></RecommandArticles>
              <ExtendArticles></ExtendArticles>
            </ArticleContainer>
          </>
      }
    </Fragment>
  )
}

export default function Page() {
  return (
    <DataProvider>
      <Container>
        <MainContent></MainContent>
      </Container>
      <SocialBar isMobileType={true}></SocialBar>
    </DataProvider>
  )
}

const ArticleContainer = styled.div`
    width: 100%;
    padding-bottom: 12px;
    @media(max-width: ${screens.tablet}) {
      display: flex;
      flex-direction: column;
      row-gap: 32px;
    }
    @media(min-width: ${screens.laptop}) {
      display: grid;
      column-gap: 22px;
      row-gap: 32px;
      grid-template: auto auto / 620px 1fr;
      grid-template-areas:
        'a b'
        'c c';
    }
    @media(min-width: ${screens.desktop}) {
      display: grid;
      column-gap: 22px;
      row-gap: 32px;
      grid-template: auto auto / 878px 1fr;
      grid-template-areas:
        'a b'
        'c c';
    }
`
