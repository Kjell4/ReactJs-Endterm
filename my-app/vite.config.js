import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // SW будет авто-обновляться
      includeAssets: [
        'favicon.svg',
        'offline.html',
        'icons/icon-192.png',
        'icons/icon-512.png',
        '**/*.jpeg'  // кэшируем все картинки
      ],
      manifest: {
        name: 'Rick & Morty PWA',
        short_name: 'R&M App',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0b5cff',
        background_color: '#ffffff',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpeg,svg}'], // кэшируем всю сборку и картинки
        navigateFallback: '/offline.html', // если оффлайн → показываем оффлайн страницу
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/rickandmortyapi\.com\/api\/character/,
            handler: 'NetworkFirst', // сначала сеть, потом кэш
            options: {
              cacheName: 'rick-and-morty-api',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 50, maxAgeSeconds: 24*60*60 }
            }
          }
        ]
      },
      devOptions: {
        enabled: false // отключаем SW в dev режиме
      }
    })
  ]
});
