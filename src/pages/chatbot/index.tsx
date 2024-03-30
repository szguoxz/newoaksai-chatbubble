import { useState, useRef } from "react";
import Header from "./components/Header";
import MessageContainer from "./components/MessageContainer";
import CommonExpress from "./components/CommonExpress";
import InputToolbar from "./components/InputToolbar";
import MessageBubble, { Message } from "./components/MessageBubble";
import {
  CloseOutlined,
  ExpandOutlined,
  CompressOutlined,
} from "@ant-design/icons";
import invertBgColorToTextColor from "@/utils/invertBgColorToTextColor";

export default function Chatbot() {
  const urlParams = useRef(new URLSearchParams(window.location.search));
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIframeMax, setIsIframeMax] = useState(false);
  const [welcomeMessage] = useState([
    "Hi this is your AI assistant! What can I help you with?",
  ]);
  const [CommonMsgs] = useState([
    "Here are the FAQs?",
    "Develop your own chatbot today.",
  ]);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 0,
      messageId: 10001,
      content: "Hello",
      status: "success",
    },
    {
      type: 1,
      messageId: 10002,
      content: "Hello! How can I assist you today?",
      status: "success",
    },
  ]);

  return (
    <div
      style={{
        fontFamily: "'Noto Sans', sans-serif",
      }}
      className="h-screen overflow-hidden bg-white flex flex-col dark:bg-black"
    >
      <Header
        headerStyle={{
          backgroundColor: "#6f44fc",
          color: "#fff",
        }}
        title={"Your AI assistant"}
        avatar={"https://picsum.photos/id/1/64/64"}
        onRefresh={() => {}}
        extra={
          urlParams.current.has("close") && (
            <>
              {isIframeMax ? (
                <CompressOutlined
                  className="text-xl"
                  onClick={() => {
                    window?.parent?.postMessage("iframe-min", "*");
                    setIsIframeMax(false);
                  }}
                />
              ) : (
                <ExpandOutlined
                  className="text-xl"
                  onClick={() => {
                    window?.parent?.postMessage("iframe-max", "*");
                    setIsIframeMax(true);
                  }}
                />
              )}
              <CloseOutlined
                className="text-xl"
                onClick={() => {
                  window?.parent?.postMessage("close", "*");
                }}
              />
            </>
          )
        }
      />
      <MessageContainer ref={containerRef}>
        {welcomeMessage.map((item: string, index: number) => (
          <MessageBubble key={index} messageType={1} text={item} />
        ))}
        <CommonExpress
          data={CommonMsgs}
          color={"#6f44fc"}
          onClick={(str) => {}}
        />
        {messages.map((item, index) => (
          <MessageBubble
            key={index}
            textColor={item.type === 0 ? invertBgColorToTextColor("") : "#fff"}
            status={item.status}
            bgColor={"#6f44fc"}
            messageType={item.type}
            text={item.content}
            loading={item.loading}
          />
        ))}
      </MessageContainer>
      <InputToolbar
        placeholder={""}
        color={"#6f44fc"}
        loading={false}
        disabled={false}
        onSend={(v) => console.log(v)}
      />
      <div className="flex justify-end -mt-4 px-4">
        <a
          target="_blank"
          href="https://www.newoaks.ai"
          className="text-xs text-gray-400 py-1 hover:text-blue-500 cursor-pointer transition-all"
        >
          Powered by NewOaks AI
        </a>
      </div>
    </div>
  );
}
