import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/error');
  }, [router]);
  return <div></div>;
};

export default Custom404;
