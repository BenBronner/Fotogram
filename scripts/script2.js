// Arrays für Bilder und Beschreibungen
let randomPicture = [
    'img/wildpark_poing/Reh.JPG',
    'img/wildpark_poing/_DSC0047.JPG',
    'img/wildpark_poing/_DSC0091.JPG',
    'img/wildpark_poing/_DSC0108.JPG',
    'img/wildpark_poing/_DSC0189.JPG',
    'img/wildpark_poing/_DSC0212.JPG',
    'img/wildpark_poing/_DSC0239.JPG',
    'img/wildpark_poing/_DSC0260.JPG',
    'img/wildpark_poing/_DSC0281.JPG',
    'img/wildpark_poing/_DSC0548.JPG',
    'img/wildpark_poing/_DSC0604.JPG',
    'img/wildpark_poing/_DSC0618.JPG'
];

let randomDescription = [
    "Reh",
    "Wildschaf",
    "Nutria",
    "Russischer Adler",
    "Bär",
    "Fasan",
    "Wildschwein",
    "Bison",
    "Ferkel",
    "Nutria auf Baumstamm",
    "Bison Gruppe",
    "Luchs"
];

// Arrays für Bilder und Beschreibungen 'Kreta'
let randomPictureSecond = [
    'img/kreta/IMG_5312.jpeg',
    'img/kreta/IMG_5315.jpeg',
    'img/kreta/IMG_5317.jpeg',
    'img/kreta/IMG_5324.jpeg',
    'img/kreta/IMG_5325.jpeg',
    'img/kreta/IMG_5326.jpeg',
    'img/kreta/IMG_5410.jpeg',
    'img/kreta/IMG_5411.jpeg',
    'img/kreta/IMG_5401.jpeg',
    'img/kreta/IMG_5413.jpeg',
    'img/kreta/IMG_5419.jpeg',
    'img/kreta/IMG_5420.jpeg'
];

let randomDescriptionSecond = [
    "Laguna Beach",
    "Aposelemi Beach",
    "Agios-Titos-Kathedrale",
    "Festung Koules",
    "Hafen von Heraklion",
    "Hafen von Heraklion",
    "Mochlos Islet (Psillos)",
    "Mochlos Beach",
    "Blick auf Mochlos",
    "Taverna Bogazi - Mochlos",
    "Taverna Remezzo - Mochlos",
    "Taverna Remezzo - Außenbereich"
];

// Globale Variablen
let currentAlbum = 1;
let items = [];
let currentIndex = 0;

// Initialisierungsfunktion
function initializeGallery() {
    renderFiltered(currentAlbum);
}

// Filter-Funktion für Albumwechsel
function renderFiltered(albumIndex) {
    currentAlbum = albumIndex;
    let pictures = albumIndex === 1 ? randomPicture : randomPictureSecond;
    let descriptions = albumIndex === 1 ? randomDescription : randomDescriptionSecond;
    render(pictures, descriptions);
}

// Render-Funktion für die Galerie
function render(pictures, descriptions) {
    const contentRef = document.getElementById('gallery-content');
    contentRef.innerHTML = '';
    pictures.forEach((picture, index) => {
        contentRef.innerHTML += getNotesTemplate(index, picture, descriptions[index]);
    });
    updateItems();
}

// Template-Funktion für Galerie-Elemente
function getNotesTemplate(index, picture, description) {
    return `<div class="gallery-item" data-index="${index}">
        <img src="${picture}" alt="${description}">
        <span class="image-details">${description}</span>
    </div>`;
}

// Funktion zum Aktualisieren der items-Liste
function updateItems() {
    items = Array.from(document.querySelectorAll('#gallery-content .gallery-item'));
    currentIndex = 0;
}

// Navigation-Funktionen
function showNextImage() {
    currentIndex = (currentIndex + 1) % items.length;
    updateImage();
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateImage();
}

function updateImage() {
    const item = items[currentIndex];
    const img = item.querySelector('img');
    const details = item.querySelector('.image-details');
    document.querySelector('#overlay img').src = img.src;
    document.querySelector('#overlay .details').textContent = details.textContent;
    document.querySelector('.pagination').textContent = `Foto ${currentIndex + 1} von ${items.length}`;
}

// Event Listener reduziert aber der muss sein :-(
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    
    // Event für alle Klicks
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Album-Wechsel
        if (target.classList.contains('album-switch')) {
            const albumIndex = parseInt(target.dataset.album);
            renderFiltered(albumIndex);
        }
        
        // Bild-Auswahl
        if (target.closest('.gallery-item')) {
            const item = target.closest('.gallery-item');
            currentIndex = parseInt(item.dataset.index);
            updateImage();
            document.getElementById('overlay').style.display = 'block';
        }
        
        // Navigation
        if (target.classList.contains('next')) showNextImage();
        if (target.classList.contains('prev')) showPrevImage();
        
        // Overlay schließen
        if (target.id === 'overlay' || target.classList.contains('close-button')) {
            document.getElementById('overlay').style.display = 'none';
        }
    });
});