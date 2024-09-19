import { style } from '@vanilla-extract/css';

export const likedAndViewedHistoryCointainer = style({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const filterProductsQuantityBox = style({ padding: '0 21px' });
export const filterProductsQuantity = style({
  padding: '33px 0 10px',
  fontWeight: '800',
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '-0.003em',
});
export const viewedHistoryItemBox = style({
  padding: '0 16px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
});
