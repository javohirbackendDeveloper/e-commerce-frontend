import {
  FaTshirt,
  FaMobileAlt,
  FaCouch,
  FaShoePrints,
  FaTools,
  FaCar,
  FaRegGem,
} from "react-icons/fa";

export const Categories = [
  {
    id: 1,
    name: "Kiyimlar",
    icon: FaTshirt,
    subCategories: [
      {
        id: 1,
        name: "Ayollar kiyimlari",
        children: [
          "Jinsi",
          "Paypoq",
          "Shlyapa",
          "Poyabzal",
          "Kofta",
          "Koʻylak",
        ],
      },
      {
        id: 2,
        name: "Erkaklar kiyimlari",
        children: ["Jinsi", "Koʻylak", "Shim", "Kurtka", "Futbolka", "Kepka"],
      },
    ],
  },
  {
    id: 2,
    name: "Elektronika",
    icon: FaMobileAlt,
    subCategories: [
      {
        id: 1,
        name: "Telefonlar",
        children: [
          "Smartfonlar",
          "Quloqchinlar",
          "Telefon qopqoqlari",
          "Powerbank",
          "Sim-kartalar",
        ],
      },
      {
        id: 2,
        name: "Noutbuklar",
        children: [
          "Ofis noutbuklari",
          "O'yin noutbuklari",
          "Aksessuarlar",
          "Sumkalar",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Uy-jihozlari",
    icon: FaCouch,
    subCategories: [
      {
        id: 1,
        name: "Mebel",
        children: [
          "Divanlar",
          "Stollar",
          "Stullar",
          "Yotoq xonasi mebellari",
          "Kuxnya mebellari",
        ],
      },
      {
        id: 2,
        name: "Maishiy texnika",
        children: [
          "Sovutgichlar",
          "Televizorlar",
          "Kir yuvish mashinalari",
          "Mikroto'lqinli pechlar",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Poyabzallar",
    icon: FaShoePrints,
    subCategories: [
      {
        id: 1,
        name: "Ayollar poyabzallari",
        children: [
          "Tuflilar",
          "Etiklar",
          "Sandallar",
          "Sport poyabzallari",
          "Uy poyabzallari",
        ],
      },
      {
        id: 2,
        name: "Erkaklar poyabzallari",
        children: [
          "Krossovkalar",
          "Tuflilar",
          "Botinkalar",
          "Sport poyabzallari",
          "Uy poyabzallari",
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Qurilish mollari",
    icon: FaTools,
    subCategories: [
      {
        id: 1,
        name: "Materiallar",
        children: [
          "Gipsokarton",
          "Plitka",
          "Boya materiallari",
          "Yelimlar",
          "Deraza va eshiklar",
        ],
      },
      {
        id: 2,
        name: "Asboblar",
        children: [
          "Elektr asboblar",
          "Qo'l asboblari",
          "O'lchov asboblari",
          "Xavfsizlik asboblari",
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Avtomobil qismlari",
    icon: FaCar,
    subCategories: [
      {
        id: 1,
        name: "Ehtiyot qismlar",
        children: [
          "Dvigatel qismlari",
          "Transmissiya",
          "Tormoz tizimi",
          "Filtrlar",
        ],
      },
      {
        id: 2,
        name: "Aksessuarlar",
        children: [
          "Avto kosmetika",
          "Ichki bezaklar",
          "Tashqi bezaklar",
          "Avto audio",
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Aksessuarlar",
    icon: FaRegGem,
    subCategories: [
      {
        id: 1,
        name: "Zargarlik buyumlari",
        children: [
          "Uzuklar",
          "Marjonlar",
          "Bilaguzuklar",
          "Soatlar",
          "Sirg'alar",
        ],
      },
      {
        id: 2,
        name: "Sumkalar",
        children: [
          "Ayollar sumkalari",
          "Erkaklar sumkalari",
          "Rukzaklar",
          "Klyuchdorlar",
        ],
      },
    ],
  },
];
