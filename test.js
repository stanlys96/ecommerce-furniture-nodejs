// for (let i = 1; i <= 10; i++) {
//   console.log(`${i} : ${i % 2 === 0 ? "Genap" : "Ganjil"}`);
// }

// let arr = [500, 100, 500, 1000, 100, 1000, 500];

// console.log(`Seratus ${arr.filter((x) => x === 100).length} Coin`);
// console.log(`Lima Ratus ${arr.filter((x) => x === 500).length} Coin`);
// console.log(`Seribu ${arr.filter((x) => x === 1000).length} Coin`);

// let i = 1;

// while (i < 11) {
//   console.log(i);
//   i++;
// }

// let arr = ["Merah", "Hijau", "Biru", "Kuning", "Hitam", "Putih"];

// for (let warna of arr) {
//   if (warna.toLowerCase() !== "kuning") {
//     console.log(`${warna} Bukan Warna Kuning`);
//   } else {
//     console.log("Warna Kuning");
//     break;
//   }
// }

let arr = [
  ["Kol", "sayur"],
  ["Apel", "buah"],
  ["Jeruk", "buah"],
  ["Mangga", "buah"],
  ["Brokoli", "sayur"],
];

function sortFunction(a, b) {
  return a[1] < b[1] ? -1 : 1;
}

arr.sort(sortFunction);

let obj = {};

for (let i = 0; i < arr.length; i++) {
  if (obj[arr[i][1]] === undefined) {
    obj[arr[i][1]] = [];
  }
  obj[arr[i][1]].push(arr[i][0]);
}

console.log(obj);
