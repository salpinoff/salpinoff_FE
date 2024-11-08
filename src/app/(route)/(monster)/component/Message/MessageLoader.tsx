import Loader from '@components/common/Loader';

function MessageLoader() {
  return (
    <>
      {Array.from({ length: 4 }, (_, idx) => idx + 1).map((id) => {
        return (
          <li key={id}>
            <Loader className="h-64 w-72 rounded-[16px]" />
          </li>
        );
      })}
    </>
  );
}

export default MessageLoader;
