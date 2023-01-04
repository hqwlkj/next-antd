import React, { useMemo } from 'react';
import styles from './index.module.less';

interface RetroTitleProps {
  text: string | React.ReactNode;
  textColor?: string;
  fontSize?: 28 | 30 | 45 | 50 | 55;
}

const RetroTitle = ({ text, textColor, fontSize }: RetroTitleProps) => {
  const style = useMemo(() => {
    const textShadow = () => {
      if (!fontSize) {
        return 'none';
      }
      if (fontSize > 55) {
        return '4px 4px 0px #000000';
      }

      if (fontSize > 45) {
        return '3px 3px 0px #000000';
      }

      if (fontSize > 30) {
        return '2px 2px 0px #000000';
      }

      if (fontSize > 28) {
        return '1px 1px 0px #000000';
      }
    };
    const textStroke = () => {
      if (!fontSize) {
        return 'none';
      }
      if (fontSize >= 48) {
        return '2px #000';
      }

      if (fontSize > 30 && fontSize < 48) {
        return '1px #000';
      }
    };
    return {
      color: textColor,
      'font-size': `${fontSize}px`,
      'text-shadow': textShadow(),
      'text-stroke': textStroke(),
      '-webkit-text-stroke': textStroke(),
    };
  }, [fontSize, textColor]);
  return (
    <div className={styles.retroTitle} style={style}>
      {text}
    </div>
  );
};

export default RetroTitle;
