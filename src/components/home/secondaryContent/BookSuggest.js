'use client'
import Icon from "@/shared/Icon"
import styled from "styled-components"
import { BannerTitle } from "../components"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"
import { useState, useMemo, useEffect } from "react";
import _ from "lodash";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useDataProvider from "../useDataProvider";
import Skeleton from "react-loading-skeleton";
import Image from 'next/image'
import DefaultImage from '@/asset/image/default-article-intro-square.png'
import useScreenSize from '@/shared/hook/useScreenSize';
import { Linkfont } from "@/shared/styles/linkFont.js";

const ebookEndpoint = `https://tzuchi-ebooks.web.app`;
const jingsiEndpoint = `https://store.jingsi.com`;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Item = ({ item }) => {
  const getImage = () => {
    if (item?.cover_image) return  item.cover_image
    if (item?.image) return item.image
    return DefaultImage
  }

  const clickOpen = () => {
    if (item?.id) {
      window.open(`${ebookEndpoint}/book/${item.id}`, '_blank');
    } else if (item?.link) {
      window.open(`${jingsiEndpoint}${item.link}`, '_blank');
    }
  }

  return (
    <div className="w-[171px] cusor-pointer">
      <div className="w-full rounded-md overflow-hidden cursor-pointer" onClick={clickOpen}>
        {
          item?.title ?
            <Image
              src={getImage()}
              alt={""}
              width={171}
              height={171}
              sizes="100vw"
              style={{
                width: 'auto',
                height: 'auto',
              }}
              className="rounded-md"
            /> :
            <Skeleton className="aspect-square" />
        }
        <div className="pt-2 pl-2 pr-0 text-xl font-bold w-full text-primary-blue1 text-left line-clamp-2">
          <Linkfont>{item?.title}</Linkfont>
        </div>
      </div>
    </div>
  )
}

const NewItem = ({ item = {}, loading = false }) => {
  // const router = useRouter();
  // console.log(item)
  const screenSize = useScreenSize();
  const [imageWidth, setImageWidth] = useState(180)

  useEffect(() => {
    if (screenSize.width >= 1024) {
      setImageWidth(180)
    } else if (screenSize.width >= 768) {
      setImageWidth(171)
    } else if (screenSize.width >= 375) {
      setImageWidth(165)
    }
  }, [screenSize.width])

  const getImage = () => {
    if (item?.cover_image) return  item.cover_image
    if (item?.image) return item.image
    return DefaultImage
  }

  const clickOpen = () => {
    if (item?.id) {
      window.open(`${ebookEndpoint}/book/${item.id}`, '_blank');
    } else if (item?.link) {
      window.open(`${jingsiEndpoint}${item.link}`, '_blank');
    } else if (item?.url) {
      window.open(item.url, '_blank');
    }
  }

  return (
    <div className="relative mb-[60px] rounded-md laptop:w-[180px] tablet:w-[171px] w-[165px] cursor-pointer select-none" onClick={clickOpen}>
      {
        loading ?
          <Skeleton className="aspect-square" /> :
          <Image
            src={getImage()}
            alt={""}
            width={imageWidth}
            height={imageWidth}
            sizes="100vw"
            style={{
              width: 'auto',
              height: 'auto',
            }}
            className="rounded-md"
          />
      }
      <div className="px-0 flex flex-col items-center pt-4 pb-2 w-full gap-y-1 gap-x-4">
        <div className="text-xl font-bold w-full text-primary-blue1 text-left flex-1 line-clamp-2">
          {
            loading ? <Skeleton /> : <Linkfont>{item?.title}</Linkfont>
          }
        </div>
      </div>
    </div>
  )
}

const CarouselSection = ({ data, loading }) => {
  const screenSize = useScreenSize();
  const [slidePercentage, setSlidePercentage] = useState(70)

  const sliderData = useMemo(() => {
    if (data.length === 1) {
      return Array(4).fill(data[0])
    } else if (data.length === 2) {
      return _.concat(data, data);
    }
    return data
  }, [data])

  useEffect(() => {
    if (screenSize.width >= 1600) {
      setSlidePercentage(75)
    } else if (screenSize.width >= 1024) {
      setSlidePercentage(65)
    } else if (screenSize.width >= 768) {
      setSlidePercentage(25.8)
    } else if (screenSize.width >= 375) {
      setSlidePercentage(50)
    }
  }, [screenSize.width])

  return (
    <Carousel
      showArrows={true}
      showIndicators={true}
      swipeable={true}
      infiniteLoop={false}
      emulateTouch={true}
      centerMode={true}
      centerSlidePercentage={slidePercentage}
      showThumbs={false}
      statusFormatter={() => { }}
      renderArrowPrev={(clickHandler, hasPrev) => hasPrev && (
        <button
          onClick={clickHandler}
          className="absolute z-10 bottom-5 left-1 p-1 bg-white rounded-4xl shadow-elevation-3 cursor-pointer text-gray-gray2 hover:bg-complementary-blue2 active:bg-complementary-blue1">
          <Icon.PageArrowLeft
            style={{ width: 24 }}
          />
        </button>
      )}
      renderArrowNext={(clickHandler, hasNext) => hasNext && (<button
        onClick={clickHandler}
        className="absolute z-10 bottom-5 right-1 p-1 bg-white rounded-4xl shadow-elevation-3 cursor-pointer text-gray-gray2 hover:bg-complementary-blue2 active:bg-complementary-blue1">
        <Icon.PageArrowRight
          style={{ width: 24 }}
        />
      </button>)}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        const defStyle = { marginLeft: 20, color: "green", cursor: "pointer", bottom: 10, position: 'relative' };
        const style = isSelected
          ? { ...defStyle, color: "red" }
          : { ...defStyle };
        return (
          <div
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            tabIndex={0}
            role="button"
            className={classNames(isSelected ? 'bg-primary-blue2' : 'bg-gray-gray7', 'w-3 h-3 bottom-5 relative rounded-full')}
          />
        );
      }}
    >
      {sliderData.map((_i, _index) => (
        <div className="mt-1.5" key={_index}>
          <NewItem loading={loading} item={_i} />
        </div>
      ))}
    </Carousel>
  );
}

const onReadMoreBook = () => {
  window.open(ebookEndpoint, '_blank');
}

const onReadMoreJingSi = () => {
  window.open(`${jingsiEndpoint}/pages/books`, '_blank');
}

export default function BookSuggest() {
  const screenSize = useScreenSize();
  const [isTabletOnly, setIsTabletOnly] = useState(screenSize.width >= 768 && screenSize.width < 1024)

  const { loadingBooks, suggestBooks: booksData, loadingJingsi, jingsiBooks: jingsiData } = useDataProvider();

  const sliderBookData = useMemo(() => {
    if (booksData.length === 1) {
      return Array(4).fill(booksData[0])
    } else if (booksData.length === 2) {
      return _.concat(booksData, booksData);
    }
    return booksData.slice(0, 4)
  }, [booksData])

  const sliderJingsiData = useMemo(() => {
    const formatedData = jingsiData.map((item) => {
      return {
        title: item?.attributes?.title,
        url: item?.attributes?.images?.image_intro_alt,
        cover_image: item?.attributes?.images?.image_intro,
      }
    })
    if (formatedData.length === 1) {
      return Array(4).fill(formatedData[0])
    } else if (formatedData.length === 2) {
      return _.concat(formatedData, formatedData);
    }
    return formatedData.slice(0, 4)
  }, [jingsiData])

  useEffect(() => {
    setIsTabletOnly(screenSize.width >= 768 && screenSize.width < 1024)
  }, [screenSize.width])

  return <div className="pt-3 w-full">
    <BannerTitle title={`好書推薦`} />
    <div className="flex flex-row w-full gap-2 items-center pt-4">
      <div className="flex-0 text-[24px] font-bold text-primary-blue1">
        靜思人文
      </div>
      <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
      <div className="flex-0 font-medium justify-end items-end text-lg text-primary-blue3">
        <div
          onClick={onReadMoreJingSi}
          target="_blank"
          className="cursor-pointer flex flex-row whitespace-nowrap">
          更多<Icon.RightArrow2 width={20} />
        </div>
      </div>
    </div>

    {
      !loadingJingsi &&
      <div className="w-full">
        {
          isTabletOnly ?
            <div className="flex flex-row justify-between">
              {
                sliderJingsiData.map((item, index) => (<div className='w-fit' key={index}>
                  <Item item={item} />
                </div>))
              }
            </div> :
            <CarouselContainer>
              <CarouselSection data={sliderJingsiData} loading={loadingJingsi} />
            </CarouselContainer>
        }
      </div>
    }
    <div className="flex flex-row w-full gap-2 items-center  pt-4">
      <div className="flex-0 text-[24px] font-bold text-primary-blue1">
        慈濟書庫
      </div>
      <div className="flex flex-1 text-lg border-solid border-b-2 border-gray-gray7" />
      <div className="flex-0 font-medium justify-end items-end text-lg text-primary-blue3">
        <div
          onClick={onReadMoreBook}
          target="_blank"
          className="cursor-pointer flex flex-row whitespace-nowrap">
          更多<Icon.RightArrow2 width={20} />
        </div>
      </div>
    </div>
    {
      !loadingBooks &&
      <div className="w-full">
        {
          isTabletOnly ?
            <div className="flex flex-row justify-between">
              {
                sliderBookData.map((item, index) => (<div className='w-fit' key={index}>
                  <Item item={item} />
                </div>))
              }
            </div> :
            <CarouselContainer>
              <CarouselSection data={sliderBookData} loading={loadingBooks} />
            </CarouselContainer>
        }
      </div>
    }
  </div>
}

const CarouselContainer = styled.div`
  .control-dots {
      display: flex;
      gap: 15px;
      justify-content: center;
  }
`
