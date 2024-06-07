import EllipsisSVG from '@public/icons/ellipsis.svg';

import Icon from '@components/common/Icon';

export default function Dropdown() {
  const handleDropdown = () => {
    /**
     * 이후 메인 페이지 로직 작성시 추가 예정
     */
  };

  return (
    <div>
      <button onClick={handleDropdown}>
        {' '}
        <Icon className="text-cool-neutral-40">
          <EllipsisSVG />
        </Icon>
      </button>
    </div>
  );
}
