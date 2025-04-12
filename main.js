const array = [];//létrehozzuk az üres tömböt   
const makeDiv1 = (className) => {//arroww functione seggíttségével hozzuk létre a divet
    const div = document.createElement('div');//létrehozzuk a divet
    div.className = className;//beállítjuk a class nevét
    return div;//visszaadjuk a divet
}
const fieldellista = [{//létrehozzuk a mezők listáját
    fieldid: 'forradalom',//létrehozzuk a mező azonosítóját 
    fieldlabel: 'forradalom'//létrehozzuk a mező címkéjét
},
{
    fieldid: 'evszam',//létrehozzuk a mező azonosítóját
    fieldlabel: 'evszam'//létrehozzuk a mező címkéjét
}, {
    fieldid: 'sikeres',//létrehozzuk a mező azonosítóját
    fieldlabel: 'sikeres'//létrehozzuk a mező címkéjét
}];//létrehozzuk a mezők listáját

const containerDiv = makeDiv1('container');//létrehozzuk a konténer divet
document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz    
const tableDiv = makeDiv1('table');//létrehozzuk a táblázat divet
containerDiv.appendChild(tableDiv);//hozzáadjuk a táblázat divet a konténerhez

const table = document.createElement('table');//létrehozzuk a táblázatot
tableDiv.appendChild(table);//hozzáadjuk a táblázatot a táblázat divhez
const fejlec = document.createElement('thead');//létrehozzuk a fejlécet 
table.appendChild(fejlec);//hozzáadjuk a fejlécet a táblázathoz
const fejsor = document.createElement('tr');//létrehozzuk a fejléc sort
fejlec.appendChild(fejsor);//hozzáadjuk a fejléc sort a fejléchez
const cella = ['forradalom', 'evszam', 'sikeres'];//létrehozzuk a cellák tartalmát

for (const cellatartalom of cella) {//végigmegyünk a cellákon
    const fejcell = document.createElement('th');//létrehozzuk a fejléc cellát
    fejcell.innerHTML = cellatartalom;//beállítjuk a cella tartalmát
    fejsor.appendChild(fejcell);//hozzáadjuk a fejléc cellát a fejléc sorhoz
}
const tbody = document.createElement('tbody');//létrehozzuk a törzset
table.appendChild(tbody);//hozzáadjuk a törzset a táblázathoz

const formDiv = makeDiv1('form');//létrehozzuk a form divet
containerDiv.appendChild(formDiv);//hozzáadjuk a form divet a konténerhez

const simaform = document.createElement('form');//létrehozzuk a formot
formDiv.appendChild(simaform);//hozzáadjuk a formot a form divhez

for (const field of fieldellista) {//végigmegyünk a mezők listáján

    const fieldDiv = makeDiv1('field');//létrehozzuk a mező divet
    simaform.appendChild(fieldDiv);//hozzáadjuk a mező divet a formhoz
    const label = document.createElement('label');//létrehozzuk a címkét
    label.htmlFor = field.fieldid;//beállítjuk a címke azonosítóját
    label.textContent = field.fieldlabel;//beállítjuk a címke tartalmát
    fieldDiv.appendChild(label);//hozzáadjuk a címkét a mező divhez 


    fieldDiv.appendChild(document.createElement('br'));//hozzáadunk egy sortörést a mező divhez
    let input;//létrehozzuk a bemeneti mezőt    

    if (field.fieldlabel === 'sikeres') {//ha a mező címkéje sikeres
        input = document.createElement('select');//létrehozzuk a legördülő menüt
        input.id = field.fieldid;//beállítjuk a legördülő menü azonosítóját
        const opcio1 = document.createElement('option');//létrehozzuk az első opciót
        opcio1.value = 'igen';//beállítjuk az első opció értékét
        opcio1.innerText = 'igen';//beállítjuk az első opció szövegét
        const opcio2 = document.createElement('option');//létrehozzuk a második opciót 
        opcio2.value = 'nem';//beállítjuk a második opció értékét
        opcio2.innerText = 'nem';//beállítjuk a második opció szövegét

        input.appendChild(opcio1);//hozzáadjuk az első opciót a legördülő menühöz
        input.appendChild(opcio2);//hozzáadjuk a második opciót a legördülő menühöz
    } else {
        input = document.createElement('input');//létrehozzuk a bemeneti mezőt
        input.id = field.fieldid;//beállítjuk a bemeneti mező azonosítóját
    }
    fieldDiv.appendChild(input);//hozzáadjuk a bemeneti mezőt a mező divhez
}

const formbutton = document.createElement('button');//létrehozzuk a gombot
formbutton.textContent = 'hozzáadás';//beállítjuk a gomb szövegét
simaform.appendChild(formbutton);//hozzáadjuk a gombot a form divhez
simaform.addEventListener('submit', (event) => {//hozzáadunk egy eseménykezelőt a gombhoz
    event.preventDefault();//megakadályozzuk az alapértelmezett eseményt

    const ertekek = {};//létrehozzuk az üres objektumot 
    const bemenetimezok = event.target.querySelectorAll('input, select');//lekérjük az összes bemeneti mezőt
    for (const bemenit of bemenetimezok) {//végigmegyünk az összes bemeneti mezőn
        ertekek[bemenit.id] = bemenit.value;//beállítjuk az objektum értékeit
    }
    array.push(ertekek);//hozzáadjuk az objektumot a tömbhöz
    const ujSor = document.createElement('tr');//létrehozzuk az új sort
    tbody.appendChild(ujSor);//hozzáadjuk az új sort a törzshöz

    const forrcella = document.createElement('td');//létrehozzuk a cellát
    forrcella.textContent = ertekek.forradalom;//beállítjuk a cella tartalmát
    ujSor.appendChild(forrcella);//hozzáadjuk a cellát az új sorhoz
    const evszamcell = document.createElement('td');//létrehozzuk a cellát
    evszamcell.textContent = ertekek.evszam;//beállítjuk a cella tartalmát
    ujSor.appendChild(evszamcell);//hozzáadjuk a cellát az új sorhoz
    const sikerescella = document.createElement('td');//létrehozzuk a cellát
    sikerescella.textContent = ertekek.sikeres;//beállítjuk a cella tartalmát
    ujSor.appendChild(sikerescella);//hozzáadjuk a cellát az új sorhoz

})