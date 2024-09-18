'use client'
import styled from 'styled-components';
import DefaultImage from '@/asset/image/default-article-intro.png'
import Image from 'next/image'

export default function BlurBGImage({ width, height, url, ...props }) {
  return (
    <ImageContainer>
      {
        url ?
        <>
          <img className="img-item" src={url} />
          <img className="background-img-item" style={{ backgroundImage: `url(${url})` }} />
        </>:
        <>
        <Image
        className="img-item"
          src={DefaultImage}
          alt={""}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <Image
        className="background-img-item"
          src={DefaultImage}
          alt={""}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        </>

      }

    </ImageContainer>
  );
}

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    overflow: hidden;
    .img-item {
        width: fit-content !important;
        position: relative;
        z-index: 10;
        display: block;
        object-fit: contain;
    }
    .background-img-item {
        position: absolute;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        filter: blur(4px);
        -webkit-filter: blur(4px);
        z-index: 0;
        opacity: .6;
    }
`
