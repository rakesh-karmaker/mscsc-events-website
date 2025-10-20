import type { ReactNode } from "react";
import { BiSolidConversation } from "react-icons/bi";
import {
  FaFacebook,
  FaGlobeAsia,
  FaInstagram,
  FaPalette,
  FaPhoneAlt,
  FaPuzzlePiece,
} from "react-icons/fa";
import { FaDivide, FaEnvelope, FaRobot } from "react-icons/fa6";
import { GiChessQueen } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import { IoMdRocket } from "react-icons/io";
import { LiaAtomSolid } from "react-icons/lia";
import { TbMath } from "react-icons/tb";

type IconProps = {
  iconName: string;
  className?: string;
};

export default function Icon({ iconName, className }: IconProps): ReactNode {
  const icons: { [key: string]: ReactNode } = {
    // social media icons
    facebook: <FaFacebook className={className} />,
    instagram: <FaInstagram className={className} />,
    email: <FaEnvelope className={className} />,
    phone: <FaPhoneAlt className={className} />,

    // general icons
    division: <FaDivide className={className} />,
    rocket: <IoMdRocket className={className} />,
    chess: <GiChessQueen className={className} />,
    atom: <LiaAtomSolid className={className} />,
    robot: <FaRobot className={className} />,
    bulb: <HiLightBulb className={className} />,
    globe: <FaGlobeAsia className={className} />,
    paint: <FaPalette className={className} />,
    math: <TbMath className={className} />,
    puzzle: <FaPuzzlePiece className={className} />,
    debate: <BiSolidConversation className={className} />,
  };

  return icons[iconName] || null;
}
