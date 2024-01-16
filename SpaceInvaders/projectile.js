class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 10;
        this.speed = 3;
    }

    update() {
        this.y -= this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    offScreen() {
        return this.y + this.height < 0;
    }
}

export { Projectile };