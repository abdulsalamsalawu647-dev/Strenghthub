const loggedOutSection = document.getElementById("loggedOutSection");
const loggedInSection = document.getElementById("loggedInSection");
const accountUsername = document.getElementById("accountUsername");
const accountLogout = document.getElementById("accountLogout");
const accountMessage = document.getElementById("accountMessage");

async function checkAccount() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error || !user) {

        // User is NOT logged in
        loggedOutSection.style.display = "block";
        loggedInSection.style.display = "none";

        return;
    }


    // User IS logged in
    loggedOutSection.style.display = "none";
    loggedInSection.style.display = "block";


    // Get profile
    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("username")
            .eq("id", user.id)
            .single();


    if (profileError) {

        console.error(profileError);

        accountUsername.textContent = "User";

        return;
    }


    accountUsername.textContent =
        profile.username || "User";
}


// Log out
accountLogout.addEventListener("click", async function () {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {

        accountMessage.textContent = error.message;

        return;
    }

    window.location.href = "index.html";
});


// Check login status
checkAccount();