const ADRES = "https://jsonplaceholder.typicode.com/users";

const wynik = document.getElementById("wynik");
const filtr = document.getElementById("filtr");
const licznik = document.getElementById("licznik");

let uzytkownicy = [];

function bezpieczny(tekst) {
    if (!tekst) return "";
    return String(tekst)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

async function pobierzUzytkownikow() {
    const odp = await fetch(ADRES);
    if (!odp.ok) {
        throw new Error(`Błąd HTTP ${odp.status}: ${odp.statusText}`);
    }
    return await odp.json();
}

function kartaHtml(uzytkownik) {
    const imie = bezpieczny(uzytkownik.name);
    const login = bezpieczny(uzytkownik.username);
    const email = bezpieczny(uzytkownik.email);
    const miasto = bezpieczny(uzytkownik.address?.city);
    const firma = bezpieczny(uzytkownik.company?.name);

    return `
        <li class="karta">
            <h2>${imie}</h2>
            <dl>
                <dt>Login:</dt>
                <dd>${login}</dd>
                <dt>Email:</dt>
                <dd><a href="mailto:${email}">${email}</a></dd>
                <dt>Miasto:</dt>
                <dd>${miasto}</dd>
                <dt>Firma:</dt>
                <dd>${firma}</dd>
            </dl>
        </li>
    `;
}

function pokazListe(lista) {
    if (lista.length === 0) {
        wynik.innerHTML = `<p class="stan">Brak wyników</p>`;
        return;
    }

    wynik.innerHTML = `<ul class="lista">${lista.map(kartaHtml).join("")}</ul>`;
}

function odswiez() {
    const szukane = filtr.value.trim().toLowerCase();

    const widoczne = szukane === ""
        ? uzytkownicy
        : uzytkownicy.filter(u =>
            u.name.toLowerCase().includes(szukane));

    licznik.textContent = `Widocznych: ${widoczne.length} z ${uzytkownicy.length}`;

    pokazListe(widoczne);
}

filtr.addEventListener("input", odswiez);

async function start() {
    filtr.disabled = true;

    try {
        uzytkownicy = await pobierzUzytkownikow();
        filtr.disabled = false;
        odswiez();
        filtr.focus();
    } catch (blad) {
        pokazBlad(blad.message);
        licznik.textContent = "";
    }
}

function pokazBlad(komunikat) {
    wynik.innerHTML = `
        <p class="stan stan--blad">
            <strong>Nie udało się pobrać danych.</strong>
            ${bezpieczny(komunikat)}
        </p>`;
}

start();