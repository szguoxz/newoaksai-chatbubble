import React, { CSSProperties } from 'react';
import { SyncOutlined } from '@ant-design/icons';

interface HeaderProps {
  headerStyle?: CSSProperties;
  avatar?: string;
  title?: string;
  extra?: React.ReactNode;
  onRefresh?: () => void;
}

export default function Header({
  headerStyle,
  avatar,
  title,
  extra,
  onRefresh
}: HeaderProps) {
  return (
    <>
      <div
        style={headerStyle}
        className="flex justify-between items-center px-4 py-1 bg-transparent text-white h-14" // dark:bg-blue-800
      >
        <div className="flex items-center">
          {avatar && (
            <img
              className="object-cover w-9 h-9 rounded-full mr-1"
              src={avatar} // "https://picsum.photos/100/100"
            />
          )}
          <div className="px-2 text-lg font-bold">{title}</div>
        </div>
        <div className="flex flex-row gap-4">
          <SyncOutlined className="text-xl" onClick={onRefresh} />
          {extra}
        </div>
      </div>
      <div className="border-b dark:border-gray-700"></div>
    </>
  );
}
