
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    loginMessage.textContent = "Logging in...";


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password

        });


    if (error) {

        loginMessage.textContent =
            error.message;

        return;

    }


    loginMessage.textContent =
        "Login successful!";


    setTimeout(() => {

        window.location.href =
            "index.html";

    }, 1000);

});


// ==========================================
// FORGOT PASSWORD
// ==========================================

const forgotPassword =
    document.getElementById("forgotPassword");


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();


            if (!email) {

                loginMessage.textContent =
                    "Please enter your email address first.";

                return;

            }


            loginMessage.textContent =
                "Sending password reset email...";


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

                loginMessage.textContent =
                    error.message;

                return;

            }


            loginMessage.textContent =
                "Password reset email sent. Check your inbox.";

        }
    );

}

