// ==========================================
// STRENGTHHUB CHALLENGES
// ==========================================


// ==========================================
// CHALLENGES CONTAINER
// ==========================================

const challengesGrid =
    document.querySelector(".challenges-grid");


// ==========================================
// LOAD CHALLENGES
// ==========================================

async function loadChallenges() {

    if (!challengesGrid) {

        console.error(
            "Challenges grid was not found."
        );

        return;
    }


    // ==========================================
    // LOADING
    // ==========================================

    challengesGrid.innerHTML = `

        <div class="challenge-loading">

            <h3>
                Loading challenges...
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


    if (userError) {

        console.error(
            "User error:",
            userError
        );

    }


    // ==========================================
    // GET CHALLENGES
    // ==========================================

    const {
        data: challenges,
        error
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

        .eq("is_active", true)

        .order(
            "created_at",
            {
                ascending: true
            }
        );


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        console.error(
            "Challenges error:",
            error
        );


        challengesGrid.innerHTML = `

            <div class="challenge-loading">

                <h3>
                    Unable to load challenges
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

    if (!challenges || challenges.length === 0) {

        challengesGrid.innerHTML = `

            <div class="challenge-loading">

                <h3>
                    No challenges available
                </h3>

                <p>
                    Check back soon for new challenges.
                </p>

            </div>

        `;

        return;
    }


    // ==========================================
    // GET USER'S JOINED CHALLENGES
    // ==========================================

    let joinedChallenges = [];


    if (user) {

        const {
            data: participation,
            error: participationError
        } = await supabaseClient

            .from("challenge_participants")

            .select(`
                challenge_id,
                status
            `)

            .eq(
                "user_id",
                user.id
            );


        if (participationError) {

            console.error(
                "Participation error:",
                participationError
            );

        } else {

            joinedChallenges =
                participation || [];

        }

    }


    // ==========================================
    // CLEAR LOADING
    // ==========================================

    challengesGrid.innerHTML = "";


    // ==========================================
    // DISPLAY CHALLENGES
    // ==========================================

    challenges.forEach(function(challenge) {


        const participation =
            joinedChallenges.find(
                function(item) {

                    return item.challenge_id ===
                        challenge.id;

                }
            );


        const card =
            document.createElement("article");


        card.className =
            "challenge-card";


        // ======================================
        // BUTTON
        // ======================================

        let buttonHTML;


        if (participation) {

            buttonHTML = `

                <button
                    class="challenge-button joined"
                    type="button"
                    disabled
                >
                    ✓ CHALLENGE JOINED
                </button>

            `;

        } else {

            buttonHTML = `

                <button
                    class="challenge-button"
                    type="button"
                    data-challenge-id="${challenge.id}"
                >
                    START CHALLENGE
                </button>

            `;

        }


        // ======================================
        // CARD
        // ======================================

        card.innerHTML = `

            <div class="challenge-icon">

                ${challenge.icon || "🏆"}

            </div>


            <span class="challenge-level">

                ${challenge.difficulty || "All Levels"}

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
                        ${challenge.duration_days || "-"} Days
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


            ${buttonHTML}

        `;


        challengesGrid.appendChild(card);

    });


    // ==========================================
    // CONNECT BUTTONS
    // ==========================================

    const challengeButtons =
        document.querySelectorAll(
            ".challenge-button:not(.joined)"
        );


    challengeButtons.forEach(
        function(button) {


            button.addEventListener(
                "click",
                async function() {

                    await joinChallenge(
                        button
                    );

                }
            );

        }
    );

}


// ==========================================
// JOIN CHALLENGE
// ==========================================

async function joinChallenge(button) {


    // ==========================================
    // GET USER
    // ==========================================

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();


    if (userError || !user) {

        alert(
            "Please log in before joining a challenge."
        );

        window.location.href =
            "login.html";

        return;
    }


    // ==========================================
    // GET CHALLENGE ID
    // ==========================================

    const challengeId =
        button.dataset.challengeId;


    if (!challengeId) {

        console.error(
            "Challenge ID is missing."
        );

        return;
    }


    // ==========================================
    // DISABLE BUTTON
    // ==========================================

    button.disabled =
        true;

    button.textContent =
        "JOINING...";


    // ==========================================
    // INSERT PARTICIPATION
    // ==========================================

    const {
        error
    } = await supabaseClient

        .from("challenge_participants")

        .insert({

            challenge_id:
                challengeId,

            user_id:
                user.id,

            status:
                "active"

        });


    // ==========================================
    // CHECK ERROR
    // ==========================================

    if (error) {

        console.error(
            "Join challenge error:",
            error
        );


        // Duplicate participation
        if (error.code === "23505") {

            button.textContent =
                "✓ CHALLENGE JOINED";

            button.classList.add(
                "joined"
            );

            return;
        }


        alert(
            "We couldn't join this challenge. Please try again."
        );


        button.disabled =
            false;

        button.textContent =
            "START CHALLENGE";

        return;
    }


    // ==========================================
    // SUCCESS
    // ==========================================

    button.textContent =
        "✓ CHALLENGE JOINED";


    button.classList.add(
        "joined"
    );


    alert(
        "You have joined the challenge!"
    );

}


// ==========================================
// START
// ==========================================

loadChallenges();