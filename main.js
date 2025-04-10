const makeDiv = (className) => {//arroww functione seggíttségével hozzuk létre a divet
    const div = document.createElement('div');//létrehozzuk a divet
    div.className = className;//beállítjuk a class nevét
    return div;//visszaadjuk a divet
} 

const containerDiv = makeDiv('container');//létrehozzuk a konténer divet
document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz    
const tableDiv = makeDiv('table');//létrehozzuk a táblázat divet
containerDiv.appendChild(tableDiv);//hozzáadjuk a táblázat divet a konténerhez

const table = document.createElement('table');//létrehozzuk a táblázatot
tableDiv.appendChild(table);//hozzáadjuk a táblázatot a táblázat divhez
const fejlec = document.createElement('thead');//létrehozzuk a fejlécet 
table.appendChild(fejlec);//hozzáadjuk a fejlécet a táblázathoz
const fejsor = document.createElement('tr');//létrehozzuk a fejléc sort
fejlec.appendChild(fejsor);//hozzáadjuk a fejléc sort a fejléchez
const cella =['forradalom','evszam','sikeres'];//létrehozzuk a cellák tartalmát

for(const cellatartalom of cella){//végigmegyünk a cellákon
    const fejcell = document.createElement('th');//létrehozzuk a fejléc cellát
    fejcell.innerHTML = cellatartalom;//beállítjuk a cella tartalmát
    fejsor.appendChild(fejcell);//hozzáadjuk a fejléc cellát a fejléc sorhoz
}
const tbody = document.createElement('tbody');//létrehozzuk a törzset
table.appendChild(tbody);//hozzáadjuk a törzset a táblázathoz

const formDiv = makeDiv('form');//létrehozzuk a form divet
containerDiv.appendChild(formDiv);//hozzáadjuk a form divet a konténerhez