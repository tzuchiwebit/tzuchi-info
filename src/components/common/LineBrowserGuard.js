'use client'

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Icon from '@/shared/Icon';
import color from "@/shared/styles/color"

const WARNING_SESSION_KEY = 'lineWarningDismissed';
const BROWSER_CHOICE_KEY = 'browserChoice';

const detectLineBrowser = (userAgentString = '') => {
  const ua = userAgentString || '';
  const isLine = /Line/i.test(ua);
  const isIOS = isLine && /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = isLine && /Android/i.test(ua);

  let platform = 'unknown';
  if (isIOS) {
    platform = 'ios';
  } else if (isAndroid) {
    platform = 'android';
  }

  return {
    isLine,
    isIOS,
    isAndroid,
    platform,
    userAgent: ua,
  };
};

const LineBrowserGuard = () => {
  const [browserInfo, setBrowserInfo] = useState({
    isLine: false,
    platform: 'unknown',
  });
  const [showModal, setShowModal] = useState(false);
  const previousStyle = useRef({
    bodyOverflow: '',
    htmlOverflow: '',
    bodyPosition: '',
    bodyTop: '',
    bodyWidth: '',
    scrollY: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const info = detectLineBrowser(window.navigator.userAgent);
    setBrowserInfo(info);

    if (info.isLine && !sessionStorage.getItem(WARNING_SESSION_KEY)) {
      setShowModal(true);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('openExternalBrowser') === '1' && !info.isLine) {
      console.info('Already browsing outside of the LINE in-app browser.');
    }
  }, []);

  const openInExternalBrowser = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(BROWSER_CHOICE_KEY, 'external');

    const url = new URL(window.location.href);
    if (!url.searchParams.has('openExternalBrowser')) {
      url.searchParams.append('openExternalBrowser', '1');
    }

    window.location.href = url.toString();

    setTimeout(() => {
      alert('請點擊右上角選單「⋮」，選擇「在瀏覽器中開啟」');
      setShowModal(false);
    }, 1000);
  }, []);

  const stayInLine = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    sessionStorage.setItem(WARNING_SESSION_KEY, 'true');
    setShowModal(false);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const { body, documentElement } = document;
    if (!body || !documentElement) {
      return undefined;
    }

    if (showModal) {
      previousStyle.current = {
        bodyOverflow: body.style.overflow,
        htmlOverflow: documentElement.style.overflow,
        bodyPosition: body.style.position,
        bodyTop: body.style.top,
        bodyWidth: body.style.width,
        scrollY: window.scrollY || documentElement.scrollTop,
      };

      documentElement.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${previousStyle.current.scrollY}px`;
      body.style.width = '100%';
    } else {
      documentElement.style.overflow = previousStyle.current.htmlOverflow;
      body.style.overflow = previousStyle.current.bodyOverflow;
      body.style.position = previousStyle.current.bodyPosition;
      body.style.top = previousStyle.current.bodyTop;
      body.style.width = previousStyle.current.bodyWidth;
      window.scrollTo(0, previousStyle.current.scrollY);
    }

    return () => {
      documentElement.style.overflow = previousStyle.current.htmlOverflow;
      body.style.overflow = previousStyle.current.bodyOverflow;
      body.style.position = previousStyle.current.bodyPosition;
      body.style.top = previousStyle.current.bodyTop;
      body.style.width = previousStyle.current.bodyWidth;
      window.scrollTo(0, previousStyle.current.scrollY);
    };
  }, [showModal]);

  if (!browserInfo.isLine || !showModal) {
    return null;
  }

  const platformLabel = browserInfo.platform === 'ios'
    ? 'iOS'
    : browserInfo.platform === 'android'
      ? 'Android'
      : '';

  return (
    <Backdrop>
      <Modal role="dialog" aria-modal="true" aria-labelledby="line-browser-warning-title">
        <IconWrapper>
          <Icon.Warning />
        </IconWrapper>
        <Title>偵測到 LINE <br />內建瀏覽器{platformLabel ? `（${platformLabel}）` : ''}</Title>
        <Paragraph>
          您目前在 LINE App 的內建瀏覽器中開啟本站，部分影音或互動功能可能無法正常運作。
        </Paragraph>
        <Hint>
          <strong>建議操作</strong>
          點擊右上角選單「 ⋮ 」，並選擇「在瀏覽器中開啟」即可獲得最佳體驗。
        </Hint>
        <ButtonGroup>
          <PrimaryButton type="button" onClick={openInExternalBrowser}>
            <Icon.ShareLink style={{ width: 24 }} /> 開啟外部瀏覽器
          </PrimaryButton>
        </ButtonGroup>
      </Modal>
    </Backdrop>
  );
};

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 32px 28px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 56px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: black;
  font-weight: 500;
  text-align: center;
`;

const Hint = styled.div`
  padding: 16px;
  border: 1px solid #000;
  border-radius: 16px;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
  font-weight: 500;

  strong {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  background: ${color.primary.blue1};
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;

  &:hover {
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    background: white;
    color: ${color.primary.blue1};
  }
`;

export default LineBrowserGuard;
