import type { ReactNode } from "react";
import { Link } from "react-router";

type PrimaryBtnProps = {
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  children: ReactNode;
  className?: string;
  isLink?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
};

export default function PrimaryBtn({
  onClick,
  children,
  className,
  isLink = false,
  href,
  type = "button",
}: PrimaryBtnProps): ReactNode {
  const classname: string =
    "w-fit h-fit px-3 py-2 text-white relative before:w-full before:h-full before:absolute before:left-0 before:top-0 before:bg-blue before:-z-30 after:w-0 after:h-full after:bg-black after:absolute after:left-0 after:top-0 after:-z-10 after:transition-all after:duration-200 after:ease-in-out hover:after:w-full hover:after:left-0 hover:after:top-0 rounded-[4px] overflow-hidden cursor-pointer" +
    (className ? ` ${className}` : "");

  if (isLink && href) {
    return (
      <Link to={href} className={classname} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classname} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
