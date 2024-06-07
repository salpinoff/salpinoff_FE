import {
  ComponentProps,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import cn from '@utils/cn';

import spriteBackground from '@constant/sprite';

const bgType = Object.entries(spriteBackground);
const spriteStyle = cva('relative overflow-hidden', {
  variants: {
    background: bgType.reduce(
      (style, [type, url]) => ({
        ...style,
        [type]: url,
      }),
      {} as Record<keyof typeof spriteBackground, string>,
    ),
  },
});

/** 우선 미리 정의된 sprite 이미지를 제공하는 용도의 컴포넌트이므로 스프라이트 애니메이션 렌더링을 위한 기본 인터페이스 정의
 *  이후 정의된 인터페이스와 상이한 이미지를 제공해야 하는 경우, props 로 변경 가능하도록 수정 예정
 */
const imageInterface = {
  width: 200,
  height: 200,
  cols: 9,
  rows: 9,
};

type ComponentPropsWithStyle = ComponentProps<'div'> &
  VariantProps<typeof spriteStyle>;

interface Props extends ComponentPropsWithStyle {
  label: string;
  interval?: number;
}

function SpriteImage({
  label,
  className,
  background,
  interval = 1000 / 30,
}: Props) {
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const [currentPos, setCurrentPos] = useState(0);
  const defferedPos = useDeferredValue(currentPos);

  const backgroundPosition = () => {
    const { rows, cols, width, height } = imageInterface;
    const currentCol = defferedPos % cols;
    const currentRow = Math.floor(defferedPos / rows);

    return `${-width * currentCol}px ${-height * currentRow}px`;
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrentPos((prev) => {
        const { rows, cols } = imageInterface;
        return prev + 1 >= cols * rows ? 0 : prev + 1;
      });
    }, interval);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(spriteStyle({ background }), className)}
      style={{
        width: `${imageInterface.width}px`,
        height: `${imageInterface.height}px`,
        backgroundPosition: backgroundPosition(),
        backgroundSize: `${imageInterface.width * imageInterface.cols}px ${imageInterface.height * imageInterface.rows}px`,
      }}
    />
  );
}

export default SpriteImage;
