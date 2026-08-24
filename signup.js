const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "Creating your account...";

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,

        options: {
            data: {
                username: username,
                full_name: fullName
            }
        }
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    message.textContent =
        "Account created! Please check your email to confirm your account.";

    signupForm.reset();
});