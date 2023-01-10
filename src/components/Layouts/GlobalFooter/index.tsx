import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './index.module.less';

const GlobalFooter = ({ show = true, className }: { show?: boolean; className?: string }) => {
  if (!show) {
    return <></>;
  }
  const cls = classNames(styles.globalFooterWarp, className);
  return (
    <div className={cls}>
      <Image
        src="/images/layouts/footer-logo.png"
        alt="Pietra Creator Marketplace"
        title="Pietra Creator Marketplace"
        className={styles.logo}
        width={193}
        height={48}
      />
      <div className={styles.section}>
        <Link
          href="https://static.pietrastudio.com/public/file_uploads/0084c87aed029875e8c09226897fc888.pdf"
          target={'_blank'}
          className={styles.link}
        >
          Order Policies
        </Link>
        <Link href="mailto:creators@pietrastudio.com" className={styles.link}>
          Contact Us
        </Link>
        <Link href="/careers" className={styles.link}>
          Careers
        </Link>
      </div>
      <div className={styles.section}>
        <Link href="/privacy-policy" className={styles.link}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className={styles.link}>
          Terms of Service
        </Link>
        <Link href="/fulfillment-services-agreement" className={styles.link}>
          Fulfillment Services Agreement
        </Link>
      </div>
      <div className={styles.section}>
        <Link href="https://www.instagram.com/shoppietra" target={'_blank'} className={styles.link}>
          Instagram
        </Link>
        <Link href="https://www.tiktok.com/@shoppietra" target={'_blank'} className={styles.link}>
          TikTok
        </Link>
      </div>
    </div>
  );
};

export default GlobalFooter;
