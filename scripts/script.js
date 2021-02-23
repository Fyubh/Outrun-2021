        function play()
        {
            // Удаление меню
            var elem = document.getElementById("menu");
            elem.parentNode.removeChild(elem);

            // Определяем Context
            var canvas = document.getElementById('cnvs');
            var ctx = canvas.getContext('2d');   

            // Создаение объекта изображения
            var img = new Image();
            var carSide = new Image();
            var car = new Image();
            var hp = new Image();
            
            // Загружаем файлы
            img.src = './image/bg.png';
            hp.src = './image/health.png';


            /////////////////////////////


            // Создание дороги
            let lines = [];
            for(let i = 0; i < 800; i++)
            {
                // Создание линии дороги
                let line = new Line();
                line.z = i * SEGL;
                
                // Настройка дороги
                if(i > 50 && i < 100) {line.curve = 2;}
                if(i > 120 && i < 170) {line.curve = -2;}
                if(i > 190 && i < 230) {line.curve = 3;}
                if(i > 250 && i < 300) {line.curve = 5;}
                if(i > 300 && i < 400) {line.curve = -5;}
                if(i > 400 && i < 450) {line.curve = 3;}
                if(i > 500 && i < 600) {line.curve = -3;}

                // if(i > 650) {line.y = Math.sin(i/30.0) * 1500;} | Холмы
                
                // Добавление в дорогу
                lines.push(line);
            }
            

            /////////////////////////////
            

            // Инициализация координат
            var pos = 0;
            var playerX = 0;

            // Проверка нажатия на клавишу
            var press = false;

            // Настройка игрового цикла
            setInterval(onTimerTick, 33);
            

            /////////////////////////////
            
            
            // Игровой циклы
            function onTimerTick() {
                // Определение размер окна браузера
                HEIGHT = document.documentElement.clientHeight;
                WIDTH = document.documentElement.clientWidth;

                // Настройка размера Canvas
                canvas.setAttribute('height', HEIGHT);
                canvas.setAttribute('width', WIDTH);

                // Вывод фона
                ctx.drawImage(img, 0, 0, WIDTH, HEIGHT / 1.959);

                // Инициализация
                var N = lines.length; // Количество линий
                var maxy = HEIGHT; // Высота
                car.src = './image/car.png'; // Стандартная машина


                /////////////////////////////


                // Управление машиной
                document.onkeydown = checkKey; // Нажатие кнопки
                function checkKey(e) 
                {
                    press = true; // true - клавиша нажата

                    e = e || window.event;
                    if (e.keyCode == '37' && playerX > -5000) // Движение влево
                    {
                        playerX -= 300;
                        carSide.src = './image/player_left.png';
                        
                        console.log('left' + playerX);
                    }
                    else if (e.keyCode == '39' && playerX < 5000) // Движение вправо
                    {
                        playerX += 300;
                        carSide.src = './image/player_right.png';
                        
                        console.log('right' + playerX);
                    }
                }
                

                /////////////////////////////
                

                // Урон
                if(playerX >= 2400 || playerX <= - 2400)
                {
                    HEALTH -= 10;
                    console.log(HEALTH);
                }
                
                // Проверка уровня здоровья
                if(HEALTH < 0)
                {
                    canvas.parentNode.removeChild(canvas);
                    let gameover = document.createElement('h1');
                    let reached = document.createElement('h2');
                    let level = document.createElement('h2');
                    gameover.innerText = 'Game Over!';
                    level.id = 'red';
                    document.body.appendChild(gameover);
                    document.body.appendChild(reached);
                    document.body.appendChild(level);
                }
                
                /////////////////////////////


                // Настройки позиции
                while (pos >= N*SEGL) { pos -= N * SEGL;}
                while (pos < 0) {pos += N * SEGL;}
                var startPos = pos / SEGL;
                var camH = 1500 + lines[startPos].y;
                var x = 0, dx = 0;
                
                // Вывод окружающего мира
                for(let n = startPos; n < startPos + 300; n++)
                {
                    // Проецирование трёхмерного мира в камеру
                    x += dx;
                    dx += lines[n % N].curve;
                    
                    // Инициализация цветов
                    var grass, rumble, road;
                    if((n % 3) / 2)
                    {
                        grass = '#009A00';
                        rumble = '#FFFFFF';
                        road = 'gray';
                    }
                    else
                    {
                        grass = '#10C810';
                        rumble = '#000000';
                        road = 'dimgray';
                    }

                    // Отрисовка полигонов
                    if (lines[n % N].Y >= maxy) continue;
                    maxy = lines[n % N].Y;
                    p = lines[(n-1) % N]
                    Render.DrawPolygonTest(ctx, 0, p.Y, WIDTH, 0, lines[n % N].Y, WIDTH, grass);
                    Render.DrawPolygonTest(ctx, p.X, p.Y, p.W * 1.2, lines[n % N].X, lines[n % N].Y, lines[n % N].W * 1.2, rumble);
                    Render.DrawPolygonTest(ctx, p.X, p.Y, p.W, lines[n % N].X, lines[n % N].Y, lines[n % N].W, road);
                }


                ////////////////////////////


                // Уровень и скорость
                SCORE += 0.033;
                if(SCORE >= 10000) {LEVEL = 2; pos += 400;}
                else{pos += 200;}
                
                // Уровень здоровья
                if((HEALTH / 1000) * 100 >= 66)
                {
                    ctx.drawImage(hp, (WIDTH / 1920) * 20,(HEIGHT / 969) * 20, 50, 50);
                }
                else if((HEALTH / 1000) * 100 >= 33)
                {
                    ctx.drawImage(hp, (WIDTH / 1920) * 20,(HEIGHT / 969) * 20, 50, 50);
                    ctx.drawImage(hp, (WIDTH / 1920) * 80, (HEIGHT / 969) *20, 50, 50);
                }
                else
                {
                    ctx.drawImage(hp, (WIDTH / 1920) * 20,(HEIGHT / 969) * 20, 50, 50);
                }

                // Отрисовка машины
                if(!press)
                {
                    ctx.drawImage(car, (WIDTH / 2) - ((WIDTH / 1920) * 422 / 2), HEIGHT - ((HEIGHT / 969) * 237.6) + getRandomInt(4), (WIDTH / 1920) * 422, (HEIGHT / 969) * 237.6);
                }
                else
                {
                    ctx.drawImage(carSide, (WIDTH / 2) - ((WIDTH / 1920) * 422 / 2), HEIGHT - ((HEIGHT / 969) * 237.6) + getRandomInt(4), (WIDTH / 1920) * 422, (HEIGHT / 969) * 237.6);
                }
                press = false;

                ctx.fillStyle = "#000000";
                ctx.font = "normal 30pt arcade";
                ctx.fillText("Time   " + Math.floor(SCORE), WIDTH - 200, 55);
            }
        }
                    reached.innerText = 'Reached';
                    level.innerText = LEVEL + ' level';
                    
                    ctx.drawImage(hp, (WIDTH / 1920) * 80, (HEIGHT / 969) *20, 50, 50);
                    ctx.drawImage(hp, (WIDTH / 1920) * 140, (HEIGHT / 969) *20, 50, 50);
                    lines[n % N].project(playerX - x, camH, startPos * SEGL - (n>=N?N*SEGL:0));
