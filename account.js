const loggedOutSection =
    document.getElementById("loggedOutSection");

const loggedInSection =
    document.getElementById("loggedInSection");

const accountUsername =
    document.getElementById("accountUsername");

const accountLogout =
    document.getElementById("accountLogout");

const accountMessage =
    document.getElementById("accountMessage");

const adminNavLink =
    document.getElementById("adminNavLink");


async function checkAccount() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    // =========================================
    // NOT LOGGED IN
    // =========================================

    if (error || !user) {

        loggedOutSection.style.display = "block";
        loggedInSection.style.display = "none";

        return;
    }


    // =========================================
    // LOGGED IN
    // =========================================

    loggedOutSection.style.display = "none";
    loggedInSection.style.display = "block";


    // =========================================
    // GET PROFILE
    // =========================================

    const {
        data: profile,
        error: profileError
    } = await supabaseClient
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();


    if (profileError) {

        console.error("Profile error:", profileError);

        accountUsername.textContent = "User";

    } else {

        accountUsername.textContent =
            profile.username || "User";

    }


    // =========================================
    // CHECK ADMIN
    // =========================================

    if (adminNavLink) {

        const {
            data: adminUser,
            error: adminError
        } = await supabaseClient
            .from("admin_users")
            .select("user_id")
            .eq("user_id", user.id)
            .maybeSingle();


        console.log("Logged in user:", user.id);
        console.log("Admin record:", adminUser);
        console.log("Admin error:", adminError);


        if (adminUser) {

            adminNavLink.style.display =
                "inline-block";

        }

    }

}


// =========================================
// LOG OUT
// =========================================

accountLogout.addEventListener(
    "click",
    async function () {

        const { error } =
            await supabaseClient.auth.signOut();


        if (error) {

            accountMessage.textContent =
                error.message;

            return;
        }


        window.location.href =
            "index.html";

    }
);


// =========================================
// START
// =========================================

checkAccount();