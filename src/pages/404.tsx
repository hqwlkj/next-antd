import React, { useEffect } from 'react';
import Error from 'next/error';

import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/error');
  }, [router]);
  // Opinionated: do not record an exception in Sentry for 404
  return <Error statusCode={404} />;
};

export default Custom404;
