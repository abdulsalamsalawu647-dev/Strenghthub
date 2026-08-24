// ==========================================
// MY CHALLENGES
// ==========================================


// ==========================================
// CONTAINER
// ==========================================

const myChallenges =
    document.getElementById("myChallenges");


// ==========================================
// LOAD MY CHALLENGES
// ==========================================

async function loadMyChallenges() {


    // ==========================================
    // GET CURRENT USER
    // ==========================================

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (userError || !user) {

        myChallenges.innerHTML = `

            <div class="challenge-loading">

                <h3>
                    Please Log In
                </h3>

                <p>
                    You need to be logged in to view
                    your challenges.
                </p>

                <a
                    href="login.html"
                    class="challenge-button"
                >
                    LOG IN
                </a>

            </div>

        `;

        return;
    }


    // ==========================================
    // LOAD PARTICIPATION
    // ==========================================

    const {
        data: participation,
        error: participationError
    } = await supabaseClient

        .from("challenge_participants")

        .select(`
            id,
            challenge_id,
            status,
            joined_at,
            completed_at
        `)

        .eq(
            "user_id",
            user.id
        )

        .order(
            "joined_at",
            {
                ascending: false
            }
        );


    // ==========================================
    // ERROR
    // ==========================================

    if (participationError) {

        console.error(
            "My challenges error:",
            participationError
        );


        myChallenges.innerHTML = `

            <div class="challenge-loading">

                <h3>
                    Unable to load your challenges
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

        return;
    }


    // ==========================================
    // NO CHALLENGES
    // ==========================================

    if (
        !participation ||
        participation.length === 0
    ) {

        myChallenges.innerHTML = `

            <div class="challenge-loading">

                <h3>
                    You haven't joined any challenges yet.
                </h3>

                <p>
                    Choose a challenge and start working
                    towards your fitness goals.
                </p>

                <a
                    href="challenges.html"
                    class="challenge-button"
                >
                    FIND A CHALLENGE
                </a>

            </div>

        `;

        return;
    }


    // ==========================================
    // GET CHALLENGE IDS
    // ==========================================

    const challengeIds =
        participation.map(
            function(item) {

                return item.challenge_id;

            }
        );


    // ==========================================
    // LOAD CHALLENGE INFORMATION
    // ==========================================

    const {
        data: challenges,
        error: challengesError
    } = await supabaseClient

        .from("challenges")

        .select(`
            id,
            title,
            description,
            difficulty,
            duration_days,
            focus,
            icon
        `)

        .in(
            "id",
            challengeIds
        );


    // ==========================================
    // ERROR
    // ==========================================

    if (challengesError) {

        console.error(
            "Challenge information error:",
            challengesError
        );


        myChallenges.innerHTML = `

            <div class="challenge-loading">

                <h3>
                    Unable to load challenge information
                </h3>

            </div>

        `;

        return;
    }


    // ==========================================
    // LOAD COMPLETED PROGRESS
    // ==========================================

    const {
        data: progressData,
        error: progressError
    } = await supabaseClient

        .from("challenge_progress")

        .select(`
            challenge_id,
            day_number
        `)

        .eq(
            "user_id",
            user.id
        );


    // ==========================================
    // CHECK PROGRESS ERROR
    // ==========================================

    if (progressError) {

        console.error(
            "Challenge progress error:",
            progressError
        );

    }


    const progress =
        progressData || [];


    // ==========================================
    // CLEAR
    // ==========================================

    myChallenges.innerHTML = "";


    // ==========================================
    // DISPLAY CHALLENGES
    // ==========================================

    participation.forEach(
        function(participationItem) {


            const challenge =
                challenges.find(
                    function(item) {

                        return item.id ===
                            participationItem.challenge_id;

                    }
                );


            if (!challenge) {
                return;
            }


            // ======================================
            // FIND COMPLETED DAYS
            // ======================================

            const completedDays =
                progress.filter(
                    function(item) {

                        return item.challenge_id ===
                            challenge.id;

                    }
                );


            const completedCount =
                completedDays.length;


            // ======================================
            // CALCULATE PERCENTAGE
            // ======================================

            let percentage = 0;


            if (
                challenge.duration_days > 0
            ) {

                percentage =
                    Math.round(
                        (
                            completedCount /
                            challenge.duration_days
                        ) * 100
                    );

            }


            // ======================================
            // PREVENT OVER 100%
            // ======================================

            if (percentage > 100) {

                percentage = 100;

            }


            // ======================================
            // STATUS
            // ======================================

            let statusText =
                "ACTIVE";


            if (
                participationItem.status ===
                "completed"
            ) {

                statusText =
                    "COMPLETED";

            }


            // ======================================
            // CARD
            // ======================================

            const card =
                document.createElement("article");


            card.className =
                "challenge-card";


            card.innerHTML = `

                <div class="challenge-icon">

                    ${challenge.icon || "🏆"}

                </div>


                <span class="challenge-level">

                    ${statusText}

                </span>


                <h3>

                    ${challenge.title}

                </h3>


                <p>

                    ${challenge.description || ""}

                </p>


                <div class="challenge-info">


                    <div>

                        <span>
                            DURATION
                        </span>

                        <strong>
                            ${challenge.duration_days} Days
                        </strong>

                    </div>


                    <div>

                        <span>
                            FOCUS
                        </span>

                        <strong>
                            ${challenge.focus || "Fitness"}
                        </strong>

                    </div>


                </div>


                <!-- ==================================
                     PROGRESS
                =================================== -->

                <div class="challenge-progress">

                    <span>
                        PROGRESS
                    </span>


                    <strong>

                        ${completedCount}
                        /
                        ${challenge.duration_days}
                        DAYS

                    </strong>


                    <div
                        class="challenge-progress-bar"
                    >

                        <div
                            class="challenge-progress-fill"
                            style="width: ${percentage}%"
                        ></div>

                    </div>


                    <span>

                        ${percentage}% COMPLETE

                    </span>

                </div>


                <!-- ==================================
                     VIEW PROGRESS
                =================================== -->

                <button
                    class="challenge-button view-progress-button"
                    type="button"
                    data-challenge-id="${challenge.id}"
                >

                    VIEW PROGRESS

                </button>

            `;


            myChallenges.appendChild(card);

        }
    );

}


// ==========================================
// VIEW PROGRESS BUTTON
// ==========================================

document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "view-progress-button"
            )
        ) {

            const challengeId =
                event.target.dataset.challengeId;


            if (!challengeId) {

                console.error(
                    "No challenge ID found."
                );

                return;
            }


            window.location.href =
                "challenge-progress.html?id=" +
                challengeId;

        }

    }
);


// ==========================================
// START
// ==========================================

loadMyChallenges();