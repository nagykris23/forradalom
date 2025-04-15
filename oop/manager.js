/**
 *  @callback renderCallback
 * @param {HTMLElement} tbody a táblázat törzs eleme
 * @returns {void} a visszatérési érték típusa
 * 
 * @callback addDatacCallback
 * @param {HTMLElement} tbody a táblázat törzs eleme
 * @returns {void} a visszatérési érték típusa
 * 
 */
class Manager {
    /**
     * @type {Adat[]} array az adatok tömbje
     */
    #array//array privat mező
    /**
     * @type {addDatacCallback} addDatacCallback a visszahívás típusa
     */
    #addDatacCallback//addDatacCallback privat mező
    /**
     * @type {renderCallback} renderCallback a visszahívás típusa
     */
    #renderCallback//renderCallback privat mező

    constructor() {
        this.#array = []//beállítja az array mezőt
    }
    /**
     * 
     * @param {Function} callback  a callback függvény amelyet beállítjuk
     */
    setAddDatacCallback(callback) {//beállítja az addDatacCallback mezőt
        this.#addDatacCallback = callback//beállítja az addDatacCallback mezőt
    }
    /**
     * 
     * @param {Adat} data  adata amelyet hozzáadunk az arrayhez
     */
    addData(data) {//hozzáadja az adatot az arrayhez
        this.#array.push(data)//hozzáadja az adatot az arrayhez
        this.#addDatacCallback(data)//visszahívja az addDatacCallback függvényt
      
    }
    /**
     * 
     * @param {Function} callback  callback függvény amelyet beállítunk hogyan rendereljük az adatokat
     */
    setRenderCallback(callback) {//beállítja a renderCallback mezőt
        this.#renderCallback = callback//beállítja a renderCallback mezőt
    }
    /**
     * 
     * @returns {string} a generált exportot adja vissza
     */
    generateExport() {//generálja az exportot
        const eredmeny = ['forradalom;evszam;sikeres']//létrehozza az eredményt
        for (const pers of this.#array) {//végigmegy az arrayen
            eredmeny.push(`${pers.forradalom};${pers.evszam};${pers.sikeres}`)//hozzáadja az elemet az eredményhez
        }
        return eredmeny.join('\n')//visszaadja az eredményt
    }
    /**
     * 
     * @param {function (Adat): boolean} callback  callback függvény amelyet beállítunk{
     *
     */
    filter(callback) {//szűri az arrayt
        const eredmeny = []//létrehozza az eredményt
        for (const pers of this.#array) {//végigmegy az arrayen
            if (callback(pers)) {//ha a callback igaz
                eredmeny.push(pers)//hozzáadja az elemet az eredményhez
            }
        }
        this.#renderCallback(eredmeny)//visszahívja a renderCallback függvényt
    }
}