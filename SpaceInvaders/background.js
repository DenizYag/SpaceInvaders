class Star {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2; 
        this.speed = Math.random() * 2 + 2.5; // Reduziere die maximale Geschwindigkeit
    }

    update() {
        this.y += this.speed;
        if (this.y >= this.canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * this.canvas.width;
            this.size = Math.random() * 1.5; 
            this.speed = Math.random() * 1 + 1; // Halte die Geschwindigkeit niedriger
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createStars(canvas, count) {
    let stars = [];
    for (let i = 0; i < count; i++) {
        stars.push(new Star(canvas));
    }
    return stars;
}

function updateAndDrawStars(stars, ctx) {
    stars.forEach(star => {
        star.update();
        star.draw(ctx);
    });
}

export { createStars, updateAndDrawStars };