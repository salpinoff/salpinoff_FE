import CsrfTokenInitializer from './components/csrf-initializer';
import KakaoLoginBtn from './components/kakao-login-btn';

function SignIn() {
  return (
    <div className="flex w-full flex-1 flex-col justify-end p-20">
      <div>
        <CsrfTokenInitializer>
          <KakaoLoginBtn />
        </CsrfTokenInitializer>
      </div>
    </div>
  );
}

export default SignIn;
