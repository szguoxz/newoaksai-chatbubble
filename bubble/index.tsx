import React, { CSSProperties, useState, useEffect, useRef } from "react";
import { useSessionStorageState } from "ahooks";
import invertBgColorToTextColor from "../src/utils/invertBgColorToTextColor";
import message from "antd/es/message";
import { isMobile } from "react-device-detect";

declare global {
  interface Window {
    newoaksChatbotInfo: {
      [key: string]: any;
    };
    chatpilotConfig: {
      chatbotId: string;
      domain: string;
    };
    newoaksActions: {
      [key: string]: () => void;
    };
  }
}

function computeChatbotSize(
  screenWidth: number,
  screenHeight: number,
  customWidth: number = 0,
  customHeight: number = 0
) {
  const minWidth = 430;
  const minHeight = 560;
  const maxWidth = screenWidth - 48;
  const maxHeight = screenHeight - 120;
  if (customWidth === 0 || customHeight === 0) {
    return {
      width: minWidth,
      height: minHeight,
    };
  }
  return {
    width: customWidth > maxWidth ? maxWidth : customWidth,
    height: customHeight > maxHeight ? maxHeight : customHeight,
  };
}

export default function EmbedChatBotButton() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const [isIframeMax, setIsIframeMax] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<any>({});
  const [isError, setIsError] = useState(false);
  const [WelcomeMessage, setWelcomeMessage] = useState([
    "Welcome to the chatbot assistant.",
  ]);

  // 暴露方法到全局
  useEffect(() => {
    window.newoaksActions = {
      openBubble: () => setIsOpen(true),
      closeBubble: () => setIsOpen(false),
    };
  }, []);

  const { width, height } = computeChatbotSize(screenWidth, screenHeight);

  // 监听iframe消息
  useEffect(() => {
    const handleIframeMessage = (e: MessageEvent) => {
      if (e.data === "close") {
        setIsOpen(false);
      }
      if (e.data === "iframe-max") {
        setIsIframeMax(true);
      }
      if (e.data === "iframe-min") {
        setIsIframeMax(false);
      }
    };
    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, [config]);

  if (location.pathname.includes("/chatbot")) {
    return null;
  }

  const align = config?.ChatBubbleAlign === 1 ? "left" : "right";

  return (
    <>
      <WelcomeBubble
        align="right"
        isHide={isOpen}
        delay={0}
        data={WelcomeMessage}
        onClickMsg={() => {
          setIsOpen(true);
        }}
      />
      <MobileBg show={isMobile && isOpen} onClose={() => setIsOpen(false)} />
      <ChatbotBubbleSwitch
        boxShadow={"3px 3px 16px 2px #000"}
        align={align}
        icon={config.ChatIconUrl}
        bgColor={config.ChatBubbleColor}
        open={isOpen}
        onClick={() => {
          if (isError) {
            return message.error("Currently chatbot is not available!");
          }
          setIsOpen((prevBol) => !prevBol);
        }}
      />
      {/* {isInit && ( */}
      <iframe
        id="embed-chatbot-iframe"
        width={isMobile ? screenWidth : isIframeMax ? screenWidth : width}
        height={
          isMobile ? screenHeight * 0.85 : isIframeMax ? screenHeight : height
        }
        style={{
          width: isMobile ? screenWidth : isIframeMax ? screenWidth : width,
          height: isMobile
            ? screenHeight * 0.85
            : isIframeMax
            ? screenHeight
            : height,
          border: isIframeMax ? "none" : "1px solid #e5e7eb",
          borderRadius: isIframeMax ? 0 : 12,
          position: "fixed",
          [align]: isMobile || isIframeMax ? 0 : 48,
          bottom: isMobile || isIframeMax ? 0 : 120,
          zIndex: 2147483647,
          display: isOpen ? "block" : "none",
        }}
        src="/chatbot?close"
      ></iframe>
      {/* )} */}
    </>
  );
}

function WelcomeBubble({
  onClickMsg,
  delay = 3000,
  data = [],
  isHide,
  align,
}: {
  align: "left" | "right";
  isHide: boolean;
  data: string[];
  delay?: number;
  onClickMsg: () => void;
}) {
  const timer = useRef<any>();
  const [isShow, setIsShow] = useState(false);
  const [isClickClose, setIsClickClose] = useSessionStorageState<
    boolean | undefined
  >("message_bubbles_have_been_shown");

  useEffect(() => {
    timer.current = setTimeout(() => {
      setIsShow(true);
    }, delay);
  }, []);

  useEffect(() => {
    if (isHide) {
      clearTimeout(timer.current);
      setIsShow(false);
    }
  }, [isHide]);

  if (data.length === 0 || isClickClose || !isShow) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        [align]: 48,
        bottom: 110,
        zIndex: 2147483645,
        paddingLeft: align !== "left" ? 20 : 0,
        paddingRight: align !== "right" ? 20 : 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          // border: '1px solid #ccc',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 13,
          backgroundColor: "#e0e0e0",
          cursor: "pointer",
          position: "absolute",
          [align]: 0,
          top: -36,
          userSelect: "none",
        }}
        onClick={() => {
          setIsClickClose(true);
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4184"
          width="16"
          height="16"
        >
          <path
            d="M801.645714 170.666667l51.833905 51.590095L565.150476 511.951238l288.353524 289.670095-51.833905 51.614477-288.109714-289.450667L225.426286 853.23581 173.592381 801.621333l288.329143-289.670095L173.592381 222.256762 225.426286 170.666667l288.109714 289.426285L801.645714 170.666667z"
            p-id="4185"
            fill="#333333"
          ></path>
        </svg>
      </div>
      {data.map((item: string, index: number) => (
        <p
          key={index}
          onClick={() => {
            onClickMsg();
            setIsClickClose(true);
          }}
          style={{
            padding: "12px 16px",
            backgroundColor: "#fff",
            borderRadius: 10,
            lineHeight: 1.6,
            border: "1px solid #ebebeb",
            boxShadow: "0 0 16px rgba(0,0,0,.1)",
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

// const switchIconStyle: CSSProperties = {
//   color: '#fff',
//   fontSize: 24,
//   lineHeight: '32px',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center'
// };

const switchButtonStyle: CSSProperties = {
  userSelect: "none",
  cursor: "pointer",
  width: 56,
  height: 56,
  borderRadius: 28,
  position: "fixed",
  zIndex: 2147483645,
  bottom: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

function ChatbotBubbleSwitch({
  boxShadow,
  align = "right",
  open,
  onClick,
  bgColor,
  icon,
}: {
  boxShadow: string;
  align: "left" | "right";
  open: boolean;
  onClick: () => void;
  bgColor: string;
  icon: string;
}) {
  if (icon) {
    return (
      <div
        style={{ ...switchButtonStyle, [align]: 48, boxShadow }}
        onClick={onClick}
      >
        <img src={icon} style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
  return (
    <div
      style={{
        ...switchButtonStyle,
        [align]: 48,
        backgroundColor: bgColor || "#333",
        boxShadow,
      }}
      onClick={onClick}
    >
      {open ? (
        <Close color={invertBgColorToTextColor(bgColor)} />
      ) : (
        <Comment color={invertBgColorToTextColor(bgColor)} />
      )}
    </div>
  );
}

function MobileBg({ show, onClose }: { show: boolean; onClose: () => void }) {
  if (!show) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0, .5)",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        zIndex: 2147483646,
        top: 0,
        left: 0,
        color: "green",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    ></div>
  );
}

function Close({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4184"
      width="32"
      height="32"
    >
      <path
        d="M801.645714 170.666667l51.833905 51.590095L565.150476 511.951238l288.353524 289.670095-51.833905 51.614477-288.109714-289.450667L225.426286 853.23581 173.592381 801.621333l288.329143-289.670095L173.592381 222.256762 225.426286 170.666667l288.109714 289.426285L801.645714 170.666667z"
        p-id="4185"
        fill={color}
      ></path>
    </svg>
  );
}

function Comment({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="27863"
      width="32"
      height="32"
    >
      <path
        d="M825.088 90.432H209.28a137.216 137.216 0 0 0-136.832 136.832v398.464c0 75.456 61.504 136.832 136.832 136.832h78.656l58.176 150.656c6.848 13.632 17.152 20.48 30.784 20.48 13.632 0 27.328-6.848 30.784-20.48l58.176-150.656h352.256c75.328 0 136.96-61.376 136.96-136.832V227.2c6.784-75.2-54.72-136.768-129.984-136.768z m68.352 535.232a68.48 68.48 0 0 1-68.352 68.416H448.704c-13.632 0-27.328 6.976-30.72 20.48l-37.696 92.48-37.568-92.416c-6.848-13.504-17.088-20.48-30.784-20.48H209.28a68.544 68.544 0 0 1-68.416-68.416V227.2c0-37.568 30.848-68.416 68.416-68.416h615.808c37.568 0 68.352 30.848 68.352 68.416v398.464z"
        fill={color}
        p-id="27864"
      ></path>
      <path
        d="M309.312 432m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
        fill={color}
        p-id="27865"
      ></path>
      <path
        d="M510.656 432m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
        fill={color}
        p-id="27866"
      ></path>
      <path
        d="M713.344 432m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
        fill={color}
        p-id="27867"
      ></path>
    </svg>
  );
}
