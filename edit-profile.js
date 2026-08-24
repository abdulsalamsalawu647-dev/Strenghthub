const editProfileForm = document.getElementById("editProfileForm");

const usernameInput = document.getElementById("username");
const fullnameInput = document.getElementById("fullname");
const bioInput = document.getElementById("bio");
const profileImageInput = document.getElementById("profile_image");

const disciplineInput =
    document.getElementById("discipline");

const experienceInput =
    document.getElementById("experience_level");

const goalInput =
    document.getElementById("training_goal");

const locationInput =
    document.getElementById("location");

const profileAvatar =
    document.getElementById("profileAvatar");

const message =
    document.getElementById("editProfileMessage");


let currentUser = null;


// ==========================================
// LOAD CURRENT PROFILE
// ==========================================

async function loadProfile() {

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();


    // Check if user is logged in

    if (userError || !user) {

        window.location.href = "login.html";

        return;
    }


    currentUser = user;


    // Get current profile

    const {
        data: profile,
        error: profileError
    } = await supabaseClient
        .from("profiles")
        .select(`
            username,
            full_name,
            bio,
            profile_image,
            discipline,
            experience_level,
            training_goal,
            location
        `)
        .eq("id", user.id)
        .single();


    // Check for error

    if (profileError) {

        console.error(profileError);

        message.textContent =
            "Could not load your profile.";

        return;
    }


    // ==========================================
    // FILL PROFILE FORM
    // ==========================================

    usernameInput.value =
        profile.username || "";


    fullnameInput.value =
        profile.full_name || "";


    bioInput.value =
        profile.bio || "";


    profileImageInput.value =
        profile.profile_image || "";


    disciplineInput.value =
        profile.discipline || "";


    experienceInput.value =
        profile.experience_level || "";


    goalInput.value =
        profile.training_goal || "";


    locationInput.value =
        profile.location || "";


    // Update avatar

    updateAvatar(profile.username);
}


// ==========================================
// UPDATE AVATAR
// ==========================================

function updateAvatar(username) {

    if (!username) {

        profileAvatar.textContent = "?";

        return;
    }


    profileAvatar.textContent =
        username.charAt(0).toUpperCase();
}


// ==========================================
// SAVE PROFILE
// ==========================================

editProfileForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        // Check login

        if (!currentUser) {

            message.textContent =
                "You are not logged in.";

            return;
        }


        message.textContent =
            "Saving changes...";


        // ==========================================
        // GET FORM VALUES
        // ==========================================

        const username =
            usernameInput.value.trim();


        const fullname =
            fullnameInput.value.trim();


        const bio =
            bioInput.value.trim();


        const profileImage =
            profileImageInput.value.trim();


        const discipline =
            disciplineInput.value;


        const experienceLevel =
            experienceInput.value;


        const trainingGoal =
            goalInput.value;


        const location =
            locationInput.value.trim();


        // ==========================================
        // UPDATE SUPABASE
        // ==========================================

        const { error } =
            await supabaseClient
                .from("profiles")
                .update({

                    username: username,

                    full_name: fullname,

                    bio: bio,

                    profile_image: profileImage,

                    discipline: discipline,

                    experience_level: experienceLevel,

                    training_goal: trainingGoal,

                    location: location

                })
                .eq("id", currentUser.id);


        // ==========================================
        // CHECK FOR ERROR
        // ==========================================

        if (error) {

            console.error(error);

            message.textContent =
                "Could not save your profile: " +
                error.message;

            return;
        }


        // ==========================================
        // SUCCESS
        // ==========================================

        message.textContent =
            "Profile updated successfully!";


        updateAvatar(username);


        // Return to profile

        setTimeout(function () {

            window.location.href =
                "profile.html";

        }, 1000);

    }
);


// ==========================================
// START
// ==========================================

loadProfile();