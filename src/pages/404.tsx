import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/404-not-found');
  });
};

export default Custom404;
