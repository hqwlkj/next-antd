import React from 'react';
import RetroTitle from '@/components/Common/RetroTitle';
import styles from './index.module.less';
import Link from 'next/link';

const CatchPhrase = ({ fontSize }: { fontSize: number }) => {
  return (
    <div className={styles.catchPhrase}>
      <RetroTitle text="Where Brands Tell Their Stories" textColor="#ff401a" fontSize={fontSize} />
      <span className={styles.poweredBy}>
        Powered By
        <Link href={'/'} className={styles.logo}>
          <img
            className={styles.pietra}
            src="/images/layouts/small-logo.png"
            alt="Pietra"
            title="Pietra"
            loading="eager"
          />
        </Link>
      </span>
    </div>
  );
};

export default CatchPhrase;
