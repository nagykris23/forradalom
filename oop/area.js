function makeDiv(className) {//létrehozzuk a makeDiv függvényt
    const div = document.createElement('div');//létrehozzuk a divet
    div.className = className;//beállítjuk a class nevét
    return div;//visszaadjuk a divet
}
class Area {//létrehozzuk az Area osztályt
    #div;//létrehozzuk a privát változót
    #manager;//létrehozzuk a manager privát változót
    get manager() {//létrehozzuk a gettert
        return this.#manager;//visszaadjuk a manager privát változót
    }
    get div() {//létrehozzuk a gettert
        return this.#div;//visszaadjuk a privát változót
    }

    constructor(className, manager) {//létrehozzuk a konstruktorot
        this.#manager = manager;//beállítjuk a manager privát változót
        const containerDiv = this.#getdivcontainer();//meghívjuk a #getdivcontainer függvényt
        this.#div = makeDiv(className);//létrehozzuk a divet
        this.#div.className = className;//beállítjuk a class nevét
        containerDiv.appendChild(this.#div);//hozzáadjuk a divet a konténerhez
    }

    #getdivcontainer() {//meghívjuk a getdivcontainer függvényt
        let containerDiv = document.querySelector('.containeroop');//lekérjük a konténer divet
        if (!containerDiv) {//ha nem létezik a konténer div
            containerDiv = document.createElement('div');//létrehozzuk a konténer divet
            containerDiv.className = 'containeroop';//beállítjuk a class nevét
            document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz
        }
        return containerDiv;//visszaadjuk a konténer divet
    }
}

class Table extends Area {//létrehozzuk a Table osztályt
    constructor(cssClass, manager) {//létrehozzuk a konstruktorot
        super(cssClass, manager);//meghívjuk a szülő osztály konstruktorát
        const table = this.#createtable()//meghívjuk a táblázat létrehozó metódust


        this.manager.setAddDatacCallback((data) => {//beállítjuk az addDatacCallback függvényt
            const sor = document.createElement('tr');//létrehozzuk a sort
            const forrcella = document.createElement('td');//létrehozzuk a cellát
            forrcella.textContent = data.forradalom;//beállítjuk a cella tartalmát
            sor.appendChild(forrcella);//hozzáadjuk a cellát a sorhoz

            const evszamcella = document.createElement('td');//létrehozzuk a cellát
            evszamcella.textContent = data.evszam;//beállítjuk a cella tartalmát
            sor.appendChild(evszamcella);//hozzáadjuk a cellát a sorhoz

            const sikerescella = document.createElement('td');//létrehozzuk a cellát
            sikerescella.textContent = data.sikeres;//beállítjuk a cella tartalmát
            sor.appendChild(sikerescella);//hozzáadjuk a cellát a sorhoz
            table.appendChild(sor);//hozzáadjuk a sort a táblázathoz
        })
    }

    #createtable() {//létrehozzuk a táblázatot
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
        return tbody;//visszaadjuk a törzset
    }
}

class Form extends Area {//létrehozzuk a Form osztályt
    constructor(cssClass, fieldellistaoop, manager) {//létrehozzuk a konstruktorot
        super(cssClass, manager);//meghívjuk a szülő osztály konstruktorát

        const form = document.createElement('form');//létrehozzuk a formot
        this.div.appendChild(form);//hozzáadjuk a formot a divhez

        for (const fieldelem of fieldellistaoop) {//végigmegyünk a mezők listáján
            const field = makeDiv('field');//létrehozzuk a mező divet
            form.appendChild(field);//hozzáadjuk a mező divet a formhoz

            const label = document.createElement('label');//létrehozzuk a címkét
            label.htmlFor = fieldelem.fieldid;//beállítjuk a címke azonosítóját
            label.textContent = fieldelem.fieldlabel;//beállítjuk a címke tartalmát
            field.appendChild(label);//hozzáadjuk a címkét a mező divhez

            field.appendChild(document.createElement('br'));//hozzáadunk egy sortörést a címke után

            let input;
            if (fieldelem.fieldid === 'sikeres') {//ha a mező azonosítója 'sikeres'
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
            } else {
                input = document.createElement('input');//létrehozzuk a bemeneti mezőt
                input.id = fieldelem.fieldid;//beállítjuk a bemeneti mező azonosítóját
            }

            field.appendChild(input);//hozzáadjuk a bemeneti mezőt a mező divhez
            field.appendChild(document.createElement('br'));//hozzáadunk egy sortörést az input után
        }

        const gomb = document.createElement('button');//létrehozzuk a gombot
        gomb.textContent = 'hozzáadás';//beállítjuk a gomb szövegét
        form.appendChild(gomb);//hozzáadjuk a gombot a formhoz

        form.addEventListener('submit', (event) => {//hozzáadunk egy eseményfigyelőt a formhoz
            event.preventDefault();//megakadályozzuk az alapértelmezett viselkedést
            const data = {};//létrehozzuk az adat objektumot
            const inputs = form.querySelectorAll('input, select');//lekérjük az összes bemeneti mezőt és legördülő menüt
            for (const input of inputs) {//végigmegyünk az összes bemeneti mezőn és legördülő menün
                data[input.id] = input.value;//beállítjuk az adat objektum mezőit
            }
            const adat = new Adat(data.forradalom, data.evszam, data.sikeres);//létrehozzuk az adat objektumot
            this.manager.addData(adat);//hozzáadjuk az adatot a managerhez

        })
    }
}