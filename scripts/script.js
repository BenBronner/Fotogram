// Arrays für Bilder und Beschreibungen
let randomPicture = [
    'img/Reh.JPG',
    'img/_DSC0047.JPG',
    'img/_DSC0091.JPG',
    'img/_DSC0108.JPG',
    'img/_DSC0189.JPG',
    'img/_DSC0212.JPG',
    'img/_DSC0239.JPG',
    'img/_DSC0260.JPG',
    'img/_DSC0281.JPG',
    'img/_DSC0548.JPG',
    'img/_DSC0604.JPG',
    'img/_DSC0618.JPG'
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

// Render-Funktion mit korrekter Initialisierung
function render() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = ''; // Zuerst alle vorhandenen Elemente entfernen
    
    for (let index = 0; index < randomPicture.length; index++) {
        contentRef.innerHTML += `<div class="gallery-item">
            <img src="${randomPicture[index]}" alt="${randomDescription[index]}">
            <span class="image-details">${randomDescription[index]}</span>
        </div>`;
    }
}

// DOMContentLoaded Event-Handler
document.addEventListener('DOMContentLoaded', function () {
    render(); // Galerie zuerst rendern
    
    const gallery = document.querySelector('.gallery');
    const overlay = document.getElementById('overlay');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const pagination = document.querySelector('.pagination');
    
    // Erst nach dem Rendering die items-Variable initialisieren
    const items = Array.from(document.querySelectorAll('#content .gallery-item'));
    
    let currentIndex = 0;

    // Klick auf Galerie-Bilder
    gallery.addEventListener('click', function (e) {
        const item = e.target.closest('#content .gallery-item');
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