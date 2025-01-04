function stringToNumber(s: string) {
  return Number(s.match(/\d/g)?.join(""));
}

export default stringToNumber