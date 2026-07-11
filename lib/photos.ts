/**
 * Free-license dish photography (Unsplash). Every URL verified live.
 * Keys are semantic so dishes can share imagery. If a photo ever 404s,
 * DishImage falls back to the procedural FoodArt illustration.
 */
const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const photos: Record<string, string> = {
  tacos: U('photo-1565299624946-b28f40a0ae38'),
  tacos2: U('photo-1551504734-5ee1c4a1479b'),
  tacos3: U('photo-1613514785940-daed07799d9b'),
  fajitas: U('photo-1599974579688-8dbdd335c77f'),
  skillet: U('photo-1534352956036-cd81e27dd615'),
  steak: U('photo-1546964124-0cce460f38ef'),
  steak2: U('photo-1600891964092-4316c288032e'),
  ribs: U('photo-1544025162-d76694265947'),
  nachos: U('photo-1513456852971-30c0b8199d4d'),
  nachos2: U('photo-1582169296194-e4d644c48063'),
  ceviche: U('photo-1573080496219-bb080dd4f877'),
  ceviche2: U('photo-1535399831218-d5bd36d1a6b3'),
  soup: U('photo-1547592166-23ac45744acd'),
  paella: U('photo-1534080564583-6be75777b70a'),
  salmon: U('photo-1467003909585-2f8a72700288'),
  margarita: U('photo-1556855810-ac404aa91e85'),
  burrito: U('photo-1626700051175-6818013e1d4f'),
  burrito2: U('photo-1620589125156-fd5028c5e05b'),
  guacamole: U('photo-1583224964978-2257b960c3d3'),
  guacamole2: U('photo-1548943487-a2e4e43b4853'),
  shrimp: U('photo-1565680018434-b513d5e5fd47'),
  shrimp2: U('photo-1625943553852-781c6dd46faa'),
  chicken: U('photo-1598103442097-8b74394b95c6'),
  chicken2: U('photo-1594041680534-e8c8cdebd659'),
  mussels: U('photo-1572695157366-5e585ab2b69f'),
  chips: U('photo-1615870216519-2f9fa575fa5c'),
  pupusas: U('photo-1512838243191-e81e8f66f1fd'),
  salad: U('photo-1512621776951-a57141f2eefd'),
  quesadilla: U('photo-1618040996337-56904b7850b9'),
  // drinks
  margaritaHouse: U('photo-1556855810-ac404aa91e85'),
  margaritaLime: U('photo-1609951651556-5334e2706168'),
  cocktailCoupe: U('photo-1544145945-f90425340c7e'),
  margaritaFrozen: U('photo-1563223771-375783ee91ad'),
  drinkMango: U('photo-1587223962930-cb7f31384c19'),
  margaritaStrawberry: U('photo-1551538827-9c037cb4f32a'),
  cocktailBlue: U('photo-1546171753-97d7676e4602'),
  cocktailBar: U('photo-1514362545857-3bc16c4c7d1b'),
  mojito: U('photo-1536935338788-846bb9981813'),
  drinkLime: U('photo-1437418747212-8d9709afab22'),

  plated: U('photo-1551218808-94e220e084d2'),
  plated2: U('photo-1414235077428-338989a2e8c0'),
  plated3: U('photo-1476224203421-9ac39bcb3327'),
  food: U('photo-1504674900247-0877df9cc836'),
};

export const photoFor = (key?: string) => (key ? photos[key] : undefined);
