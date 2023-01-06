import React from 'react';
import Hero from './Hero';

const Home = ({ heroData }: { heroData: any }) => {
  return (
    <div className="app-home">
      <Hero heroData={heroData} />
    </div>
  );
};

export default Home;
