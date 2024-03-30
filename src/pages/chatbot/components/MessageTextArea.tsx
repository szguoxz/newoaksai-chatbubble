import { useRef } from "react";
import { useEventListener, useUpdateEffect } from "ahooks";

interface MessageTextProps {
  placeholder: string;
  loading: boolean;
  disabled: boolean;
  value: string;
  onChange: (v: string) => void;
  onPressEnter?: (v: string) => void;
}

export default function MessageText({
  placeholder,
  loading,
  disabled,
  value,
  onChange,
  onPressEnter,
}: MessageTextProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useUpdateEffect(() => {
    !loading && textareaRef.current?.focus();
  }, [loading]);

  useEventListener(
    "input",
    (e: any) => {
      const lineHeight = parseInt(
        getComputedStyle(textareaRef.current as any).lineHeight
      );
      const maxHeight = lineHeight * 5;
      e.target.style.height = lineHeight + "px";
      const scrollHeight = e.target.scrollHeight;
      e.target.style.height =
        scrollHeight < maxHeight ? scrollHeight + "px" : maxHeight + "px";
    },
    { target: textareaRef }
  );

  const defaultPlaceholder =
    navigator.language === "zh-CN"
      ? "按下 Ctrl + Enter 换行，按下 Enter 发送消息"
      : "Ctrl + Enter line feed, Enter send message; Please type a message.";

  return (
    <textarea
      ref={textareaRef}
      // autoFocus
      placeholder={placeholder || defaultPlaceholder}
      className="chatbot-textarea outline-none w-full text-base overscroll-none flex-1 break-words whitespace-normal bg-transparent"
      rows={1}
      style={{ resize: "none" }}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(event) => {
        if (event.ctrlKey && event.key === "Enter") {
          event.preventDefault();
          const cursorIndex = (event.target as HTMLTextAreaElement)
            .selectionStart;
          const str =
            value.substring(0, cursorIndex) +
            "\n" +
            value.substring(cursorIndex);
          onChange(str);
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = cursorIndex + 1;
              textareaRef.current.selectionEnd = cursorIndex + 1;
            }
          }, 0);
          return;
        }
        if (event.key === "Enter") {
          event.preventDefault();
          onPressEnter && onPressEnter(value);
        }
      }}
    />
  );
}
