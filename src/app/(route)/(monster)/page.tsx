import HydrateWithAuth from '@providers/HydrationAuthBoudary';

import { getRefMonster } from '@api/monster';

import MessageBottomSheet from './component/Message/MessageBottomSheet';

async function Home() {
  const messageQueries = [
    {
      queryKey: ['my-monster'],
      queryFn: getRefMonster,
    },
  ];

  return (
    <div>
      <HydrateWithAuth queries={messageQueries}>
        <MessageBottomSheet />
      </HydrateWithAuth>
    </div>
  );
}

export default Home;
