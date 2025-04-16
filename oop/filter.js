
class FormFilter extends Area {//létrehozzuk a FormFilter osztályt
    /**
     * 
     * @param {string} cssClass  css osztály neve amelyet beállítunk 
     * @param {Manager} manager  manager amelyet beállítunk 
     */
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

        const gomb = this.gombletrehozas('Szűrés');//létrehozzuk a gombot
        form.appendChild(gomb);//hozzáadjuk a gombot a formhoz

        const talalatokoop = document.createElement('p');//létrehozzuk a találatok számát megjelenítő elemet 
        this.div.appendChild(talalatokoop);//hozzáadjuk a találatok számát megjelenítő elemet a divhez
       

        form.addEventListener('submit', (e) => {//hozzáadunk egy eseményfigyelőt a formhoz
            e.preventDefault();//megakadályozzuk az alapértelmezett viselkedést

            const filterbemenet = e.target.querySelector('#inputfilter').value.trim() ;//lekérjük a szövegmezőt
            const filterselect = e.target.querySelector('select').value;//lekérjük a legördülő menüt


            let db = 0;//létrehozzuk a db változót
            this.manager.filter((adat) => {//szűrjük az adatokat
               if(filterselect === ''&& filterbemenet === ''){//ha nincs kiválasztva semmi és a szövegmező üres
                    db++;//növeljük a db változót
                    return true;//visszatérünk igaz értékkel
                }
                if(filterselect === ''){//ha nincs kiválasztva semmi
                    return false;//visszatérünk hamis értékkel
                }
                if(filterbemenet !== ''){//ha a szövegmező nem üres
                   const egyezik = adat[filterselect] == filterbemenet;//ellenőrizzük, hogy az adatban lévő mező értéke megegyezik-e a szövegmező értékével
                   if(egyezik)db++;//növeljük a db változót
                   return egyezik;//visszatérünk az egyezés értékével

                    
                }
            
                return false;//visszatérünk hamis értékkel 
               
            })
            talalatokoop.innerText = `Találatok: ${db}`;//beállítjuk a találatok számát megjelenítő elem szövegét

        })
    }
}