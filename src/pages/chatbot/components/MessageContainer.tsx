import { HTMLAttributes, LegacyRef, forwardRef } from 'react';

function MessageContainer(
  { className, ...props }: HTMLAttributes<HTMLDivElement>,
  ref: LegacyRef<HTMLDivElement>
) {
  return (
    <div
      {...props}
      ref={ref}
      className="flex flex-col flex-1 overflow-y-auto overscroll-none px-4 relative"
    />
  );
}

export default forwardRef(MessageContainer);
