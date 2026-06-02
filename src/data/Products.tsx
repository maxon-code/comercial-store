import { 
  Squares2X2Icon, 
  SunIcon, 
  WrenchIcon, 
  BoltIcon, 
  TagIcon 
} from "@heroicons/react/24/solid";


export const categories = [
  { name: "Decks", href: "#decks", icon: <Squares2X2Icon className="w-full h-full" /> },
  { name: "Wheels", href: "#wheels", icon: <SunIcon className="w-full h-full" /> },
  { name: "Trucks", href: "#trucks", icon: <WrenchIcon className="w-full h-full" /> },
  { name: "Bearings", href: "#bearings", icon: <BoltIcon className="w-full h-full" /> },
  { name: "Apparel", href: "#apparel", icon: <TagIcon className="w-full h-full" /> }
];


const products = [
  {
    id: 1,
    name: 'Santa Cruz deck',
    price: 100,
    category: 'Decks',
    count: 10,
    image: "../decks/santa-cruz-classic.png",
  },
  {
    id: 2,
    name: 'Hayley Clean Cut deck',
    price: 110,
    category: 'Decks',
    count: 10,
    image: "./decks/hayley-clean-cut.png",
  },
  {
    id: 3,
    name: 'Hayley Clean Cut deck',
    price: 110,
    category: 'Trucks',
    count: 0,
    image: "./decks/silver-truck.png",
  },
  {
    id: 4,
    name: 'Hayley Clean Cut deck',
    price: 110,
    category: 'Trucks',
    count: 4,
    image: "./decks/silver-truck.png",
  },
  {
    id: 5,
    name: 'Vans Old Skool',
    price: 135,
    category: 'Shoes',
    count: 10,
    image: "./clothes/vans-shoes.png",
  },
];

export default products;