import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar';

const TopLoadbar = () => {
    
  // loading bar
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(10);
    }, 10);

    const timer2 = setTimeout(() => {
      setProgress(20);
    }, 100);

    const timer3 = setTimeout(() => {
      setProgress(30);
    }, 300);

    const timer4 = setTimeout(() => {
      setProgress(100);
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <>
      
  <LoadingBar
  color="#5D369F"
  height="3px"
  progress={progress}
  onLoaderFinished={() => setProgress(0)}
/>
    </>
  )
}

export default TopLoadbar
