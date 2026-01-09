export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export const menuCategories = [
  { id: 'streetfood', name: 'Street Food', icon: '🍗' },
  { id: 'snacks', name: 'Snacks', icon: '🥪' },
  { id: 'accompagnement', name: 'Accompagnement', icon: '🍟' },
  { id: 'pastries', name: 'Pâtisseries', icon: '🥞' },
];

export const menuItems: MenuItem[] = [
  // Street Food
  {
    id: 'brochette-poulet',
    name: 'Brochette de poulet',
    price: 1500,
    category: 'streetfood',
  },
  {
    id: 'cotelettes-porc',
    name: 'Côtelettes de porc',
    price: 2000,
    category: 'streetfood',
  },
  {
    id: 'saucisses',
    name: 'Saucisses',
    price: 1000,
    category: 'streetfood',
  },
  {
    id: 'ailes-poulet-braise',
    name: 'Ailes de poulet braisé',
    price: 2500,
    category: 'streetfood',
  },
  {
    id: 'coupey-coupey-poulet',
    name: 'Coupey coupey de poulet',
    price: 4000,
    category: 'streetfood',
  },
  {
    id: 'paquets-rognons-braise',
    name: 'Paquets de rognons braisé',
    price: 2000,
    category: 'streetfood',
  },
  
  // Snacks
  {
    id: 'croq-viande',
    name: "Croq'viande",
    description: 'Pain, béchamel, viande, mozzarella',
    price: 2000,
    category: 'snacks',
  },
  {
    id: 'croq-poulet',
    name: "Croq'poulet",
    description: 'Pain, béchamel, poulet, mozzarella',
    price: 4000,
    category: 'snacks',
  },
  {
    id: 'formule-croq-viande',
    name: "Formule Croq' Viande",
    description: "Croq' viande + chips + soda + sauce",
    price: 8000,
    category: 'snacks',
  },
  {
    id: 'formule-croq-poulet',
    name: "Formule Croq' Poulet",
    description: "Croq' poulet + chips + soda + sauce",
    price: 10000,
    category: 'snacks',
  },
  {
    id: 'gratin-pommes-poulet',
    name: 'Gratin de pommes de terre poulet',
    description: 'Pommes de terre, béchamel, poulet, mozzarella',
    price: 4000,
    category: 'snacks',
  },
  {
    id: 'gratin-pommes-viande',
    name: 'Gratin de pommes de terre viande hachée',
    description: 'Pommes de terre, béchamel, viande hachée, mozzarella',
    price: 3000,
    category: 'snacks',
  },
  
  // Accompagnement
  {
    id: 'frites',
    name: 'Frites',
    price: 500,
    category: 'accompagnement',
  },
  {
    id: 'beignets',
    name: 'Beignets',
    price: 1000,
    category: 'accompagnement',
  },
  {
    id: 'riz',
    name: 'Riz',
    price: 500,
    category: 'accompagnement',
  },
  {
    id: 'attieke',
    name: 'Attiéké',
    price: 2000,
    category: 'accompagnement',
  },
  
  // Pastries
  {
    id: 'crepes-simple-10',
    name: 'Crêpes simple (10)',
    price: 1500,
    category: 'pastries',
  },
  {
    id: 'crepes-chocolat-10',
    name: 'Crêpes chocolat (10)',
    price: 2000,
    category: 'pastries',
  },
  {
    id: 'pancakes-10',
    name: 'Pancakes (10)',
    price: 2000,
    category: 'pastries',
  },
  {
    id: 'pancakes-15',
    name: 'Pancakes (15)',
    price: 2500,
    category: 'pastries',
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' RWF';
};
