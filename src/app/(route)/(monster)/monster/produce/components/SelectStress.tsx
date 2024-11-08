'use client';

import { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { match } from 'ts-pattern';

import AnimatedNumber from '@components/AnimatedNumber';
import Badge from '@components/common/Badge';
import Text from '@components/common/Text';
import FormHelperText from '@components/common/TextField/FormHelperText';
import Tooltip from '@components/common/Tooltip';
import Slider from '@components/Slider';

import { UserInfo } from '../../../../(auth)/signup/context/context.type';
import useMonsterLayout from '../hooks/useMonsterLayout';

const slider = {
  step: 1,
  min: 1,
  max: 100,
};

const helperText = (stress: number): string => {
  return match(stress)
    .when(
      (value) => value >= 1 && value <= 20,
      () => '살짝 짜증',
    )
    .when(
      (value) => value >= 21 && value <= 40,
      () => '슬슬 지침',
    )
    .when(
      (value) => value >= 41 && value <= 60,
      () => '많이 힘듦',
    )
    .when(
      (value) => value >= 61 && value <= 80,
      () => '한계 도달',
    )
    .otherwise(() => '퇴사 결심');
};

function SelectStress() {
  const { setBtnDisabled } = useMonsterLayout();

  const {
    control,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<UserInfo>();

  const [open, setOpen] = useState(false);

  const stress = useWatch({ control, name: 'stress' });

  // 선택 이후 앞/뒤로가기 시 툴팁 미노출
  useEffect(() => {
    if (!dirtyFields.stress) setOpen(true);
  }, []);

  useEffect(() => {
    setBtnDisabled(!dirtyFields.stress);
  }, [stress]);

  return (
    <div className="flex h-full flex-col">
      <Tooltip
        open={open}
        label="스트레스 정도"
        content={`스트레스가 높을수록 퇴사몬을 \n클리어하기 위해 더 많은 탭이 필요해요`}
        className="mb-[26px]"
      >
        <Tooltip.Label className="flex-none" />
        <Tooltip.Content className="z-10 p-3" />
      </Tooltip>

      <Controller
        name="stress"
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <Slider
              displayInterval
              value={getValues('stress')}
              onChange={onChange}
              {...slider}
            />
          );
        }}
      />
      {/* 스트레스 수치 텍스트 라벨 */}
      <Badge
        component="div"
        variant="dot"
        color="alternative"
        className="m-auto h-[180px] w-[180px] flex-col"
      >
        <Text component="div" variant="display-1" weight="bold" color="strong">
          <AnimatedNumber animateToNumber={stress} />
        </Text>
        <FormHelperText component="span">{helperText(stress)}</FormHelperText>
      </Badge>
    </div>
  );
}

export default SelectStress;
