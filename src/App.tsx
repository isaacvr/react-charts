import { useEffect, useMemo, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import { generateDataset } from './helpers/dataGenerator'
import { Button, FormControl, InputLabel, MenuItem, Select, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import moment from 'moment';
import { AgChartsReact } from 'ag-charts-react';
import { type AgChartOptions } from 'ag-charts-community';

type IThemeMode = 'dark' | 'light';

function getTheme(usermode: string | null, prefersDarkMode: boolean) {
  return usermode ? usermode as IThemeMode : prefersDarkMode ? 'dark' : 'light';
}

function App() {
  // Charts
  const [options, setOptions] = useState<AgChartOptions>({
    theme: 'ag-material',
    title: { text: `Sales summary`, },
    subtitle: { text: 'Summary of this year', },
    data: ([] as {amount: number, month: string}[]),
    series: [{ type: 'bar', xKey: 'month', yKey: 'amount' }]
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];

  // Theme handler
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const usermode = localStorage.getItem('sales-mode');
  const [mode, setMode] = useState<IThemeMode>( getTheme(usermode, prefersDarkMode) );

  const theme = useMemo( () => {
    let newOptions = Object.assign({}, options);
    newOptions.theme = mode === 'dark' ? 'ag-material-dark' : 'ag-material';
    
    setOptions(newOptions);

    let root = document.body.parentElement;

    root?.classList.remove('dark', 'light');
    root?.classList.add(mode);

    return createTheme({ palette: { mode } });
  }, [mode]);

  // State management
  let [dataset] = useState(generateDataset());
  let [categories, setCategories] = useState<string[]>([]);
  let [products, setProducts] = useState<string[]>([]);
  let [brands, setBrands] = useState<string[]>([]);

  let [category, setCategory] = useState('');
  let [product, setProduct] = useState('');
  let [brand, setBrand] = useState('');

  // Handle dataset change
  useEffect(() => {
    if ( dataset.length ) {
      let item = dataset[0];
      let prods = dataset.filter(d => d.category === item.category);
      let brands = prods.filter(p => p.name === item.name);

      setCategories([...new Set(dataset.map(d => d.category))]);
      setProducts([...new Set(prods.map(d => d.name))]);
      setBrands([...new Set(brands.map(d => d.brand))]);

      setCategory(item.category);
      setProduct(item.name);
      setBrand(item.brand);
    }
  }, []);

  // Handle category change
  useEffect(() => {
    let cats = dataset.filter(d => d.category === category);
    setProducts([...new Set(cats.map(d => d.name))]);

    if ( cats.length ) {
      setProduct(cats[0].name);

      let br = cats.filter(c => c.brand === cats[0].brand);
      setBrands([...new Set(br.map(d => d.brand))]);
      br.length && setBrand(br[0].brand);
    }

  }, [category]);

  // Handle [category => product] change
  useEffect(() => {
    let br = dataset.filter(p => p.category === category && p.name === product);

    setBrands([...new Set(br.map(d => d.brand))]);
    br.length && setBrand(br[0].brand);

  }, [product]);
  
  // Handle [category => product => brand] change and update chart
  useEffect(() => {
    let items = dataset.filter(d => d.category === category && d.name === product && d.brand === brand);

    // Group by month and aggregate
    let data: number[] = items.reduce((acc, e) => {
      let m = moment(e.date).month();
      acc[m] += 1;
      return acc;
    }, (new Array(12)).fill(0));
    
    setOptions({
      theme: options.theme,
      title: {
        text: items.length ? `${items[0].name} (${items[0].brand}) sales`: '',
      },
      subtitle: { text: 'Summary of this year', },
      data: data.map((d, p) => ({ month: months[p], amount: d })).filter(d => d.amount),
      series: [{
        type: 'bar',
        xKey: 'month',
        yKey: 'amount'
      }]
    })
  }, [brand]);

  function toggleMode() {
    setMode( mode === 'dark' ? 'light' : 'dark' );
    localStorage.setItem('sales-mode', mode === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />

      <ul className="controls flex flex-wrap items-center justify-center mt-8 text-theme bg-theme mb-4">
        <li>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category-selector-label">Category</InputLabel>
            <Select
              labelId="category-selector-label"
              id="category-selector"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {
                categories.map(c => <MenuItem key={'category-' + c} value={c}>{c}</MenuItem>)
              }
            </Select>
          </FormControl>
        </li>
        <li>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="product-selector-label">Product</InputLabel>
            <Select
              labelId="product-selector-label"
              id="product-selector"
              value={product}
              label="Product"
              onChange={(e) => setProduct(e.target.value)}
            >
              {
                products.map(p => <MenuItem key={'product-' + p} value={p}>{p}</MenuItem>)
              }
            </Select>
          </FormControl>
        </li>
        <li>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="brand-selector-label">Brand</InputLabel>
            <Select
              labelId="brand-selector-label"
              id="brand-selector"
              value={brand}
              label="Brand"
              onChange={(e) => setBrand(e.target.value)}
            >
              {
                brands.map(b => <MenuItem key={'brand-' + b} value={b}>{b}</MenuItem>)
              }
            </Select>
          </FormControl>
        </li>
        <li>
          <Button className='capitalize' onClick={ toggleMode }>{ mode === 'dark' ? 'Light mode' : 'Dark Mode' }</Button>
        </li>
      </ul>

      <section className="chart-container shadow-2xl rounded-md overflow-clip">
        <AgChartsReact options={options} />
      </section>
    </ThemeProvider>
  )
}

export default App
