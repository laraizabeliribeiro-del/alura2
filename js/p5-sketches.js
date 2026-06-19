// ============================================
// P5-SKETCHES.JS - Sketches do p5.js
// ============================================

let homeSketch;
let dashboardSketch;

// ============================================
// SKETCH DA HOME PAGE
// ============================================

function createHomeSketch(p) {
    let particles = [];
    const particleCount = 50;
    
    p.setup = function() {
        const container = document.getElementById('p5-container-home');
        if (!container) return;
        
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const canvas = p.createCanvas(width, height);
        canvas.parent('p5-container-home');
        
        // Cria partículas
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(p, width, height));
        }
    };
    
    p.draw = function() {
        p.background(247, 250, 252);
        
        // Desenha e atualiza partículas
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].display();
            
            // Conecta partículas próximas
            for (let j = i + 1; j < particles.length; j++) {
                let distance = p.dist(
                    particles[i].x, particles[i].y,
                    particles[j].x, particles[j].y
                );
                if (distance < 100) {
                    p.stroke(102, 126, 234, 50);
                    p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                }
            }
        }
    };
    
    p.windowResized = function() {
        const container = document.getElementById('p5-container-home');
        if (container) {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            p.resizeCanvas(width, height);
        }
    };
}

// ============================================
// SKETCH DO DASHBOARD
// ============================================

function createDashboardSketch(p) {
    let angle = 0;
    let wavePoints = [];
    let waveAmplitude = 30;
    let waveFrequency = 0.05;
    let wavePhase = 0;
    
    p.setup = function() {
        const container = document.getElementById('p5-container-dash');
        if (!container) return;
        
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const canvas = p.createCanvas(width, height);
        canvas.parent('p5-container-dash');
    };
    
    p.draw = function() {
        p.background(247, 250, 252);
        
        const width = p.width;
        const height = p.height;
        
        // Desenha ondas
        drawWaves(p, width, height);
        
        // Desenha círculos interativos
        drawCircles(p, width, height);
        
        // Desenha gráfico de barras animado
        drawBarChart(p, width, height);
        
        wavePhase += 0.05;
    };
    
    p.windowResized = function() {
        const container = document.getElementById('p5-container-dash');
        if (container) {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            p.resizeCanvas(width, height);
        }
    };
    
    // Função auxiliar para desenhar ondas
    function drawWaves(p, width, height) {
        const centerY = height / 2;
        const colors = [
            p.color(102, 126, 234, 100),
            p.color(118, 75, 162, 80),
            p.color(240, 147, 251, 60)
        ];
        
        for (let waveIndex = 0; waveIndex < 3; waveIndex++) {
            p.fill(colors[waveIndex]);
            p.noStroke();
            
            p.beginShape();
            for (let x = 0; x < width; x += 5) {
                const y = centerY + 
                    p.sin((x * waveFrequency) + wavePhase + waveIndex * 1) * 
                    (waveAmplitude + waveIndex * 10);
                p.vertex(x, y);
            }
            p.vertex(width, height);
            p.vertex(0, height);
            p.endShape(p.CLOSE);
        }
    }
    
    // Função auxiliar para desenhar círculos
    function drawCircles(p, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const distance = 80;
        
        for (let i = 0; i < 3; i++) {
            const angle = (p.TWO_PI / 3) * i + wavePhase * 0.02;
            const x = centerX + p.cos(angle) * distance;
            const y = centerY + p.sin(angle) * distance;
            
            p.fill(102, 126, 234);
            p.noStroke();
            p.ellipse(x, y, 40);
            
            p.fill(255);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(14);
            p.fill(102, 126, 234);
            p.text(i + 1, x, y);
        }
    }
    
    // Função auxiliar para desenhar gráfico de barras
    function drawBarChart(p, width, height) {
        const barCount = 6;
        const barWidth = (width - 60) / barCount;
        const maxHeight = height / 2 - 40;
        const startX = 30;
        const startY = height - 40;
        
        // Desenha eixos
        p.stroke(200);
        p.strokeWeight(2);
        p.line(startX, startY, startX + (barCount * barWidth), startY);
        p.line(startX, startY, startX, startY - maxHeight);
        
        // Desenha barras
        for (let i = 0; i < barCount; i++) {
            const value = p.sin(wavePhase * 0.05 + i * 0.5) * 0.5 + 0.5;
            const barHeight = value * maxHeight;
            const x = startX + i * barWidth + barWidth / 4;
            const y = startY - barHeight;
            
            const hue = (i * 60 + wavePhase * 2) % 360;
            p.fill(102 + i * 20, 126 + i * 15, 234);
            p.noStroke();
            p.rect(x, y, barWidth / 2, barHeight, 4);
            
            // Valor em cima da barra
            p.fill(50);
            p.textSize(10);
            p.textAlign(p.CENTER);
            p.text(p.int(value * 100), x + barWidth / 4, y - 10);
        }
    }
}

// ============================================
// CLASSE DE PARTÍCULA
// ============================================

class Particle {
    constructor(p, width, height) {
        this.p = p;
        this.x = p.random(width);
        this.y = p.random(height);
        this.vx = p.random(-1, 1);
        this.vy = p.random(-1, 1);
        this.size = p.random(2, 6);
        this.width = width;
        this.height = height;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce nas bordas
        if (this.x < 0 || this.x > this.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.height) this.vy *= -1;
        
        // Mantém dentro dos limites
        this.x = this.p.constrain(this.x, 0, this.width);
        this.y = this.p.constrain(this.y, 0, this.height);
    }
    
    display() {
        this.p.fill(102, 126, 234, 150);
        this.p.noStroke();
        this.p.ellipse(this.x, this.y, this.size);
    }
}

// ============================================
// INICIALIZAÇÃO DOS SKETCHES
// ============================================

/**
 * Inicializa os sketches do p5.js
 */
function initSketches() {
    // Verifica se p5 está carregado
    if (typeof p5 === 'undefined') {
        console.warn('p5.js não foi carregado ainda');
        setTimeout(initSketches, 100);
        return;
    }
    
    // Cria instâncias dos sketches
    homeSketch = new p5(createHomeSketch);
    dashboardSketch = new p5(createDashboardSketch);
    
    console.log('✨ Sketches p5.js inicializados!');
}

// Aguarda o carregamento completo do DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSketches);
} else {
    initSketches();
}

// ============================================
// LIMPEZA E GERENCIAMENTO
// ============================================

/**
 * Remove sketches do p5.js para evitar conflitos
 */
function removeSketches() {
    if (homeSketch) homeSketch.remove();
    if (dashboardSketch) dashboardSketch.remove();
}

// Limpa sketches ao descarregar a página
window.addEventListener('beforeunload', removeSketches);