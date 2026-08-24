
const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

const resetMessage =
    document.getElementById("resetMessage");


forgotPasswordForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("resetEmail")
            .value
            .trim();


        resetMessage.textContent =
            "Sending reset link...";


        const { error } =
            await supabaseClient.auth
                .resetPasswordForEmail(
                    email,
                    {
                        redirectTo:
                            window.location.origin +
                            "/reset-password.html"
                    }
                );


        if (error) {

            console.error(error);

            resetMessage.textContent =
                error.message;

            return;
        }


        resetMessage.textContent =
            "Password reset link sent! Check your email.";

    }
);

