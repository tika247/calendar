/**
 * get a margin of timeline scale
 */
export function getTimeLineMargin(boxes: NodeListOf<HTMLDivElement>, durationArr: number[]): number {
    const boxHeightArr = Array.from(boxes).map((box) => box.clientHeight);

    const heightPerHourArr = boxHeightArr.map((height, i) => height / durationArr[i]);
    const margin = Math.max.apply(null, heightPerHourArr);

    return margin;
}