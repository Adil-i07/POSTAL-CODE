// sw.js - Service Worker เปล่าเพื่อใ��้ผ่านเงื่อนไข PWA ของ Android
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // ดึงข้อมูลสดจากเครือข่ายเสมอ
  event.respondWith(fetch(event.request));
});