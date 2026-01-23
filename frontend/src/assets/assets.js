import buea from "./buea.jpg";
import douala from "./douala.png";
import ekomNkam from "./ekom-nkam.jpg";
import foumban from "./foumban.jpg";
import garoua from "./garoua.png";
import kribi from "./kribi.jpg";
import limbe from "./limbe.webp";
import yaounde from "./yaounde.jpg";
import appartement from "./appartement.jpg";
import chambre from "./chambre.jpg";
import duplex from "./duplex.webp";
import hotel from "./hotel.jpg";
import maison from "./maison.png";
import openspace from "./openspace.jpg";
import villa from "./villa.jpg";
import property11 from "./property-1-1.jpeg";
import property12 from "./property-1-2.jpeg";
import property13 from "./property-1-3.jpeg";
import property14 from "./property-1-4.jpeg";
import property15 from "./property-1-5.jpeg";
import property21 from "./property-2-1.jpeg";
import property22 from "./property-2-2.jpeg";
import property23 from "./property-2-3.jpeg";
import property24 from "./property-2-4.jpeg";
import property25 from "./property-2-5.jpeg";
import property26 from "./property-2-6.jpeg";
import property27 from "./property-2-7.jpeg";
import property28 from "./property-2-8.jpeg";
import property29 from "./property-2-9.jpeg";
import property210 from "./property-2-10.jpeg";
import property211 from "./property-2-11.jpeg";
import property212 from "./property-2-12.jpeg";
import property213 from "./property-2-13.jpeg";
import property214 from "./property-2-14.jpeg";
import property215 from "./property-2-15.jpeg";
import property31 from "./property-3-1.jpeg";
import property32 from "./property-3-2.jpeg";
import property33 from "./property-3-3.jpeg";
import property34 from "./property-3-4.jpeg";
import property35 from "./property-3-5.jpeg";
import property36 from "./property-3-6.jpeg";
import property37 from "./property-3-7.jpeg";
import property38 from "./property-3-8.jpeg";
import property39 from "./property-3-9.jpeg";
import property310 from "./property-3-10.jpeg";
import property311 from "./property-3-11.jpeg";
import property312 from "./property-3-12.jpeg";
import property41 from "./property-4-1.jpeg";
import property42 from "./property-4-2.jpeg";
import property43 from "./property-4-3.jpeg";
import property44 from "./property-4-4.jpeg";
import property45 from "./property-4-5.jpeg";
import property46 from "./property-4-6.jpeg";
import property47 from "./property-4-7.jpeg";
import property48 from "./property-4-8.jpeg";
import property49 from "./property-4-9.jpeg";
import property410 from "./property-4-10.jpeg";
import property411 from "./property-4-11.jpeg";
import property412 from "./property-4-12.jpeg";
import property413 from "./property-4-13.jpeg";

export const destinations = [
  {
    id: 1,
    city: "Buea",
    image: buea,
  },
  {
    id: 2,
    city: "Douala",
    image: douala,
  },
  {
    id: 3,
    city: "Ekom Nkam",
    image: ekomNkam,
  },
  {
    id: 4,
    city: "Foumban",
    image: foumban,
  },
  {
    id: 5,
    city: "Garoua",
    image: garoua,
  },
  {
    id: 6,
    city: "Kribi",
    image: kribi,
  },
  {
    id: 7,
    city: "Limbe",
    image: limbe,
  },
  {
    id: 8,
    city: "Yaounde",
    image: yaounde,
  },
];

export const categories = [
  {
    id: 1,
    name: "Apartment",
    image: appartement,
  },
  {
    id: 2,
    name: "Room",
    image: chambre,
  },
  {
    id: 3,
    name: "Duplex",
    image: duplex,
  },
  {
    id: 4,
    name: "Hotel",
    image: hotel,
  },
  {
    id: 5,
    name: "House",
    image: maison,
  },
  {
    id: 6,
    name: "Openspace",
    image: openspace,
  },
  {
    id: 7,
    name: "Villa",
    image: villa,
  },
];

export const properties = [
  {
    id: 1,
    title: "Studio Haut Standing à Louer",
    adress: "Douala, Bonamoussadi",
    city: "Douala",
    country: "Cameroun",
    latitude: 4.094354,
    longitude: 9.7393663,
    category: "Studio",
    paymentFrequency: "Month",
    price: 200000,
    rate: 4.5,
    reviews: 150,
    bedroom: 1,
    bathroom: 1,
    liked: false,
    images: [property11, property12, property13, property14, property15],
  },
  {
    id: 2,
    title: "Studio Haut Standing à Louer",
    adress: "Douala, Bonapriso",
    city: "Douala",
    country: "Cameroun",
    latitude: 4.0256151,
    longitude: 9.6930153,
    category: "Studio",
    paymentFrequency: "Month",
    price: 500000,
    rate: 4.7,
    reviews: 180,
    bedroom: 1,
    bathroom: 1,
    liked: true,
    images: [
      property21,
      property22,
      property23,
      property24,
      property25,
      property26,
      property26,
      property27,
      property28,
      property29,
      property210,
      property211,
      property212,
      property213,
      property214,
      property215,
    ],
  },
  {
    id: 3,
    title: "Appartement 2 Chambres Haut Standing à Louer",
    adress: "Yaounde, Odza",
    city: "Yaounde",
    country: "Cameroun",
    latitude: 3.7985968,
    longitude: 11.5291189,
    category: "Appartement",
    paymentFrequency: "Month",
    price: 350000,
    rate: 5,
    reviews: 100,
    bedroom: 2,
    bathroom: 4,
    liked: true,
    images: [
      property31,
      property32,
      property33,
      property34,
      property35,
      property36,
      property37,
      property38,
      property39,
      property310,
      property311,
      property312,
    ],
  },
  {
    id: 4,
    title: "Appartement 3 Chambres Haut Standing à Louer",
    adress: "Douala, Bonanjo",
    city: "Douala",
    country: "Cameroun",
    latitude: 4.043024,
    longitude: 9.6864962,
    category: "Appartement",
    paymentFrequency: "Month",
    price: 500000,
    rate: 4.9,
    reviews: 80,
    bedroom: 3,
    bathroom: 4,
    liked: false,
    images: [
      property41,
      property42,
      property43,
      property44,
      property45,
      property46,
      property46,
      property47,
      property48,
      property49,
      property410,
      property411,
      property412,
      property413,
    ],
  },
  {
    id: 5,
    title: "Studio Haut Standing à Louer",
    adress: "Douala, Bonamoussadi",
    city: "Douala",
    country: "Cameroun",
    latitude: 4.094354,
    longitude: 9.7393663,
    category: "Studio",
    paymentFrequency: "Month",
    price: 200000,
    rate: 4.5,
    reviews: 150,
    bedroom: 1,
    bathroom: 1,
    liked: true,
    images: [property11, property12, property13, property14, property15],
  },
  {
    id: 6,
    title: "Studio Haut Standing à Louer",
    adress: "Douala, Bonapriso",
    city: "Douala",
    country: "Cameroun",
    latitude: 4.0256151,
    longitude: 9.6930153,
    category: "Studio",
    paymentFrequency: "Month",
    price: 500000,
    rate: 4.7,
    reviews: 180,
    bedroom: 1,
    bathroom: 1,
    liked: false,
    images: [
      property21,
      property22,
      property23,
      property24,
      property25,
      property26,
      property26,
      property27,
      property28,
      property29,
      property210,
      property211,
      property212,
      property213,
      property214,
      property215,
    ],
  },
  {
    id: 7,
    title: "Appartement 2 Chambres Haut Standing à Louer",
    adress: "Yaounde, Odza",
    city: "Yaounde",
    country: "Cameroun",
    latitude: 3.7985968,
    longitude: 11.5291189,
    category: "Appartement",
    paymentFrequency: "Month",
    price: 350000,
    rate: 5,
    reviews: 100,
    bedroom: 2,
    bathroom: 4,
    liked: false,
    images: [
      property31,
      property32,
      property33,
      property34,
      property35,
      property36,
      property37,
      property38,
      property39,
      property310,
      property311,
      property312,
    ],
  },
  {
    id: 8,
    title: "Appartement 3 Chambres Haut Standing à Louer",
    adress: "Douala, Bonanjo",
    city: "Douala",
    country: "Cameroun",
    latitude: 4.043024,
    longitude: 9.6864962,
    category: "Appartement",
    paymentFrequency: "Month",
    price: 500000,
    rate: 4.9,
    reviews: 80,
    bedroom: 3,
    bathroom: 4,
    liked: true,
    images: [
      property41,
      property42,
      property43,
      property44,
      property45,
      property46,
      property46,
      property47,
      property48,
      property49,
      property410,
      property411,
      property412,
      property413,
    ],
  },
];
