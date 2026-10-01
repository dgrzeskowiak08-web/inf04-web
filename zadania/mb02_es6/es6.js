export const kursy = [
    { nazwa: "React", godziny: 30, aktywny: true },
    { nazwa: "Node.js", godziny: 20, aktywny: false },
    { nazwa: "MySQL", godziny: 15, aktywny: true },
    { nazwa: "Bootstrap", godziny: 10, aktywny: true }
];

export const nazwyAktywnych = tablica =>
    tablica.filter(k => k.aktywny).map(k => k.nazwa);

export const sumaGodzin = tablica =>
    tablica.reduce((suma, k) => suma + k.godziny, 0);

export const opis = ({ nazwa, godziny }) =>
    `Kurs ${nazwa} trwa ${godziny} godzin`;

export const dodajGodziny = (kurs, dodatek) => ({
    ...kurs,
    godziny: kurs.godziny + dodatek
});