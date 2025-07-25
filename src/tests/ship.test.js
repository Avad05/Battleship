import Ship from "../modules/ship";

describe('Ship object', () =>{
  const myShip = new Ship('frigate');
  test('should exist', () =>{
    expect(myShip).toBeDefined();
  });

  test('correct size', () =>{
    expect(myShip.size).toBe(3);
  });

  test('hit property', () =>{
    expect(myShip.hit()).toBe('hit');
  });

  test('hits should increase,', () =>{
    expect(myShip.hits).toBe(1);
  });

  test('Sunk testing', () =>{
    myShip.hit();
    myShip.hit();
    expect(myShip.hit()).toBe('sunk');
  })
})