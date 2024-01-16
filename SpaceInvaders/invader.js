// invader.js
import { Boss } from './boss.js';

class Invader {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.markedForDeletion = false;
        this.speedX = 1; // Geschwindigkeit in X-Richtung
    }

    update(deltaTime) {
        this.x += this.speedX; // Bewegt den Invader in X-Richtung
    }

    draw(ctx) {
        // Zeichnungscode bleibt gleich
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function createInvaders(canvas, wave) {
    let invaders = [];

    if (wave === 5) {
        // Erstelle den Boss für die fünfte Welle
        const bossX = (canvas.width - 160) / 2; // Zentriere den Boss
        const bossY = 50; // Setze die Y-Position des Bosses
        invaders.push(new Boss(bossX, bossY));

        // Füge flankierende Invader hinzu
        // Beispiel: zwei Invader links und rechts vom Boss
        // Die genauen Positionen müssen eventuell angepasst werden
        for (let i = 0; i < 2; i++) {
            invaders.push(new Invader(bossX - 40, bossY + i * 40)); // Links vom Boss
            invaders.push(new Invader(bossX + 160, bossY + i * 40)); // Rechts vom Boss
        }
    } else {
        // Logik für reguläre Invader-Wellen
        const invaderRowCount = wave;
        const invaderColumnCount = 10;
        const invaderWidth = 20;
        const invaderHeight = 20;
        const invaderPadding = 10;
        const startX = (canvas.width - (invaderColumnCount * (invaderWidth + invaderPadding))) / 2;
        const startY = 100;

        for (let row = 0; row < invaderRowCount; row++) {
            for (let col = 0; col < invaderColumnCount; col++) {
                const x = startX + col * (invaderWidth + invaderPadding);
                const y = startY + row * (invaderHeight + invaderPadding);
                invaders.push(new Invader(x, y));
            }
        }
    }
    
    return invaders;
}

function updateInvaders(invaders, deltaTime, canvas) {
    let reachEdge = false;

    invaders.forEach(invader => {
        invader.update(deltaTime);

        // Überprüfe, ob ein Invader den Rand erreicht hat
        if (invader.x + invader.width > canvas.width || invader.x < 0) {
            reachEdge = true;
        }
    });

    if (reachEdge) {
        invaders.forEach(invader => {
            invader.speedX = -invader.speedX; // Kehre die Richtung um
            invader.y += 20; // Bewege nach unten

            // Erhöhe die Geschwindigkeit ein wenig
            const speedIncrease = 0.1; // Geschwindigkeitserhöhung
            invader.speedX += invader.speedX > 0 ? speedIncrease : -speedIncrease;

            // Optional: Begrenze die maximale Geschwindigkeit
            const maxSpeed = 5;
            if (Math.abs(invader.speedX) > maxSpeed) {
                invader.speedX = invader.speedX > 0 ? maxSpeed : -maxSpeed;
            }
        });
    }
}



function drawInvaders(invaders, ctx) {
    invaders.forEach(invader => invader.draw(ctx));
}

export { Invader, createInvaders, updateInvaders, drawInvaders };