interface SocialButtonProps {
  callBack: () => void;
  text: string;
  icon: any;
  color?: string;
}

export default function SocialButton({
  callBack,
  text,
  color,
  icon,
}: SocialButtonProps) {
  return (
    <button
      type="button"
      className={`p-3 rounded-md w-[180px] border-[1px] border-gray-250 border-solid  flex items-center justify-center ${color}`}
      onClick={() => callBack()}
    >
      {icon}
      <div className="mx-1"></div>
      {text}
    </button>
  );
}
