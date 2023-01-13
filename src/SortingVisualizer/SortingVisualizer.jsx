import React from "react";
import {getMergeSortAnimations} from '../sortingAlgorithims/sortingAlgorithms.js'
import './SortingVisualizer.css'

const ANIMATION_SPEED_MS = 1;

const NUMBER_OF_ARRAY_BARS = 250;

const PRIMARY_COLOR = 'cornflowerblue';

const SECONDARY_COLOR = 'green';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {}

    heapSort() {}

    bubbleSort() {}

    testAlgo() {
        for(let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for(let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const jsSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(jsSortedArray, mergeSortedArray));
        }
    }

    render() {
        const {array} = this.state;

        return(
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{height: `${value}px`}}></div>
                ))}
                <br></br><button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.testAlgo()}>Test</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne , arrayTwo) {
    if(arrayOne.length !== arrayTwo.length) return false;
    for(let i = 0; i < arrayOne.length; i++) {
        if(arrayOne[i] !== arrayTwo[i]) {
            console.log(arrayOne[i], arrayTwo[i]);
            return false;
        }
    }
    return true;
}