const elvalaszto = document.createElement('hr');//létrehozzuk az elválasztó vonalat a sima és az oop között
document.body.appendChild(elvalaszto);//hozzáadjuk az elválasztó vonalat a bodyhoz
const fieldellistaoop = [{//létrehozzuk a mezők listáját
    fieldid: 'forradalom',//létrehozzuk a mező azonosítóját 
    fieldlabel: 'forradalom'//létrehozzuk a mező címkéjét
},
{
    fieldid: 'evszam',//létrehozzuk a mező azonosítóját
    fieldlabel: 'evszam'//létrehozzuk a mező címkéjét
}, {
    fieldid: 'sikeres',//létrehozzuk a mező azonosítóját
    fieldlabel: 'sikeres'//létrehozzuk a mező címkéjét
}];//létrehozzuk a mezők listáját
const manager = new Manager();//létrehozzuk a menedzsert
const tableoop = new Table('table',manager);//létrehozzuk a táblázatot
const formoop = new Form('form',fieldellistaoop,manager);//létrehozzuk a formot
const fileUpload = new UploadDownload('fileupload',manager);//létrehozzuk a fájl feltöltőt
const filteroop = new FormFilter('filter',manager);//létrehozzuk a szűrőt