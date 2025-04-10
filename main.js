const makeDiv = (className) => {//arroww functione seggíttségével hozzuk létre a divet
    const div = document.createElement('div');//létrehozzuk a divet
    div.className = className;//beállítjuk a class nevét
    return div;//visszaadjuk a divet
} 

const containerDiv = makeDiv('container');//létrehozzuk a konténer divet
document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz    
const tableDiv = makeDiv('table');//létrehozzuk a táblázat divet
containerDiv.appendChild(tableDiv);//hozzáadjuk a táblázat divet a konténerhez
const formDiv = makeDiv('form');//létrehozzuk a form divet
containerDiv.appendChild(formDiv);//hozzáadjuk a form divet a konténerhez
