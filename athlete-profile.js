
// ==========================================
// STRENGTHHUB PUBLIC ATHLETE PROFILE
// ==========================================


// ==========================================
// GET PAGE ELEMENTS
// ==========================================

const athleteUsername =
    document.getElementById("athleteUsername");

const athleteFullName =
    document.getElementById("athleteFullName");

const athleteBio =
    document.getElementById("athleteBio");

const athleteDiscipline =
    document.getElementById("athleteDiscipline");

const athleteExperience =
    document.getElementById("athleteExperience");

const athleteGoal =
    document.getElementById("athleteGoal");

const athleteLocation =
    document.getElementById("athleteLocation");

const athleteProfileImage =
    document.getElementById("athleteProfileImage");

const athleteProfileInitial =
    document.getElementById("athleteProfileInitial");

const athleteProfileMessage =
    document.getElementById("athleteProfileMessage");

const connectButton =
    document.getElementById("connectButton");



// ==========================================
// GET ATHLETE ID FROM URL
// ==========================================

const urlParams =
    new URLSearchParams(window.location.search);

const athleteId =
    urlParams.get("id");



// ==========================================
// LOAD ATHLETE
// ==========================================

async function loadAthleteProfile() {


    // No ID

    if (!athleteId) {

        athleteProfileMessage.textContent =
            "Athlete profile could not be found.";

        return;

    }



    // ==========================================
    // GET PROFILE FROM SUPABASE
    // ==========================================

    const {
        data: profile,
        error
    } = await supabaseClient

        .from("profiles")

        .select(`
            id,
            username,
            full_name,
            bio,
            profile_image,
            discipline,
            experience_level,
            training_goal,
            location
        `)

        .eq("id", athleteId)

        .single();



    // ==========================================
    // HANDLE ERROR
    // ==========================================

    if (error) {

        console.error(error);

        athleteProfileMessage.textContent =
            "Could not load this athlete profile.";

        return;

    }



    // ==========================================
    // DISPLAY PROFILE
    // ==========================================

    athleteUsername.textContent =
        profile.username || "Athlete";


    athleteFullName.textContent =
        profile.full_name || "";


    athleteBio.textContent =
        profile.bio || "No bio added yet.";


    athleteDiscipline.textContent =
        profile.discipline || "Not set";


    athleteExperience.textContent =
        profile.experience_level || "Not set";


    athleteGoal.textContent =
        profile.training_goal || "Not set";


    athleteLocation.textContent =
        profile.location || "Not set";



    // ==========================================
    // PROFILE IMAGE
    // ==========================================

    if (profile.profile_image) {

        athleteProfileImage.src =
            profile.profile_image;

        athleteProfileImage.style.display =
            "block";

        athleteProfileInitial.style.display =
            "none";

    }

    else {

        athleteProfileImage.style.display =
            "none";

        athleteProfileInitial.style.display =
            "block";


        athleteProfileInitial.textContent =
            (
                profile.username ||
                "A"
            )
                .charAt(0)
                .toUpperCase();

    }

}



// ==========================================
// CONNECT BUTTON
// ==========================================

connectButton.addEventListener(
    "click",
    function () {

        alert(
            "Training connections are coming soon to StrengthHub."
        );

    }
);



// ==========================================
// START
// ==========================================

loadAthleteProfile();

