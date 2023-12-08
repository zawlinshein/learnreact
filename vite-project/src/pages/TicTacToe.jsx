import { useState } from "react";
import Row, { calculateWinner } from "../components/Row.jsx";

export default function TicTacToe() {
    const [record, setRecord] = useState([Array(9).fill(null)]);

    const [currentMove, setCurrentMove] = useState(0);

    const isXTurn = currentMove % 2 === 0;

    const currentRecord = record[currentMove];

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const onPlay = (cells) => {
        const nextRecord = [...record.slice(0, currentMove + 1), cells];
        console.log(...record.slice(0, currentMove + 1));
        console.log(nextRecord.length - 1);
        setRecord(nextRecord);
        setCurrentMove(nextRecord.length - 1);
        console.log(record);
        console.log(cells);
    };

    const winner = calculateWinner(currentRecord);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (isXTurn ? "X" : "O");
    }

    return (
        <>
            <div>{status}</div>
            {currentRecord
                .reduce((result, _, index) => {
                    if (index % 3 === 0) {
                        result.push(currentRecord.slice(index, index + 3));
                    }
                    return result;
                }, [])
                .map((cells, index) => {
                    return (
                        <Row
                            cells={cells}
                            key={index}
                            isXTurn={isXTurn}
                            rowIndex={index}
                            play={onPlay}
                            forRecord={currentRecord}
                        />
                    );
                })}
            <ul>
                {record.map((_, index) => {
                    return (
                        <li key={index}>
                            <button onClick={() => jumpTo(index)}>
                                jump to move : {index + 1}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
