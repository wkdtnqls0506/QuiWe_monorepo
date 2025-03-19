import { HOW_TO_USE_DESCRIPTIONS } from '@/constants/homeDescriptions';
import { motion } from 'framer-motion';

const HowToUse = () => {
  return (
    <section className='w-full py-24 px-6 bg-[#F9FAFB]'>
      <h2 className='text-5xl font-bold text-center'>QUIWE는 이렇게 사용해요</h2>
      <div className='mt-16 flex flex-wrap justify-center gap-10'>
        {HOW_TO_USE_DESCRIPTIONS.map((description, index) => (
          <motion.div
            key={description.id}
            className='p-8 bg-white text-[#121212] border border-gray-200 rounded-lg shadow-md text-center text-2xl font-semibold hover:scale-105 hover:shadow-lg transition'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            {description.step}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowToUse;
