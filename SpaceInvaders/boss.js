// boss.js
import { Bossprojectile } from './bossprojectile.js';

class Boss {
    constructor(x, y, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = 160;
        this.height = 160;
        this.hp = 15;
        this.markedForDeletion = false;
        this.speedX = 1; // Geschwindigkeit in X-Richtung
        this.maxX = x + 150; // Maximale Bewegungsdistanz nach rechts
        this.minX = x - 150; // Maximale Bewegungsdistanz nach links
    }

    update(deltaTime) {
        this.x += this.speedX;
        // Kehre die Bewegungsrichtung um, wenn die Grenzen erreicht sind
        if (this.x > this.maxX || this.x < this.minX) {
            this.speedX = -this.speedX;
        }
    }

    hit() {
        this.hp -= 1;
        if (this.hp <= 0) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Zeichne den Lebensbalken des Bosses
        const healthBarHeight = 10; // Höhe des Lebensbalkens
        const healthBarWidth = (this.width * this.hp) / 15; // Breite des Balkens entsprechend der HP
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y - healthBarHeight, healthBarWidth, healthBarHeight);
    }

    shoot() {
        console.log("Boss schießt");
        // Erstelle ein neues Projektil
        return new Bossprojectile(this.x + this.width / 2, this.y + this.height, this.canvasWidth, this.canvasHeight);
    }
}

export { Boss };
