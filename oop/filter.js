class FormFilter extends Area {//létrehozzuk a FormFilter osztályt
    constructor(cssClass, manager) {//létrehozzuk a konstruktorot
        super(cssClass, manager);//meghívjuk a szülő osztály konstruktorát
        const form = document.createElement('form');//létrehozzuk a formot
        this.div.appendChild(form);//hozzáadjuk a formot a divhez

        const select = document.createElement('select');//létrehozzuk a legördülő menüt
        form.appendChild(select);//hozzáadjuk a legördülő menüt a formhoz

        const opciok = [
            {value: '', label:'Válassz'},
            { value: 'forradalom', label: 'forradalom' },
            { value: 'evszam', label: 'evszam' },
            { value: 'sikeres', label: 'sikeres' }
        ]
        for (const opcio of opciok) {//végigmegyünk az opciókon
            const option = document.createElement('option');//létrehozzuk az opciót
            option.value = opcio.value;//beállítjuk az opció értékét
            option.innerText = opcio.label;//beállítjuk az opció szövegét
            select.appendChild(option);//hozzáadjuk az opciót a legördülő menühöz
        }
        const input = document.createElement('input');//létrehozzuk a szövegmezőt
        input.id = 'inputfilter';//beállítjuk a szövegmező azonosítóját
        form.appendChild(input);//hozzáadjuk a szövegmezőt a formhoz

        const gomb = document.createElement('button');//létrehozzuk a gombot
        gomb.innerText = 'szűrés';//beállítjuk a gomb szövegét
        form.appendChild(gomb);//hozzáadjuk a gombot a formhoz

        form.addEventListener('submit', (e) => {//hozzáadunk egy eseményfigyelőt a formhoz
            e.preventDefault();//megakadályozzuk az alapértelmezett viselkedést

            const filterbemenet = e.target.querySelector('#inputfilter');//lekérjük a szövegmezőt
            const filterselect = e.target.querySelector('select').value;//lekérjük a legördülő menüt

            this.manager.filter((data) => {//szűrjük az adatokat
                if (filterselect === '') {//ha a legördülő menü üres
                    return true;//visszaadjuk az adatokat
                }
                if(filterselect === 'evszam') {//ha az évszámot választottuk
                    return data[filterselect] == filterbemenet.value;//visszaadjuk az adatokat
                }
                return data[filterselect] === filterbemenet.value;//visszaadjuk az adatokat
            })
        })
    }
}