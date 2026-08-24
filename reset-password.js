
const resetPasswordForm =
    document.getElementById("resetPasswordForm");

const resetMessage =
    document.getElementById("resetMessage");


resetPasswordForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const newPassword =
            document
                .getElementById("newPassword")
                .value;

        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        // Check passwords match

        if (newPassword !== confirmPassword) {

            resetMessage.textContent =
                "Passwords do not match.";

            return;

        }


        resetMessage.textContent =
            "Updating password...";


        // Update password in Supabase

        const { error } =
            await supabaseClient.auth.updateUser({

                password: newPassword

            });


        if (error) {

            resetMessage.textContent =
                error.message;

            return;

        }


        resetMessage.textContent =
            "Password updated successfully!";


        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1500);

    }
);
