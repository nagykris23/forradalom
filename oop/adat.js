class Adat{
    #forradalom//forradalom privát mező
    #evszam//évszám privát mező
    #sikeres//sikeres privát mező
    
    get forradalom(){//forradalom getter
        return this.#forradalom//visszaadja a forradalom mezőt
    }
    get evszam(){//évszám getter
        return this.#evszam//visszaadja az évszám mezőt
    }
    get sikeres(){//sikeres getter
        return this.#sikeres//visszaadja a sikeres mezőt
    }

    constructor(forradalom,evszam,sikeres){//forradalom, évszám, sikeres konstruktor
        this.#forradalom = forradalom//beállítja a forradalom mezőt
        this.#evszam = evszam//beállítja az évszám mezőt
        this.#sikeres = sikeres//beállítja a sikeres mezőt
    }

}