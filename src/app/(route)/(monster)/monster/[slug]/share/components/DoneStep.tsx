import Image from 'next/image';

import { motion } from 'framer-motion';

import Button from '@components/common/Button';

type DoneStepProps = {
  goNext: () => void;
};

export default function DoneStep({ goNext }: DoneStepProps) {
  // [TODO] 공통 인터렉션 상수 분리
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  return (
    <section className="flex h-full w-full flex-col justify-between gap-[28px] p-[20px]">
      <motion.div
        className="m-auto"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div
          className="mx-auto mb-20 w-max"
          animate={{
            rotateY: 180,
            transition: {
              duration: 0.6,
            },
          }}
          variants={{
            hidden: { opacity: 0, y: -24 },
            visible,
          }}
        >
          <Image
            src="/images/heart_active.webp"
            width={108}
            height={108}
            alt="하트"
          />
        </motion.div>
        <motion.div>
          <motion.span
            className="heading-1-semibold block text-center text-common-100"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible,
            }}
          >
            친구에게 나의 응원이
          </motion.span>
          <motion.span
            className="heading-1-semibold block text-center text-common-100"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible,
            }}
          >
            전송 되었어요!
          </motion.span>
        </motion.div>
      </motion.div>
      <motion.nav
        className="w-full"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { ...visible, transition: { duration: 0.8 } },
        }}
      >
        <Button
          id="btn_subgoservice"
          className="w-full grow"
          variant="primary"
          size="large"
          onClick={goNext}
        >
          나도 퇴사몬 만들어보기
        </Button>
      </motion.nav>
    </section>
  );
}
