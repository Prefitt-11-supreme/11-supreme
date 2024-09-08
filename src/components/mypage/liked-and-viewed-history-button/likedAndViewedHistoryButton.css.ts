import { style } from '@vanilla-extract/css';
import { theme } from '../../../styles/theme';

export const likedAndViewedHistoryButtonBox = style({
  width: '100%',
  position: 'absolute',
  top: '36.5px',
});
const baseLikedAndViewedHistoryButton = style({
  width: '50%',
  height: '40px',
  backgroundColor: theme.color.white,
  border: 'none',
  padding: '0',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-0.003em',
  textAlign: 'center',
  borderBottom: `1px solid  ${theme.color.slate200}`,
  cursor: 'pointer',
});
export const likedAndViewedHistoryButton = style([
  baseLikedAndViewedHistoryButton,
  {
    fontWeight: '400',
    color: theme.color.cool_gray600,
  },
]);
export const likedAndViewedHistoryButtonChecked = style([
  baseLikedAndViewedHistoryButton,
  {
    fontWeight: '800',
    boxShadow: `0px -2px 0px 0px ${theme.color.black} inset`,
  },
]);
