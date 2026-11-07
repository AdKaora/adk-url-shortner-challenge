import { cloudflare } from '@cloudflare/vite-plugin';

// avvio frontend e worker insieme con un solo npm run dev
export default {
  plugins: [cloudflare()]
};
