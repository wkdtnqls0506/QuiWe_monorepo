import { FaTwitter, FaGithub } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';

const ICON_SIZE = 'text-2xl md:text-3xl';
export const SOCIAL_LINKS = [
  { href: 'https://twitter.com', icon: <FaTwitter className={ICON_SIZE} /> },
  { href: 'https://github.com/wkdtnqls0506/QuiWe_monorepo', icon: <FaGithub className={ICON_SIZE} /> },
  { href: 'mailto:wkdtnqls0506@naver.com', icon: <IoMdMail className={ICON_SIZE} /> }
];
