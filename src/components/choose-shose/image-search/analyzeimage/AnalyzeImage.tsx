import { AnalyzeImage_AnalyzerContainerMove, AnalyzeImage_Container } from './analyzeimage.css.ts';
import { useEffect, useRef } from 'react';
import SuccesProduct from './succesproduct/SuccesProduct.tsx';
import useImageSearchStore from '../../../../stores/useImageSearchStore.ts';
import IsLoading from '../../isLoading/IsLoading.tsx';
import SimilarProduct from './similarproduct/SimilarProduct.tsx';

const AnalyzeImage = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { isAnalyze, isSuccess, isSimilar, resetState } = useImageSearchStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSimilar && divRef.current && !divRef.current.contains(event.target as Node)) {
        resetState();
      }
    };
    // 해당컴포넌트 외의 위치를 마우스로 누르면 handleClickOutside 실행
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSimilar]);

  const getClassNames = () => {
    let classNames = `${AnalyzeImage_Container}`;
    if (isSuccess) {
      classNames += ` ${AnalyzeImage_AnalyzerContainerMove.success}`;
    } else if (isAnalyze) {
      classNames += ` ${AnalyzeImage_AnalyzerContainerMove.analyze}`;
    }
    return classNames;
  };

  const renderContent = () => {
    if (isAnalyze) {
      return <IsLoading text="분석중" />;
    }
    if (isSuccess) {
      return isSimilar ? <SimilarProduct /> : <SuccesProduct />;
    }
    return null;
  };

  return (
    <>
      <div ref={divRef} className={getClassNames()}>
        {renderContent()}
      </div>
    </>
  );
};
export default AnalyzeImage;
