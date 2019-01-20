import Stroke from './Stroke';

export default interface Round {
    id: number,
    word: string,
    strokes: Stroke[],
    prediction: string
}