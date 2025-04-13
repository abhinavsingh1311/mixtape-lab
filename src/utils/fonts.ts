// src/utils/fonts.ts
import { Space_Grotesk } from '@next/font/google';

export const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap',
    variable: '--font-space-grotesk',
});
