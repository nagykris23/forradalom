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
    #formFieldArray;//privát tömb a form mezőkhöz
    constructor(cssClass, fieldellistaoop, manager) {//létrehozzuk a konstruktorot
        super(cssClass, manager);//meghívjuk a szülő osztály konstruktorát
        this.#formFieldArray = [];//inicializáljuk a mezők tömbjét

        const form = document.createElement('form');//létrehozzuk a formot
        this.div.appendChild(form);//hozzáadjuk a formot a divhez

        for (const fieldelem of fieldellistaoop) {//végigmegyünk a mezők listáján
            const formField = new FormField(fieldelem.fieldid, fieldelem.fieldlabel);//létrehozzuk a FormField objektumot
            this.#formFieldArray.push(formField);//elmentjük a mezőt a tömbbe
            form.appendChild(formField.getDiv());//hozzáadjuk a mezőt a formhoz
        }

        const gomb = document.createElement('button');//létrehozzuk a gombot
        gomb.textContent = 'hozzáadás';//beállítjuk a gomb szövegét
        form.appendChild(gomb);//hozzáadjuk a gombot a formhoz

        form.addEventListener('submit', (event) => {//hozzáadunk egy eseményfigyelőt a formhoz
            event.preventDefault();//megakadályozzuk az alapértelmezett viselkedést
            const adat = {};//létrehozzuk az adat objektumot

            for (const field of this.#formFieldArray) {//végigmegyünk a mezőkön
                adat[field.id] = field.value;//elmentjük az értékeket az objektumba
            }

            const adatObj = new Adat(adat.forradalom, adat.evszam, adat.sikeres);//létrehozzuk az adat objektumot
            this.manager.addData(adatObj);//hozzáadjuk az adatot a managerhez
        })
    }
}

class FormField {//létrehozzuk a FormField osztályt
    #id;//privát mező az azonosítóhoz
    #inputElement;//privát mező az input elemhez
    #labelElement;//privát mező a címkéhez
    #errorElement;//privát mező a hibaüzenethez

    get id() {//getter az id-hez
        return this.#id;//visszaadja az id-t
    }

    get value() {//getter az input értékéhez
        return this.#inputElement.value;//visszaadja az input értékét
    }

    set error(value) {//setter a hibaüzenethez
        this.#errorElement.textContent = value;//beállítja a hibaüzenetet
    }

    constructor(id, labelContent) {//konstruktor
        this.#id = id;//beállítjuk az id mezőt
        this.#labelElement = document.createElement('label');//létrehozzuk a címkét
        this.#labelElement.htmlFor = id;//beállítjuk a címke azonosítóját
        this.#labelElement.textContent = labelContent;//beállítjuk a címke szövegét

        if (id === 'sikeres') {//ha a mező a 'sikeres' mező
            this.#inputElement = document.createElement('select');//legördülő menü
            const option1 = document.createElement('option');//létrehozzuk az első opciót
            option1.value = 'igen';//beállítjuk az első opció értékét
            option1.textContent = 'igen';//beállítjuk az első opció szövegét

            const option2 = document.createElement('option');////létrehozzuk a második opciót
            option2.value = 'nem';////beállítjuk a második opció értékét
            option2.textContent = 'nem';////beállítjuk a második opció szövegét

            this.#inputElement.appendChild(option1);//hozzáadjuk az első opciót a legördülő menühöz
            this.#inputElement.appendChild(option2);//hozzáadjuk a második opciót a legördülő menühöz
        } else {
            this.#inputElement = document.createElement('input');//sima input mező
        }

        this.#inputElement.id = id;//beállítjuk az input mező azonosítóját

        this.#errorElement = document.createElement('span');//hibaüzenet span
        this.#errorElement.className = 'error';//hibaüzenet class név
    }

    getDiv() {//visszaad egy divet, ami tartalmazza a mezőt
        const div = makeDiv('field');//létrehozzuk a mező divet
        const br1 = document.createElement('br');//új sor
        const br2 = document.createElement('br');//új sor

        div.appendChild(this.#labelElement);//hozzáadjuk a címkét a mezőhöz
        div.appendChild(br1);//új sor
        div.appendChild(this.#inputElement);//hozzáadjuk az input mezőt a mezőhöz
        div.appendChild(br2);//új sor
        div.appendChild(this.#errorElement);//hozzáadjuk a hibaüzenetet a mezőhöz

        return div;//visszaadjuk a mező divet
    }
}
