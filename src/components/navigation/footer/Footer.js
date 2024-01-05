'use client'
import Upper from "./components/Upper";
import Lower from "./components/Lower";
import LinkGroup from "./components/LinkGroup/index";
import Location from "./components/Location";
import Container from "@/shared/layout/Container";
import styled from "styled-components";
import screens from "@/shared/styles/screens"

export default function Footer() {
  return (
    <div className="
      w-full bg-gray-gray9
      laptop:mt-[40px] container:mt-[30px]
      desktop:bg-[length:70%] laptop:bg-[length:90%] tablet:bg-[length:95%]
      desktop:bg-[center_50%] laptop:bg-[center_40%] tablet:bg-[center_45%]
      "
      style={{
        backgroundImage: `url("/map.svg")`,
        // backgroundSize: "70%",
        backgroundRepeat: "no-repeat",
        // backgroundPosition: "center 30%"
      }}>
      <Container>
        <Wrapper>
          <Upper></Upper>
          <div className="flex flex-row justify-between laptop-down:gap-x-5 tablet-down:flex-col tablet-down:gap-y-8">
            <Location></Location>
            <LinkGroup></LinkGroup>
          </div>
        </Wrapper>
      </Container>
      <Lower></Lower>
    </div >
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding: 50px 10px;

  @media(min-width: ${screens.tablet}) {}
  @media(min-width: ${screens.laptop}) {}
  @media(min-width: ${screens.desktop}) {}

  @media(max-width: ${screens["desktop-down"].max}) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @media(max-width: ${screens["laptop-down"].max}) {
    padding: 32px 0;
  }
  @media(max-width: ${screens["tablet-down"].max}) {
    padding: 20px 0;
  }
`
