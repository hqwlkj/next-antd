import { useEffect, useState } from 'react';

type Size = { width: number; height: number };

const useScreenSize = () => {
  const [state, setState] = useState<Size>({ width: 0, height: 0 });

  const getSize = () => {
    setState({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
  };

  useEffect(() => {
    getSize();
    window.addEventListener('resize', () => getSize());
  }, []);
  return state;
};

export default useScreenSize;
