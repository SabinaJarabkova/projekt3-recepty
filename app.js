/*
Co je za úkol v tomto projektu:
1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.
2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.
3) Doplň filtrovanání receptů podle kategorie.
4) Doplň řazení receptů podle hodnocení.
5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.
6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

let recepty = document.querySelector('.recepty');
let indexReceptu = 0;
let filterArray = [...receptyConst];

receptyConst.forEach(function(current) { nacitajZoznamReceptov(current); });
nacitajRecept(localStorage.indexA);
aplikujFilter();

function nacitajZoznamReceptov(objekt){
    //vytvorenie div a class=recept
    
    let recept = document.createElement('div');
    recept.className='recept';
    recept.setAttribute('data-index', indexReceptu);

    recepty.appendChild(recept);

    //pridanie onclick
    recept.addEventListener('click', zobrazRecept);
    
    //vytvorenie div class=recept-obrazek
    let receptObrazek = vytvorDiv('recept-obrazek');
    recept.appendChild(receptObrazek);

    //vytvorenie img v div class=recept-obrazek
    vytvorImgObrazek(objekt, receptObrazek);

    //vytvorenie div class=recept-info
    let receptInfo = vytvorDiv('recept-info');
    recept.appendChild(receptInfo);

    //vytvorenie h3 v recept info
    let nadpisReceptInfo = vytvorTitleReceptInfo(objekt);
    receptInfo.appendChild(nadpisReceptInfo);
    
    indexReceptu++ 
}

function vytvorTitleReceptInfo(objekt) {
    let nadpisReceptInfo = document.createElement('h3');
    nadpisReceptInfo.innerHTML = objekt.nadpis;
    nadpisReceptInfo.setAttribute('data-index', indexReceptu);
    return nadpisReceptInfo;
}

function vytvorImgObrazek(objekt, receptObrazek) {
    let receptObrazekImg = document.createElement('img');
    receptObrazekImg.src = objekt.img;
    receptObrazekImg.alt = "Obrazek";
    receptObrazekImg.setAttribute('data-index', indexReceptu);
    receptObrazek.appendChild(receptObrazekImg);
}

function vytvorDiv(className) {
    let receptObrazek = document.createElement('div');
    receptObrazek.className = className;
    receptObrazek.setAttribute('data-index', indexReceptu);
    return receptObrazek;
}

function zobrazRecept(kliknutyRecept, indexKliknutehoReceptu){

    indexKliknutehoReceptu = kliknutyRecept.target.getAttribute('data-index');

    nacitajRecept(indexKliknutehoReceptu);    

    ulozVybranyRecept(indexKliknutehoReceptu);
}

function nacitajRecept(indexKliknutehoReceptu) {
    document.querySelector('#recept-foto').src = filterArray[indexKliknutehoReceptu].img;
    document.querySelector('#recept-kategorie').innerHTML = filterArray[indexKliknutehoReceptu].kategorie;
    document.querySelector('#recept-hodnoceni').innerHTML = filterArray[indexKliknutehoReceptu].hodnoceni;
    document.querySelector('#recept-nazev').innerHTML = filterArray[indexKliknutehoReceptu].nadpis;
    document.querySelector('#recept-popis').innerHTML = filterArray[indexKliknutehoReceptu].popis;
}

//hladanie v receptoch
function spracujHladanie(){
    let hladaneSpojenie = document.querySelector("input[id=hledat]").value;

    filterArray=filterArray.filter(function(jednotlivyRecept){
        let najit=jednotlivyRecept.nadpis.toLowerCase().includes(hladaneSpojenie);
        return najit;
    })
        
    vymazZoznamReceptov();

    indexReceptu=0;
    filterArray.forEach(function(current) {nacitajZoznamReceptov(current);});
}

//filtrovanie podle kategorie
function aplikujFilter(){
    filterArray = [...receptyConst];
    filtrKategorie();
    spracujHladanie();
    radenieHodnoteni();
}

function filtrKategorie(){
    let kategorieFiltr = document.querySelector("select[id=kategorie]").value;

    filterArray=filterArray.filter(function(jednotlivyRecept){
        let najit=jednotlivyRecept.stitek.includes(kategorieFiltr);
        return najit;
    })
        
    vymazZoznamReceptov();

    indexReceptu=0;
    filterArray.forEach(function(current) { nacitajZoznamReceptov(current); });
}

// radenie podle hodnoteni
function radenieHodnoteni(){
    let kategorieHodnoceni = document.querySelector("select[id=razeni]").value;

    if (kategorieHodnoceni==1){
        filterArray.sort(porovnej);
    function porovnej(obj1, obj2) {
        if (obj1.hodnoceni < obj2.hodnoceni) {
            return 1;
        } else {
            return -1;
        }
    };

    } else if (kategorieHodnoceni==2){
        filterArray.sort(porovnej);
        function porovnej(obj1, obj2) {
            if(obj1.hodnoceni > obj2.hodnoceni) {
                return 1;
            } else {
                return -1;
            }
        };
    }
    vymazZoznamReceptov();
    indexReceptu=0;
    filterArray.forEach(function(current) { nacitajZoznamReceptov(current); });
}

function vymazZoznamReceptov(){
    let recept = document.querySelectorAll('.recept');

    for (let i = 0; i<recept.length; i++){
        recepty.removeChild(recept[i]);
    }
}

function ulozVybranyRecept(indexKliknutehoReceptu) {
    localStorage.indexA = indexKliknutehoReceptu;
}



