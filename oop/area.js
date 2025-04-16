/**
 * 
 * @param {string} className a div class neve amelyet létrehozunk 
 * @returns {HTMLElement} a létrehozott div elem 
 */
function makeDiv(className) {//létrehozzuk a makeDiv függvényt
    const div = document.createElement('div');//létrehozzuk a divet
    div.className = className;//beállítjuk a class nevét
    return div;//visszaadjuk a divet
}
class Area {//létrehozzuk az Area osztályt
    /**
     * @type {HTMLElement} div a div elem amelyet létrehozunk
     */
    #div;//létrehozzuk a privát változót
    /**
     * @type {Manager} manager a manager amelyet beállítunk
     */
    #manager;//létrehozzuk a manager privát változót
    /**
     * @returns {Manager} manager a manager amelyet beállítunk
     */
    get manager() {//létrehozzuk a gettert
        return this.#manager;//visszaadjuk a manager privát változót
    }
    /**
     * @returns {HTMLElement} div a div elem amelyet létrehozunk
     */
    get div() {//létrehozzuk a gettert
        return this.#div;//visszaadjuk a privát változót
    }
    /**
     * 
     * @param {string} className  a div class neve amelyet létrehozunk
     * @param {Manager} manager  a manager amelyet beállítunk
     */
    constructor(className, manager) {//létrehozzuk a konstruktorot
        this.#manager = manager;//beállítjuk a manager privát változót
        const containerDiv = this.#getdivcontainer();//meghívjuk a #getdivcontainer függvényt
        this.#div = makeDiv(className);//létrehozzuk a divet
        this.#div.className = className;//beállítjuk a class nevét
        containerDiv.appendChild(this.#div);//hozzáadjuk a divet a konténerhez
    }
    /**
     * 
     * @returns {HTMLElement} containerDiv a konténer div elem amelyet létrehozunk
     */
    #getdivcontainer() {//meghívjuk a getdivcontainer függvényt
        let containerDiv = document.querySelector('.containeroop');//lekérjük a konténer divet
        if (!containerDiv) {//ha nem létezik a konténer div
            containerDiv = document.createElement('div');//létrehozzuk a konténer divet
            containerDiv.className = 'containeroop';//beállítjuk a class nevét
            document.body.appendChild(containerDiv);//hozzáadjuk a konténer divet a bodyhoz
        }
        return containerDiv;//visszaadjuk a konténer divet
    }
    /**
     * 
     * @param {string} label  a gomb szövege amelyet létrehozunk
     * @returns {HTMLButtonElement} gomb a létrehozott gomb elem
     */
    gombletrehozas(label) {
        const gomb = document.createElement('button');//létrehozzuk a gombot
        gomb.textContent = label;//beállítjuk a gomb szövegét
        return gomb;//visszaadjuk a gombot

    }
}

class Table extends Area {//létrehozzuk a Table osztályt
    /**
     * 
     * @param {string} cssClass  a div class neve amelyet létrehozunk
     * @param {Manager} manager  a manager amelyet beállítunk
     */
    constructor(cssClass, manager) {//létrehozzuk a konstruktorot
        super(cssClass, manager);//meghívjuk a szülő osztály konstruktorát
        const tbody = this.#createtable()//meghívjuk a táblázat létrehozó metódust

        this.manager.setAddDatacCallback(this.#addPersonCallback(tbody))//beállítjuk az addCallback függvényt
        this.manager.setRenderCallback(this.#renderTableCallback(tbody))//beállítjuk a renderCallback függvényt

    }
    /**
     * 
     * @param {HTMLElement} tableb megkapja a táblázat törzsét
     * @returns {renderCallback} a renderCallback függvény amelyet beállítunk
     */
    #renderTableCallback(tableb) {//beállítjuk a renderCallback függvényt
        return (data) => {//visszaad egy függvényt
            tableb.innerHTML = '';//töröljük a tbody tartalmát
            for (const pers of data) {//végigmegyünk az adatokon
                this.#addRow(tableb, pers);//hozzáadjuk az adatokat a táblázathoz
            }
        }
    }
    /**
     * 
     * @param {HTMLElement} tableb megkaopja a táblázat törzsét
     * @returns {addDatacCallback} a addPersonCallback függvény amelyet beállítunk
     */
    #addPersonCallback(tableb) {//beállítjuk az addCallback függvényt
        return (pers) => {//visszaad egy függvényt
            this.#addRow(tableb, pers);//hozzáadjuk az adatokat a táblázathoz
        }
    }
    /**
     * 
     * @param {HTMLTableSectionElement} tbody  a táblázat törzse amelyhez hozzáadjuk az adatokat
     * @param {Adat} data  az adatok amelyeket hozzáadunk a táblázathoz
     */
    #addRow(tbody, data) {//létrehozzuk a #addRow függvényt
        const tbodyRow = document.createElement('tr');//létrehozzuk a tbody sort
        tbody.appendChild(tbodyRow);//hozzáadjuk a tbody sort a tbodyhoz

        this.#addCell(tbodyRow, data.forradalom);//hozzáadjuk a cellát a tbodyhoz
        this.#addCell(tbodyRow, data.evszam);//hozzáadjuk a cellát a tbodyhoz
        this.#addCell(tbodyRow, data.sikeres);//hozzáadjuk a cellát a tbodyhoz

    }
    /**
     * 
     * @param {HTMLTableRowElement} tbodyRow  a tbody sor amelyhez hozzáadjuk a cellát
     * @param {string} textContent  a cella szövege amelyet hozzáadunk
     * @param {string} type a cella típusa amelyet létrehozunk
     * @returns {HTMLTableCellElement} cell a létrehozott cella elem    
     */

    #addCell(tbodyRow, textContent, type = 'td') {//létrehozzuk a #addCell függvényt
        const cell = document.createElement(type);//létrehozzuk a cellát
        cell.textContent = textContent;//beállítjuk a cella szövegét
        tbodyRow.appendChild(cell);//hozzáadjuk a cellát a tbody sorhoz
    }

    /**
     * 
     * @returns {HTMLElement} tbody a táblázat törzse amelyet létrehozunk
     */
    #createtable() {//létrehozzuk a táblázatot
        const table = document.createElement('table');//létrehozzuk a táblázatot
        this.div.appendChild(table);//hozzáadjuk a táblázatot a divhez

        const fejlec = document.createElement('thead');//létrehozzuk a fejlécet
        table.appendChild(fejlec);//hozzáadjuk a fejlécet a táblázathoz

        const fejsor = document.createElement('tr');//létrehozzuk a fejléc sort
        fejlec.appendChild(fejsor);//hozzáadjuk a fejléc sort a fejléchez

        const cella = ['forradalom', 'evszam', 'sikeres'];//létrehozzuk a cellák tartalmát
        for (const cellatartalom of cella) {//végigmegyünk a cellákon
            this.#addCell(fejsor, cellatartalom, 'th');//hozzáadjuk a cellát a fejléc sorhoz
        }

        const tbody = document.createElement('tbody');//létrehozzuk a törzset
        table.appendChild(tbody);//hozzáadjuk a törzset a táblázathoz
        return tbody;//visszaadjuk a törzset
    }
}

class Form extends Area {//létrehozzuk a Form osztályt
    /**
     * @type {FormField[]} formFieldArray a form mezők tömbje
     */
    #formFieldArray;//privát tömb a form mezőkhöz
    /**
     * 
     * @param {string} cssClass  a div class neve amelyet létrehozunk
     * @param {{fieldid:string,fieldlabel:string}[]} fieldellistaoop  a mezők listája amelyet létrehozunk
     * @param {Manager} manager  a manager amelyet beállítunk
     */
    constructor(cssClass, fieldellistaoop, manager) {//létrehozzuk a konstruktorot
        super(cssClass, manager);//meghívjuk a szülő osztály konstruktorát
        this.#formFieldArray = [];//inicializáljuk a mezők tömbjét

        const form = this.#craeteForm(fieldellistaoop);//létrehozzuk a formot
        form.addEventListener('submit', this.#formsubmit())////hozzáadunk egy eseményfigyelőt a formhoz
    }
    /**
     * 
     * @param {{fieldid:string,fieldlabel:string}[]} fieldellistaoop 
     * @returns {HTMLElement} form a létrehozott form elem
     */
    #craeteForm(fieldellistaoop) {//létrehozzuk a formot
        const form = document.createElement('form');//létrehozzuk a formot
        this.div.appendChild(form);//hozzáadjuk a formot a divhez

        for (const fieldelem of fieldellistaoop) {//végigmegyünk a mezők listáján
            const formField = new FormField(fieldelem.fieldid, fieldelem.fieldlabel);//létrehozzuk a FormField objektumot
            this.#formFieldArray.push(formField);//elmentjük a mezőt a tömbbe
            form.appendChild(formField.getDiv());//hozzáadjuk a mezőt a formhoz
        }
        const gomb = this.#gombletrehozas('Hozzáadás');//létrehozzuk a gombot
        form.appendChild(gomb);//hozzáadjuk a gombot a formhoz
        return form;//visszaadjuk a formot
    }
    /**
     * 
     * @param {string} label a gomb szövege amelyet létrehozunk
     * @returns {HTMLElement} gomb a létrehozott gomb elem
     */
    #gombletrehozas(label) {//létrehozzuk a gombot
        const gomb = document.createElement('button');//létrehozzuk a gombot
        gomb.type = 'submit';//beállítjuk a gomb típusát
        gomb.textContent = label;//beállítjuk a gomb szövegét
        return gomb;//visszaadjuk a gombot
    }
    /**
     * 
     * @returns {EventListener} a form submit eseményfigyelője
     */
    #formsubmit() {//létrehozzuk a form submit függvényt
        return (e) => {//visszaad egy függvényt
            e.preventDefault();//megakadályozzuk az alapértelmezett viselkedést
            if (this.#errorFinder()) {//ha van hiba
                const adatObj = this.#createAdatObj();//létrehozzuk az adat objektumot
                const adt = new Adat(adatObj.forradalom, adatObj.evszam, adatObj.sikeres);//létrehozzuk az adat objektumot
                this.manager.addData(adt);//hozzáadjuk az adatot a managerhez
            }
        }

    }

    /**
     * 
     * @returns {boolean} error a hibaüzenet
     */
    #errorFinder() {//létrehozzuk a hibaellenőrző függvényt
        let error = true;//beállítjuk a hibát igazra
        for (const errrorField of this.#formFieldArray) {//végigmegyünk a mezők listáján
            errrorField.error = '';//töröljük a hibaüzenetet
            if (errrorField.value === '') {//ha a mező üres
                errrorField.error = 'Kötelező mező';//beállítjuk a hibaüzenetet
                error = false;//beállítjuk a hibát hamisra
            }

        }
        return error;//visszaadjuk a hibát
    }
    /**
     * 
     * @returns {{forradalom: string, evszam: number, sikeres: boolean}} adatObj az adat objektum
     */
    #createAdatObj() {//létrehozzuk az adat objektumot
        const adatObj = {};//létrehozzuk az adat objektumot
        for (const field of this.#formFieldArray) {//végigmegyünk a mezők listáján
          adatObj[field.id] = field.value;//beállítjuk az adat objektumot
        }
        return adatObj;//visszaadjuk az adat objektumot
    }
}

class UploadDownload extends Area {//létrehozzuk az Upload osztályt
    /**
     * 
     * @param {string} cssClass  a div class neve amelyet létrehozunk
     * @param {Manager} manager  a manager amelyet beállítunk
     */
    constructor(cssClass, manager) {//létrehozzuk a konstruktorot
        super(cssClass, manager);//meghívjuk a szülő osztály konstruktorát
        const fileInput = document.createElement('input');//létrehozzuk a fájl bemeneti mezőt
        fileInput.id = 'fileinput';//beállítjuk a fájl bemeneti mező azonosítóját
        fileInput.type = 'file';//beállítjuk a fájl típusát
        this.div.appendChild(fileInput);//hozzáadjuk a fájl bemeneti mezőt a divhez
        fileInput.addEventListener('change', this.#fileInputChange())//hozzáadunk egy eseményfigyelőt a fájl bemeneti mezőhöz



        const exportButton = document.createElement('button');//létrehozzuk az export gombot
        this.div.appendChild(exportButton);//hozzáadjuk a gombot a divhez
        exportButton.addEventListener('click', this.#exportButtonEventListener())//hozzáadunk egy eseményfigyelőt a gombhoz
        exportButton.textContent = 'Letöltes';//beállítjuk a gomb szövegét


    }
    /**
     * 
     * @returns {EventListener} a gomb eseményfigyelője
     */
    #exportButtonEventListener() {//létrehozzuk az export gomb eseményfigyelőjét
        return () => {//visszaad egy függvényt
            const link = document.createElement('a');//létrehozzuk a linket
            const content = this.manager.generateExport();//lekérjük a tartalmat
            const file = new Blob([content])
            link.href = URL.createObjectURL(file);//beállítjuk a link href-jét
            link.download = 'export.csv';//beállítjuk a letöltési nevet
            link.click();//letöltjük a fájlt
            URL.revokeObjectURL(link.href);//töröljük a linket
        }
    }
    /**
     * 
     * @returns {EventListener} a fájl bemeneti mező eseményfigyelője
     */
    #fileInputChange() {//létrehozzuk a fájl bemeneti mező eseményfigyelőjét
        return (e) => {//visszaad egy függvényt
            const selectfile = e.target.files[0];//lekérjük a fájlt
            if (!selectfile) {//ha nincs fájl
                console.error('Nincs fájl');//kiírjuk a hibát
                return;//visszatérünk

            }
            const reader = new FileReader();//létrehozzuk a fájl olvasót
            reader.onload = () => {//hozzáadunk egy eseményfigyelőt az olvasóhoz
                const sorok = reader.result.split('\n');//lekérjük a fájl tartalmát
                const adatSorok = sorok.slice(1)////lekérjük az adat sorokat
                for (const sor of adatSorok) {
                    const filterrow = sor.trim()
                    const field = filterrow.split(';')//szétválasztjuk a sorokat
                    const adatok = new Adat(field[0], field[1], field[2])//létrehozzuk az adatokat

                    this.manager.addData(adatok)//hozzáadjuk az adatokat a managerhez
                }
            }
            reader.readAsText(selectfile);//beolvassuk a fájlt
        }
    }
}


class FormField {//létrehozzuk a FormField osztályt
    /**
     * @type {string} id az azonosító amelyet beállítunk
     */
    #id;//privát mező az azonosítóhoz
    /**
     * @type {HTMLElement} inputElement az input elem amelyet beállítunk
     */
    #inputElement;//privát mező az input elemhez
    /**
     * @type {HTMLElement} labelElement a címke elem amelyet beállítunk
     */
    #labelElement;//privát mező a címkéhez
    /**
     * @type {HTMLElement} errorElement a hibaüzenet elem amelyet beállítunk
     */
    #errorElement;//privát mező a hibaüzenethez
    /**
     * * @returns {string} id az azonosító amelyet beállítunk
     */
    get id() {//getter az id-hez
        return this.#id;//visszaadja az id-t
    }
    /**
     *  @returns {string} value az input értéke amelyet beállítunk
     */
    get value() {//getter az input értékéhez
        return this.#inputElement.value;//visszaadja az input értékét
    }
    /**
     * @param {string} value a hibaüzenet amelyet beállítunk
     */
    set error(value) {//setter a hibaüzenethez
        this.#errorElement.textContent = value;//beállítja a hibaüzenetet
    }
    /**
     * 
     * @param {string} id  a mező azonosítója amelyet beállítunk
     * @param {string} labelContent  a mező címkéje amelyet beállítunk
     */
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
    /**
     * 
     * @returns {HTMLDivElement} div a mező div elem amelyet létrehozunk
     */
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
