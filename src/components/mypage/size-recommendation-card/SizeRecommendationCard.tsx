import { useState } from 'react';
import { ai, brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import useProductDetailStore from '../../../stores/useProductDetailStore';
import { TProduct } from '../../../types/product';
import {
  brandIconBox,
  heartIconBox,
  productBox,
  productBrand,
  productDetailsButton,
  productName,
  productText,
  sizeRecommendationBadge,
  sizeRecommendationBadgeTag,
  sizeRecommendationCardBox,
  sizeRecommendationThumbnail,
  sizeRecommendationThumbnailContainer,
} from './sizeRecommendationCard.css';

type SizeRecommendationCardProps = {
  isHeartFilled?: boolean;
  product?: TProduct;
};

const SizeRecommendationCard = ({ product, isHeartFilled = false }: SizeRecommendationCardProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { handleProductDetailsClick } = useProductDetailStore();

  const handleHeartChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={sizeRecommendationCardBox}>
      <div className={sizeRecommendationThumbnail}>
        <div className={sizeRecommendationThumbnailContainer}>
          <img src={product?.image} alt={product?.modelName} />
        </div>
        <div className={sizeRecommendationBadge}>
          <p className={sizeRecommendationBadgeTag}>240mm 추천</p>
        </div>

        <div
          className={heartIconBox}
          onClick={e => {
            e.stopPropagation();
            handleHeartChecked();
          }}
        >
          <img src={isHeartFilled || isChecked ? heart_filled : heart_empty} alt="heart" />
        </div>
        <div className={brandIconBox}>
          <img src={brand_abcmart} alt="brand_abcmart" />
        </div>
      </div>
      <div className={productBox}>
        <div className={productName}>
          <p className={productBrand}>{product?.brand}Hoka</p>
          <p className={productText}>{product?.modelName}호카 카하 2 로우 고어텍스</p>
        </div>
        <p className={productText}>100,000원</p>
      </div>
      <button className={productDetailsButton} onClick={() => product && handleProductDetailsClick(product)}>
        <img src={ai} alt="ai" />이 신발 더 알아보기
      </button>
    </div>
  );
};

export default SizeRecommendationCard;
