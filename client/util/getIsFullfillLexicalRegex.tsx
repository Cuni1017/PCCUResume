export const LexicalRegex = /"text":"([^"]*)"/g;

export const getIsFullfillLexicalRegex = (string: string) => {
  return string.match(LexicalRegex);
};
