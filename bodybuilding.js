/* ==========================================
   STRENGTHHUB
   BODYBUILDING EXERCISE LIBRARY
========================================== */


/* ==========================================
   EXERCISE DATABASE
========================================== */

const bodybuildingExercises = [

    {
        name: "Barbell Bench Press",
        type: "compound",
        equipment: "Free Weight",
        difficulty: "Intermediate",
        muscles: "Chest, Triceps, Front Delts",
        sets: "3–4",
        reps: "6–10",
        rest: "2–3 min",
        description:
            "Lie on the bench with your feet planted firmly. Lower the bar towards your chest with control, then press it upward while keeping your body stable.",
        progression:
            "Gradually increase the weight when you can complete all prescribed repetitions with controlled technique.",
        alternative:
            "Dumbbell Bench Press"
    },

    {
        name: "Barbell Squat",
        type: "compound",
        equipment: "Free Weight",
        difficulty: "Intermediate",
        muscles: "Quadriceps, Glutes, Hamstrings",
        sets: "3–4",
        reps: "6–10",
        rest: "2–3 min",
        description:
            "Position the bar securely across your upper back. Brace your core, descend under control and drive through your feet to return to standing.",
        progression:
            "Increase the load gradually while maintaining consistent depth and technique.",
        alternative:
            "Leg Press"
    },

    {
        name: "Deadlift",
        type: "compound",
        equipment: "Free Weight",
        difficulty: "Advanced",
        muscles: "Glutes, Hamstrings, Back",
        sets: "3–4",
        reps: "4–8",
        rest: "2–4 min",
        description:
            "Stand with the bar over your mid-foot. Brace your core, hinge at the hips and drive through the floor while keeping the bar close to your body.",
        progression:
            "Increase weight gradually while keeping every repetition technically controlled.",
        alternative:
            "Rack Pull"
    },

    {
        name: "Overhead Press",
        type: "compound",
        equipment: "Free Weight",
        difficulty: "Intermediate",
        muscles: "Shoulders, Triceps",
        sets: "3–4",
        reps: "6–10",
        rest: "2–3 min",
        description:
            "Press the bar from shoulder height overhead while keeping your core braced and body stable.",
        progression:
            "Add small amounts of weight once you can complete your target repetitions with good form.",
        alternative:
            "Dumbbell Shoulder Press"
    },

    {
        name: "Barbell Row",
        type: "compound",
        equipment: "Free Weight",
        difficulty: "Intermediate",
        muscles: "Back, Lats, Biceps",
        sets: "3–4",
        reps: "6–10",
        rest: "2–3 min",
        description:
            "Hinge forward while keeping your back stable. Pull the bar towards your torso and lower it under control.",
        progression:
            "Gradually increase resistance while maintaining a stable torso.",
        alternative:
            "Seated Cable Row"
    },

    {
        name: "Romanian Deadlift",
        type: "compound",
        equipment: "Free Weight",
        difficulty: "Intermediate",
        muscles: "Hamstrings, Glutes",
        sets: "3",
        reps: "8–12",
        rest: "2–3 min",
        description:
            "Hold the weight close to your body and hinge at the hips while keeping your back neutral.",
        progression:
            "Increase the weight gradually while maintaining control throughout the movement.",
        alternative:
            "Dumbbell Romanian Deadlift"
    },


    /* ==========================================
       ISOLATION
    ========================================== */

    {
        name: "Dumbbell Lateral Raise",
        type: "isolation",
        equipment: "Free Weight",
        difficulty: "Beginner",
        muscles: "Side Delts",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Raise the dumbbells out to your sides with a slight bend in the elbows. Lower them slowly.",
        progression:
            "Increase weight gradually without sacrificing control.",
        alternative:
            "Cable Lateral Raise"
    },

    {
        name: "Leg Extension",
        type: "isolation",
        equipment: "Machine",
        difficulty: "Beginner",
        muscles: "Quadriceps",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Sit into the machine and extend your knees against the resistance before slowly returning to the starting position.",
        progression:
            "Increase resistance gradually while maintaining a controlled tempo.",
        alternative:
            "Bodyweight Squat"
    },

    {
        name: "Leg Curl",
        type: "isolation",
        equipment: "Machine",
        difficulty: "Beginner",
        muscles: "Hamstrings",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Curl your lower legs towards your body while keeping your hips stable against the machine.",
        progression:
            "Gradually increase resistance while maintaining controlled repetitions.",
        alternative:
            "Romanian Deadlift"
    },

    {
        name: "Dumbbell Biceps Curl",
        type: "isolation",
        equipment: "Free Weight",
        difficulty: "Beginner",
        muscles: "Biceps",
        sets: "3",
        reps: "8–12",
        rest: "60–90 sec",
        description:
            "Keep your elbows close to your body and curl the dumbbells upward without swinging.",
        progression:
            "Increase weight gradually while maintaining strict form.",
        alternative:
            "Cable Curl"
    },

    {
        name: "Triceps Pushdown",
        type: "isolation",
        equipment: "Cable",
        difficulty: "Beginner",
        muscles: "Triceps",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Keep your elbows close to your sides and extend your arms downward against the cable resistance.",
        progression:
            "Increase resistance gradually while keeping your elbows stable.",
        alternative:
            "Overhead Triceps Extension"
    },

    {
        name: "Dumbbell Fly",
        type: "isolation",
        equipment: "Free Weight",
        difficulty: "Intermediate",
        muscles: "Chest",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Lower the dumbbells out to the sides with control before bringing them back together.",
        progression:
            "Increase resistance carefully while maintaining a controlled range of motion.",
        alternative:
            "Cable Fly"
    },


    /* ==========================================
       MACHINES
    ========================================== */

    {
        name: "Leg Press",
        type: "machine",
        equipment: "Machine",
        difficulty: "Beginner",
        muscles: "Quadriceps, Glutes, Hamstrings",
        sets: "3–4",
        reps: "8–12",
        rest: "2 min",
        description:
            "Push the platform away using your legs while keeping your lower back supported by the machine.",
        progression:
            "Increase resistance gradually while maintaining controlled repetitions.",
        alternative:
            "Barbell Squat"
    },

    {
        name: "Machine Chest Press",
        type: "machine",
        equipment: "Machine",
        difficulty: "Beginner",
        muscles: "Chest, Triceps",
        sets: "3",
        reps: "8–12",
        rest: "90–120 sec",
        description:
            "Press the machine handles forward while keeping your back supported and movement controlled.",
        progression:
            "Gradually increase resistance once you can complete your target repetitions.",
        alternative:
            "Barbell Bench Press"
    },

    {
        name: "Hack Squat",
        type: "machine",
        equipment: "Machine",
        difficulty: "Intermediate",
        muscles: "Quadriceps, Glutes",
        sets: "3",
        reps: "8–12",
        rest: "2 min",
        description:
            "Position yourself securely in the machine and squat down under control before driving through your feet.",
        progression:
            "Increase resistance gradually while maintaining consistent depth.",
        alternative:
            "Barbell Squat"
    },

    {
        name: "Machine Row",
        type: "machine",
        equipment: "Machine",
        difficulty: "Beginner",
        muscles: "Back, Lats, Biceps",
        sets: "3",
        reps: "8–12",
        rest: "90–120 sec",
        description:
            "Pull the handles towards your torso while keeping your chest supported and movement controlled.",
        progression:
            "Increase resistance gradually while maintaining a full range of motion.",
        alternative:
            "Barbell Row"
    },


    /* ==========================================
       CABLE
    ========================================== */

    {
        name: "Cable Chest Fly",
        type: "cable",
        equipment: "Cable",
        difficulty: "Beginner",
        muscles: "Chest",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Bring the cable handles together in front of your body while keeping your movement controlled.",
        progression:
            "Gradually increase resistance while maintaining constant tension.",
        alternative:
            "Dumbbell Fly"
    },

    {
        name: "Cable Curl",
        type: "cable",
        equipment: "Cable",
        difficulty: "Beginner",
        muscles: "Biceps",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Curl the cable attachment towards your shoulders while keeping your elbows stable.",
        progression:
            "Increase resistance gradually without using momentum.",
        alternative:
            "Dumbbell Curl"
    },

    {
        name: "Face Pull",
        type: "cable",
        equipment: "Cable",
        difficulty: "Beginner",
        muscles: "Rear Delts, Upper Back",
        sets: "3",
        reps: "12–15",
        rest: "60–90 sec",
        description:
            "Pull the rope towards your face while rotating your hands outward and keeping the movement controlled.",
        progression:
            "Increase resistance gradually while maintaining proper positioning.",
        alternative:
            "Reverse Dumbbell Fly"
    },

    {
        name: "Cable Lateral Raise",
        type: "cable",
        equipment: "Cable",
        difficulty: "Intermediate",
        muscles: "Side Delts",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description:
            "Raise the cable handle away from your body while maintaining tension throughout the movement.",
        progression:
            "Increase resistance slowly while keeping the movement controlled.",
        alternative:
            "Dumbbell Lateral Raise"
    },


    /* ==========================================
       BODYWEIGHT
    ========================================== */

    {
        name: "Push-Up",
        type: "bodyweight",
        equipment: "None",
        difficulty: "Beginner",
        muscles: "Chest, Triceps, Shoulders",
        sets: "3",
        reps: "10–20",
        rest: "60–90 sec",
        description:
            "Keep your body straight and lower your chest towards the floor before pushing yourself back up.",
        progression:
            "Increase repetitions or progress to harder variations.",
        alternative:
            "Machine Chest Press"
    },

    {
        name: "Pull-Up",
        type: "bodyweight",
        equipment: "Pull-Up Bar",
        difficulty: "Intermediate",
        muscles: "Back, Biceps",
        sets: "3",
        reps: "5–12",
        rest: "2 min",
        description:
            "Grip the bar and pull your body upward until your chin passes the bar.",
        progression:
            "Increase repetitions or add external resistance.",
        alternative:
            "Lat Pulldown"
    },

    {
        name: "Dip",
        type: "bodyweight",
        equipment: "Dip Bars",
        difficulty: "Intermediate",
        muscles: "Chest, Triceps, Shoulders",
        sets: "3",
        reps: "6–12",
        rest: "2 min",
        description:
            "Lower your body under control between the bars before pressing yourself back up.",
        progression:
            "Increase repetitions or add external resistance.",
        alternative:
            "Triceps Pushdown"
    },

    {
        name: "Bodyweight Squat",
        type: "bodyweight",
        equipment: "None",
        difficulty: "Beginner",
        muscles: "Quadriceps, Glutes",
        sets: "3",
        reps: "12–20",
        rest: "60–90 sec",
        description:
            "Stand with your feet around shoulder width apart, squat down under control and drive back to standing.",
        progression:
            "Increase repetitions or progress to weighted squats.",
        alternative:
            "Barbell Squat"
    }

];


/* ==========================================
   VARIABLES
========================================== */

let currentFilter = "all";
let currentExercises = bodybuildingExercises;


/* ==========================================
   GET ELEMENTS
========================================== */

const exerciseGrid =
    document.getElementById(
        "bodybuildingExerciseGrid"
    );

const searchInput =
    document.getElementById(
        "bodybuildingSearch"
    );

const modal =
    document.getElementById(
        "bodybuildingExerciseModal"
    );


/* ==========================================
   DISPLAY EXERCISES
========================================== */

function displayBodybuildingExercises(list) {

    if (!exerciseGrid) {

        console.error(
            "StrengthHub: bodybuildingExerciseGrid was not found."
        );

        return;

    }


    exerciseGrid.innerHTML = "";


    if (list.length === 0) {

        exerciseGrid.innerHTML = `

            <div class="no-exercises">

                <h3>
                    No exercises found
                </h3>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        return;

    }


    list.forEach((exercise, index) => {

        const card =
            document.createElement("div");


        card.className =
            "exercise-card";


        card.innerHTML = `

            <div class="exercise-card-top">

                <span class="exercise-category">
                    ${formatType(exercise.type)}
                </span>

                <span class="exercise-difficulty">
                    ${exercise.difficulty}
                </span>

            </div>


            <h3>
                ${exercise.name}
            </h3>


            <p class="exercise-muscles">
                ${exercise.muscles}
            </p>


            <div class="exercise-card-details">

                <span>
                    ${exercise.equipment}
                </span>

                <span>
                    ${exercise.sets} Sets
                </span>

                <span>
                    ${exercise.reps}
                </span>

            </div>


            <button
                class="view-exercise-btn"
                onclick="openBodybuildingExercise(${index})">

                View Exercise →

            </button>

        `;


        exerciseGrid.appendChild(card);

    });

}


/* ==========================================
   FORMAT CATEGORY NAME
========================================== */

function formatType(type) {

    const names = {

        compound: "Compound",

        isolation: "Isolation",

        "free-weight": "Free Weights",

        machine: "Machine",

        cable: "Cable",

        bodyweight: "Bodyweight"

    };


    return names[type] || type;

}


/* ==========================================
   FILTER
========================================== */

function filterBodybuildingExercises(type) {

    currentFilter = type;


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (event && event.target) {

        event.target.classList.add("active");

    }


    applyFilters();

}


/* ==========================================
   SEARCH
========================================== */

function searchBodybuildingExercises() {

    applyFilters();

}


/* ==========================================
   APPLY SEARCH + FILTER
========================================== */

function applyFilters() {

    const searchTerm =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    currentExercises =
        bodybuildingExercises.filter(exercise => {


            const matchesFilter =
                currentFilter === "all" ||

                exercise.type === currentFilter;


            const searchableText = `

                ${exercise.name}
                ${exercise.type}
                ${exercise.equipment}
                ${exercise.muscles}
                ${exercise.difficulty}

            `.toLowerCase();


            const matchesSearch =
                searchableText.includes(searchTerm);


            return matchesFilter && matchesSearch;

        });


    displayBodybuildingExercises(
        currentExercises
    );

}


/* ==========================================
   DIFFICULTY FILTER
========================================== */

function filterBodybuildingDifficulty(level) {

    currentExercises =
        bodybuildingExercises.filter(
            exercise =>
                exercise.difficulty === level
        );


    if (searchInput) {

        searchInput.value = "";

    }


    currentFilter = "all";


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.classList.remove("active");

        });


    displayBodybuildingExercises(
        currentExercises
    );


    const library =
        document.getElementById(
            "bodybuilding-library"
        );


    if (library) {

        library.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ==========================================
   OPEN EXERCISE
========================================== */

function openBodybuildingExercise(index) {

    const exercise =
        currentExercises[index];


    if (!exercise || !modal) {

        return;

    }


    document.getElementById(
        "bodybuildingModalCategory"
    ).textContent =
        formatType(exercise.type);


    document.getElementById(
        "bodybuildingModalTitle"
    ).textContent =
        exercise.name;


    document.getElementById(
        "bodybuildingModalDifficulty"
    ).textContent =
        exercise.difficulty;


    document.getElementById(
        "bodybuildingModalMuscles"
    ).textContent =
        exercise.muscles;


    document.getElementById(
        "bodybuildingModalEquipment"
    ).textContent =
        exercise.equipment;


    document.getElementById(
        "bodybuildingModalSets"
    ).textContent =
        exercise.sets;


    document.getElementById(
        "bodybuildingModalReps"
    ).textContent =
        exercise.reps;


    document.getElementById(
        "bodybuildingModalRest"
    ).textContent =
        exercise.rest;


    document.getElementById(
        "bodybuildingModalDescription"
    ).textContent =
        exercise.description;


    document.getElementById(
        "bodybuildingModalProgression"
    ).textContent =
        exercise.progression;


    document.getElementById(
        "bodybuildingModalAlternative"
    ).textContent =
        exercise.alternative;


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* ==========================================
   CLOSE EXERCISE
========================================== */

function closeBodybuildingExercise() {

    if (!modal) {

        return;

    }


    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* ==========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================== */

if (modal) {

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target === modal
            ) {

                closeBodybuildingExercise();

            }

        }
    );

}


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeBodybuildingExercise();

        }

    }
);


/* ==========================================
   INITIAL LOAD
========================================== */

displayBodybuildingExercises(
    bodybuildingExercises
);