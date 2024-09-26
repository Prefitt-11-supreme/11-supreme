import { style } from '@vanilla-extract/css';
import { theme } from '../../../../../styles/theme';

export const buttonBlank = style({
  width: '100%',
  height: '44px',
  border: '1px solid',
  borderColor: theme.color.cool_gray100,
  borderRadius: '4px',
  backgroundColor: theme.color.white,
  color: theme.color.black,
  fontWeight: '600',
  lineHeight: '20px',
  letterSpacing: '-0.003em',
  fontSize: '16px',
  cursor: 'pointer',
});
