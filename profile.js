// ==========================================
// STRENGTHHUB PROFILE
// ==========================================


// ==========================================
// PROFILE ELEMENTS
// ==========================================

const profileUsername =
    document.getElementById("profileUsername");

const profileFullName =
    document.getElementById("profileFullName");

const profileBio =
    document.getElementById("profileBio");

const profileMessage =
    document.getElementById("profileMessage");

const connectionMessage =
    document.getElementById("connectionMessage");

const logoutButton =
    document.getElementById("logoutButton");

const profileImage =
    document.getElementById("profileImage");

const profileInitial =
    document.getElementById("profileInitial");

const profileDiscipline =
    document.getElementById("profileDiscipline");

const profileExperience =
    document.getElementById("profileExperience");

const profileGoal =
    document.getElementById("profileGoal");

const profileLocation =
    document.getElementById("profileLocation");

const profileJoined =
    document.getElementById("profileJoined");

const editProfileButton =
    document.getElementById("editProfileButton");

const connectButton =
    document.getElementById("connectButton");

const workoutCount =
    document.getElementById("workoutCount");

const achievementCount =
    document.getElementById("achievementCount");

const postCount =
    document.getElementById("postCount");


// ==========================================
// LOAD PROFILE
// ==========================================

async function loadProfile() {

    // ==========================================
    // GET CURRENT USER
    // ==========================================

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();


    if (userError || !user) {

        window.location.href =
            "login.html";

        return;

    }


    // ==========================================
    // GET PROFILE ID FROM URL
    // ==========================================

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const requestedProfileId =
        urlParams.get("id");


    // ==========================================
    // PROFILE TO SHOW
    // ==========================================

    const profileId =
        requestedProfileId || user.id;


    console.log(
        "Logged-in user:",
        user.id
    );


    console.log(
        "Profile being viewed:",
        profileId
    );


    // ==========================================
    // GET PROFILE
    // ==========================================

    const {
        data: profile,
        error: profileError
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

        .eq(
            "id",
            profileId
        )

        .single();


    if (profileError) {

        console.error(
            "Profile error:",
            profileError
        );


        if (profileMessage) {

            profileMessage.textContent =
                "Could not load profile.";

        }

        return;

    }


    // ==========================================
    // BASIC INFORMATION
    // ==========================================

    profileUsername.textContent =
        profile.username ||
        "User";


    profileFullName.textContent =
        profile.full_name ||
        "";


    profileBio.textContent =
        profile.bio ||
        "No bio added yet.";


    // ==========================================
    // FITNESS INFORMATION
    // ==========================================

    profileDiscipline.textContent =
        profile.discipline ||
        "Not set";


    profileExperience.textContent =
        profile.experience_level ||
        "Not set";


    profileGoal.textContent =
        profile.training_goal ||
        "Not set";


    profileLocation.textContent =
        profile.location ||
        "Not set";


    // ==========================================
    // MEMBER SINCE
    // ==========================================

    if (profileJoined) {

        if (profileId === user.id) {

            profileJoined.textContent =
                formatMemberSince(
                    user.created_at
                );

        } else {

            profileJoined.textContent =
                "StrengthHub Member";

        }

    }


    // ==========================================
    // PROFILE IMAGE
    // ==========================================

    if (profile.profile_image) {

        profileImage.src =
            profile.profile_image;


        profileImage.style.display =
            "block";


        profileInitial.style.display =
            "none";

    } else {

        profileImage.style.display =
            "none";


        profileInitial.style.display =
            "block";


        profileInitial.textContent =
            (
                profile.username ||
                profile.full_name ||
                "U"
            )
            .charAt(0)
            .toUpperCase();

    }


    // ==========================================
    // LOAD PROFILE STATS
    // ==========================================

    await loadProfileStats(
        profileId
    );


    // ==========================================
    // MY PROFILE
    // ==========================================

    if (profile.id === user.id) {

        editProfileButton.style.display =
            "inline-block";


        logoutButton.style.display =
            "inline-block";


        connectButton.style.display =
            "none";


        console.log(
            "Viewing MY profile."
        );


        return;

    }


    // ==========================================
    // OTHER ATHLETE
    // ==========================================

    editProfileButton.style.display =
        "none";


    logoutButton.style.display =
        "none";


    connectButton.style.display =
        "inline-block";


    console.log(
        "Viewing ANOTHER athlete's profile."
    );


    // ==========================================
    // CHECK CONNECTION
    // ==========================================

    await checkConnectionStatus(
        user.id,
        profile.id
    );

}


// ==========================================
// LOAD PROFILE STATS
// ==========================================

async function loadProfileStats(
    profileId
) {

    // ==========================================
    // WORKOUTS
    // ==========================================

    if (workoutCount) {

        workoutCount.textContent =
            "0";

    }


    // ==========================================
    // ACHIEVEMENTS
    // ==========================================

    if (achievementCount) {

        achievementCount.textContent =
            "0";

    }


    // ==========================================
    // COMMUNITY POSTS
    // ==========================================

    const {
        count,
        error
    } = await supabaseClient

        .from("community_posts")

        .select(
            "id",
            {
                count: "exact",
                head: true
            }
        )

        .eq(
            "user_id",
            profileId
        );


    if (error) {

        console.error(
            "Profile post count error:",
            error
        );


        if (postCount) {

            postCount.textContent =
                "0";

        }

        return;

    }


    if (postCount) {

        postCount.textContent =
            count || 0;

    }

}


// ==========================================
// FORMAT MEMBER DATE
// ==========================================

function formatMemberSince(
    dateString
) {

    if (!dateString) {

        return "--";

    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {

        return "--";

    }


    return date.toLocaleDateString(
        "en-GB",
        {
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// CHECK CONNECTION STATUS
// ==========================================

async function checkConnectionStatus(
    currentUserId,
    profileId
) {

    const {
        data: connections,
        error
    } = await supabaseClient

        .from("connections")

        .select(`
            id,
            requester_id,
            receiver_id,
            status
        `)

        .or(
            `and(requester_id.eq.${currentUserId},receiver_id.eq.${profileId}),and(requester_id.eq.${profileId},receiver_id.eq.${currentUserId})`
        );


    if (error) {

        console.error(
            "Connection status error:",
            error
        );

        return;

    }


    // ==========================================
    // NO CONNECTION
    // ==========================================

    if (
        !connections ||
        connections.length === 0
    ) {

        connectButton.textContent =
            "CONNECT";


        connectButton.disabled =
            false;


        connectionMessage.textContent =
            "";

        return;

    }


    // ==========================================
    // GET MOST RECENT CONNECTION
    // ==========================================

    const connection =
        connections[
            connections.length - 1
        ];


    // ==========================================
    // PENDING
    // ==========================================

    if (
        connection.status ===
        "pending"
    ) {

        // ======================================
        // CURRENT USER SENT REQUEST
        // ======================================

        if (
            connection.requester_id ===
            currentUserId
        ) {

            connectButton.textContent =
                "REQUEST SENT";


            connectButton.disabled =
                true;


            connectionMessage.textContent =
                "Your connection request is pending.";

            return;

        }


        // ======================================
        // OTHER USER SENT REQUEST
        // ======================================

        connectButton.textContent =
            "REQUEST RECEIVED";


        connectButton.disabled =
            true;


        connectionMessage.textContent =
            "This athlete has sent you a connection request.";

        return;

    }


    // ==========================================
    // ACCEPTED
    // ==========================================

    if (
        connection.status ===
        "accepted"
    ) {

        connectButton.textContent =
            "CONNECTED";


        connectButton.disabled =
            true;


        connectionMessage.textContent =
            "You are connected with this athlete.";

        return;

    }


    // ==========================================
    // DECLINED
    // ==========================================

    if (
        connection.status ===
        "declined"
    ) {

        if (
            connection.requester_id ===
            currentUserId
        ) {

            connectButton.textContent =
                "REQUEST DECLINED";


            connectButton.disabled =
                true;


            connectionMessage.textContent =
                "This athlete declined your connection request.";

            return;

        }


        connectButton.textContent =
            "CONNECT";


        connectButton.disabled =
            false;


        connectionMessage.textContent =
            "";

    }

}


// ==========================================
// LOG OUT
// ==========================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            logoutButton.disabled =
                true;


            logoutButton.textContent =
                "LOGGING OUT...";


            const {
                error
            } =
                await supabaseClient.auth.signOut();


            if (error) {

                console.error(
                    "Logout error:",
                    error
                );


                profileMessage.textContent =
                    error.message;


                logoutButton.disabled =
                    false;


                logoutButton.textContent =
                    "LOG OUT";

                return;

            }


            window.location.href =
                "index.html";

        }
    );

}


// ==========================================
// CONNECT BUTTON
// ==========================================

if (connectButton) {

    connectButton.addEventListener(
        "click",
        async function () {

            // ======================================
            // GET CURRENT USER
            // ======================================

            const {
                data: { user },
                error: userError
            } = await supabaseClient.auth.getUser();


            if (
                userError ||
                !user
            ) {

                connectionMessage.textContent =
                    "Please log in first.";

                return;

            }


            // ======================================
            // GET RECEIVER
            // ======================================

            const urlParams =
                new URLSearchParams(
                    window.location.search
                );


            const receiverId =
                urlParams.get("id");


            if (!receiverId) {

                connectionMessage.textContent =
                    "Could not find this athlete.";

                return;

            }


            // ======================================
            // PREVENT SELF CONNECTION
            // ======================================

            if (
                receiverId ===
                user.id
            ) {

                connectionMessage.textContent =
                    "You cannot connect with yourself.";

                return;

            }


            // ======================================
            // CHECK EXISTING CONNECTION
            // ======================================

            const {
                data: existingConnections,
                error: existingError
            } = await supabaseClient

                .from("connections")

                .select(`
                    id,
                    requester_id,
                    receiver_id,
                    status
                `)

                .or(
                    `and(requester_id.eq.${user.id},receiver_id.eq.${receiverId}),and(requester_id.eq.${receiverId},receiver_id.eq.${user.id})`
                );


            if (existingError) {

                console.error(
                    "Existing connection error:",
                    existingError
                );


                connectionMessage.textContent =
                    "Could not check connection status.";

                return;

            }


            // ======================================
            // EXISTING CONNECTION
            // ======================================

            if (
                existingConnections &&
                existingConnections.length > 0
            ) {

                await checkConnectionStatus(
                    user.id,
                    receiverId
                );

                return;

            }


            // ======================================
            // DISABLE BUTTON
            // ======================================

            connectButton.disabled =
                true;


            connectButton.textContent =
                "SENDING...";


            connectionMessage.textContent =
                "";


            // ======================================
            // CREATE CONNECTION
            // ======================================

            const {
                data,
                error
            } = await supabaseClient

                .from("connections")

                .insert({

                    requester_id:
                        user.id,

                    receiver_id:
                        receiverId,

                    status:
                        "pending"

                })

                .select()

                .single();


            // ======================================
            // ERROR
            // ======================================

            if (error) {

                console.error(
                    "Connection request error:",
                    error
                );


                connectButton.disabled =
                    false;


                connectButton.textContent =
                    "CONNECT";


                connectionMessage.textContent =
                    error.message;

                return;

            }


            // ======================================
            // SUCCESS
            // ======================================

            console.log(
                "Connection request created:",
                data
            );


            connectButton.textContent =
                "REQUEST SENT";


            connectButton.disabled =
                true;


            connectionMessage.textContent =
                "Connection request sent successfully.";

        }
    );

}


// ==========================================
// START PROFILE
// ==========================================

loadProfile();