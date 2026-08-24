// ==========================================
// TRAINING PARTNERS
// ==========================================

const findPartnersButton =
    document.getElementById("findPartnersButton");

const results =
    document.getElementById("trainingPartnerResults");


// ==========================================
// FIND PARTNERS
// ==========================================

async function findTrainingPartners() {

    results.innerHTML = `
        <div class="training-partner-empty">

            <h3>
                Finding Athletes...
            </h3>

            <p>
                Searching the StrengthHub community.
            </p>

        </div>
    `;


    // ==========================================
    // GET CURRENT USER
    // ==========================================

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();


    if (userError || !user) {

        results.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    Please Log In
                </h3>

                <p>
                    You need to be logged in to find
                    training partners.
                </p>

            </div>
        `;

        return;
    }


    console.log("CURRENT USER ID:", user.id);


    // ==========================================
    // GET PROFILES
    // ==========================================

    const {
        data: profiles,
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
        `);


    // ==========================================
    // CHECK SUPABASE ERROR
    // ==========================================

    if (error) {

        console.error(
            "Supabase error:",
            error
        );

        results.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    Something went wrong
                </h3>

                <p>
                    We couldn't load the
                    StrengthHub athletes.
                </p>

            </div>
        `;

        return;
    }


    console.log("ALL PROFILES:", profiles);


    // ==========================================
    // REMOVE CURRENT USER
    // ==========================================

    const otherProfiles =
        (profiles || []).filter(function(profile) {

            return profile.id !== user.id;

        });


    console.log(
        "OTHER PROFILES:",
        otherProfiles
    );


    // ==========================================
    // CHECK FOR OTHER PROFILES
    // ==========================================

    if (otherProfiles.length === 0) {

        results.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    No Other Athletes Yet
                </h3>

                <p>
                    You're currently the only
                    StrengthHub athlete available.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // GET FILTER VALUES
    // ==========================================

    const selectedDiscipline =
        document.getElementById(
            "disciplineFilter"
        ).value;


    const selectedExperience =
        document.getElementById(
            "experienceFilter"
        ).value;


    const selectedGoal =
        document.getElementById(
            "goalFilter"
        ).value;


    const selectedLocation =
        document.getElementById(
            "locationFilter"
        )
        .value
        .trim()
        .toLowerCase();


    // ==========================================
    // FILTER PROFILES
    // ==========================================

    const filteredProfiles =
        otherProfiles.filter(function(profile) {


            if (
                selectedDiscipline &&
                profile.discipline !==
                selectedDiscipline
            ) {

                return false;
            }


            if (
                selectedExperience &&
                profile.experience_level !==
                selectedExperience
            ) {

                return false;
            }


            if (
                selectedGoal &&
                profile.training_goal !==
                selectedGoal
            ) {

                return false;
            }


            if (
                selectedLocation &&
                !(
                    profile.location || ""
                )
                .toLowerCase()
                .includes(selectedLocation)
            ) {

                return false;
            }


            return true;

        });


    // ==========================================
    // NO MATCHING ATHLETES
    // ==========================================

    if (filteredProfiles.length === 0) {

        results.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    No Matching Athletes
                </h3>

                <p>
                    Try changing your training
                    preferences.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // DISPLAY RESULTS
    // ==========================================

    results.innerHTML = "";


    filteredProfiles.forEach(
        function(profile) {


            // TEST PROFILE ID
            console.log(
                "PROFILE ID:",
                profile.id
            );


            const card =
                document.createElement("article");


            card.className =
                "training-partner-card";


            const initial =
                (
                    profile.username ||
                    profile.full_name ||
                    "A"
                )
                .charAt(0)
                .toUpperCase();


            // ==========================================
            // PROFILE LINK
            // ==========================================

            const profileLink =
                `profile.html?id=${encodeURIComponent(profile.id)}`;


            console.log(
                "PROFILE LINK:",
                profileLink
            );


            card.innerHTML = `

                <div class="training-partner-card-header">

                    <div class="training-partner-avatar">

                        ${
                            profile.profile_image
                            ?
                            `<img
                                src="${profile.profile_image}"
                                alt="Profile picture"
                            >`
                            :
                            initial
                        }

                    </div>


                    <div>

                        <div class="training-partner-name">

                            ${profile.username || "Athlete"}

                        </div>


                        <div class="training-partner-location">

                            📍
                            ${profile.location || "Location not set"}

                        </div>

                    </div>

                </div>


                <div class="training-partner-details">

                    <div class="training-partner-detail">

                        <span>
                            Discipline
                        </span>

                        <strong>
                            ${profile.discipline || "Not set"}
                        </strong>

                    </div>


                    <div class="training-partner-detail">

                        <span>
                            Experience
                        </span>

                        <strong>
                            ${profile.experience_level || "Not set"}
                        </strong>

                    </div>


                    <div class="training-partner-detail">

                        <span>
                            Goal
                        </span>

                        <strong>
                            ${profile.training_goal || "Not set"}
                        </strong>

                    </div>

                </div>


                <a
                    href="${profileLink}"
                    class="training-partner-button"
                >
                    VIEW PROFILE
                </a>

            `;


            results.appendChild(card);

        }
    );

}


// ==========================================
// BUTTON
// ==========================================

findPartnersButton.addEventListener(
    "click",
    findTrainingPartners
);