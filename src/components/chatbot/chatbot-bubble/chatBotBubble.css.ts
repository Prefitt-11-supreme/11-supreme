import { style } from '@vanilla-extract/css';

export const chatBotBubbleWrap = style({
  width: '100%',
  height: 'auto',
})

export const chatBotBubbleContainer = style({
  width: '100%',
  display: "flex",
  alignItems:'start'
})

export const chatBotBubbleText = style({
  marginLeft: '10px',
  marginTop: '10px',
  fontSize: '14px',
  display: 'inline-block',
  letterSpacing: '-0.003em',
  whiteSpace:'pre-line'
})