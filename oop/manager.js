class Manager {
    #array//array privat mező
    #addDatacCallback//addDatacCallback privat mező

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
    generateExport() {//generálja az exportot
        const eredmeny = ['forradalom;evszam;sikeres']//létrehozza az eredményt
        for (const pers of this.#array) {//végigmegy az arrayen
            eredmeny.push(`${pers.forradalom};${pers.evszam};${pers.sikeres}`)//hozzáadja az elemet az eredményhez
        }
        return eredmeny.join('\n')//visszaadja az eredményt
    }
}