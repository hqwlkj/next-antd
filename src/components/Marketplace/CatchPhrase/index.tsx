import React from 'react';
import { RetroTitle } from '@/components';

const CatchPhrase = ({ fontSize }: { fontSize: number }) => {
  return (
    <div className="catch-phrase">
      <RetroTitle text="Where Brands Tell Their Stories" textColor="#ff401a" fontSize={fontSize} />
      <span className="powered-by">
        Powered By
        <img
          className="pietra"
          src="/images/layouts/small-logo.png"
          alt="Pietra"
          title="Pietra"
          loading="eager"
        />
      </span>
    </div>
  );
};

export default CatchPhrase;
