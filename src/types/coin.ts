export type Coin = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h?: number;
  percentageChange24h: number;
};
