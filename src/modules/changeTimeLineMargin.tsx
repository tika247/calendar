/**
 * change a margin of timeline scale
 */
export function changeTimeLineMargin(scales: NodeListOf<HTMLSpanElement>, margin: number) {
    if(!scales) return;
    scales.forEach((el) => {
        el.style.height = `${margin}px`
    })
}