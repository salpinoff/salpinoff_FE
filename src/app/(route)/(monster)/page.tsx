import { ErrorBoundary } from 'react-error-boundary';

import HydrateWithAuth from '@providers/HydrationAuthBoudary';

import ScreenView from '@components/logging/ScreenView';

import { getRefMonster } from '@api/monster';
import MonsterQueryFactory from '@api/monster/query/factory';

import RefMonsterFlipCard from './component/cards/RefMonsterFlipCard';
import MainHeader from './component/MainHeader';
import MessageBottomSheet from './component/Message/MessageBottomSheet';

async function Home() {
  const messageQueries = [
    {
      ...MonsterQueryFactory.reference,
      queryFn: getRefMonster,
    },
  ];

  return (
    <ScreenView name="main">
      <section className="bg-gradient h-full w-full pb-[163px]">
        <MainHeader />
        <HydrateWithAuth queries={messageQueries}>
          <div className="flex h-[calc(100%-48px)] w-full">
            {/* [TODO] ErrorBoundary 개선 */}
            <ErrorBoundary fallback={<>error</>}>
              <RefMonsterFlipCard />
            </ErrorBoundary>
          </div>
          <MessageBottomSheet />
        </HydrateWithAuth>
      </section>
    </ScreenView>
  );
}

export default Home;
