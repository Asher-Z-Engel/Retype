const field = document.querySelector("textarea");
const btn = document.querySelector(".btn");

btn.onclick = () => { field.value = ''; field.focus() }

const englishChars = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];

const hebrewChars = ['/', "'", 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', 'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', ',', 'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.'];

const lang = {
  current: [],
  opposite: []
};

// Determine language (character set) of input text
const determineLang = (string) => {
  for (const char of string) {
    if (!englishChars.includes(char) && hebrewChars.includes(char)) {
      lang.current = hebrewChars;
      lang.opposite = englishChars;
    } else if (!hebrewChars.includes(char) && englishChars.includes(char)) {
      lang.current = englishChars;
      lang.opposite = hebrewChars;
    } 
  }
}

// Convert input text to intended character set
const convertChars = (string) => {
  let convertedChars = '';
  for (const char of string) {
    convertedChars += lang.current.includes(char) ? lang.opposite[lang.current.indexOf(char)] : char;
  }
  return convertedChars;
}

const handleInput = (e) => {
  determineLang(e.target.value);
  field.value = convertChars(e.target.value);
  field.select();
};

field.oninput = handleInput;