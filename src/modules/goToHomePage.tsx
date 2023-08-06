/**
 * go to home page
 */
export function goToHomePage(navigate: any) {
        navigate("/home", {
            state: null, // to pass some values to target page
            replace: false // not to change URL and use broser history buttons
        });
    }