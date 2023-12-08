'use client'
import styled from 'styled-components';

// export default styled.div`
//   width: 90%;
//   max-width: 1168px;
//   margin: 0 auto;
//   `;

export default function BlurBGImage({ width, height, url, ...props }) {
  // Tailwind CSS
  // const extendStyles = className || '';
  return (
    <ImageContainer>
      <img className="img-item" src={url} />
      <img className="background-img-item" style={{ backgroundImage: `url(${url})` }} />
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
        object-fit: cover;
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
