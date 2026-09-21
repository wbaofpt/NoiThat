export const categories = [
  "Sofa",
  "Bàn",
  "Ghế",
  "Đèn",
  "Giường",
  "Tủ",
  "Kệ",
  "Gương",
  "Thảm",
  "Rèm",
  "Phụ kiện",
  "Ngoài trời",
  "Văn phòng",
  "Trẻ em",
];

const images = [
  "photo-1598300042247-d088f8ab3a91",
  "photo-1533090481720-856c6e3c1fdc",
  "photo-1507473885765-e6ed057f782c",
  "photo-1555041469-a586c61ea9bc",
  "photo-1567538096630-e0c55bd6374c",
  "photo-1494438639946-1ebd1d20bf85",
  "photo-1616486338812-3dadae4b4ace",
  "photo-1600607687920-4e2a09cf159d",
  "photo-1600210492486-724fe5c67fb0",
  "photo-1618221195710-dd6b41faaea6",
];

const featured = [
  ["Ghế Lounge Arco", "Ghế", "24.800.000", images[0], "Bestseller"],
  ["Bàn trà Nép", "Bàn", "18.900.000", images[1], "Mới"],
  ["Đèn sàn Halo", "Đèn", "7.200.000", images[2], ""],
  ["Sofa Mây", "Sofa", "32.600.000", images[3], ""],
  ["Ghế đôn Noma", "Ghế", "8.400.000", images[4], ""],
  ["Bàn bên Serein", "Bàn", "6.900.000", images[5], ""],
];

const productNames = [
  "Luna",
  "Serein",
  "Noma",
  "Arco",
  "Mây",
  "Nép",
  "Halo",
  "Mộc",
  "Sống",
  "Nero",
  "Kanso",
  "Aster",
  "Cove",
  "Linea",
  "Sol",
  "Terra",
  "Onda",
  "Nude",
  "Still",
  "Muse",
  "Kita",
];
const priceRanges = {
  Sofa: 18000000,
  Bàn: 6500000,
  Ghế: 4200000,
  Đèn: 1800000,
  Giường: 22000000,
  Tủ: 12000000,
  Kệ: 5800000,
  Gương: 3200000,
  Thảm: 4600000,
  Rèm: 2800000,
  "Phụ kiện": 850000,
  "Ngoài trời": 7900000,
  "Văn phòng": 6400000,
  "Trẻ em": 3900000,
};

const generated = categories.flatMap((category, categoryIndex) =>
  Array.from({ length: 21 }, (_, index) => {
    const number = index + 1;
    const price =
      priceRanges[category] + categoryIndex * 330000 + (index % 7) * 470000;
    return {
      id: featured.length + categoryIndex * 21 + number,
      name: `${category} ${productNames[index]} ${String(number).padStart(2, "0")}`,
      cat: category,
      price: price.toLocaleString("vi-VN"),
      img: images[(categoryIndex + index) % images.length],
      tag: number === 1 ? "Mới" : "",
    };
  }),
);

export const products = [
  ...featured.map(([name, cat, price, img, tag], index) => ({
    id: index + 1,
    name,
    cat,
    price,
    img,
    tag,
  })),
  ...generated,
];
export const icons = {
  arrow: "→",
  bag: "◌",
  search: "⌕",
  user: "◠",
  menu: "☰",
};
