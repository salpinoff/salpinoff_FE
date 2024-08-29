import Text from '@components/common/Text';

export default function EncouragementTooltip() {
  return (
    <div className="absolute left-0 right-0 top-0 m-auto mb-[5px] w-max -translate-y-full animate-fade-in will-change-transform ">
      <Text
        className="rounded-8 border border-solid border-current bg-neutral-5 px-12 py-8"
        variant="label-2"
        color="primary"
      >
        친구에게 응원 메시지를 써보세요!
        <span className="absolute -bottom-[5px] left-0 right-0 m-auto h-[10px] w-[10px] rotate-45 rounded-br-4 border-b-[1px] border-r-[1px] border-inherit bg-inherit" />
      </Text>
    </div>
  );
}
