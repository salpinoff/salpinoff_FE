import Image from 'next/image';

import Button from '@components/common/Button';
import BaseText from '@components/common/Text/BaseText';

import stringToElement from '@utils/string-to-element';

type DoneStepProps = {
  goNext: () => void;
};

export default function DoneStep({ goNext }: DoneStepProps) {
  return (
    <>
      <div className="m-auto">
        {/* [TODO] 최종 캐릭터 선정 시 이미지 변경 */}
        <div className="mb-20">
          <Image
            src="/sample.png"
            width={277}
            height={192}
            alt="Sample Monster"
          />
        </div>
        <BaseText
          color="strong"
          component="h3"
          variant="heading-1"
          weight="semibold"
          align="center"
        >
          {stringToElement(['친구에게 나의 응원이', '전송 되었어요!'])}
        </BaseText>
      </div>
      <nav>
        <Button variant="primary" size="large" onClick={goNext}>
          나도 퇴사몬 만들어보기
        </Button>
      </nav>
    </>
  );
}
