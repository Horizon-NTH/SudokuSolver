const Sudoku = class {
    constructor() {
        this.board = new Array(9).fill(0).map(() => new Array(9).fill(0));
        this.cells = document.querySelectorAll('input[type="text"]');
    }

    update() {
        this.cells.forEach(cell => {
            const row = Number(cell.id.substring(0, 1));
            const col = Number(cell.id.substring(2, 3));
            this.board[row - 1][col - 1] = cell.value === '' ? 0 : Number(cell.value);
        });
    }

    set() {
        this.board.forEach((row, rowIndex) => {
            this.board[rowIndex].forEach((value, colIndex) => {
                const cell = document.getElementById(`${rowIndex + 1}-${colIndex + 1}`);
                cell.value = value === 0 ? '' : value;

            });
        });
    }

    is_complete() {
        return this.board.every(row => row.every(value => value !== 0));
    }

    check_row(row, value) {
        return !this.board[row].includes(value);
    }

    check_col(col, value) {
        return !this.board.map(row => row[col]).includes(value);
    }

    check_square(row, col, value) {
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (this.board[i][j] === value) {
                    return false;
                }
            }
        }
        return true;
    }

    is_valid(row, col, value) {
        return this.check_row(row, value) && this.check_col(col, value) && this.check_square(row, col, value);
    }

    get_possible_values(row, col) {
        const possibleValues = [];
        for (let value = 1; value <= 9; value++) {
            if (this.is_valid(row, col, value)) {
                possibleValues.push(value);
            }
        }
        return possibleValues;
    }

    solve_board() {
        if (this.is_complete()) {
            return true;
        }

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col] === 0) {
                    const possibleValues = this.get_possible_values(row, col);
                    for (let value of possibleValues) {
                        this.board[row][col] = value;
                        if (this.solve_board()) {
                            return true;
                        }
                        this.board[row][col] = 0;
                    }
                    return false;
                }
            }
        }
    }

    solve() {
        this.update();
        if (this.solve_board()) {
            this.set();
            document.getElementById('success-notification').classList.add('active');
        }
        else {
            document.getElementById('error-notification').classList.add('active');
        }
    }
};

const sudoku = new Sudoku();