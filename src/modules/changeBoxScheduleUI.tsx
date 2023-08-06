/**
 * change boxSchedule height and position
 */
export function changeBoxScheduleUI(boxes: NodeListOf<HTMLDivElement>, scales: NodeListOf<HTMLSpanElement>, durationArr: number[], startTimeArr: number[], margin: number) {
    const gap = 8;

    boxes.forEach((box, i) => {
        box.style.height = `${durationArr[i] * (margin + gap) - gap}px`;
        
        const startTime = startTimeArr[i];
        const isInteger = Number.isInteger(startTime)

        if(isInteger) {
            const targetOffset = scales[startTime].offsetTop;
            box.style.top = `${targetOffset}px`;
        } else {
            const integer = Math.floor(startTime);
            const decimal = startTime - integer;

            const targetOffset = scales[integer].offsetTop;
            const addition = margin * decimal;
            box.style.top = `${targetOffset + addition}px`;
        }
    });
}