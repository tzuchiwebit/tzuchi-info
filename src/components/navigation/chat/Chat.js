'use client'
import React, { useState } from 'react';
import styled from "styled-components";
import Icon from '@/shared/Icon';
import screens from "@/shared/styles/screens";

export default function Chat({ }) {
  const [isOpenChat, setIsOpenChat] = useState(false)
  const [isReady, setIsReady] = useState(false)

  return (
    <>
      {
        isOpenChat ?
          <FrameContainer>
            {
              isReady &&
              <StyledCloseDiv onClick={() => setIsOpenChat(false)}>
                <Icon.CloseWhite></Icon.CloseWhite>
              </StyledCloseDiv>
            }
            <StyledIframe src={process.env.NEXT_PUBLIC_CHAT_URL} title="chatbot" onLoad={() => setIsReady(true)}></StyledIframe>
          </FrameContainer> :
          <ChatContainer onClick={() => { setIsOpenChat(true); setIsReady(true); }}>
            <div style={{ height: '72px', width: '72px', padding: '2px', backgroundColor: "#FFDBAD", borderRadius: '9999px', boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}>
              <Icon.ChatAvatar></Icon.ChatAvatar>
            </div>
          </ChatContainer>
      }
    </>
  )
}

const Wrapper = styled.div`
  // position: fixed;
  position: relative;
  border: 4px solid red;
  width: 100vw;
  height: 100vh;
  // top: 0;
  // top: 151px;
`

const FrameContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 99999999;
  top: 151px;
`

const StyledCloseDiv = styled.div`
  position: absolute;
  right: 18px;
  color: white;
  cursor: pointer;
  top: 20px;
  height: 18px;
  width: 18px;
`

const StyledIframe = styled.iframe`
  border: none;
  width: 100%;
  height: calc(100vh - 151px);
`;

const ChatContainer = styled.div`
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 72px;
  position: fixed;
  bottom: 80px;
  right: 20px;
  cursor: pointer;
  @media(min-width: ${screens.tablet}) {
    bottom: 90px;
  }
  @media(min-width: ${screens.laptop}) {
    bottom: 28px;
  }
`
