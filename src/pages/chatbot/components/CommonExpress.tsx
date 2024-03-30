interface CommonExpressionsProps {
  onClick: (str: string) => void;
  data?: Array<string>;
  color?: string;
}

export default function CommonExpressions({
  data = [],
  onClick,
  color = '#828fff'
}: CommonExpressionsProps) {
  return (
    <div className="flex flex-col items-end justify-end flex-1">
      {/* absolute bottom-0 right-0 */}
      {data.map((item, index) => (
        <p
          key={index}
          style={{
            borderColor: color,
            color
          }}
          className="border rounded-lg rounded-br-none px-2 py-[6px] text-[15px] leading-normal my-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-900"
          onClick={() => onClick && onClick(item)}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
