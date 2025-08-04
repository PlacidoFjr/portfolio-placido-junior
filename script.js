// Dados dos projetos
const projectsData = [
    {
        id: 1,
        title: "Suporte Técnico TI",
        description: "Sistema completo de atendimento técnico especializado com agendamento e acompanhamento.",
        technologies: ["React", "Node.js", "MongoDB"],
        demoLink: "https://suportepjr.vercel.app/",
        githubLink: "https://github.com/PlacidoFjr/SuporteTI",
        image: "Suporte Técnico TI"
    },
    {
        id: 2,
        title: "Burguer Website",
        description: "Website moderno para hamburgueria com cardápio interativo e sistema de pedidos online.",
        technologies: ["HTML", "CSS", "JavaScript"],
        demoLink: "https://site-burguer-six.vercel.app/",
        githubLink: "https://github.com/PlacidoFjr/BurguerWebsite",
        image: "Burguer Website"
    },
    {
        id: 3,
        title: "NaxelTech",
        description: "Plataforma completa de soluções tecnológicas para empresas, com foco em transformação digital e estratégias de TI.",
        technologies: ["React", "Tailwind", "JavaScript"],
        demoLink: "https://naxel-tech.vercel.app/",
        githubLink: "https://github.com/PlacidoFjr/NaxelTech",
        image: "NaxelTech"
    }
];

// Classe principal da aplicação
class Portfolio {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupMobileMenu();
        this.renderProjects();
        this.setupContactForm();
        this.setupConstellationAnimation();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
    }

    // Sistema de tema claro/escuro
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeText = themeToggle.querySelector('.theme-text');
        
        // Aplicar tema inicial
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeText(themeText);

        // Event listener para toggle
        themeToggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            localStorage.setItem('theme', this.currentTheme);
            this.updateThemeText(themeText);
        });
    }

    updateThemeText(themeText) {
        themeText.textContent = this.currentTheme === 'light' ? 'Modo Escuro' : 'Modo Claro';
    }

    // Navegação
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Fechar menu mobile se estiver aberto
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            });
        });

        // Highlight do link ativo
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Menu mobile
    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Renderizar projetos
    renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        projectsData.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const githubLink = project.githubLink ? 
            `<a href="${project.githubLink}" class="project-link" target="_blank" rel="noopener">GitHub</a>` : '';

        card.innerHTML = `
            <div class="project-image">
                ${project.image}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link" target="_blank" rel="noopener">Ver Demo</a>
                    ${githubLink}
                </div>
            </div>
        `;

        return card;
    }

    // Formulário de contato
    setupContactForm() {
        const form = document.getElementById('contact-form');
        
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });

        // Validação em tempo real
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validar todos os campos
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Simular envio (aqui você integraria com um serviço real)
            this.showSuccessMessage();
            form.reset();
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        // Validações específicas
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Nome é obrigatório';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                    isValid = false;
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email é obrigatório';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Email inválido';
                    isValid = false;
                }
                break;
            
            case 'subject':
                if (!value) {
                    errorMessage = 'Assunto é obrigatório';
                    isValid = false;
                }
                break;
            
            case 'message':
                if (!value) {
                    errorMessage = 'Mensagem é obrigatória';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
                    isValid = false;
                }
                break;
        }

        // Mostrar/esconder erro
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = errorMessage ? 'block' : 'none';
        }

        // Adicionar classe de erro ao campo
        field.classList.toggle('error', !isValid);

        return isValid;
    }

    showSuccessMessage() {
        // Criar elemento de sucesso
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <p>✅ Mensagem enviada com sucesso! Entrarei em contato em breve.</p>
        `;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(successDiv);

        // Remover após 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Animação da constelação
    setupConstellationAnimation() {
        const constellation = document.getElementById('constellation');
        if (!constellation) return;

        const dots = [];
        const lines = [];
        const numDots = 20;

        // Criar pontos
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'constellation-dot';
            
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            dot.style.left = `${x}%`;
            dot.style.top = `${y}%`;
            dot.style.animationDelay = `${Math.random() * 3}s`;
            
            constellation.appendChild(dot);
            dots.push({ element: dot, x, y });
        }

        // Conectar pontos próximos
        this.connectDots(constellation, dots);

        // Animar pontos
        this.animateConstellation(dots);
    }

    connectDots(container, dots) {
        dots.forEach((dot1, i) => {
            dots.slice(i + 1).forEach(dot2 => {
                const distance = Math.sqrt(
                    Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2)
                );

                if (distance < 25) {
                    const line = document.createElement('div');
                    line.className = 'constellation-line';
                    
                    const angle = Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x);
                    const length = distance;
                    
                    line.style.left = `${dot1.x}%`;
                    line.style.top = `${dot1.y}%`;
                    line.style.width = `${length}%`;
                    line.style.transform = `rotate(${angle}rad)`;
                    
                    container.appendChild(line);
                }
            });
        });
    }

    animateConstellation(dots) {
        setInterval(() => {
            dots.forEach(dot => {
                const currentX = parseFloat(dot.element.style.left);
                const currentY = parseFloat(dot.element.style.top);
                
                const newX = currentX + (Math.random() - 0.5) * 0.5;
                const newY = currentY + (Math.random() - 0.5) * 0.5;
                
                dot.element.style.left = `${Math.max(0, Math.min(100, newX))}%`;
                dot.element.style.top = `${Math.max(0, Math.min(100, newY))}%`;
                
                dot.x = newX;
                dot.y = newY;
            });
        }, 3000);
    }

    // Animações de scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animatedElements = document.querySelectorAll(
            '.project-card, .about-content, .contact-content, .skills-grid'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Scroll suave
    setupSmoothScrolling() {
        // Adicionar comportamento suave para todos os links âncora
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Utilitários
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Error Boundary simples
class ErrorHandler {
    static init() {
        window.addEventListener('error', (e) => {
            console.error('Erro capturado:', e.error);
            this.showErrorMessage('Ops! Algo deu errado. Tente recarregar a página.');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rejeitada:', e.reason);
            this.showErrorMessage('Erro de conexão. Verifique sua internet.');
        });
    }

    static showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #e53e3e;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1001;
                max-width: 300px;
            ">
                ⚠️ ${message}
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    try {
        ErrorHandler.init();
        new Portfolio();
        console.log('✅ Portfolio inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar portfolio:', error);
        ErrorHandler.showErrorMessage('Erro ao carregar o portfolio');
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Página carregada em ${loadTime}ms`);
    });
}

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration);
            })
            .catch(registrationError => {
                console.log('SW falhou:', registrationError);
            });
    });
}
