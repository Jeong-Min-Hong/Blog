import { useState } from 'react';

export default function Home() {
    const [num, setNum] = useState(0);

    function addNum(e) {
        console.log(e);
        setNum((prev) => prev + 1);
    }

    return (
        <div>
            <h1>{num}</h1>
            <button onClick={addNum}>Click</button>
        </div>
    );
}