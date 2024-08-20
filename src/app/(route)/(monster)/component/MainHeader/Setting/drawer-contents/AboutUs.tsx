import { LazyMotion, AnimatePresence, domAnimation, m } from 'framer-motion';

import Text from '@components/common/Text';
import Logo from '@components/Logo';

import { fadeIn } from '@constant/animation';

const memebers = [
  {
    name: '신수민',
    role: 'Marketer',
  },
  {
    name: '유기훈',
    role: 'BE Developer',
  },
  {
    name: '윤석규',
    role: 'FE Developer',
  },
  {
    name: '이명은',
    role: 'PO',
  },
  {
    name: '임아영',
    role: 'FE Developer',
  },
  {
    name: '조미현',
    role: 'Product Designer',
  },
] as const;

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      when: 'afterChildren',
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

type MemberCardProps = Record<keyof (typeof memebers)[number], string>;

function MemberCard({ name, role }: MemberCardProps) {
  return (
    <div className="rounded-12 bg-cool-neutral-7 px-20 py-16">
      <Text variant="body-2" weight="medium" color="normal" className="mb-4">
        {name}
      </Text>
      <Text variant="label-2" color="alternative">
        {role}
      </Text>
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="flex h-full max-h-full w-full flex-col p-20">
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          <m.div
            className="my-auto my-auto w-full"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <Text
              className="mb-20 animate-enter"
              component="h3"
              variant="heading-2"
              weight="semibold"
              color="alternative"
              align="center"
            >
              Team Salpin-off
            </Text>
            <m.div className="grid grid-cols-2 gap-12" variants={fadeIn}>
              {memebers.map(({ name, role }) => (
                <MemberCard key={`${name}_${role}`} name={name} role={role} />
              ))}
            </m.div>
          </m.div>
        </AnimatePresence>
      </LazyMotion>
      <div className="mx-auto flex flex-col items-center self-end">
        <Logo className="mb-12 h-[21px] w-[64px] text-cool-neutral-23" />
        <Text
          className="mb-2"
          component="span"
          variant="caption-1"
          color="assistive"
        >
          Copyright 2024. Salpin-off. Allrights reserved
        </Text>
        <Text component="span" variant="caption-1" color="assistive">
          문의 | salpinoff@gmail.com
        </Text>
      </div>
    </div>
  );
}
