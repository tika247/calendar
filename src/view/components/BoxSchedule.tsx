import 'src/scss/view/components/boxSchedule.scss';
import type { ScheduleType } from 'src/const/type'
import edit from 'src/img/icon-edit.svg';
import remove from 'src/img/icon-remove.svg';
import { CustomDispatch } from 'src/store/operator';
import { getStoredToken } from 'src/modules/getStoredToken';
import { myAxios } from 'src/const/myAxios';

/**
 * @param props 
 * @returns 
 */
function BoxSchedule(props: { schedule: ScheduleType }) {
    const customDispatch = CustomDispatch();
    const token = getStoredToken();
    const schedule = props.schedule;
    const { id, title, timeFrom, timeTo, memo } = schedule;

    const editTarget = () => {
        customDispatch("updateCurrentMode", "edit");
        customDispatch("updateEditTarget", schedule);
    }
    const removeSchedule = async () => {
        if (!token) return;
        const params = {
            reqType: "removeSchedule",
            token: token,
            targetID: id
        }

        const res: Promise<[ScheduleType]> = await myAxios.post("", params)
        .then(res => {
            return res.data
        })
        .catch((err) => {
            return err.response
        });

        customDispatch("updateSchedule", res);
        customDispatch("updateCurrentMode", "normal");
    }

    return (
        <div className="boxSchedule js-boxSchedule">
            <span className="boxSchedule__time">{timeFrom}~{timeTo}</span>
            <h3 className="boxSchedule__title">{title}</h3>
            <p className="boxSchedule__memo">{memo}</p>

            <div className="boxSchedule__btnWrap">
                <button className="boxSchedule__btn" onClick={editTarget}>
                    <img src={edit} alt="" />
                </button>
                <button className="boxSchedule__btn" onClick={removeSchedule}>
                    <img src={remove} alt="" />
                </button>
            </div>
        </div>
    )
}

export default BoxSchedule;