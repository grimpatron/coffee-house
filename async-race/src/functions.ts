export function generateHexColor(): string {
  const constPad: number = 2;
  const constCod: number = 16;
  const constHex: number = 256;
  const r = Math.floor(Math.random() * constHex);
  const g = Math.floor(Math.random() * constHex);
  const b = Math.floor(Math.random() * constHex);
  const hexColor = `#${r.toString(constCod).padStart(constPad, '0')}${g.toString(constCod).padStart(constPad, '0')}${b.toString(constCod).padStart(constPad, '0')}`;
  return hexColor;
}

export function generateUniqueID(): string {
  const magicNumber = 36;
  const sixteen = 16;
  const two = 2;
  return `id-${Math.random().toString(magicNumber).substr(two, sixteen)}-${Date.now().toString(magicNumber)}`;
}

export function generateModel(): string {
  const model = ['Lexus', 'Toyota', 'Chevrolet', 'Porsche', 'Mazda', 'Kia', 'BMW', 'Dodge', 'Honda', 'Volvo'];
  const subModel = ['Corolla', 'Camry', 'Civic', 'Tundra', 'Prius', 'X1', 'NX', 'C-HR', 'Sonata', 'Colorado'];
  const part1 = model[Math.floor(Math.random() * model.length)];
  const part2 = subModel[Math.floor(Math.random() * subModel.length)];
  const combinedString = `${part1} ${part2}`;
  return combinedString;
}
