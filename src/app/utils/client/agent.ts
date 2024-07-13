const ANDROID_REGEX = [/Android/i];
const IOS_REGEX = [/iPhone/i, /iPad/i, /iPod/i];

const MOBILE_REGEX = [
  ...ANDROID_REGEX,
  ...IOS_REGEX,
  /BlackBerry/i,
  /Windows Phone/i,
];

const userAgnet =
  typeof window !== 'undefined' ? window.navigator.userAgent : '';

const checkAgent = (regExpList: RegExp[]) =>
  regExpList.some((regExp) => regExp.test(userAgnet));

const isMobile = checkAgent(MOBILE_REGEX);
const isDeskTop = !isMobile;

const isIOS = checkAgent(IOS_REGEX);
const isAndroid = checkAgent(ANDROID_REGEX);

export { isMobile, isDeskTop, isIOS, isAndroid };
