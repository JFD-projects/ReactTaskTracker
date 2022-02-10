import {useState} from "react";

export function useArraySlider(interval, array) {
    const [, setCurrentArrayIndex] = useState(0)
    const [value, setValue] = useState(array.at(0))
    const getValue = () => {
        return value
    }
    const start = () => {
        const index = setInterval(() => {
            setCurrentArrayIndex(prevState => {
                const newState = (prevState < array.length - 1) ? prevState + 1 : 0
                setValue(array.at(newState))
                return newState
            })

        }, interval)
        return index
    }
    const stop = (index) => {
        clearInterval(index)
    }
    return [value, start, stop]
}