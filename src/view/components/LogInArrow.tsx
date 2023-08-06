import { useCallback, useContext } from 'react';
import 'src/scss/view/components/logInArrow.scss';
import { CustomSelector } from 'src/store/operator';
import { myAxios } from 'src/const/myAxios';
import { CtxHook } from 'src/const/context';
import { CustomDispatch } from 'src/store/operator';
import type { CurrentUserType, LogInBoxArrowType, ScheduleType } from 'src/const/type';
import { goToHomePage } from 'src/modules/goToHomePage';
import { setLocalStorageToken } from 'src/modules/setLocalStorageToken';
import { useNavigate } from "react-router-dom";

function LogInBoxArrow(props: LogInBoxArrowType) {
    const customDispatch = CustomDispatch();
    const isDev = useContext(CtxHook).isDev;
    const currentUser = CustomSelector("currentUser") as CurrentUserType;
    const navigate = useNavigate();

    /**
    * get session ID from server
    */
    const authenticateUser = async () => {
        if (!currentUser || isDev) return false;

        const params = {
            reqType: "authenticateUser",
            username: currentUser.username,
            password: currentUser.password
        }

        const res: Promise<[string, string, [ScheduleType]]> = await myAxios.post("", params)
            .then(res => {
                return res.data
            })
            .catch((err) => {
                return err.response
            });

        return res;
    }

    /**
     * detect arrow cliced
     */
    const handleArrowClicked = useCallback(
        async () => {
            if (isDev) { // if developing mode
                goToHomePage(navigate);
                return;
            }

            const resultArr = await authenticateUser();

            if (resultArr) {
                const [token, userID, schedule] = resultArr;
                customDispatch("updateToken", token);
                customDispatch("updateSchedule", schedule);
                await setLocalStorageToken("token", token as string);
                await setLocalStorageUserID("userID", String(userID));
                goToHomePage(navigate);
            } else {
                alert("Note: Enter appropriate username and password");
            }
        },
        [currentUser]
    );

    /**
     * set localStorage ID
     */
    const setLocalStorageUserID = async (key: string, userID: string) => {
        localStorage.setItem(key, userID);
    }

    return (
        <div className="logInArrow">
            <button onClick={handleArrowClicked} aria-disabled={`${props.enteredState ? "true" : "false"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17.174" height="7.4" viewBox="0 0 17.174 7.4">
                    <path id="path" d="M-192.974,375.821h16.316" transform="translate(192.974 -372.121)" fill="none" stroke="#95bbca" strokeLinecap="round" strokeWidth="1" />
                    <line id="line" y1="3" x2="4" transform="translate(12.474 3.7)" fill="none" stroke="#95bbca" strokeLinecap="round" strokeWidth="1" />
                    <line id="line-2" data-name="line" x2="4" y2="3" transform="translate(12.474 0.7)" fill="none" stroke="#95bbca" strokeLinecap="round" strokeWidth="1" />
                </svg>
            </button>
        </div>
    )
}

export default LogInBoxArrow;