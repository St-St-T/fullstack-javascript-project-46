import genDiff from '../bin/gendiff.js';

test('return string', () => {
  expect(genDiff("file1.json", "file2.json")).toBe(String);
})