import { CSSProperties } from 'react';
// import { SendOutlined } from '@ant-design/icons';
import clsx from 'clsx';

export default function SendMessage({
  disabled = false,
  onSend,
  style
}: {
  disabled: boolean;
  style?: CSSProperties;
  onSend: () => void;
}) {
  return (
    <div
      className={clsx(
        'cursor-pointer flex justify-center items-center rounded-md w-10 h-8',
        disabled && 'text-gray-400 cursor-not-allowed'
      )}
      style={style}
      onClick={!disabled ? onSend : undefined}
    >
      <SendIcon color={style?.color} disabled={disabled} />
      {/* <SendOutlined className="text-2xl flex items-center" /> */}
    </div>
  );
}

function SendIcon({
  color = 'rgba(0,0,0,0)',
  disabled
}: {
  color?: string;
  disabled: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4020"
      width="24"
      height="24"
    >
      <path
        d="M0 1024l106.496-474.112 588.8-36.864-588.8-39.936L0 0l1024 512z"
        fill={disabled ? '#9ca3af' : color}
        p-id="4021"
      ></path>
    </svg>
  );
}
