"use client"
import { Fragment, useMemo } from "react"
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

const StyledImage = styled.div`
  width: 100%;
  height: 560px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

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
    if (targetCategory?.category_name) {
      list.push({
        label: targetCategory.label_name,
        link: `/${targetCategory.category_name}/article/${target?.data?.id}`
      })
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
        {
          articleData?.attributes?.created_by_alias &&
          <Fragment>
            <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
            <span className="text-[14px] text-gray-gray4 font-medium">{articleData?.attributes?.created_by_alias}</span>
          </Fragment>
        }
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
      <StyledImage style={{backgroundImage: `url("${articleData?.attributes?.images?.image_intro}")`}} className="tablet:mt-6 mt-4 rounded"></StyledImage>
      <div className="mt-2 font-medium text-gray-gray2 border-b border-solid border-gray-gray7 pb-1">
        {articleData?.attributes?.metadesc}
      </div>
      <div className="laptop:mt-6 mt-4 font-bold text-black leading-[22px]">
        <div id={'content-holder'} dangerouslySetInnerHTML={{ __html: transformHtmlContent(articleData?.attributes?.text) }} />
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
                {
                  item.attributes.created_by_alias&&
                  <>
                    <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                    <span className="text-[14px] text-gray-gray4 font-medium">{item.attributes.created_by_alias}</span>
                  </>
                }
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
                {
                  item.attributes.created_by_alias &&
                    <>
                      <div className="w-[1px] h-4 border-l border-solid border-gray-gray4"></div>
                      <span className="text-[14px] text-gray-gray4 font-medium">{item.attributes.created_by_alias}</span>
                    </>
                }
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
