const field = document.querySelector("textarea");
const btn = document.querySelector(".btn");

field.focus()
btn.onclick = () => { field.value = ''; field.focus() }

const englishChars = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];

const hebrewChars = ['/', "'", 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', 'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', ',', 'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '.'];

const lang = {
  current: [],
  opposite: []
};

// Determine language (character set) of input text
const determineLang = (string) => {
  let numOfHebChars = 0;
  let numOfEngChars = 0;
  for (const char of string) {
    if (!englishChars.includes(char) && hebrewChars.includes(char)) {
      numOfHebChars += 1;
    } else if (!hebrewChars.includes(char) && englishChars.includes(char.toLowerCase())) {
      numOfEngChars += 1;
    }
  }
  if (numOfEngChars <= numOfHebChars) {
    lang.current = hebrewChars;
    lang.opposite = englishChars;
  } else {
    lang.current = englishChars;
    lang.opposite = hebrewChars;
  }
}

// Convert input text to intended character set
const convertChars = (string) => {
  let convertedChars = '';
  for (const char of string) {
    if (lang.current == hebrewChars) {
      convertedChars += lang.current.includes(char) ? lang.opposite[lang.current.indexOf(char)] : char;
    } else {
      convertedChars += lang.current.includes(char.toLowerCase()) ? lang.opposite[lang.current.indexOf(char.toLowerCase())] : char;
    }
  }
  return convertedChars;
}

const handleInput = (e) => {
  determineLang(e.target.value);
  field.value = convertChars(e.target.value);
  field.select();
};

field.oninput = handleInput;