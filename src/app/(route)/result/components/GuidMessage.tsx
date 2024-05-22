import { motion } from 'framer-motion';

export default function GuidMessage() {
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  return (
    <motion.article
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
      className="text-center"
    >
      <motion.p
        className="label-1-regular mb-16 text-cool-neutral-90A"
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible,
        }}
      >
        짜잔 완성되었어요!
      </motion.p>
      <motion.h3
        className="heading-1-semibold text-cool-neutral-99"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible,
        }}
      >
        나만의 퇴사몬을
        <br />
        친구들에게 공유해보세요
      </motion.h3>
    </motion.article>
  );
}
