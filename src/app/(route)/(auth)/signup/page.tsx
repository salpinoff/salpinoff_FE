'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import DotsPagination from '@components/DotsPagination';

import useFunnel from '@hooks/useFunnel';

import MakeNickName from './components/MakeNickName';
import { funnel, title } from './constant/funnel';
import { UserInfoProvider } from './context/userInfo.context';
import CustomizeMonster from '../../(monster)/monster/produce/components/CustomizeMonster';
import MonsterLayout from '../../(monster)/monster/produce/components/layout/MonsterLayout';
import MonsterName from '../../(monster)/monster/produce/components/MosterName';
import SelectEmotion from '../../(monster)/monster/produce/components/SelectEmotion';
import SelectStress from '../../(monster)/monster/produce/components/SelectStress';
import WriteStory from '../../(monster)/monster/produce/components/WriteStory';

type SignUpPages = (typeof funnel)[number];
type SignUpFunnelProps = React.PropsWithChildren<{ name: SignUpPages }>;

function SignUp() {
  const searchParams = useSearchParams();

  const orderItem = funnel.map((id) => ({ id }));
  const code = Number(searchParams.get('code')) || 100;
  const defaultStep = code === 100 ? 'nickname' : 'emotion';

  const { Funnel, setStep, step } = useFunnel<SignUpPages, SignUpFunnelProps>(
    defaultStep,
  );

  /* /signup?step={step} */
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('step', step);
    window.history.pushState(null, '', `?${params.toString()}`);
  }, [step, searchParams]);

  /* 브라우저 뒤로가기 */
  useEffect(() => {
    const handleBeforePopState = () => {
      const { search } = document.location;
      const prev = new URLSearchParams(search)?.get('step');

      if (prev) {
        setStep(prev as SignUpPages);
      }
    };

    window.addEventListener('popstate', handleBeforePopState);
    return () => window.removeEventListener('popstate', handleBeforePopState);
  }, [setStep]);

  return (
    <UserInfoProvider>
      <DotsPagination
        activeId={step}
        className="absolute right-0 ml-auto mt-[28px] w-full px-20"
        orderItems={orderItem}
      />

      <Funnel>
        {/* 닉네임 설정 */}
        <Funnel.Step name="nickname">
          <MonsterLayout
            title={title.nickname}
            goNext={() => setStep('emotion')}
            control={['퇴사몬 만들기']}
          >
            <MakeNickName />
          </MonsterLayout>
        </Funnel.Step>

        {/* 감정 설정 */}
        <Funnel.Step name="emotion">
          <MonsterLayout
            title={title.emotion}
            goPrev={() => setStep('nickname')}
            goNext={() => setStep('stress')}
          >
            <SelectEmotion />
          </MonsterLayout>
        </Funnel.Step>

        {/* 스트레스 수치 설정 */}
        <Funnel.Step name="stress">
          <MonsterLayout
            title={title.stress}
            goPrev={() => setStep('emotion')}
            goNext={() => setStep('story')}
          >
            <SelectStress />
          </MonsterLayout>
        </Funnel.Step>

        {/* 세부 상황 설정 */}
        <Funnel.Step name="story">
          <MonsterLayout
            title={title.story}
            goPrev={() => setStep('stress')}
            goNext={() => setStep('monstername')}
          >
            <WriteStory />
          </MonsterLayout>
        </Funnel.Step>

        {/* 몬스터 닉네임 설정 */}
        <Funnel.Step name="monstername">
          <MonsterLayout
            className=" from-29% to-78% bg-gradient-to-b from-[#0F0F10] to-[#253047]"
            goPrev={() => setStep('story')}
            goNext={() => setStep('monsterstyle')}
          >
            <MonsterName />
          </MonsterLayout>
        </Funnel.Step>

        {/* 몬스터 스타일 설정 */}
        <Funnel.Step name="monsterstyle">
          <MonsterLayout
            className=" from-29% to-78% bg-gradient-to-b from-[#0F0F10] to-[#253047]"
            goPrev={() => setStep('monstername')}
            goNext={() => {}}
          >
            <CustomizeMonster />
          </MonsterLayout>
        </Funnel.Step>
      </Funnel>
    </UserInfoProvider>
  );
}

export default SignUp;
