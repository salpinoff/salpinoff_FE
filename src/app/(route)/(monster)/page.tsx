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
    <section>
      <HydrateWithAuth queries={messageQueries}>
        <MainHeader />
        <div className="flex h-[calc(100vh-48px)] w-screen px-32">
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
