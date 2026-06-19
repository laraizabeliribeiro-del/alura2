// ============================================
// MAIN.JS - Funcionalidades gerais do site
// ============================================

// Elementos do DOM
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');

// ============================================
// NAVEGAÇÃO E PÁGINAS
// ============================================

/**
 * Muda para uma página específica
 * @param {string} pageId - ID da página a exibir
 */
function changePage(pageId) {
    // Remove classe active de todas as páginas
    pages.forEach(page => page.classList.remove('active'));
    
    // Remove classe active de todos os links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Adiciona classe active à página selecionada
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Adiciona classe active ao link correspondente
    const selectedLink = document.querySelector(`[data-page="${pageId}"]`);
    if (selectedLink) {
        selectedLink.classList.add('active');
    }
    
    // Fecha menu mobile
    navMenu.classList.remove('active');
    
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// EVENT LISTENERS - NAVEGAÇÃO
// ============================================

// Clique nos links de navegação
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        changePage(pageId);
    });
});

// Menu toggle mobile
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em qualquer lugar
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.menu-toggle')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coleta dados do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validação básica
        if (!name || !email || !message) {
            showNotification('Por favor, preencha todos os campos!', 'warning');
            return;
        }
        
        // Simula envio
        console.log('Mensagem enviada:', { name, email, message });
        showNotification('Mensagem enviada com sucesso!', 'success');
        
        // Limpa formulário
        contactForm.reset();
    });
}

// ============================================
// NOTIFICAÇÕES
// ============================================

/**
 * Exibe uma notificação temporária
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo de notificação (success, warning, error)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Adiciona estilos se não existirem
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                background: white;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-success {
                border-left: 4px solid #48bb78;
            }
            
            .notification-warning {
                border-left: 4px solid #ed8936;
            }
            
            .notification-error {
                border-left: 4px solid #f56565;
            }
            
            .notification-info {
                border-left: 4px solid #667eea;
            }
            
            .notification .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity 0.2s;
            }
            
            .notification .close-btn:hover {
                opacity: 1;
            }
            
            @media (max-width: 600px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notificação após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// SCROLL EFFECTS
// ============================================

// Adiciona efeito de scroll na header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Inicializa o site
 */
function init() {
    console.log('🚀 Website p5.js iniciado com sucesso!');
    
    // Define página inicial como ativa
    changePage('home');
}

// Executa inicialização quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}