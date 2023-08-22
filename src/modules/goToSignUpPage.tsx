
/**
 * go to signUp page
 */
export function goToSignUpPage(navigate: any) {
        navigate("/signUp", {
            state: null, // to pass some values to target page
            replace: false // not to change URL and use broser history buttons
        });
    }