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
        <button className={`p-4 mt-5 ${color}`} onClick={() => callBack()}>
            {icon}
            {text}
        </button>
    );
}
