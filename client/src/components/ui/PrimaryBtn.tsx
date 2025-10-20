import type { ReactNode } from "react";
import { Link } from "react-router";

type PrimaryBtnProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  isLink?: boolean;
  href?: string;
};

export default function PrimaryBtn({
  onClick,
  children,
  className,
  isLink = false,
  href,
}: PrimaryBtnProps): ReactNode {
  const classname: string =
    "w-fit h-fit px-3 py-2 text-white relative before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-blue before:-z-30 after:w-0 after:h-full after:bg-black after:absolute after:left-0 after:top-0 after:-z-10 after:transition-all after:duration-200 after:ease-in-out hover:after:w-full hover:after:left-0 hover:after:top-0 rounded-[4px] overflow-hidden cursor-pointer" +
    (className ? ` ${className}` : "");

  if (isLink && href) {
    return (
      <Link to={href} className={classname}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classname} onClick={onClick}>
      {children}
    </button>
  );
}
