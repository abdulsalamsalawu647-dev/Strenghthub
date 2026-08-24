// ==========================================
// STRENGTHHUB COMMUNITY
// ==========================================


// ==========================================
// MEMBER WELCOME
// ==========================================

const memberWelcome =
    document.getElementById("memberWelcome");

const communityUsername =
    document.getElementById("communityUsername");


// ==========================================
// LOAD COMMUNITY MEMBER
// ==========================================

async function loadCommunityMember() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    // ------------------------------------------
    // NO LOGGED-IN USER
    // ------------------------------------------

    if (error || !user) {

        if (memberWelcome) {

            memberWelcome.style.display =
                "none";

        }

        return;
    }


    // ------------------------------------------
    // GET PROFILE
    // ------------------------------------------

    const {
        data: profile,
        error: profileError
    } = await supabaseClient

        .from("profiles")

        .select("username")

        .eq(
            "id",
            user.id
        )

        .single();


    if (profileError) {

        console.error(
            "Profile error:",
            profileError
        );


        if (memberWelcome) {

            memberWelcome.style.display =
                "none";

        }

        return;
    }


    // ------------------------------------------
    // SHOW WELCOME
    // ------------------------------------------

    if (communityUsername) {

        communityUsername.textContent =
            profile?.username ||
            "Athlete";

    }


    if (memberWelcome) {

        memberWelcome.style.display =
            "block";

    }

}


// ==========================================
// START
// ==========================================

loadCommunityMember();