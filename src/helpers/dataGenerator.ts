interface IData {
  name: string;
  category: string;
  brand: string;
  date: number;
}

/**
 * 
 * @param list
 * @param amount
 * @returns string[]
 * @description Selects a random number of elements on the provided list
 */
export function random(list: string[], amount: number): string[] {
  return list.map(s => ({ s, id: Math.random() })).sort((a, b) => a.id - b.id).map(e => e.s).slice(0, amount);
}

/**
 * 
 * @param len 
 * @returns {number}
 * @description Get a random integer n, such as 0 <= n < len
 */
export function randomInt(len: number): number {
  return Math.min(len - 1, Math.round(Math.random() * len));
}

/**
 * 
 * @returns { IData[] }
 * @description Generate a big dataset with random categories, products and brands
 */
export function generateDataset(): IData[] {
  const categories = [ 'Food', 'Groceries', 'Shirts', 'Hats', 'Furniture', 'Books', 'Appliances', 'Skincare', 'Electronics' ];
  
  const products = [ 'Milk', 'Chocolate', 'Strawberry', 'Candle', 'Lotion', 'Tooth picks', 'Lamp shade', 'Couch', 'Computer', 'Wagon', 'Candy wrapper', 'Box', 'Clamp', 'Outlet', 'Slipper', 'Pillow', 'Keyboard', 'Chalk', 'Cookie jar', 'Video games', 'Vase', 'Bookmark', 'Bed', 'Toe ring', 'Twister', 'Puddle', 'Thermostat', 'Hanger', 'Nail clippers', 'Sticky note', 'Cup', 'Model car', 'Thread', 'Food', 'Beef', 'Shoe lace', 'Packing peanuts', 'Window', 'Eye liner', 'Radio', 'Piano', 'Bed' ];
  
  const brands = ['IWG', 'Neways Technologies', 'Vitacost', "Piazza D'oro", 'Co-operative', 'Yogi & Yousef', 'BP', 'Havaianas', 'Heiploeg Holding', 'CMBC', 'Jacobs', 'Vichy', 'Hannover Re', 'Verisk Analytics', 'Neilson', '3i Group', 'Janssen', 'Budweiser'];

  let data: IData[] = [];
  let initDate = new Date('1/1/2023').getTime();
  let finDate = new Date('12/31/2023').getTime();

  let sCat = random(categories, 3 + randomInt(3));
  let sProd = random(products, 5 + randomInt(6));
  let sBrand = random(brands, 3 + randomInt(4));

  for (let i = 0; i < 500; i += 1) {
    let br = sBrand[ randomInt(sBrand.length) ];
    let pr = sProd[ randomInt(sProd.length) ];
    let ct = sCat[ randomInt(sCat.length) ];

    for (let n = 1; n <= 10; n += 1) {
      data.push({
        brand: br,
        category: ct,
        name: pr,
        date: Math.floor( initDate + Math.random() * (finDate - initDate) )
      });
    }
  }

  return data;
}