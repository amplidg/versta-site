/**
 * Web Worker: pinta as nuvens fora da thread principal, para a página
 * continuar respondendo ao toque e ao scroll enquanto elas são geradas.
 */
import { drawCloud } from "./clouds";

type Job = { id: number; w: number; h: number; seed: number };

self.onmessage = (e: MessageEvent<Job>) => {
  const { id, w, h, seed } = e.data;
  const canvas = new OffscreenCanvas(w, h);
  drawCloud(canvas, seed);
  const bitmap = canvas.transferToImageBitmap();
  (self as unknown as Worker).postMessage({ id, bitmap }, [bitmap]);
};
