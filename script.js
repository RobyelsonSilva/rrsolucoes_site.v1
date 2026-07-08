document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // CONFIGURAÇÕES FÁCEIS DE ALTERAR
    // ============================================================
    const WHATSAPP_NUMBER = "5579998676424";
    const WHATSAPP_MESSAGE = "Olá! Conheci a RR Soluções Tecnológicas pelo site e gostaria de conversar sobre soluções para minha empresa.";
    const CONTACT_EMAIL = "contato@rrsolucoes.tech";
    const EMAIL_SUBJECT = "Contato pelo site - RR Soluções Tecnológicas";

    // ============================================================
    // VERIFICA PREFERÊNCIA POR MOVIMENTO REDUZIDO
    // ============================================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================================
    // HEADER AO ROLAR
    // ============================================================
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ============================================================
    // MENU MOBILE
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        const isOpen = hamburger.classList.toggle('active');
        navList.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navList.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger && navList) {
        hamburger.addEventListener('click', toggleMenu);

        // Fechar ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fechar ao pressionar ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navList.classList.contains('open')) {
                closeMenu();
                hamburger.focus();
            }
        });

        // Resetar ao redimensionar para desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 769 && navList.classList.contains('open')) {
                    closeMenu();
                }
            }, 250);
        });
    }

    // ============================================================
    // NAVEGAÇÃO SUAVE
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Fechar menu mobile se estiver aberto
                if (navList && navList.classList.contains('open')) {
                    closeMenu();
                }
            }
        });
    });

    // ============================================================
    // LINK ATIVO DO MENU - Intersection Observer
    // ============================================================
    const navLinksArray = Array.from(navLinks);
    const menuSectionIds = navLinksArray
        .map(link => link.getAttribute('href'))
        .filter(href => href && href.startsWith('#'))
        .map(href => href.substring(1));
    const sections = menuSectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ============================================================
    // ANIMAÇÕES DURANTE O SCROLL
    // ============================================================
    if (!prefersReducedMotion) {
        const animationConfigs = [
            { selector: '.section-title', class: 'fade-up' },
            { selector: '.section-text', class: 'fade-up' },
            { selector: '.problema-text', class: 'fade-left' },
            { selector: '.problema-image', class: 'fade-right' },
            { selector: '.card-perspectiva', class: 'fade-up' },
            { selector: '.sobre-image', class: 'fade-left' },
            { selector: '.sobre-text', class: 'fade-right' },
            { selector: '.card-solucao', class: 'fade-up' },
            { selector: '.monitoramento-painel', class: 'fade-up' },
            { selector: '.timeline', class: 'stagger-children' },
            { selector: '.diferenciais-grid', class: 'stagger-children' },
            { selector: '.manifesto-content', class: 'reveal' },
            { selector: '.cta-content', class: 'fade-up' }
        ];

        // Aplica classes de animação
        animationConfigs.forEach(config => {
            document.querySelectorAll(config.selector).forEach(el => {
                // Não adiciona classe se já tiver
                if (!el.classList.contains(config.class)) {
                    el.classList.add(config.class);
                }
            });
        });

        // Observer para animações
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Se tem stagger-children, ativa o stagger
                    if (target.classList.contains('stagger-children')) {
                        const children = target.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('visible');
                            }, 100 * index);
                        });
                        target.classList.add('visible');
                    } else {
                        target.classList.add('visible');
                    }
                    
                    animationObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observa todos os elementos com classes de animação
        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .reveal, .stagger-children, .card-perspectiva, .card-solucao, .problema-text, .problema-image, .sobre-image, .sobre-text, .monitoramento-painel, .manifesto-content, .cta-content').forEach(el => {
            animationObserver.observe(el);
        });

    } else {
        // Se preferir movimento reduzido, exibe todos os elementos imediatamente
        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .reveal, .stagger-children, .card-perspectiva, .card-solucao').forEach(el => {
            el.classList.add('visible');
            if (el.classList.contains('stagger-children')) {
                Array.from(el.children).forEach(child => {
                    child.classList.add('visible');
                });
            }
        });
    }

    // ============================================================
    // BOTÃO WHATSAPP
    // ============================================================
    const whatsappBtn = document.getElementById('whatsappBtn');

    function openWhatsApp() {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    }

    // Configura links do WhatsApp no footer
    document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    });

    // ============================================================
    // BOTÃO "INICIAR UMA CONVERSA" (EMAIL)
    // ============================================================
    const ctaButton = document.querySelector('#cta .btn-primary');

    function openEmail() {
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
        window.location.href = mailtoLink;
    }

    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            openEmail();
        });
    }

    // ============================================================
    // VERIFICA SE TODOS OS ELEMENTOS EXISTEM ANTES DE USAR
    // ============================================================
    console.log('RR Soluções Tecnológicas - Site carregado com sucesso!');
});
