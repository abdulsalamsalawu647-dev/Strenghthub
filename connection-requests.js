// ==========================================
// CONNECTION REQUESTS
// ==========================================

const connectionRequests =
    document.getElementById("connectionRequests");


// ==========================================
// LOAD REQUESTS
// ==========================================

async function loadConnectionRequests() {

    connectionRequests.innerHTML = `
        <div class="training-partner-empty">
            <h3>
                Loading requests...
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

        connectionRequests.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    Please Log In
                </h3>

                <p>
                    You need to be logged in to view
                    your connection requests.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // GET PENDING CONNECTION REQUESTS
    // ==========================================

    const {
        data: requests,
        error: requestsError
    } = await supabaseClient
        .from("connections")
        .select(`
            id,
            requester_id,
            receiver_id,
            status,
            created_at
        `)
        .eq("receiver_id", user.id)
        .eq("status", "pending");


    // ==========================================
    // CHECK ERROR
    // ==========================================

    if (requestsError) {

        console.error(
            "Connection requests error:",
            requestsError
        );

        connectionRequests.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    Something went wrong
                </h3>

                <p>
                    We couldn't load your connection requests.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // NO REQUESTS
    // ==========================================

    if (!requests || requests.length === 0) {

        connectionRequests.innerHTML = `
            <div class="training-partner-empty">

                <h3>
                    No Connection Requests
                </h3>

                <p>
                    You don't have any pending connection
                    requests right now.
                </p>

            </div>
        `;

        return;
    }


    // ==========================================
    // GET REQUESTER IDS
    // ==========================================

    const requesterIds =
        requests.map(function(request) {

            return request.requester_id;

        });


    // ==========================================
    // LOAD REQUESTER PROFILES
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
            profile_image,
            discipline,
            experience_level,
            training_goal,
            location
        `)
        .in("id", requesterIds);


    // ==========================================
    // CHECK PROFILE ERROR
    // ==========================================

    if (profilesError) {

        console.error(
            "Profile error:",
            profilesError
        );

        connectionRequests.innerHTML = `
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
    // DISPLAY REQUESTS
    // ==========================================

    connectionRequests.innerHTML = "";


    requests.forEach(function(request) {

        const profile =
            profiles.find(function(profile) {

                return profile.id ===
                    request.requester_id;

            });


        if (!profile) {
            return;
        }


        const initial =
            (
                profile.username ||
                profile.full_name ||
                "A"
            )
            .charAt(0)
            .toUpperCase();


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
                        📍 ${profile.location || "Location not set"}
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


            <p>

                <strong>
                    ${profile.username || "This athlete"}
                </strong>

                wants to connect with you.

            </p>


            <div class="profile-actions">

                <button
                    class="profile-button accept-button"
                    data-id="${request.id}"
                >
                    ACCEPT
                </button>


                <button
                    class="profile-button profile-logout decline-button"
                    data-id="${request.id}"
                >
                    DECLINE
                </button>

            </div>

        `;


        // ==========================================
        // ACCEPT BUTTON
        // ==========================================

        const acceptButton =
            card.querySelector(".accept-button");


        acceptButton.addEventListener(
            "click",
            async function() {

                acceptButton.disabled =
                    true;

                acceptButton.textContent =
                    "ACCEPTING...";


                const {
                    error
                } = await supabaseClient
                    .from("connections")
                    .update({
                        status: "accepted"
                    })
                    .eq("id", request.id);


                if (error) {

                    console.error(
                        "Accept connection error:",
                        error
                    );


                    acceptButton.disabled =
                        false;

                    acceptButton.textContent =
                        "ACCEPT";


                    alert(
                        "Could not accept connection: " +
                        error.message
                    );

                    return;
                }


                // ==================================
                // REMOVE REQUEST FROM PAGE
                // ==================================

                card.remove();


                // ==================================
                // CHECK IF PAGE IS NOW EMPTY
                // ==================================

                if (
                    connectionRequests.children.length === 0
                ) {

                    connectionRequests.innerHTML = `
                        <div class="training-partner-empty">

                            <h3>
                                No Connection Requests
                            </h3>

                            <p>
                                You don't have any pending
                                connection requests right now.
                            </p>

                        </div>
                    `;

                }

            }
        );


        // ==========================================
        // DECLINE BUTTON
        // ==========================================

        const declineButton =
            card.querySelector(".decline-button");


        declineButton.addEventListener(
            "click",
            async function() {

                declineButton.disabled =
                    true;

                declineButton.textContent =
                    "DECLINING...";


                const {
                    error
                } = await supabaseClient
                    .from("connections")
                    .update({
                        status: "declined"
                    })
                    .eq("id", request.id);


                if (error) {

                    console.error(
                        "Decline connection error:",
                        error
                    );


                    declineButton.disabled =
                        false;

                    declineButton.textContent =
                        "DECLINE";


                    alert(
                        "Could not decline connection: " +
                        error.message
                    );

                    return;
                }


                // ==================================
                // REMOVE REQUEST FROM PAGE
                // ==================================

                card.remove();


                // ==================================
                // CHECK IF PAGE IS NOW EMPTY
                // ==================================

                if (
                    connectionRequests.children.length === 0
                ) {

                    connectionRequests.innerHTML = `
                        <div class="training-partner-empty">

                            <h3>
                                No Connection Requests
                            </h3>

                            <p>
                                You don't have any pending
                                connection requests right now.
                            </p>

                        </div>
                    `;

                }

            }
        );


        connectionRequests.appendChild(card);

    });

}


// ==========================================
// START
// ==========================================

loadConnectionRequests();