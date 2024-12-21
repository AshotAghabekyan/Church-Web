window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.remove(); 
        }, 500);
    }
});


const verses = [
    { text: "“Я есмь путь и истина и жизнь...”", reference: "Иоанн 14:6" },
    { text: "“Господь — свет мой и спасение мое...”", reference: "Псалом 26:1" },
    { text: "“Ибо так возлюбил Бог мир, что отдал Сына Своего Единородного...”", reference: "Иоанн 3:16" }
];

document.addEventListener('DOMContentLoaded', () => {
    const verseElement = document.querySelector('.verse');
    const referenceElement = document.querySelector('.verse-reference');

    if (verseElement && referenceElement) {
        const randomVerse = verses[Math.floor(Math.random() * verses.length)];
        verseElement.textContent = randomVerse.text;
        referenceElement.textContent = randomVerse.reference;
    }
});



