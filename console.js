document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const currentPath = document.getElementById('current-path');
    const consoleElement = document.querySelector('.console');

    let path = '.root\\MMORPG\\console';

    const directories = {
        '.root\\MMORPG\\console': {},
        '.root\\MMORPG\\console\\updates': {},
        '.root\\MMORPG\\console\\logs': {},
        '.root\\MMORPG\\console\\settings': {}
    };

    const commands = {
        help: 'Доступные команды:\nhelp - показать доступные команды\ncd <directory> - сменить директорию\necho <text> - вывести текст\nclear - очистить экран\nasciiart - показать случайный ASCII арт\ntic-tac-toe - играть в крестики-нолики\nrps - играть в камень, ножницы, бумага',
        clear: () => {
            output.textContent = '';
        },
        cd: (dir) => {
            if (dir === '..') {
                if (path !== '.root\\MMORPG\\console') {
                    const parts = path.split('\\');
                    parts.pop();
                    path = parts.join('\\');
                }
            } else {
                const newPath = `${path}\\${dir}`;
                if (directories[newPath]) {
                    path = newPath;
                } else {
                    return `'${dir}' не является внутренней или внешней директорией.`;
                }
            }
            updatePath();
        },
        echo: (text) => {
            addOutput(text);
        },
//        nyancat: () => {
//            const nyanCatFrames = [
//                "Nyancat frame 1",
//                "Nyancat frame 2",
//                "Nyancat frame 3",
//                "Nyancat frame 4"
//                // Добавьте больше кадров для полной анимации
//            ];
//
//            let currentFrame = 0;
//            const interval = setInterval(() => {
//                addOutput(nyanCatFrames[currentFrame]);
//                currentFrame = (currentFrame + 1) % nyanCatFrames.length;
//            }, 200);
//
//            setTimeout(() => clearInterval(interval), 5000); // Останавливаем анимацию через 5 секунд
//        },
        asciiart: () => {
            const asciiArts = [
                "　／l\n（ﾟ. ｡ 7\nl、 ~ヽ　.•　　\nじしf_, )ノ",
                "┊　　┊　　┊　　┊\n┊　　┊　　┊　　★\n┊　　┊　　☆\n┊　　★\n☆",
                "(> ” ” <)\n( =’o'= )\n-(,,)-(,,)-",
                "▬ι══════ﺤ"
                // Добавьте больше ASCII артов
            ];

            const randomArt = asciiArts[Math.floor(Math.random() * asciiArts.length)];
            addOutput(randomArt);
        },
        'tic-tac-toe': () => {
            let board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ];
            let player = 'X';
            
            const printBoard = () => {
                return board.map(row => row.join('|')).join('\n-----\n');
            };
            
            const makeMove = (row, col) => {
                if (board[row][col] === ' ') {
                    board[row][col] = player;
                    player = player === 'X' ? 'O' : 'X';
                }
                return printBoard();
            };
            
            addOutput(printBoard());
            commands.move = (move) => {
                const [row, col] = move.split(' ').map(Number);
                addOutput(makeMove(row, col));
            };
        },
        rps: () => {
            const choices = ['rock', 'paper', 'scissors'];
            const playerChoice = prompt('Enter rock, paper, or scissors:').toLowerCase();
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            let result = '';

            if (playerChoice === computerChoice) {
                result = `It's a tie! Both chose ${playerChoice}.`;
            } else if (
                (playerChoice === 'rock' && computerChoice === 'scissors') ||
                (playerChoice === 'paper' && computerChoice === 'rock') ||
                (playerChoice === 'scissors' && computerChoice === 'paper')
            ) {
                result = `You win! ${playerChoice} beats ${computerChoice}.`;
            } else {
                result = `You lose! ${computerChoice} beats ${playerChoice}.`;
            }

            addOutput(result);
        }
    };

    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const input = commandInput.value.trim();
            addOutput(`${currentPath.textContent}${input}`);
            processCommand(input);
            commandInput.value = '';
        }
    });

    document.addEventListener('click', (event) => {
        if (!consoleElement.contains(event.target)) {
            commandInput.blur();
        } else if (event.target === consoleElement || event.target === output) {
            commandInput.focus();
        }
    });

    function processCommand(input) {
        const [command, ...args] = input.split(' ');
        if (commands[command]) {
            const result = typeof commands[command] === 'function'
                ? commands[command](args.join(' '))
                : commands[command];
            if (result) addOutput(result);
        } else {
            addOutput(`'${command}' не является внутренней или внешней\nкомандой, исполняемой программой или пакетным файлом.`);
        }
    }

    function addOutput(text) {
        output.textContent += text + '\n';
        output.scrollTop = output.scrollHeight;
    }

    function updatePath() {
        currentPath.textContent = `${path}>`;
    }

    // Initial help message
    addOutput('Введите help чтобы увидеть список команд!');
    updatePath();
});
