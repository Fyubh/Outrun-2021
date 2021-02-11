// Отрисовка
var Render = {

    // Линия
    DrawLine: function(ctx, x, y, color)
    {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(x, y);
        ctx.stroke();
    },

    // Линия с позиции
    DrawLine: function(ctx, lineTox, lineToy, moveX, moveY, color)
    {
        ctx.beginPath();
        ctx.moveTo(moveX, moveY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    },
    
    // Полигон
    DrawPolygon: function(ctx, vector1, vector2, vector3, vector4, color)
    {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(vector1.x, vector1.y);
        ctx.lineTo(vector2.x, vector2.y);
        ctx.lineTo(vector3.x, vector3.y);
        ctx.lineTo(vector4.x, vector4.y);
        ctx.closePath();
        ctx.fill();
    },

    // Полигон
    DrawPolygonTest: function(ctx, x1, y1, w1, x2, y2, w2, color)
    {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x1 - w1, y1);
        ctx.lineTo(x2 - w2, y2);
        ctx.lineTo(x2 + w2, y2);
        ctx.lineTo(x1 + w1, y1);
        ctx.closePath();
        ctx.fill();
    },
    
    // Квадрат
    DrawBox: function(ctx, i)
    {
        Render.DrawPolygon(ctx, 400 + i, 400 + i, 400 + i, 800 + i, 800 + i, 800 + i, 800 + i, 400 + i, 'black')
        Render.DrawPolygon(ctx, 800 + i, 400 + i, 800 + i, 800 + i, 1200 + i, 600 + i, 1200 + i, 200 + i, 'gray')
        Render.DrawPolygon(ctx, 800 + i, 200 + i, 400 + i, 400 + i, 800 + i, 400 + i, 1200 + i, 200 + i, 'red')
    }
}