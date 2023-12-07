export default function Form({ submit, change, value }) {
    return (
        <form onSubmit={submit}>
            <input type='text' onChange={change} value={value} />
            <input type='submit' />
        </form>
    );
}
