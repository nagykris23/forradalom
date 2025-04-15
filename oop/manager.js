class Manager {
    #array//array privat mező
    #addDatacCallback//addDatacCallback privat mező
    #renderCallback//renderCallback privat mező

    constructor() {
        this.#array = []//beállítja az array mezőt
    }
    setAddDatacCallback(callback) {//beállítja az addDatacCallback mezőt
        this.#addDatacCallback = callback//beállítja az addDatacCallback mezőt
    }
    addData(data) {//hozzáadja az adatot az arrayhez
        this.#array.push(data)//hozzáadja az adatot az arrayhez
        this.#addDatacCallback(data)//visszahívja az addDatacCallback függvényt
      
    }
    setRenderCallback(callback) {//beállítja a renderCallback mezőt
        this.#renderCallback = callback//beállítja a renderCallback mezőt
    }
    generateExport() {//generálja az exportot
        const eredmeny = ['forradalom;evszam;sikeres']//létrehozza az eredményt
        for (const pers of this.#array) {//végigmegy az arrayen
            eredmeny.push(`${pers.forradalom};${pers.evszam};${pers.sikeres}`)//hozzáadja az elemet az eredményhez
        }
        return eredmeny.join('\n')//visszaadja az eredményt
    }
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