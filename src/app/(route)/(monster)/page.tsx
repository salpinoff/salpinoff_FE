import { ErrorBoundary } from 'react-error-boundary';

import HydrateWithAuth from '@providers/HydrationAuthBoudary';

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
    <section className="from-29% to-78% bg-gradient-to-b from-[#0F0F10] to-[#253047]">
      <MainHeader />
      <HydrateWithAuth queries={messageQueries}>
        <div className="flex h-[calc(100dvh-48px)] w-screen pb-[163px]">
          {/* [TODO] ErrorBoundary 개선 */}
          <ErrorBoundary fallback={<>error</>}>
            <RefMonsterFlipCard />
          </ErrorBoundary>
        </div>
        <MessageBottomSheet />
      </HydrateWithAuth>
    </section>
  );
}

export default Home;
