// Функция обрезает текс до 170-и символов
const cropText = (text) => {
  const redExp = /.{170}\S*/s;

  return text.length > 170 ? `${text.match(redExp)} ...` : text;
};

export default cropText;
