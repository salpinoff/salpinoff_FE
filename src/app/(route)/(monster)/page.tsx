import HydrateWithAuth from '@providers/HydrationAuthBoudary';

import MONSTER_APIS from '@api/monster';

import MessageBottomSheet from './component/Message/MessageBottomSheet';

async function Home() {
  const messageQueries = [
    {
      queryKey: ['my-monster'],
      queryFn: MONSTER_APIS.getRefMonster,
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
