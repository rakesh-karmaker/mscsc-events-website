import type { ReactNode } from "react";

import BiSolidConversation from "~icons/bx/bxs-conversation";

import FaChalkboardTeacher from "~icons/fa-solid/chalkboard-teacher";
import FaFacebook from "~icons/fa/facebook";
import FaGlobeAsia from "~icons/fa-solid/globe-asia";
import FaInstagram from "~icons/fa/instagram";
import FaPalette from "~icons/fa-solid/palette";
import FaPhoneAlt from "~icons/fa/phone";
import FaPuzzlePiece from "~icons/fa/puzzle-piece";

import FaClock from "~icons/fa6-regular/clock";
import FaEnvelope from "~icons/fa6-regular/envelope";
import FaRobot from "~icons/fa6-solid/robot";
import FaStar from "~icons/fa6-solid/star";

import GiChessQueen from "~icons/game-icons/chess-queen";
import HiLightBulb from "~icons/heroicons-solid/light-bulb";
import IoMdRocket from "~icons/ion/md-rocket";
import LiaAtomSolid from "~icons/la/atom";
import LuDivide from "~icons/lucide/divide";
import TbMath from "~icons/tabler/math";
import MdGames from "~icons/ic/baseline-games";

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
    division: <LuDivide className={className} />,
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
    star: <FaStar className={className} />,
    games: <MdGames className={className} />,
    workshops: <FaChalkboardTeacher className={className} />,
    clock: <FaClock className={className} />,
  };

  return icons[iconName] || null;
}
