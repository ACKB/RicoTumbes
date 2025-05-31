document.addEventListener('DOMContentLoaded', () => {
    // --- Carrusel ---
    const carousel = document.querySelector('.carousel');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItemsOriginal = document.querySelectorAll('.carousel-item');

    if (!carousel || !carouselInner || carouselItemsOriginal.length === 0) {
        console.warn('Elementos del carrusel no encontrados. El carrusel no se inicializará.');
    } else {
        let currentPageIndex = 0;
        let itemsPerPage = 1; // Default to 1 for mobile
        let totalPages = 0;
        let slideInterval;

        function updateCarouselConfigAndItems() {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 769) { // Desktop/Tablet view
                itemsPerPage = 2;
            } else { // Mobile view
                itemsPerPage = 1;
            }

            totalPages = Math.ceil(carouselItemsOriginal.length / itemsPerPage);
            
            if (currentPageIndex >= totalPages) {
                currentPageIndex = Math.max(0, totalPages - 1);
            }
            applySlide();
        }

        function applySlide() {
            const offset = -(currentPageIndex * 100); // Each "page" (group of items) takes 100% width
            if (carouselInner) {
                carouselInner.style.transform = `translateX(${offset}%)`;
            }
        }

        function advanceSlide() {
            if (totalPages === 0) return;
            currentPageIndex = (currentPageIndex + 1) % totalPages;
            applySlide();
        }
        
        updateCarouselConfigAndItems(); // Initial setup

        if (totalPages > 0) { // Start interval only if there are pages
            slideInterval = setInterval(advanceSlide, 4000); // Change every 4 seconds
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                clearInterval(slideInterval); 
                updateCarouselConfigAndItems(); 
                if (totalPages > 0) { 
                    slideInterval = setInterval(advanceSlide, 4000);
                }
            }, 250);
        });
    }

    // --- Pestañas (Tabs) ---
    const tabs = document.querySelectorAll('.tab');
    const pageContents = document.querySelectorAll('.page-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('is-active'));
            tab.classList.add('is-active');
            pageContents.forEach(content => {
                content.classList.remove('is-active');
                if (content.id === `${target}-content`) {
                    content.classList.add('is-active');
                }
            });
        });
    });

    // --- Acordeón para Categorías del Menú ---
    const menuCategories = document.querySelectorAll('.menu-category');
    menuCategories.forEach(category => {
        // Hacemos que todo el 'card-header' sea clickeable
        const header = category.querySelector('.card-header'); 
        if (header) {
            header.addEventListener('click', () => {
                category.classList.toggle('is-active');
            });
        }
    });

    // Opcional: Abrir la primera categoría de la carta por defecto si existe
    const firstMenuCategory = document.querySelector('#carta-content .menu-category');
    if (firstMenuCategory) {
        // No es necesario simular un clic si el CSS maneja el estado inicial
        // Si quieres que esté abierta por defecto, podrías añadirle la clase 'is-active' directamente en el HTML
        // o descomentar la siguiente línea si tu lógica de clic es necesaria para algo más:
        // firstMenuCategory.querySelector('.card-header').click();
    }
});
