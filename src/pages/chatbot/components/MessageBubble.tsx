import { ReactNode, PropsWithChildren } from "react";
import {
  CustomerServiceOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Markdown from "./Markdown";
import clsx from "clsx";

export interface Message {
  content: string;
  type: 0 | 1 | 2 | 3; // 0 表示用户消息;  1 表示AI回复消息;  2 表示人工回复消息  3 表示系统消息
  messageId?: number;
  loading?: true;
  status?: "success" | "error";
}

interface MessageBubbleProps {
  text: string;
  messageType: Message["type"];
  loading?: boolean;
  status?: Message["status"];
  textColor?: string;
  bgColor?: string;
  footer?: ReactNode;
}

export default function MessageBubble({
  bgColor,
  textColor,
  text,
  messageType = 1,
  loading,
  status,
  footer,
}: MessageBubbleProps) {
  const isUserMsg = messageType === 0;
  const userMsgStyle = isUserMsg
    ? {
        backgroundColor: bgColor || "#3b81f6",
        color: textColor || "#fff",
      }
    : undefined;

  if (!loading && !text) {
    return null;
  }

  if (messageType === 3) {
    return <SystemMessage text={text} />;
  }

  return (
    <div
      className="py-2 flex gap-2"
      style={{ justifyContent: isUserMsg ? "flex-end" : "flex-start" }}
    >
      <MessageStatus status={status} direction={isUserMsg ? "left" : "right"}>
        <div
          style={userMsgStyle}
          className={clsx(
            "max-w-[86%] px-3 py-2 rounded-xl leading-normal text-[15px] overflow-hidden",
            isUserMsg && "rounded-br-none",
            messageType === 1 &&
              "rounded-bl-none text-black bg-gray-200 dark:bg-slate-800 dark:text-white",
            messageType === 2 &&
              "rounded-bl-none text-slate-800 bg-slate-200 dark:bg-slate-800 dark:text-white"
          )}
        >
          {!loading && isUserMsg ? (
            <Message text={text}></Message>
          ) : (
            <Markdown content={text} />
          )}
          {footer}
          {messageType === 2 && (
            <p className="select-none flex justify-end text-xs scale-90 origin-right text-slate-400">
              <CustomerServiceOutlined />
              &nbsp;&nbsp;Reply by human
            </p>
          )}
        </div>
      </MessageStatus>
    </div>
  );
}

function Message({ text }: { text: MessageBubbleProps["text"] }) {
  return <div className="break-words">{text}</div>;
}

function SystemMessage({ text }: { text: string }) {
  return (
    <div className="py-2 flex justify-center px-14">
      <p className="bg-gray-100 dark:bg-gray-700 dark:text-slate-400 text-slate-500 text-xs text-center px-3 py-1 rounded-xl">
        {text}
      </p>
    </div>
  );
}

function MessageStatus({
  direction,
  status,
  children,
}: PropsWithChildren<{
  status: Message["status"];
  direction: "left" | "right";
}>) {
  if (!status || status === "success") {
    return children;
  }
  return (
    <>
      {direction === "left" && (
        <ExclamationCircleFilled className="text-red-500" />
      )}
      {children}
      {direction === "right" && (
        <ExclamationCircleFilled className="text-red-500" />
      )}
    </>
  );
}
