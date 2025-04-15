class Adat{
    /**
     * @type {string} forradalom az adat típusa
     */
    #forradalom//forradalom privát mező
    /**
     * @type {string} evszam az adat típusa
     */
    #evszam//évszám privát mező
    /**
     * @type {string} sikeres az adat típusa
     */
    #sikeres//sikeres privát mező
    /**
     * @type {string} forradalom getter
     */
    get forradalom(){//forradalom getter
        return this.#forradalom//visszaadja a forradalom mezőt
    }
    /**
     * @type {string} evszam getter
     */
    get evszam(){//évszám getter
        return this.#evszam//visszaadja az évszám mezőt
    }
    /**
     * @type {string} sikeres getter
     */
    get sikeres(){//sikeres getter
        return this.#sikeres//visszaadja a sikeres mezőt
    }
    /**
     * 
     * @param {string} forradalom forradalom neve
     * @param {string} evszam  forradalom éve
     * @param {string} sikeres  sikkeres vagy sem 
     */
    constructor(forradalom,evszam,sikeres){//forradalom, évszám, sikeres konstruktor
        this.#forradalom = forradalom//beállítja a forradalom mezőt
        this.#evszam = evszam//beállítja az évszám mezőt
        this.#sikeres = sikeres//beállítja a sikeres mezőt
    }

}