'use client';

import dynamic from 'next/dynamic';

import useFunnel from 'src/app/hooks/useFunnel';

import MakeNickName from './components/MakeNickName';
import SelectEmotion from './components/SelectEmotion';
import SignUpLayout from './components/SignUpLayout';
import { title } from './constant/funnel';
import { UserInfoProvider } from './context/userInfo.context';

const SelectStress = dynamic(() => import('./components/SelectStress'));
const WriteStory = dynamic(() => import('./components/WriteStory'));

function SignUp() {
  const { Funnel, setStep } = useFunnel('nickname');

  return (
    <UserInfoProvider>
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
      </Funnel>
    </UserInfoProvider>
  );
}

export default SignUp;
