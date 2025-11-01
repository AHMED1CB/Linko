import { keyframes } from "@emotion/react";


const pulse = keyframes(`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`);

const slideLeft = keyframes(`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`);
const slideRight = keyframes(`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`);


export {
    slideLeft,
    slideRight,
    pulse
}