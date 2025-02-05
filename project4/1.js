let name = "Wilson";
let age = 26;


// 在Wilson的物件(object)建立一個叫做name的屬性
let Wilson = {
    name: name,
    age: age,
};

console.log( Wilson); // { name: 'Wilson', age: 26 }

let Ren = {name, age};
console.log(Ren); // { name: 'Wilson', age: 26 }


