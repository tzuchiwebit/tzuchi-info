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

const Breadcrumb = ({className}) => {
  const { pageData } = useDataProvider();

  const items = useMemo(()=> {
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

    // TODO: 如果為全球志業 需加上「州別」
    if (targetCategory?.id === 14) {
      console.log(target?.data?.attributes?.tags)
      for (const tag in (target?.data?.attributes?.tags || {})) {
        console.log('tag', tag)
        for (const global in joomlaGlobal) {
          console.log(joomlaGlobal[global])

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
  const [selectedFontSize, setSelectedFontSize] = useState('small')

  const articleData = useMemo(() => {
    const target = _.find(pageData, { name: 'article' });
    return target?.data
  }, [pageData])

  const transformHtmlContent = (rawContent) => {
    if (!!rawContent) {
      return rawContent.replaceAll('src="images', `src="${process.env.NEXT_PUBLIC_CMS_URL}/images`)
    }
    return ''
  }

  return (
    <div style={{gridArea: 'a'}}>
      <div className="text-[30px] font-bold text-primary-blue1">
          {articleData?.attributes?.title}
      </div>
      <div className="flex flex-row items-center gap-x-2 mt-2">
        {/* metadata: date, arthur, location */}
        <span className="text-[14px] text-gray-gray4 font-medium">{dayjs(articleData?.attributes?.publish_up).format('YYYY-MM-DD')}</span>
        <Fragment>
          <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
          <span className="text-[14px] text-gray-gray4 font-medium">{articleData?.attributes?.created_by_alias ? articleData?.attributes?.created_by_alias: '慈濟基金會'}</span>
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
        <SocialBar isMobileType={false} likes={articleData?.attributes?.like} shares={articleData?.attributes?.share}></SocialBar>
      </div>
      <div className="laptop:mt-6 mt-4 text-lg leading-[22px]">
        <Image
          src={articleData?.attributes?.images?.image_intro ? articleData?.attributes?.images?.image_intro: DefaultImage}
          alt={articleData?.attributes?.images?.image_intro_alt}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        {
          articleData?.attributes?.metadesc &&
          <div className="mt-2 text-gray-gray2 font-medium leading-[22.4px]">{articleData?.attributes?.metadesc}</div>
        }
        <div className="mt-1 mb-4 flex flex-1 text-lg border-solid border-b-[1px] border-gray-gray7" />
        <div className="mb-4 flex flex-row items-center justify-center w-full bg-gray-gray8 py-1 gap-x-2 rounded">
          <div className="text-base font-medium">文字大小</div>
          <div className="flex flex-row gap-x-1">
            <div className={classnames(styles.itemButton, selectedFontSize === 'small' ? styles.focus : styles.default, styles.small)} onClick={()=> setSelectedFontSize('small')}>小</div>
            <div className={classnames(styles.itemButton, selectedFontSize === 'medium' ? styles.focus : styles.default, styles.medium)} onClick={()=> setSelectedFontSize('medium')}>中</div>
            <div className={classnames(styles.itemButton, selectedFontSize === 'large' ? styles.focus : styles.default, styles.large)} onClick={()=> setSelectedFontSize('large')}>大</div>
          </div>
        </div>
        <div id={'content-holder'} style={{wordBreak: 'break-all'}} className={styles[selectedFontSize]} dangerouslySetInnerHTML={{ __html: transformHtmlContent(articleData?.attributes?.text) }} />
      </div>
    </div>
  )
}

const ExtendArticles = () => {
  const router = useRouter();
  const { pageData } = useDataProvider();
  const params = useParams();

  const extendArticles = useMemo(() => {
    const target = _.find(pageData, { name: 'extendArticles' });
    const list = (target?.data||[]).filter((article)=> {
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
    <div style={{gridArea: 'c'}}>
      <BannerTitle title={"延伸閱讀"} />
      <div className="laptop:mt-6 mt-4 flex flex-col laptop:gap-y-4 gap-y-2">
        {
          (extendArticles||[]).map((item, index) => (
            <div className="cursor-pointer" key={index} onClick={() => {
              router.push(`/article/${item.id}`)
            }}>
              <div className="text-[24px] font-bold text-primary-blue1">{item.attributes.title}</div>
              <div className="flex flex-row items-center gap-x-2 laptop:mt-2 mt-1">
                <span className="text-[14px] text-gray-gray4 font-medium">{dayjs(item.attributes?.publish_up).format('YYYY-MM-DD')}</span>
                <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                <span className="text-[14px] text-gray-gray4 font-medium">{item.attributes.created_by_alias ? item.attributes.created_by_alias : '慈濟基金會'}</span>
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
    const list = (target?.data||[]).filter((article)=> {
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
    <div style={{gridArea: 'b'}}>
      <BannerTitle title={"推薦閱讀"} />
      <div className="laptop:mt-6 mt-4 flex flex-col laptop:gap-y-4 gap-y-2">
        {
          (recommandArticles||[]).map((item, index) => (
            <div className="cursor-pointer" key={index} onClick={() => {
              router.push(`/article/${item.id}`)
            }}>
              <div className="text-[24px] font-bold text-primary-blue1">{item.attributes.title}</div>
              <div className="flex flex-row items-center gap-x-2 laptop:mt-2 mt-1">
                <span className="text-[14px] text-gray-gray4 font-medium">{dayjs(item.attributes?.publish_up).format('YYYY-MM-DD')}</span>
                <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                <span className="text-[14px] text-gray-gray4 font-medium">{item.attributes.created_by_alias ? item.attributes.created_by_alias : '慈濟基金會'}</span>
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
          <Breadcrumb className="tablet:mt-4 mt-2"></Breadcrumb>
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
