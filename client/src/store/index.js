import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  futbolka: true,
  Alimpik: false,                        // свойства - это камеры из нашей тюрьмы , значение - это зеки 
  color: '#EFBD48',                   // свойства - это камеры из нашей тюрьмы , значение - это зеки
  isLogoTexture: true,               // свойства - это камеры из нашей тюрьмы , значение - это зеки
  isFullTexture: false,             // свойства - это камеры из нашей тюрьмы , значение - это зеки
  logoDecal: './threejs.png',      // свойства - это камеры из нашей тюрьмы , значение - это зеки
  fullDecal: './threejs.png',     // свойства - это камеры из нашей тюрьмы , значение - это зеки
});

export default state;