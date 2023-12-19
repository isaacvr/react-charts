import { test, expect } from 'vitest';
import { generateDataset, random, randomInt } from './dataGenerator';

// Testing random function
test('testing random() function', () => {
  const list = "ABCDEFG".split('');
  const amounts = [ 5, 2, 3, 6, 4, 5, 8, 7 ];

  for (let i = 0, maxi = amounts.length; i < maxi; i += 1) {
    let rnd = random(list, amounts[i]);
    let expectedLength = Math.min(list.length, amounts[i]);

    expect(rnd).toBeTruthy();
    expect(rnd.length).toBe(expectedLength);
    rnd.forEach(item => expect(list).toContainEqual(item));
  }
});

// Testing randomInt function
test('testing randomInt() function', () => {
  const lens = [ 5, 6, 2, 7, 4, 2, 5, 4, 5, 6, 7, 8, 25, 34, 66, 2, 3, 24 ];

  for (let i = 0, maxi = lens.length; i < maxi; i += 1) {
    let rnd = randomInt( lens[i] );

    expect(rnd).not.toBeNaN();
    expect(rnd % 1).toBe(0);
    expect(rnd).toBeGreaterThanOrEqual(0);
    expect(rnd).toBeLessThan(lens[i]);
  }
});

// Testing generateDataset function
test('testing generateDataset() function', () => {
  const categories = [ 'Food', 'Groceries', 'Shirts', 'Hats', 'Furniture', 'Books', 'Appliances', 'Skincare', 'Electronics' ];
  const initDate = new Date('1/1/2023').getTime();
  const finDate = new Date('12/31/2023').getTime();

  let data = generateDataset();

  expect(data.length).toBeGreaterThan(0);
  
  for (let i = 0, maxi = data.length; i < maxi; i += 1) {
    let d = data[i];

    expect(d).toBeTruthy();
    expect(d.brand).toBeTruthy();
    expect(d.category).toBeTruthy();
    expect(d.date).toBeTruthy();
    expect(d.name).toBeTruthy();
    expect(categories).toContainEqual(d.category);
    expect(d.date).toBeGreaterThanOrEqual(initDate);
    expect(d.date).toBeLessThan(finDate);
  }
});