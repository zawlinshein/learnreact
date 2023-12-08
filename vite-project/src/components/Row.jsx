import Cell from "./Cell.jsx";

import "../App.css";

export default function Row({ cells, play, isXTurn, forRecord, rowIndex }) {
    const handleClick = (cell) => {
        const currentInexd = calculateCurrentCell(rowIndex, cell);
        if (calculateWinner(forRecord) || forRecord[currentInexd]) {
            console.log(calculateWinner(forRecord), forRecord[currentInexd]);
            return;
        }
        const newRecord = forRecord.slice();
        if (isXTurn) newRecord[currentInexd] = "X";
        else newRecord[currentInexd] = "O";
        play(newRecord);
    };

    return (
        <>
            <div className='row'>
                {cells.map((cell, index) => {
                    return <Cell key={index} value={cell} handleClick={() => handleClick(index)} />;
                })}
            </div>
        </>
    );
}

function calculateCurrentCell(rowIndex, cellIndex) {
    return rowIndex * 3 + cellIndex;
}

export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
