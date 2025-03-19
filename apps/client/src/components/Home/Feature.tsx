'use client';

import { FEATURE_DESCRIPTIONS } from '@/constants/homeDescriptions';
import { motion } from 'framer-motion';

const Feature = () => {
  return (
    <section className='w-full py-24 px-6'>
      <h2 className='text-5xl font-bold text-center'>QUIWE의 핵심 기능</h2>
      <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-12'>
        {FEATURE_DESCRIPTIONS.map((feature, index) => (
          <motion.div
            key={feature.id}
            className='p-10 bg-[#F9FAFB] rounded-xl shadow-md text-center transform hover:scale-105 hover:shadow-lg transition'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <h3 className='text-3xl font-semibold'>{feature.title}</h3>
            <p className='text-gray-500 mt-4'>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
