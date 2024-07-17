'use client';

import DotsPagination from '@components/DotsPagination';

import useFunnel from '@hooks/useFunnel';

import { funnel, title } from 'src/app/(route)/(auth)/signup/constant/funnel';

import CustomizeMonster from './components/CustomizeMonster';
import MonsterLayout from './components/layout/MonsterLayout';
import SelectEmotion from './components/SelectEmotion';
import SelectStress from './components/SelectStress';
import WriteStory from './components/WriteStory';
import MonsterInfoProvider from './context/monster.context';
import MonsterName from '../../component/MosterName';

type ProducePage = Omit<typeof funnel, 'nickname'>[number];
type ProducePageProps = React.PropsWithChildren<{
  name: ProducePage;
}>;

function MonsterProducePage() {
  const { Funnel, step, setStep } = useFunnel<ProducePage, ProducePageProps>(
    'emotion',
  );

  const [, ...orderItem] = funnel;

  return (
    <MonsterInfoProvider>
      <DotsPagination
        activeId={step}
        className="absolute right-0 ml-auto mt-[28px] w-full px-20"
        orderItems={orderItem.map((id) => ({ id }))}
      />

      <Funnel>
        {/* 감정 설정 */}
        <Funnel.Step name="emotion">
          <MonsterLayout title={title.emotion} goNext={() => setStep('stress')}>
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
    </MonsterInfoProvider>
  );
}

export default MonsterProducePage;
