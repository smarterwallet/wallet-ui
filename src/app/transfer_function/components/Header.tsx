import { ReactNode, FC } from "react";
import { useRouter } from "next/navigation";
import { RoundHistorySvg } from "@/components/Icons/RoundHistorySvg";
import Link from "next/link";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  leftBtn?: ReactNode;
}
const Header: FC<HeaderProps> = (props) => {
  const { title, showBack } = props;
  const router = useRouter();
  function handleBack() {
    router.back();
  };
 
  return (
    <div className="p-6 flex items-center">
      {showBack ? (
        <img
          onClick={handleBack}
          src="/imgs/back.png"
          alt=""
          className="cursor-pointer h-3 w-2"
        />
      ) : null}
      <div className="text-white font-bold text-center flex-1">{title}</div>
      <Link href="/transfer">
        <RoundHistorySvg />
      </Link>
    </div>
  );
};
export default Header;
