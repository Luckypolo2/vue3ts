function test() {
  const a = 1;
  const b = 2;
  const c = 3;
  return {
    a,
    b,
    c
  }
}

console.log({...test()})
