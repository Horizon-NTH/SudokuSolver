document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('input[type="text"]');

    cells.forEach(cell => {
        cell.addEventListener('keydown', (event) => {
            const key = event.key;
            let row = Number(cell.id.substring(0, 1));
            let col = Number(cell.id.substring(2, 3));

            cell.classList.remove('invalid-square');
            if (!/^[1-9]$/.test(key) && key !== 'Backspace' && key !== 'Tab') {
                event.preventDefault();
            }

            if (/^[1-9]$/) {
                sudoku.update();
                if (!sudoku.is_valid(row - 1, col - 1, Number(key))) {
                    event.preventDefault();
                    cell.classList.add('invalid-square');
                }
            }

            switch(event.key) {
                case 'ArrowUp': {
                        row = Math.max(row - 1, 1);
                        const newCell = document.getElementById(`${row}-${col}`);
                        newCell.focus();
                        event.preventDefault();
                    }
                    break;
                case 'ArrowDown': {
                        row = Math.min(row + 1, 9);
                        const newCell = document.getElementById(`${row}-${col}`);
                        newCell.focus();
                        event.preventDefault();
                    }
                    break;
                case 'ArrowLeft': {
                        col = Math.max(col - 1, 1);
                        const newCell = document.getElementById(`${row}-${col}`);
                        newCell.focus();
                        event.preventDefault();
                    }
                    break;
                case 'ArrowRight': {
                        col = Math.min(col + 1, 9);
                        const newCell = document.getElementById(`${row}-${col}`);
                        newCell.focus();
                        event.preventDefault();
                    }
                    break;
            }
        });

        cell.addEventListener('input', () => {
            cell.value = cell.value.replace(/[^1-9]/g, '').slice(-1);
            if (cell.value !== '') {
                cell.classList.add('filled-square');
            }
            else {
                cell.classList.remove('filled-square');
            }
        });

        cell.addEventListener('focusout', () => {
            cell.classList.remove('invalid-square');
        });

        cell.addEventListener('focus', () => {
            setTimeout(() => {
                cell.setSelectionRange(cell.value.length, cell.value.length);
            }, 0);
        });

        cell.addEventListener('click', () => {
            setTimeout(() => {
                cell.setSelectionRange(cell.value.length, cell.value.length);
            }, 0);
        });
    });

    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.value = '';
            cell.classList.remove('filled-square');
        });
        document.getElementById('error-notification').classList.remove('active');
        document.getElementById('success-notification').classList.remove('active');
    });
});