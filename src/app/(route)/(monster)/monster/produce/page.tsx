'use client';

import { useState } from 'react';

import DotsPagination from '@components/DotsPagination';
import ScreenView from '@components/logging/ScreenView';

import useFunnel from '@hooks/useFunnel';

import CustomizeMonster from './components/CustomizeMonster';
import MonsterLayout from './components/layout/MonsterLayout';
import MonsterName from './components/MosterName';
import SelectEmotion from './components/SelectEmotion';
import SelectStress from './components/SelectStress';
import WriteStory from './components/WriteStory';
import { funnel, title } from './constant/funnel';
import MonsterInfoProvider from './context/monster.context';

type ProducePage = Omit<typeof funnel, 'nickname'>[number];
type ProducePageProps = React.PropsWithChildren<{
  name: ProducePage;
}>;

function MonsterProducePage() {
  const { Funnel, step, setStep } = useFunnel<ProducePage, ProducePageProps>(
    'emotion',
  );

  const [dir, setDir] = useState(1);

  const setStepAndDirection = (nextStep: typeof step, nextDir: 1 | -1 = 1) => {
    setDir(nextDir);
    setStep(nextStep);
  };

  return (
    <MonsterInfoProvider>
      <DotsPagination
        activeId={step}
        className="absolute right-0 ml-auto mt-[28px] w-full px-20"
        orderItems={funnel.map((id) => ({ id }))}
        dir={Math.sign(dir) ? 'forward' : 'backward'}
      />

      <Funnel>
        {/* 감정 설정 */}
        <Funnel.Step name="emotion">
          <MonsterLayout
            title={title.emotion}
            control={['다음으로']}
            goNext={() => setStepAndDirection('stress')}
          >
            <ScreenView name="make_1">
              <SelectEmotion />
            </ScreenView>
          </MonsterLayout>
        </Funnel.Step>

        {/* 스트레스 수치 설정 */}
        <Funnel.Step name="stress">
          <MonsterLayout
            title={title.stress}
            goPrev={() => setStepAndDirection('emotion', -1)}
            goNext={() => setStepAndDirection('story')}
          >
            <ScreenView name="make_2">
              <SelectStress />
            </ScreenView>
          </MonsterLayout>
        </Funnel.Step>

        {/* 세부 상황 설정 */}
        <Funnel.Step name="story">
          <MonsterLayout
            title={title.story}
            goPrev={() => setStepAndDirection('stress', -1)}
            goNext={() => setStepAndDirection('monstername')}
          >
            <ScreenView name="make_3">
              <WriteStory />
            </ScreenView>
          </MonsterLayout>
        </Funnel.Step>

        {/* 몬스터 닉네임 설정 */}
        <Funnel.Step name="monstername">
          <MonsterLayout
            className="bg-gradient"
            goPrev={() => setStepAndDirection('story', -1)}
            goNext={() => setStepAndDirection('monsterstyle')}
          >
            <ScreenView name="make_4">
              <MonsterName />
            </ScreenView>
          </MonsterLayout>
        </Funnel.Step>

        {/* 몬스터 스타일 설정 */}
        <Funnel.Step name="monsterstyle">
          <MonsterLayout
            className="bg-gradient"
            goPrev={() => setStepAndDirection('monstername', -1)}
            goNext={() => {}}
          >
            <ScreenView name="make_5">
              <CustomizeMonster />
            </ScreenView>
          </MonsterLayout>
        </Funnel.Step>
      </Funnel>
    </MonsterInfoProvider>
  );
}

export default MonsterProducePage;
