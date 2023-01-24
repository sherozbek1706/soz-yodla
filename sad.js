// const stru = (arr) => {
//   let newArr = [];
//   let str = "";
//   if (newArr.length == 0) return "";
//   arr.forEach((el) => {
//     if (el) newArr.push(el);
//   });
//   if (newArr.length == 1) return newArr[0];
//   for (let i = 0; i < newArr.length; i++) {
//     if (i == newArr.length - 1) {
//       str += " and " + newArr[i];
//     } else {
//       str += newArr[i] + (newArr.length - 2 == i ? " " : " , ");
//     }
//   }
//   return str;
// };

// console.log(stru(["hello", "bye", "sdfsd", "", "", "soon dsv dfg "]));



function leftSlide(row) {
	for(let i = 0; i<=row.length ; i+= 2)
}
leftSlide([0, 2, 2, 8, 8, 8])