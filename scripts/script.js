// Arrays für Bilder und Beschreibungen 'Wildpark Poing'
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
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12"
];

// Filter für Alben

let currentPicture = [];

let currentDescription = [];

// Initialisierungsfunktion
function initializeGallery() {
    renderFiltered(1); // Standardalbum laden
}

// Event Listener für DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
});


// Filter-Funktion
function renderFiltered(index) {
    if (index == 1) {
        arrPicture = randomPicture;
        arrDescription = randomDescription;
        render()
    }
    if (index == 2) {
        arrPicture = randomPictureSecond;
        arrDescription = randomDescriptionSecond;
        render()
    }
}

// Render-Funktion
function render() {
    let contentRef = document.getElementById('gallery-content');
    contentRef.innerHTML = ''; // Zuerst alle vorhandenen Elemente entfernen
    
    for (let index = 0; index < arrPicture.length; index++) {
        contentRef.innerHTML += getNotesTemplate(index, arrPicture, arrDescription);
    }
}

// Template-Funktion
function getNotesTemplate(index) {
    return `<div class="gallery-item">
            <img src="${arrPicture[index]}" alt="${arrDescription[index]}">
            <span class="image-details">${arrDescription[index]}</span>
        </div>`
}

// Event Listener für DOMContentLoaded für Overlay
document.addEventListener('DOMContentLoaded', function () {
    render(); // Galerie zuerst rendern
    
    const gallery = document.querySelector('.gallery');
    const overlay = document.getElementById('overlay');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const pagination = document.querySelector('.pagination');
    
    // Erst nach dem Rendering die items-Variable initialisieren
    const items = Array.from(document.querySelectorAll('#gallery-content .gallery-item'));
    
    let currentIndex = 0;

    // Klick auf Galerie-Bilder
    gallery.addEventListener('click', function (e) {
        const item = e.target.closest('#gallery-content .gallery-item');
        if (!item) return;
        
        currentIndex = items.indexOf(item);
        
        const img = item.querySelector('img');
        const details = item.querySelector('.image-details');
        overlay.querySelector('img').src = img.src;
        overlay.querySelector('.details').textContent = details.textContent;
        updatePagination();
        overlay.style.display = 'block';
    });

    // Navigation-Funktionen
    function updatePagination() {
        pagination.textContent = `Foto ${currentIndex + 1} von ${items.length}`;
    }

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
        overlay.querySelector('img').src = img.src;
        overlay.querySelector('.details').textContent = details.textContent;
        updatePagination();
    }

    // Event Listener für Navigation
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Tastatur-Navigation
    document.addEventListener('keydown', function (e) {
        if (overlay.style.display !== 'block') return;
        switch (e.key) {
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                overlay.style.display = 'none';
                break;
        }
    });

    // Schließen des Overlays
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});