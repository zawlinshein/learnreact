import "../App.css";

export default function Cell({ value, nextPlayer, handleClick }) {
    return (
        <div className='cell' onClick={() => handleClick()}>
            {value}
        </div>
    );
}
