


window.addEventListener("load", () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.remove(); 
        }, 500);
    }
});


var bibleVerses = [
    { text: "“The Lord is my shepherd; I shall not want.”", reference: "Psalm 23:1" },
    { text: "“For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.”", reference: "Jeremiah 29:11" },
    { text: "“The Lord is near to the brokenhearted and saves the crushed in spirit.”", reference: "Psalm 34:18" },
    { text: "“I can do all things through him who strengthens me.”", reference: "Philippians 4:13" },
    { text: "“The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.”", reference: "Philippians 4:7" },
    { text: "“But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness, and self-control.”", reference: "Galatians 5:22-23" },
    { text: "“For where your treasure is, there your heart will be also.”", reference: "Matthew 6:21" },
    { text: "“Let all that you do be done in love.”", reference: "1 Corinthians 16:14" },
    { text: "“For God gave us a spirit not of fear but of power and love and self-control.”", reference: "2 Timothy 1:7" },
    { text: "“The Lord is my light and my salvation; whom shall I fear?”", reference: "Psalm 27:1" }
];


document.addEventListener('DOMContentLoaded', () => {
    const verseElement = document.querySelector('.verse');
    const referenceElement = document.querySelector('.verse-reference');

    if (verseElement && referenceElement) {
        const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
        verseElement.textContent = randomVerse.text;
        referenceElement.textContent = randomVerse.reference;
    }
});



