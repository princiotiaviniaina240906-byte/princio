function openSection(sectionId) {
    // 1. Cacher l'écran d'accueil
    document.getElementById('home-screen').classList.remove('active');
    
    // 2. Afficher la section correspondante
    const target = document.getElementById(sectionId);
    target.classList.add('active');
    
    // 3. Remonter en haut de la page
    window.scrollTo(0,0);
}

function closeSection() {
    // 1. Cacher toutes les sections ouvertes
    const allSections = document.querySelectorAll('.full-section');
    allSections.forEach(sec => sec.classList.remove('active'));
    
    // 2. Réafficher l'écran d'accueil
    document.getElementById('home-screen').classList.add('active');
}
