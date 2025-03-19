import { SOCIAL_LINKS } from '@/constants/socialLinks';

const Footer = () => {
  return (
    <footer className='w-full bg-gray-100 text-gray-600 py-10 px-6 md:px-12'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center'>
        <div className='text-center md:text-left'>
          <h3 className='text-lg font-semibold text-gray-900'>© QUIWE</h3>
          <p className='mt-2 text-gray-500'>
            개발자를 위한 맞춤형 퀴즈 학습 플랫폼 <br />
            포트폴리오 기반 퀴즈를 통해 실력을 키워보세요.
          </p>
        </div>
        <div className='flex justify-center md:justify-end gap-6 mt-6 md:mt-0'>
          {SOCIAL_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-gray-900 transition'
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className='mt-10 text-center text-gray-400 text-sm border-t pt-6'>
        <p>© 2025 QUIWE</p>
      </div>
    </footer>
  );
};

export default Footer;
