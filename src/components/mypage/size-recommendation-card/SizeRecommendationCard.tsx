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
  product: TProduct | null;
  isHeartFilled?: boolean;
};

const SizeRecommendationCard = ({ product, isHeartFilled = false }: SizeRecommendationCardProps) => {
  // product가 null일 경우 아무것도 렌더링하지 않음
  if (!product) {
    return null;
  }
  // console.log('Product in SizeRecommendationCard:', product); // 전달된 product 확인
  const [isChecked, setIsChecked] = useState(false);
  const { handleProductDetailsClick } = useProductDetailStore();

  const handleHeartChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={sizeRecommendationCardBox}>
      <div className={sizeRecommendationThumbnail}>
        <div className={sizeRecommendationThumbnailContainer}>
          <img src={product.image} alt={product.modelName} />
        </div>
        <div className={sizeRecommendationBadge}>
          <p className={sizeRecommendationBadgeTag}>{product?.sizeRecommend} 추천</p>
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
          {/* brand가 없을 경우 'Unknown Brand'로 기본값 설정 */}
          <p className={productBrand}>{product.brand || 'Unknown Brand'}</p>
          <p className={productText}>{product.modelName}</p>
        </div>
        <p className={productText}>{product?.price}원</p>
      </div>
      <button className={productDetailsButton} onClick={() => handleProductDetailsClick(product)}>
        <img src={ai} alt="ai" />이 신발 더 알아보기
      </button>
    </div>
  );
};

export default SizeRecommendationCard;
