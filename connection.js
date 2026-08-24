
// ==========================================
// CONNECTIONS
// ==========================================

const connectionsList =
    document.getElementById("connectionsList");


// ==========================================
// LOAD CONNECTIONS
// ==========================================

async function loadConnections() {

    connectionsList.innerHTML = `
        <div class="training-partner-empty">

            <h3>
                Loading connections...
            </h3>

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

        connectionsList.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    Please Log In
                </h3>

                <p>
                    You need to be logged in to view
                    your connections.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // GET ACCEPTED CONNECTIONS
    // ==========================================

    const {
        data: connections,
        error: connectionsError
    } = await supabaseClient
        .from("connections")
        .select(`
            id,
            requester_id,
            receiver_id,
            status,
            created_at
        `)
        .eq("status", "accepted")
        .or(
            `requester_id.eq.${user.id},receiver_id.eq.${user.id}`
        );


    // ==========================================
    // CHECK ERROR
    // ==========================================

    if (connectionsError) {

        console.error(
            "Connections error:",
            connectionsError
        );

        connectionsList.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    Something went wrong
                </h3>

                <p>
                    We couldn't load your connections.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // NO CONNECTIONS
    // ==========================================

    if (!connections || connections.length === 0) {

        connectionsList.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    No Connections Yet
                </h3>

                <p>
                    You haven't connected with any athletes yet.
                </p>

                <a
                    href="training-partners.html"
                    class="community-feature-btn"
                >
                    FIND TRAINING PARTNERS
                </a>

            </div>
        `;

        return;
    }


    // ==========================================
    // GET OTHER ATHLETE IDS
    // ==========================================

    const otherUserIds =
        connections.map(function(connection) {

            if (
                connection.requester_id === user.id
            ) {

                return connection.receiver_id;

            }

            return connection.requester_id;

        });


    // ==========================================
    // LOAD ATHLETE PROFILES
    // ==========================================

    const {
        data: profiles,
        error: profilesError
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
        .in("id", otherUserIds);


    // ==========================================
    // CHECK PROFILE ERROR
    // ==========================================

    if (profilesError) {

        console.error(
            "Connection profile error:",
            profilesError
        );

        connectionsList.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    Something went wrong
                </h3>

                <p>
                    We couldn't load the athlete profiles.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // DISPLAY CONNECTIONS
    // ==========================================

    connectionsList.innerHTML = "";


    profiles.forEach(function(profile) {

        // ======================================
        // PROFILE INITIAL
        // ======================================

        const initial =
            (
                profile.username ||
                profile.full_name ||
                "A"
            )
            .charAt(0)
            .toUpperCase();


        // ======================================
        // CREATE CARD
        // ======================================

        const card =
            document.createElement("article");


        card.className =
            "training-partner-card";


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


            <div class="profile-actions">

                <a
                    href="profile.html?id=${profile.id}"
                    class="profile-button"
                >
                    VIEW PROFILE
                </a>

            </div>

        `;


        connectionsList.appendChild(card);

    });

}


// ==========================================
// START
// ==========================================

loadConnections();

