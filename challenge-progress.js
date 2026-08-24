
// ==========================================
// STRENGTHHUB CHALLENGE PROGRESS
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const challengeTitle =
    document.getElementById("challengeTitle");

const challengeDescription =
    document.getElementById("challengeDescription");

const challengeIcon =
    document.getElementById("challengeIcon");

const challengeDifficulty =
    document.getElementById("challengeDifficulty");

const progressText =
    document.getElementById("progressText");

const progressPercentage =
    document.getElementById("progressPercentage");

const daysCompleted =
    document.getElementById("daysCompleted");

const totalDays =
    document.getElementById("totalDays");

const progressFill =
    document.getElementById("progressFill");

const currentDay =
    document.getElementById("currentDay");

const challengeDays =
    document.getElementById("challengeDays");


// ==========================================
// GET CHALLENGE ID
// ==========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const challengeId =
    urlParams.get("id");


// ==========================================
// VARIABLES
// ==========================================

let currentUser = null;

let participation = null;

let challenge = null;

let completedProgress = [];


// ==========================================
// LOAD PAGE
// ==========================================

async function loadChallengeProgress() {

    // ==========================================
    // CHECK CHALLENGE ID
    // ==========================================

    if (!challengeId) {

        challengeTitle.textContent =
            "Challenge not found";

        challengeDescription.textContent =
            "No challenge was selected.";

        return;
    }


    // ==========================================
    // GET USER
    // ==========================================

    const {
        data: { user },
        error: userError
    } =
        await supabaseClient.auth.getUser();


    if (userError || !user) {

        window.location.href =
            "login.html";

        return;
    }


    currentUser =
        user;


    // ==========================================
    // LOAD CHALLENGE
    // ==========================================

    const {
        data: challengeData,
        error: challengeError
    } =
        await supabaseClient

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

            .eq(
                "id",
                challengeId
            )

            .single();


    if (challengeError) {

        console.error(
            "Challenge error:",
            challengeError
        );


        challengeTitle.textContent =
            "Unable to load challenge";


        challengeDescription.textContent =
            "There was a problem loading this challenge.";

        return;
    }


    challenge =
        challengeData;


    // ==========================================
    // DISPLAY CHALLENGE
    // ==========================================

    challengeTitle.textContent =
        challenge.title;


    challengeDescription.textContent =
        challenge.description || "";


    challengeIcon.textContent =
        challenge.icon || "🏆";


    challengeDifficulty.textContent =
        challenge.difficulty || "All Levels";


    totalDays.textContent =
        challenge.duration_days;


    // ==========================================
    // LOAD PARTICIPATION
    // ==========================================

    const {
        data: participationData,
        error: participationError
    } =
        await supabaseClient

            .from("challenge_participants")

            .select(`
                id,
                challenge_id,
                user_id,
                status,
                joined_at,
                completed_at
            `)

            .eq(
                "challenge_id",
                challengeId
            )

            .eq(
                "user_id",
                currentUser.id
            )

            .maybeSingle();


    if (
        participationError ||
        !participationData
    ) {

        console.error(
            "Participation error:",
            participationError
        );


        challengeTitle.textContent =
            "Challenge not joined";


        challengeDescription.textContent =
            "You need to join this challenge before tracking progress.";

        return;
    }


    participation =
        participationData;


    // ==========================================
    // LOAD PROGRESS
    // ==========================================

    await loadProgress();


    // ==========================================
    // DISPLAY
    // ==========================================

    displayProgress();

}


// ==========================================
// LOAD PROGRESS
// ==========================================

async function loadProgress() {

    const {
        data,
        error
    } =
        await supabaseClient

            .from("challenge_progress")

            .select(`
                id,
                participation_id,
                user_id,
                challenge_id,
                day_number,
                completed_at
            `)

            .eq(
                "participation_id",
                participation.id
            )

            .eq(
                "user_id",
                currentUser.id
            )

            .eq(
                "challenge_id",
                challenge.id
            )

            .order(
                "day_number",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Progress error:",
            error
        );


        completedProgress =
            [];

        return;
    }


    completedProgress =
        data || [];

}


// ==========================================
// DISPLAY PROGRESS
// ==========================================

function displayProgress() {

    const total =
        Number(
            challenge.duration_days
        );


    const completed =
        completedProgress.length;


    // ==========================================
    // CALCULATE PERCENTAGE
    // ==========================================

    let percentage =
        0;


    if (total > 0) {

        percentage =
            Math.round(
                (completed / total) * 100
            );

    }


    if (percentage > 100) {

        percentage =
            100;

    }


    // ==========================================
    // UPDATE SUMMARY
    // ==========================================

    progressText.textContent =
        percentage + "%";


    if (progressPercentage) {

        progressPercentage.textContent =
            percentage + "%";

    }


    daysCompleted.textContent =
        completed;


    totalDays.textContent =
        total;


    progressFill.style.width =
        percentage + "%";


    // ==========================================
    // CHALLENGE COMPLETE
    // ==========================================

    if (
        completed >= total
    ) {

        showChallengeComplete();

        return;
    }


    // ==========================================
    // NEXT DAY
    // ==========================================

    const nextDay =
        completed + 1;


    currentDay.innerHTML = `

        <span class="challenge-today-label">
            TODAY'S CHALLENGE
        </span>


        <h2>
            Day ${nextDay}
        </h2>


        <p>
            Complete today's challenge
            to continue your progress.
        </p>


        <button
            id="completeDayButton"
            class="challenge-button"
            type="button"
        >
            MARK DAY ${nextDay} COMPLETE
        </button>

    `;


    const button =
        document.getElementById(
            "completeDayButton"
        );


    if (button) {

        button.addEventListener(
            "click",
            function () {

                completeDay(
                    nextDay,
                    button
                );

            }
        );

    }


    // ==========================================
    // DISPLAY HISTORY
    // ==========================================

    displayDayHistory();

}


// ==========================================
// DISPLAY DAY HISTORY
// ==========================================

function displayDayHistory() {

    if (
        completedProgress.length === 0
    ) {

        challengeDays.innerHTML = `

            <p>
                No days completed yet.
                Start with Day 1.
            </p>

        `;

        return;
    }


    challengeDays.innerHTML =
        "";


    completedProgress.forEach(
        function (progress) {

            const day =
                document.createElement(
                    "div"
                );


            day.className =
                "challenge-day-completed";


            const date =
                new Date(
                    progress.completed_at
                );


            day.innerHTML = `

                <strong>
                    ✓ Day ${progress.day_number}
                </strong>


                <span>
                    Completed
                    ${date.toLocaleDateString()}
                </span>

            `;


            challengeDays.appendChild(
                day
            );

        }
    );

}


// ==========================================
// COMPLETE DAY
// ==========================================

async function completeDay(
    dayNumber,
    button
) {

    button.disabled =
        true;


    button.textContent =
        "SAVING...";


    // ==========================================
    // SAVE PROGRESS
    // ==========================================

    const {
        error
    } =
        await supabaseClient

            .from("challenge_progress")

            .insert({

                participation_id:
                    participation.id,

                user_id:
                    currentUser.id,

                challenge_id:
                    challenge.id,

                day_number:
                    dayNumber

            });


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        console.error(
            "Complete day error:",
            error
        );


        if (
            error.code ===
            "23505"
        ) {

            alert(
                "This day has already been completed."
            );

        } else {

            alert(
                "We couldn't save your progress. Please try again."
            );

        }


        button.disabled =
            false;


        button.textContent =
            "MARK DAY " +
            dayNumber +
            " COMPLETE";


        return;
    }


    // ==========================================
    // CHECK FINAL DAY
    // ==========================================

    const newCompletedCount =
        completedProgress.length + 1;


    if (
        newCompletedCount >=
        Number(
            challenge.duration_days
        )
    ) {

        await completeChallenge();

        return;
    }


    // ==========================================
    // RELOAD
    // ==========================================

    await loadProgress();

    displayProgress();

}


// ==========================================
// COMPLETE CHALLENGE
// ==========================================

async function completeChallenge() {

    const {
        error
    } =
        await supabaseClient

            .from("challenge_participants")

            .update({

                status:
                    "completed",

                completed_at:
                    new Date().toISOString()

            })

            .eq(
                "id",
                participation.id
            )

            .eq(
                "user_id",
                currentUser.id
            );


    if (error) {

        console.error(
            "Challenge completion error:",
            error
        );

    }


    // ==========================================
    // RELOAD
    // ==========================================

    await loadProgress();

    displayProgress();

}


// ==========================================
// CHALLENGE COMPLETE SCREEN
// ==========================================

function showChallengeComplete() {

    progressText.textContent =
        "100%";


    if (progressPercentage) {

        progressPercentage.textContent =
            "100%";

    }


    daysCompleted.textContent =
        challenge.duration_days;


    totalDays.textContent =
        challenge.duration_days;


    progressFill.style.width =
        "100%";


    currentDay.innerHTML = `

        <div class="challenge-complete">

            <div class="challenge-complete-icon">
                🎉
            </div>


            <h2>
                Challenge Complete!
            </h2>


            <p>

                Congratulations!
                You completed

                <strong>
                    ${challenge.title}
                </strong>.

            </p>


            <span>

                ${challenge.duration_days}
                /
                ${challenge.duration_days}
                DAYS COMPLETED

            </span>

        </div>

    `;


    displayDayHistory();

}


// ==========================================
// START
// ==========================================

loadChallengeProgress();

