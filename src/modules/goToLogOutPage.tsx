
/**
 * go to logOut page
 */
export function goToLogOutPage(navigate: any) {
        navigate("/logOut", {
            state: null, // to pass some values to target page
            replace: false // not to change URL and use broser history buttons
        });
    }