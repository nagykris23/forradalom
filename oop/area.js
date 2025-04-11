class Area {//létrehozzuk az Area osztályt
    #div;//létrehozzuk a privát változót
    get div() {//létrehozzuk a gettert
        return this.#div;//visszaadjuk a privát változót
    }

    constructor(className) {//létrehozzuk a konstruktorot
        let containerDiv = document.querySelector('.containoop');//lekérjük a konténer divet
        if (!containerDiv) {//ha nem létezik a konténer div
            containerDiv = document.createElement('div');//létrehozzuk a konténer divet
            containerDiv.className = 'containoop';//beállítjuk a class nevét
            document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz
        }
        this.#div = document.createElement('div');//létrehozzuk a divet
        this.#div.className = className;//beállítjuk a class nevét
        containerDiv.appendChild(this.#div);//hozzáadjuk a divet a konténerhez
    }
}
class Table extends Area {//létrehozzuk a Table osztályt
    constructor(cssClass) {//létrehozzuk a konstruktorot
        super(cssClass);//meghívjuk a szülő osztály konstruktorát

        const table = document.createElement('table');//létrehozzuk a táblázatot
        this.div.appendChild(table);//hozzáadjuk a táblázatot a divhez
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


    }
}
class Form extends Area {//létrehozzuk a Form osztályt
    constructor(cssClass) {//létrehozzuk a konstruktorot
        super(cssClass);//meghívjuk a szülő osztály konstruktorát
        const form = document.createElement('form');//létrehozzuk a formot
        this.div.appendChild(form);//hozzáadjuk a formot a divhez

        const fieldellista = [{//létrehozzuk a mezők listáját
            fieldid: 'forradalom',//létrehozzuk a mező azonosítóját
            fieldlabel: 'forradalom'//létrehozzuk a mező címkéjét
        },
        {
            fieldid: 'evszam',////létrehozzuk a mező azonosítóját
            fieldlabel: 'evszam'////létrehozzuk a mező címkéjét
        }, {
            fieldid: 'sikeres',////létrehozzuk a mező azonosítóját
            fieldlabel: 'sikeres'////létrehozzuk a mező címkéjét
        }];//létrehozzuk a mezők listáját
        for (const fieldelem of fieldellista) {//végigmegyünk a mezők listáján
            const field = makeDiv('field');//létrehozzuk a mező divet
            form.appendChild(field);//hozzáadjuk a mező divet a formhoz
            const label = document.createElement('label');//létrehozzuk a címkét
            label.htmlFor = fieldelem.fieldid;//beállítjuk a címke azonosítóját
            label.textContent = fieldelem.fieldlabel;//beállítjuk a címke tartalmát
            field.appendChild(label);//hozzáadjuk a címkét a mező divhez

            let input = document.createElement('input');//létrehozzuk a bemeneti mezőt
            input.id = fieldelem.fieldid;//beállítjuk a bemeneti mező azonosítóját
            field.appendChild(document.createElement('br'));//hozzáadunk egy sortörést a mező divhez

            if (fieldelem.fieldid === 'sikeres') {
                input = document.createElement('select');//létrehozzuk a legördülő menüt
                input.id = fieldelem.fieldid;//beállítjuk a legördülő menü azonosítóját
                const opcio1 = document.createElement('option');//létrehozzuk az első opciót
                opcio1.value = 'igen';//beállítjuk az első opció értékét
                opcio1.textContent = 'igen';//beállítjuk az első opció szövegét
                const opcio2 = document.createElement('option');//létrehozzuk a második opciót
                opcio2.value = 'nem';//beállítjuk a második opció értékét
                opcio2.textContent = 'nem';//beállítjuk a második opció szövegét
                input.appendChild(opcio1);//hozzáadjuk az első opciót a legördülő menühöz
                input.appendChild(opcio2);//hozzáadjuk a második opciót a legördülő menühöz
            }else {
                input = document.createElement('input');//létrehozzuk a bemeneti mezőt
                input.id = fieldelem.fieldid;//beállítjuk a bemeneti mező azonosítóját
            }
            field.appendChild(input);//hozzáadjuk a bemeneti mezőt a mező divhez

        }
        const gomb = document.createElement('button');//létrehozzuk a gombot
        gomb.textContent = 'hozzáadás';//beállítjuk a gomb szövegét
        form.appendChild(gomb);//hozzáadjuk a gombot a mező divhez

    }
}