import { useRouter } from 'next/navigation';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

type HiddenStoryTypes = React.PropsWithChildren<{
  owner?: boolean;
}>;

export default function HiddenStory({
  children,
  owner = false,
}: HiddenStoryTypes) {
  const { replace } = useRouter();

  const handleClick = () => {
    // [TODO] 내용 수정 페이지 경로로 변경
    replace('/');
  };

  return (
    <div className="flex h-full w-full select-none flex-col gap-20 rounded-[28px] bg-cool-neutral-17 p-20 shadow-5">
      <BaseText
        className="my-auto flex max-h-full overflow-y-auto text-center"
        component="p"
        variant="body-2"
        weight="medium"
        color="strong"
        wrap
      >
        {children}
      </BaseText>
      {owner && (
        <Button
          variant="secondary"
          size="small"
          className="w-full"
          onClick={handleClick}
        >
          내용 수정하기
        </Button>
      )}
    </div>
  );
}
