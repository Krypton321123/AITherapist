export const tokenizer = {
    tokenize: (text: string): string[] => {
      console.log("Tokenizing text:", text);
      return text.split(" ");
    },
  };
  
  console.log("Tokenizer initialized.");