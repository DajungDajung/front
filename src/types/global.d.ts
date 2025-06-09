declare global {
  import kakao from 'kakao.maps.d.ts';
  interface Window {
    kakao: typeof kakao;
  }
}
export {};
