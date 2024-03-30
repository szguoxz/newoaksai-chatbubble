import { useState } from 'react';
import SendButton from './SendButton';
import MessageTextArea from './MessageTextArea';
import clsx from 'clsx';

interface InputToolbarProps {
  placeholder: string;
  color: string;
  loading: boolean;
  disabled: boolean;
  onSend: (v: string) => void;
}

export default function InputToolbar({
  placeholder,
  color,
  loading,
  disabled,
  onSend
}: InputToolbarProps) {
  const [value, setValue] = useState('');

  return (
    <div className="p-4 pt-2">
      <div
        className={clsx(
          'pl-2 py-1 border rounded-md flex items-center dark:bg-slate-800 dark:border-slate-600 dark:text-white',
          disabled && 'bg-gray-100'
        )}
      >
        <MessageTextArea
          placeholder={placeholder}
          loading={loading}
          disabled={disabled}
          value={value}
          onChange={setValue}
          onPressEnter={() => {
            if (loading) {
              return null;
            }
            onSend(value);
            setValue('');
          }}
        />
        <div className="self-end">
          <SendButton
            style={{ color }}
            disabled={disabled}
            onSend={() => {
              if (loading) {
                return null;
              }
              onSend(value);
              setValue('');
            }}
          />
        </div>
      </div>
    </div>
  );
}
