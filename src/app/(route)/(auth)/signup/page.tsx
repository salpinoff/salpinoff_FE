'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import PageNations from '@components/PageNations';

import useFunnel from 'src/app/hooks/useFunnel';

import MakeNickName from './components/MakeNickName';
import { funnel, title } from './constant/funnel';
import { UserInfoProvider } from './context/userInfo.context';
import SelectEmotion from '../../(monster)/component/SelectEmotion';
import SelectStress from '../../(monster)/component/SelectStress';
import SignUpLayout from '../../(monster)/component/SignUpLayout';

const WriteStory = dynamic(
  () => import('../../(monster)/component/WriteStory'),
);
const MonsterName = dynamic(
  () => import('../../(monster)/component/MosterName'),
);

function SignUp() {
  const { replace } = useRouter();
  const { Funnel, setStep, step } = useFunnel('nickname');

  const orderItem = funnel.map((id) => ({ id }));

  return (
    <UserInfoProvider>
      <PageNations
        activeId={step}
        className="absolute right-0 mx-20 mt-[28px] w-full"
        orderItems={orderItem}
      />

      <Funnel>
        <Funnel.Step name="nickname">
          <SignUpLayout
            title={title.nickname}
            goNext={() => setStep('emotion')}
          >
            <MakeNickName />
          </SignUpLayout>
        </Funnel.Step>

        <Funnel.Step name="emotion">
          <SignUpLayout
            title={title.emotion}
            goPrev={() => setStep('nickname')}
            goNext={() => setStep('stress')}
          >
            <SelectEmotion />
          </SignUpLayout>
        </Funnel.Step>

        <Funnel.Step name="stress">
          <SignUpLayout
            title={title.stress}
            goPrev={() => setStep('emotion')}
            goNext={() => setStep('story')}
          >
            <SelectStress />
          </SignUpLayout>
        </Funnel.Step>

        <Funnel.Step name="story">
          <SignUpLayout
            title={title.story}
            goPrev={() => setStep('stress')}
            goNext={() => setStep('monstername')}
          >
            <WriteStory />
          </SignUpLayout>
        </Funnel.Step>

        <Funnel.Step name="monstername">
          <SignUpLayout
            className=" from-29% to-78% bg-gradient-to-b from-[#0F0F10] to-[#253047]"
            goPrev={() => setStep('story')}
            goNext={() => setStep('monsterstyle')}
          >
            <MonsterName />
          </SignUpLayout>
        </Funnel.Step>

        <Funnel.Step name="monsterstyle">
          <SignUpLayout
            className=" from-29% to-78% bg-gradient-to-b from-[#0F0F10] to-[#253047]"
            goPrev={() => setStep('monstername')}
            goNext={() => replace('/result')}
          >
            {/* 몬스터 꾸미기 */}
          </SignUpLayout>
        </Funnel.Step>
      </Funnel>
    </UserInfoProvider>
  );
}

export default SignUp;
