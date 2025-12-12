// imageWorker.js — для Web Worker
self.onmessage = async (e) => {
  const file = e.data;
  if (!file) return;

  try {
    // создаем ImageBitmap без DOM
    const bitmap = await createImageBitmap(file);

    // максимальный размер для ресайза
    const maxSize = 300;
    const scale = Math.min(maxSize / bitmap.width, maxSize / bitmap.height);

    const canvas = new OffscreenCanvas(
      bitmap.width * scale,
      bitmap.height * scale
    );
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    // конвертируем в Blob
    const blob = await canvas.convertToBlob({
      type: "image/jpeg",
      quality: 0.8,
    });

    // отправляем Blob обратно в main thread
    self.postMessage(blob);
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};
