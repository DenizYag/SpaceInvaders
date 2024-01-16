// game.js
import { Spaceship } from './spaceship.js';
import { Projectile } from './projectile.js';
import { createInvaders, updateInvaders, drawInvaders } from './invader.js';
import { Boss } from './boss.js';
import { createStars, updateAndDrawStars } from './background.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let spaceship = new Spaceship(canvas);
let lastTime = 0;
let stars = createStars(canvas, 100);
let wave = 5; 
let invaders = createInvaders(canvas, wave);
let score = 0;
let projectiles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (spaceship) {
        spaceship.x = canvas.width / 2;
        spaceship.y = canvas.height - 30;
    }

    stars = createStars(canvas, 100);
    invaders = createInvaders(canvas, wave);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

spaceship = new Spaceship(canvas);

let timeRemaining = 300;

function drawHUD() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';

    // Zeige die Punkte
    ctx.textAlign = 'start';
    ctx.fillText(`Punkte: ${score}`, 10, 30);

    // Welle in der Mitte
    ctx.textAlign = 'center';
    ctx.fillText(`Welle: ${wave}`, canvas.width / 2, 30);

    // Zeit rechts, gerundet auf die nächste ganze Zahl
    ctx.textAlign = 'right';
    ctx.fillText(`Zeit: ${Math.round(timeRemaining)}`, canvas.width - 10, 30);
}

function shootProjectile() {
    projectiles.push(spaceship.shoot());
}

// Füge eine Schießfunktion in regelmäßigen Intervallen hinzu
setInterval(shootProjectile, 500); // Schießt alle 500 Millisekunden

function checkCollision(projectile, invader) {
    // Kollisionslogik (einfache hitbox-Kollision)
    return (
        projectile.x < invader.x + invader.width &&
        projectile.x + projectile.width > invader.x &&
        projectile.y < invader.y + invader.height &&
        projectile.y + projectile.height > invader.y
    );
}

function gameLoop(timestamp) {
    if (lastTime === 0) {
        lastTime = timestamp;
    }

    let deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    // Aktualisiere den Countdown-Timer
    timeRemaining -= deltaTime;
    if (timeRemaining < 0) timeRemaining = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateAndDrawStars(stars, ctx);

    updateSpaceship(deltaTime);
    drawSpaceship(ctx);

    updateInvaders(invaders, deltaTime, canvas);
    drawInvaders(invaders, ctx);

    // Überprüfe, ob der Boss ein Projektil verschießen soll
    if (wave === 5 && Math.random() < 0.5) { // Temporär erhöhte Wahrscheinlichkeit für das Debugging
        let boss = invaders.find(invader => invader instanceof Boss);
        if (boss) {
            console.log("Boss-Projektil wird erstellt");
            bossProjectiles.push(boss.shoot());
        }
    }

    // Aktualisiere und zeichne Boss-Projektile
    bossProjectiles.forEach(projectile => {
        projectile.update();
        projectile.draw(ctx);
    });

    // Entferne Boss-Projektile, die außerhalb des Bildschirms sind
    bossProjectiles = bossProjectiles.filter(projectile => !projectile.markedForDeletion);

    // Aktualisiere und zeichne Projektile
    projectiles.forEach(projectile => {
        projectile.update();
        projectile.draw(ctx);
    });

    // Entferne Projektile, die außerhalb des Bildschirms sind
    projectiles = projectiles.filter(projectile => !projectile.offScreen());

    // Kollisionsdetektion und -behandlung
    projectiles.forEach(projectile => {
        invaders.forEach(invader => {
            if (checkCollision(projectile, invader)) {
                if (invader instanceof Boss) {
                    invader.hit(); // Ruf die hit-Methode des Bosses auf
                    if (invader.markedForDeletion) {
                        score += 50; // Erhöhe die Punktzahl um 50 für den Boss
                    }
                } else {
                    invader.markedForDeletion = true; // Markiere reguläre Invader für die Entfernung
                    score += 10; // Erhöhe die Punktzahl um 10 für jeden regulären Invader
                }
                projectile.markedForDeletion = true;
            }
        });
    });

    // Entferne markierte Projektile und Invader
    projectiles = projectiles.filter(projectile => !projectile.markedForDeletion);
    invaders = invaders.filter(invader => !invader.markedForDeletion);

    // Überprüfe, ob alle Invader besiegt wurden und erhöhe die Welle
    if (invaders.length === 0) {
        wave++;
        if (wave <= 5) {
            invaders = createInvaders(canvas, wave); // Erstelle neue Invader für die nächste Welle
        }
    }

    drawHUD(); // Zeichne das HUD, inklusive der Punkte

    requestAnimationFrame(gameLoop);
}

let bossProjectiles = [];
requestAnimationFrame(gameLoop);

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') spaceship.moveLeft();
    if (e.key === 'ArrowRight') spaceship.moveRight();
});

window.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') spaceship.stop();
});

function updateSpaceship(deltaTime) {
    spaceship.update(deltaTime);
}

function drawSpaceship(ctx) {
    spaceship.draw(ctx);
}
