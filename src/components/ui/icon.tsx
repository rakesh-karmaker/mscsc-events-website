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
import FaBrain from "~icons/fa6-solid/brain";
import FaPen from "~icons/fa6-solid/pen-fancy";
import FaIt from "~icons/fa6-solid/laptop-code";
import FaCube from "~icons/fa6-solid/cube";
import FaDna from "~icons/fa6-solid/dna";

import IcArticle from "~icons/ic/round-article";
import IcMovie from "~icons/ic/round-movie";
import IcSpell from "~icons/ic/round-spellcheck";
import IcAudio from "~icons/ic/round-spatial-audio-off";
import IcText from "~icons/ic/round-text-fields";
import GiChessQueen from "~icons/game-icons/chess-queen";
import HiLightBulb from "~icons/heroicons-solid/light-bulb";
import IoMdRocket from "~icons/ion/md-rocket";
import LiaAtomSolid from "~icons/la/atom";
import LuDivide from "~icons/lucide/divide";
import LuLanguages from "~icons/lucide/languages";
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
    article: <IcArticle className={className} />,
    atom: <LiaAtomSolid className={className} />,
    brain: <FaBrain className={className} />,
    bulb: <HiLightBulb className={className} />,
    chess: <GiChessQueen className={className} />,
    clock: <FaClock className={className} />,
    cube: <FaCube className={className} />,
    debate: <BiSolidConversation className={className} />,
    division: <LuDivide className={className} />,
    dna: <FaDna className={className} />,
    games: <MdGames className={className} />,
    globe: <FaGlobeAsia className={className} />,
    it: <FaIt className={className} />,
    language: <LuLanguages className={className} />,
    math: <TbMath className={className} />,
    movie: <IcMovie className={className} />,
    paint: <FaPalette className={className} />,
    pen: <FaPen className={className} />,
    puzzle: <FaPuzzlePiece className={className} />,
    robot: <FaRobot className={className} />,
    rocket: <IoMdRocket className={className} />,
    speech: <IcAudio className={className} />,
    spell: <IcSpell className={className} />,
    star: <FaStar className={className} />,
    text: <IcText className={className} />,
    workshops: <FaChalkboardTeacher className={className} />,
  };

  return icons[iconName] || null;
}
