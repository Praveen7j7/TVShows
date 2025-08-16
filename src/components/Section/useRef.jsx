import {useRef} from 'react'

export default function useRef(){
    const count=useRef(0);
    const handleIncrement = () => {
        count.current++;
        console.log(count);

    };
    console.log("Component Re-rendered");

        return(
            <>
                <div className='App'>
                    <button onClick={handleIncrement}>Increment</button>
                </div>
            </>
        )
}