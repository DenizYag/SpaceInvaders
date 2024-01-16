// spaceship.js

import { Projectile } from './projectile.js';

class Spaceship {
    constructor(_canvas) {
        this.canvas = _canvas;
        this.ctx = this.canvas.getContext('2d');
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 30;
        this.width = 20;
        this.height = 20;
        this.speed = 0;
        this.maxSpeed = 5;
    }

    moveLeft() {
        this.speed = -this.maxSpeed;
    }

    moveRight() {
        this.speed = this.maxSpeed;
    }

    stop() {
        this.speed = 0;
    }

    update(deltaTime) {
        if (this.x + this.speed > 0 && this.x + this.speed < this.canvas.width - this.width) {
            this.x += this.speed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    shoot() {
        // Schieße ein Projektil aus der Mitte des Raumschiffs
        const projectile = new Projectile(this.x + this.width / 2, this.y);
        return projectile;
    }
}

function setCanvas(_canvas) {
    canvas = _canvas;
    ctx = _canvas.getContext('2d');
}

export { Spaceship, setCanvas };