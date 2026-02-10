// Gestionnaire d'événements pour le DOM
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation
    initPortfolio();
    
    // Gestion des boutons principaux
    const mainButtons = document.querySelectorAll('.main-btn');
    mainButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            showContentScreen(target);
        });
    });
    
    // Gestion des boutons retour
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            showHomeScreen();
        });
    });
    
    // Gestion des détails de projets
    const toggleButtons = document.querySelectorAll('.toggle-details-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            toggleProjectDetails(projectId, this);
        });
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmit();
        });
    }
    
    // Gestion du formulaire newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit();
        });
    }
    
    // Gestion du QR Code
    const qrButton = document.getElementById('qrButton');
    const qrModal = document.getElementById('qrModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (qrButton) {
        qrButton.addEventListener('click', function() {
            qrModal.classList.add('active');
            generateQRCode();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            qrModal.classList.remove('active');
        });
    }
    
    // Fermer la modal en cliquant en dehors
    window.addEventListener('click', function(e) {
        if (e.target === qrModal) {
            qrModal.classList.remove('active');
        }
    });
    
    // Copier l'URL
    const copyUrlBtn = document.querySelector('.copy-url-btn');
    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', copyPortfolioUrl);
    }
    
    // Partage
    const shareButton = document.getElementById('shareButton');
    if (shareButton) {
        shareButton.addEventListener('click', sharePortfolio);
    }
    
    // Thème sombre/clair
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Fonctions principales
function initPortfolio() {
    // Vérifier si c'est la première visite
    if (!localStorage.getItem('portfolioVisited')) {
        localStorage.setItem('portfolioVisited', 'true');
        showWelcomeMessage();
    }
    
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'dark') {
        enableDarkTheme();
        updateThemeToggleIcon(true);
    }
}

function showWelcomeMessage() {
    console.log('Bienvenue sur le portfolio de Tiavina !');
    // Vous pouvez ajouter une notification ici si besoin
}

function showContentScreen(screenId) {
    // Cacher l'écran d'accueil
    document.getElementById('homeScreen').classList.remove('active');
    
    // Cacher toutes les sections de contenu
    const contentScreens = document.querySelectorAll('.content-screen');
    contentScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Fermer tous les détails de projets ouverts
        const projectDetails = document.querySelectorAll('.project-details');
        projectDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Mettre à jour le texte des boutons de détails
        const toggleButtons = document.querySelectorAll('.toggle-details-btn');
        toggleButtons.forEach(button => {
            button.innerHTML = '<i class="fas fa-chevron-down"></i> Voir les détails';
        });
        
        // Scroll vers le haut
        window.scrollTo(0, 0);
    }
}

function showHomeScreen() {
    // Cacher toutes les sections de contenu
    const contentScreens = document.querySelectorAll('.content-screen');
    contentScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Afficher l'écran d'accueil
    document.getElementById('homeScreen').classList.add('active');
    
    // Scroll vers le haut
    window.scrollTo(0, 0);
}

function toggleProjectDetails(projectId, button) {
    const details = document.getElementById(`details-${projectId}`);
    const isActive = details.classList.contains('active');
    
    // Fermer tous les autres détails
    const allDetails = document.querySelectorAll('.project-details');
    allDetails.forEach(detail => {
        if (detail.id !== `details-${projectId}`) {
            detail.classList.remove('active');
        }
    });
    
    // Mettre à jour tous les boutons
    const allButtons = document.querySelectorAll('.toggle-details-btn');
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> Voir les détails';
        }
    });
    
    // Basculer l'état actuel
    if (isActive) {
        details.classList.remove('active');
        button.innerHTML = '<i class="fas fa-chevron-down"></i> Voir les détails';
    } else {
        details.classList.add('active');
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Masquer les détails';
    }
}

function handleContactSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validation simple
    if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return;
    }
    
    // Simuler l'envoi (dans un cas réel, utiliser fetch() vers un serveur)
    console.log('Message envoyé:', { name, email, subject, message });
    
    // Afficher un message de confirmation
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    
    // Réinitialiser le formulaire
    document.getElementById('contactForm').reset();
    document.getElementById('name').value = 'Tiavina';
    document.getElementById('email').value = 'princiotiaviniaina240906@gmail.com';
    document.getElementById('subject').value = 'Proposition de Stage';
}

function handleNewsletterSubmit() {
    const email = document.getElementById('newsletter-email').value;
    const option1 = document.getElementById('option1').checked;
    const option2 = document.getElementById('option2').checked;
    const option3 = document.getElementById('option3').checked;
    
    if (!email) {
        alert('Veuillez entrer votre adresse email.');
        return;
    }
    
    // Validation basique d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }
    
    // Simuler l'inscription
    console.log('Inscription newsletter:', { email, option1, option2, option3 });
    
    // Afficher un message de confirmation
    alert('Merci pour votre inscription à la newsletter ! Vous recevrez bientôt notre premier email.');
    
    // Réinitialiser le formulaire
    document.getElementById('newsletterForm').reset();
    document.getElementById('option1').checked = true;
    document.getElementById('option2').checked = true;
}

function generateQRCode() {
    // Dans une vraie implémentation, utiliser une bibliothèque QR Code
    // Pour l'instant, affichage statique
    const url = window.location.href;
    document.getElementById('portfolioUrl').textContent = url;
    console.log('QR Code généré pour:', url);
}

function copyPortfolioUrl() {
    const url = window.location.href;
    
    // Utiliser l'API Clipboard
    navigator.clipboard.writeText(url).then(() => {
        // Afficher un feedback
        const originalText = document.querySelector('.copy-url-btn').innerHTML;
        document.querySelector('.copy-url-btn').innerHTML = '<i class="fas fa-check"></i> Copié !';
        
        setTimeout(() => {
            document.querySelector('.copy-url-btn').innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        alert('Impossible de copier l\'URL. Veuillez la copier manuellement.');
    });
}

function sharePortfolio() {
    const shareData = {
        title: 'Portfolio - RAKOTOVAO Tiaviniaina Princio',
        text: 'Découvrez le portfolio de Tiavina, étudiant en Télécommunications, Réseaux & Systèmes',
        url: window.location.href
    };
    
    // Utiliser l'API Web Share si disponible
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Partage réussi'))
            .catch(error => console.log('Erreur de partage:', error));
    } else {
        // Fallback : copier le lien
        copyPortfolioUrl();
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    
    if (isDark) {
        disableDarkTheme();
        localStorage.setItem('portfolioTheme', 'light');
        updateThemeToggleIcon(false);
    } else {
        enableDarkTheme();
        localStorage.setItem('portfolioTheme', 'dark');
        updateThemeToggleIcon(true);
    }
}

function enableDarkTheme() {
    document.body.classList.add('dark-theme');
    
    // Mettre à jour les couleurs CSS
    document.documentElement.style.setProperty('--bg-light', '#2d3436');
    document.documentElement.style.setProperty('--bg-white', '#1e272e');
    document.documentElement.style.setProperty('--text-dark', '#ffffff');
    document.documentElement.style.setProperty('--text-gray', '#b2bec3');
    document.documentElement.style.setProperty('--border-light', '#3d3d3d');
    
    // Mettre à jour les fonds spécifiques
    const elementsToUpdate = document.querySelectorAll('.profile-header, .main-btn, .certificate-card, .timeline-item, .soft-skill, .competency, .testimonial-card, .project-card');
    elementsToUpdate.forEach(el => {
        el.style.filter = 'brightness(0.9)';
    });
}

function disableDarkTheme() {
    document.body.classList.remove('dark-theme');
    
    // Restaurer les couleurs par défaut
    document.documentElement.style.setProperty('--bg-light', '#f8f9fa');
    document.documentElement.style.setProperty('--bg-white', '#ffffff');
    document.documentElement.style.setProperty('--text-dark', '#2c3e50');
    document.documentElement.style.setProperty('--text-gray', '#7f8c8d');
    document.documentElement.style.setProperty('--border-light', '#e0e0e0');
    
    // Restaurer les fonds
    const elementsToUpdate = document.querySelectorAll('.profile-header, .main-btn, .certificate-card, .timeline-item, .soft-skill, .competency, .testimonial-card, .project-card');
    elementsToUpdate.forEach(el => {
        el.style.filter = 'none';
    });
}

function updateThemeToggleIcon(isDark) {
    const icon = document.querySelector('#themeToggle i');
    if (isDark) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Gestion du responsive
window.addEventListener('resize', function() {
    // Ajustements si nécessaire
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 768) {
        // Ajustements pour mobile
        document.querySelectorAll('.main-btn span').forEach(span => {
            if (span.textContent.length > 20) {
                span.style.fontSize = '0.9rem';
            }
        });
    }
});

// Effets de survol avancés
document.querySelectorAll('.main-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation au défilement
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Effet parallaxe léger sur l'en-tête
    const profileHeader = document.querySelector('.profile-header');
    if (profileHeader && scrolled < 300) {
        profileHeader.style.transform = `translateY(${rate}px)`;
    }
});

// Chargement des images
window.addEventListener('load', function() {
    // Simuler le chargement des images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
    
    // Afficher un message de bienvenue après le chargement
    setTimeout(() => {
        console.log('Portfolio entièrement chargé et prêt !');
    }, 1000);
});
