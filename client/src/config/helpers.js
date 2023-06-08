export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", ""); // тут удаляется рещетка из цвета

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16); // берутся первые две буквы или цифры , например #FFDE77 - берется первые две FF и переводится в шестнадцатеричное число
  console.log(r);
  const g = parseInt(hex.substring(2, 4), 16); // Тоже самое только 3 и 4 символы
  const b = parseInt(hex.substring(4, 6), 16); // Тоже самое только 5 и 6 символы

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Это общее принятое число для вычисление

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};
