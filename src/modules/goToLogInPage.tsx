/**
 * go to logIn page
 */
export function goToLogInPage(navigate: any) {
        navigate("/logIn", {
            state: null, // to pass some values to target page
            replace: false // not to change URL and use broser history buttons
        });
    }