// declare module 'animejs' {
//     interface AnimeInstance {
//       play: () => void;
//       pause: () => void;
//       restart: () => void;
//       reverse: () => void;
//       seek: (time: number) => void;
//     }
  
//     interface AnimeParams {
//       targets: string | object | (string | object)[];
//       duration?: number;
//       delay?: number;
//       easing?: string;
//       loop?: boolean | number;
//       direction?: 'normal' | 'reverse' | 'alternate';
//       autoplay?: boolean;
//       opacity?: number | number[];
//       translateX?: number | number[] | string | string[];
//       translateY?: number | number[] | string | string[];
//       scale?: number | number[];
//       rotate?: number | number[] | string | string[];
//       points?: { value: string }[]; // Ajoutez la propriété `points`
//       complete?: (anim: AnimeInstance) => void;
//       update?: (anim: AnimeInstance) => void;
//     }
  
//     const anime: (params: AnimeParams) => AnimeInstance;
//     export default anime;
//   }