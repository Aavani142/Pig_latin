function toPigLatin(word) {
  const vowels = ["a", "e", "i", "o", "u"];
  const lower = word.toLowerCase();
  
  
  const match = lower.match(/^([a-z]+)([^a-z]*)$/i);
  if (!match) return word; 

  const coreWord = match[1];
  const punctuation = match[2] || "";

  if (vowels.includes(coreWord[0])) {
    return coreWord + "yay" + punctuation;
  } else {
    const firstVowelIndex = [...coreWord].findIndex(char => vowels.includes(char));
    if (firstVowelIndex === -1) {
      return coreWord + "ay" + punctuation;
    }
    return coreWord.slice(firstVowelIndex) + coreWord.slice(0, firstVowelIndex) + "ay" + punctuation;
  }
}

function convertText() {
  const input = document.getElementById("inputText").value.trim();
  const outputEl = document.getElementById("output");

  if (!input) {
    outputEl.textContent = "Please enter a word or sentence.";
    return;
  }

  const words = input.split(/\s+/).map(toPigLatin);
  outputEl.textContent = words.join(" ");
}

document.getElementById("convertBtn").addEventListener("click", convertText);

document.getElementById("copyBtn").addEventListener("click", () => {
  const output = document.getElementById("output").textContent;
  if (!output || output === "Please enter a word or sentence.") return;

  navigator.clipboard.writeText(output).then(() => {
    alert("Result copied to clipboard!");
  });
});

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("inputText").value = "";
  document.getElementById("output").textContent = "";
});

document.getElementById("inputText").addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    convertText();
  }
});


