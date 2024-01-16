// bossProjectile.js

class Bossprojectile {
    constructor(x, y, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.speedY = 3; // Geschwindigkeit des Projektils
        this.width = 5; // Breite des Projektils
        this.height = 10; // Höhe des Projektils
        this.markedForDeletion = false;
    }

    update() {
        this.y += this.speedY;
        if (this.y > this.canvasHeight) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export { Bossprojectile };
