
/**
 * go to help page
 */
export function goToHelpPage(navigate: any) {
        navigate("/help", {
            state: null, // to pass some values to target page
            replace: false // not to change URL and use broser history buttons
        });
    }