import chain from './app/middlewares/chain';
import withAuthentification from './app/middlewares/factory/withAuthentication';
import withSignUpHandle from './app/middlewares/factory/withSignUpHandle';

const middlewares = [withAuthentification, withSignUpHandle];

export default chain(middlewares);

export const config = {
  matcher: ['/signup', '/signin', '/'],
};
