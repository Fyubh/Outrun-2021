class Line
{
    constructor()
    {
        this.x = 0, this.y = 0, this.z = 0; // 3D
        this.X, this.Y = 0, this.W; // Проекция на экран
        this.scale, this.curve = 0;
    }
    project(camX, camY, camZ) 
    {
        this.scale = CAMD / (this.z-camZ);
        this.X = (1 + this.scale * (this.x - camX)) * WIDTH / 2;
        this.Y = (1 - this.scale * (this.y - camY)) * HEIGHT / 2;
        this.W = this.scale * ROADW * WIDTH/2;
    }
}