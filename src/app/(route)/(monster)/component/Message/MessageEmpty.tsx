import Icon from '@components/common/data-display/Icon';

import cn from '@utils/cn';

function MessageEmpty() {
  return (
    <div
      className={cn(
        'text-[#70737C47]',
        'col-span-2 col-start-2 w-full',
        'flex flex-col items-center justify-center gap-8',
      )}
    >
      <Icon name="message" size={24} className="w-24" />
      <p>메시지가 없어요</p>
    </div>
  );
}

export default MessageEmpty;
