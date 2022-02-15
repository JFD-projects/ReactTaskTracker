exports.getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

exports.randomDigitCode = (len) => {
  let str = "";
  for (let i = 0; i <= len; i++) {
    str += exports.getRandomIntInclusive(0, 9);
  }
  return str;
};
