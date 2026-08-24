/* ==========================================
   STRENGTHHUB CALISTHENICS
   EXERCISE DATABASE
========================================== */


const exercises = [

    /* ==========================================
       PUSH
    ========================================== */

    {
        name: "Push-Up",
        category: "push",
        difficulty: "Beginner",
        muscles: "Chest, Shoulders, Triceps",
        equipment: "None",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",

        description:
            "Start in a high plank position with your hands slightly wider than your shoulders. Lower your chest towards the floor while keeping your body straight, then push yourself back up.",

        progression:
            "Diamond Push-Up",

        regression:
            "Incline Push-Up"
    },

    {
        name: "Diamond Push-Up",
        category: "push",
        difficulty: "Intermediate",
        muscles: "Triceps, Chest, Shoulders",
        equipment: "None",
        sets: "3",
        reps: "8–12",
        rest: "60–90 sec",

        description:
            "Place your hands close together underneath your chest, forming a diamond shape with your fingers. Lower your body while keeping your elbows controlled, then push back up.",

        progression:
            "Archer Push-Up",

        regression:
            "Standard Push-Up"
    },

    {
        name: "Decline Push-Up",
        category: "push",
        difficulty: "Intermediate",
        muscles: "Upper Chest, Shoulders, Triceps",
        equipment: "Bench or elevated surface",
        sets: "3",
        reps: "8–12",
        rest: "60–90 sec",

        description:
            "Place your feet on an elevated surface while keeping your hands on the floor. Lower your chest towards the ground and press back up.",

        progression:
            "Pseudo Planche Push-Up",

        regression:
            "Standard Push-Up"
    },

    {
        name: "Archer Push-Up",
        category: "push",
        difficulty: "Advanced",
        muscles: "Chest, Shoulders, Triceps",
        equipment: "None",
        sets: "3",
        reps: "5–8 each side",
        rest: "90–120 sec",

        description:
            "Take a wide push-up position. Lower your body towards one arm while extending the opposite arm outward, then push yourself back to the centre.",

        progression:
            "One-Arm Push-Up",

        regression:
            "Wide Push-Up"
    },

    {
        name: "Pike Push-Up",
        category: "push",
        difficulty: "Intermediate",
        muscles: "Shoulders, Triceps, Upper Chest",
        equipment: "None",
        sets: "3",
        reps: "8–12",
        rest: "60–90 sec",

        description:
            "Start in a pike position with your hips raised. Bend your elbows and lower your head towards the floor before pressing yourself back up.",

        progression:
            "Handstand Push-Up",

        regression:
            "Incline Pike Push-Up"
    },

    {
        name: "Handstand Push-Up",
        category: "push",
        difficulty: "Advanced",
        muscles: "Shoulders, Triceps, Core",
        equipment: "Wall",
        sets: "3",
        reps: "3–8",
        rest: "120–180 sec",

        description:
            "Kick up into a controlled handstand against a wall. Bend your elbows to lower your head towards the ground, then press yourself back to the starting position.",

        progression:
            "Freestanding Handstand Push-Up",

        regression:
            "Pike Push-Up"
    },

    {
        name: "Dips",
        category: "push",
        difficulty: "Intermediate",
        muscles: "Chest, Triceps, Shoulders",
        equipment: "Parallel Bars",
        sets: "3",
        reps: "6–12",
        rest: "90 sec",

        description:
            "Support your body on parallel bars. Lower yourself by bending your elbows, then press through your hands to return to the starting position.",

        progression:
            "Weighted Dips",

        regression:
            "Bench Dips"
    },


    /* ==========================================
       PULL
    ========================================== */

    {
        name: "Australian Row",
        category: "pull",
        difficulty: "Beginner",
        muscles: "Back, Biceps, Rear Shoulders",
        equipment: "Low Bar",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",

        description:
            "Position yourself underneath a low bar with your body straight. Pull your chest towards the bar while keeping your core tight, then lower yourself with control.",

        progression:
            "Pull-Up",

        regression:
            "Higher Australian Row"
    },

    {
        name: "Pull-Up",
        category: "pull",
        difficulty: "Intermediate",
        muscles: "Back, Biceps, Forearms",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "5–10",
        rest: "90–120 sec",

        description:
            "Hang from a pull-up bar with an overhand grip. Pull your chest towards the bar while keeping your body controlled, then lower yourself slowly.",

        progression:
            "Weighted Pull-Up",

        regression:
            "Band-Assisted Pull-Up"
    },

    {
        name: "Chin-Up",
        category: "pull",
        difficulty: "Beginner",
        muscles: "Biceps, Back, Forearms",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "5–10",
        rest: "90 sec",

        description:
            "Use an underhand grip on the pull-up bar. Pull your body upwards until your chin passes the bar, then lower yourself under control.",

        progression:
            "Weighted Chin-Up",

        regression:
            "Assisted Chin-Up"
    },

    {
        name: "Wide-Grip Pull-Up",
        category: "pull",
        difficulty: "Intermediate",
        muscles: "Lats, Upper Back, Biceps",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "5–8",
        rest: "90–120 sec",

        description:
            "Grip the bar wider than shoulder width. Pull your chest towards the bar while keeping your body stable.",

        progression:
            "Archer Pull-Up",

        regression:
            "Standard Pull-Up"
    },

    {
        name: "Archer Pull-Up",
        category: "pull",
        difficulty: "Advanced",
        muscles: "Back, Biceps, Forearms",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "3–6 each side",
        rest: "120 sec",

        description:
            "Pull yourself towards one hand while extending the opposite arm along the bar. Control the movement before returning to the starting position.",

        progression:
            "One-Arm Pull-Up",

        regression:
            "Assisted Archer Pull-Up"
    },

    {
        name: "Muscle-Up",
        category: "skills",
        difficulty: "Advanced",
        muscles: "Back, Chest, Shoulders, Triceps",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "3–5",
        rest: "120–180 sec",

        description:
            "Perform an explosive pull-up and transition your body over the bar before pressing yourself into a straight-arm support position.",

        progression:
            "Strict Muscle-Up",

        regression:
            "Explosive Pull-Up"
    },


    /* ==========================================
       LEGS
    ========================================== */

    {
        name: "Bodyweight Squat",
        category: "legs",
        difficulty: "Beginner",
        muscles: "Quadriceps, Glutes, Hamstrings",
        equipment: "None",
        sets: "3",
        reps: "12–20",
        rest: "60–90 sec",

        description:
            "Stand with your feet around shoulder width apart. Bend your knees and hips to lower your body, then drive through your feet to stand back up.",

        progression:
            "Jump Squat",

        regression:
            "Box Squat"
    },

    {
        name: "Jump Squat",
        category: "legs",
        difficulty: "Intermediate",
        muscles: "Quads, Glutes, Calves",
        equipment: "None",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",

        description:
            "Perform a controlled squat and explosively jump upwards. Land softly and immediately prepare for the next repetition.",

        progression:
            "Pistol Squat Jump",

        regression:
            "Bodyweight Squat"
    },

    {
        name: "Bulgarian Split Squat",
        category: "legs",
        difficulty: "Intermediate",
        muscles: "Quads, Glutes, Hamstrings",
        equipment: "Bench or elevated surface",
        sets: "3",
        reps: "8–12 each leg",
        rest: "90 sec",

        description:
            "Place one foot behind you on an elevated surface. Lower your body by bending the front leg, then drive through the front foot to return to the starting position.",

        progression:
            "Weighted Bulgarian Split Squat",

        regression:
            "Assisted Split Squat"
    },

    {
        name: "Pistol Squat",
        category: "legs",
        difficulty: "Advanced",
        muscles: "Quads, Glutes, Hamstrings, Core",
        equipment: "None",
        sets: "3",
        reps: "3–8 each leg",
        rest: "120 sec",

        description:
            "Balance on one leg while extending the opposite leg forward. Lower your body into a deep single-leg squat and return to standing.",

        progression:
            "Weighted Pistol Squat",

        regression:
            "Assisted Pistol Squat"
    },

    {
        name: "Calf Raise",
        category: "legs",
        difficulty: "Beginner",
        muscles: "Calves",
        equipment: "None",
        sets: "3",
        reps: "15–25",
        rest: "45–60 sec",

        description:
            "Stand upright and raise your heels from the floor by pushing through the balls of your feet. Lower yourself slowly.",

        progression:
            "Single-Leg Calf Raise",

        regression:
            "Supported Calf Raise"
    },


    /* ==========================================
       CORE
    ========================================== */

    {
        name: "Plank",
        category: "core",
        difficulty: "Beginner",
        muscles: "Abs, Core, Shoulders",
        equipment: "None",
        sets: "3",
        reps: "30–60 sec",
        rest: "45–60 sec",

        description:
            "Hold your body in a straight line from your head to your heels while supporting yourself on your forearms or hands.",

        progression:
            "Long-Lever Plank",

        regression:
            "Knee Plank"
    },

    {
        name: "Hanging Knee Raise",
        category: "core",
        difficulty: "Intermediate",
        muscles: "Abs, Hip Flexors",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "8–15",
        rest: "60–90 sec",

        description:
            "Hang from a pull-up bar and raise your knees towards your chest while keeping your movement controlled.",

        progression:
            "Hanging Leg Raise",

        regression:
            "Lying Knee Raise"
    },

    {
        name: "Hanging Leg Raise",
        category: "core",
        difficulty: "Advanced",
        muscles: "Abs, Hip Flexors, Core",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "6–12",
        rest: "90 sec",

        description:
            "Hang from a bar and raise your straight legs towards your hands while controlling the movement throughout.",

        progression:
            "Toes-to-Bar",

        regression:
            "Hanging Knee Raise"
    },

    {
        name: "L-Sit",
        category: "core",
        difficulty: "Advanced",
        muscles: "Core, Hip Flexors, Triceps",
        equipment: "Parallettes or Dip Bars",
        sets: "3",
        reps: "10–30 sec",
        rest: "90 sec",

        description:
            "Support your body on parallel bars or parallettes and extend both legs straight in front of you while keeping your body elevated.",

        progression:
            "V-Sit",

        regression:
            "Tuck L-Sit"
    },

    {
        name: "Hollow Body Hold",
        category: "core",
        difficulty: "Beginner",
        muscles: "Abs, Core",
        equipment: "None",
        sets: "3",
        reps: "20–40 sec",
        rest: "45–60 sec",

        description:
            "Lie on your back and lift your shoulders and legs slightly off the ground while keeping your lower back pressed into the floor.",

        progression:
            "Hollow Body Rocks",

        regression:
            "Tuck Hollow Hold"
    },

    {
        name: "Dragon Flag",
        category: "core",
        difficulty: "Advanced",
        muscles: "Abs, Core, Hip Flexors",
        equipment: "Bench",
        sets: "3",
        reps: "3–8",
        rest: "120 sec",

        description:
            "Lie on a bench and hold onto the bench behind your head. Raise your body while keeping it rigid, then slowly lower yourself without allowing your hips to collapse.",

        progression:
            "Strict Dragon Flag",

        regression:
            "Negative Dragon Flag"
    },


    /* ==========================================
       SKILLS
    ========================================== */

    {
        name: "Handstand",
        category: "skills",
        difficulty: "Intermediate",
        muscles: "Shoulders, Core, Wrists",
        equipment: "Wall",
        sets: "3",
        reps: "20–60 sec",
        rest: "90 sec",

        description:
            "Balance your body upside down on your hands while keeping your arms locked and your body aligned.",

        progression:
            "Freestanding Handstand",

        regression:
            "Wall Handstand"
    },

    {
        name: "Handstand Walk",
        category: "skills",
        difficulty: "Advanced",
        muscles: "Shoulders, Core, Wrists",
        equipment: "None",
        sets: "3",
        reps: "10–30 steps",
        rest: "120 sec",

        description:
            "Walk forward while maintaining a controlled handstand position. Use your hands to shift your weight from side to side.",

        progression:
            "Freestanding Handstand Push-Up",

        regression:
            "Wall Handstand"
    },

    {
        name: "Front Lever",
        category: "skills",
        difficulty: "Advanced",
        muscles: "Lats, Core, Shoulders",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "5–15 sec",
        rest: "120–180 sec",

        description:
            "Hang from a pull-up bar and hold your body horizontally with your legs extended while keeping your arms straight.",

        progression:
            "Full Front Lever",

        regression:
            "Tuck Front Lever"
    },

    {
        name: "Back Lever",
        category: "skills",
        difficulty: "Advanced",
        muscles: "Shoulders, Chest, Core",
        equipment: "Gymnastic Rings or Bar",
        sets: "3",
        reps: "5–15 sec",
        rest: "120–180 sec",

        description:
            "Hold your body horizontally underneath the bar with your arms straight and your body fully extended.",

        progression:
            "Full Back Lever",

        regression:
            "Tuck Back Lever"
    },

    {
        name: "Human Flag",
        category: "skills",
        difficulty: "Advanced",
        muscles: "Shoulders, Core, Lats",
        equipment: "Vertical Pole",
        sets: "3",
        reps: "5–15 sec",
        rest: "120–180 sec",

        description:
            "Grip a vertical pole with both hands and hold your body horizontally to the side using upper-body and core strength.",

        progression:
            "Full Human Flag",

        regression:
            "Tuck Human Flag"
    },

    {
        name: "Planche",
        category: "skills",
        difficulty: "Advanced",
        muscles: "Shoulders, Chest, Triceps, Core",
        equipment: "Parallettes",
        sets: "3",
        reps: "5–15 sec",
        rest: "120–180 sec",

        description:
            "Support your body on your hands while keeping your legs extended behind you and your feet completely off the ground.",

        progression:
            "Full Planche",

        regression:
            "Tuck Planche"
    },


    /* ==========================================
       FULL BODY
    ========================================== */

    {
        name: "Burpee",
        category: "fullbody",
        difficulty: "Beginner",
        muscles: "Full Body",
        equipment: "None",
        sets: "3",
        reps: "10–15",
        rest: "60 sec",

        description:
            "From standing, squat down, place your hands on the floor, jump your feet back into a plank, return your feet and jump upwards.",

        progression:
            "Burpee with Push-Up",

        regression:
            "Step-Back Burpee"
    },

    {
        name: "Mountain Climber",
        category: "fullbody",
        difficulty: "Beginner",
        muscles: "Core, Shoulders, Legs",
        equipment: "None",
        sets: "3",
        reps: "20–30",
        rest: "45–60 sec",

        description:
            "Start in a plank position and alternate driving your knees towards your chest while maintaining a stable upper body.",

        progression:
            "Explosive Mountain Climbers",

        regression:
            "Slow Mountain Climbers"
    },

    {
        name: "Bear Crawl",
        category: "fullbody",
        difficulty: "Intermediate",
        muscles: "Shoulders, Core, Legs",
        equipment: "None",
        sets: "3",
        reps: "20–30 sec",
        rest: "60 sec",

        description:
            "Move forward on your hands and feet while keeping your knees close to the ground and your core engaged.",

        progression:
            "Weighted Bear Crawl",

        regression:
            "Slow Bear Crawl"
    }

];


/* ==========================================
   DOM ELEMENTS
========================================== */

const exerciseGrid =
    document.getElementById("exerciseGrid");

const exerciseSearch =
    document.getElementById("exerciseSearch");

const exerciseModal =
    document.getElementById("exerciseModal");


/* ==========================================
   DISPLAY EXERCISES
========================================== */

function displayExercises(list) {

    exerciseGrid.innerHTML = "";

    if (list.length === 0) {

        exerciseGrid.innerHTML = `
            <div class="no-exercises">
                <h3>No exercises found</h3>
                <p>
                    Try another search or category.
                </p>
            </div>
        `;

        return;
    }


    list.forEach((exercise) => {

        const card = document.createElement("div");

        card.className = "exercise-card";


        card.innerHTML = `

            <div class="exercise-card-top">

                <span class="exercise-category">
                    ${formatCategory(exercise.category)}
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
                    ${exercise.sets} Sets
                </span>

                <span>
                    ${exercise.reps} Reps
                </span>

            </div>


            <button
                class="view-exercise-btn"
                onclick="openExercise('${exercise.name}')">

                View Exercise →

            </button>

        `;


        exerciseGrid.appendChild(card);

    });

}


/* ==========================================
   FORMAT CATEGORY
========================================== */

function formatCategory(category) {

    if (category === "fullbody") {
        return "Full Body";
    }

    return category.charAt(0).toUpperCase() +
           category.slice(1);
}


/* ==========================================
   FILTER BY CATEGORY
========================================== */

function filterExercises(category) {

    let filteredExercises;


    if (category === "all") {

        filteredExercises = exercises;

    } else {

        filteredExercises =
            exercises.filter(
                exercise =>
                exercise.category === category
            );

    }


    displayExercises(filteredExercises);


    updateActiveFilter(category);


    document
        .getElementById("exercise-database")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==========================================
   UPDATE ACTIVE FILTER
========================================== */

function updateActiveFilter(category) {

    const buttons =
        document.querySelectorAll(".filter-btn");


    buttons.forEach(button => {

        button.classList.remove("active");


        const buttonText =
            button.textContent
                .trim()
                .toLowerCase()
                .replace(" ", "");


        if (
            category === "all" &&
            buttonText === "all"
        ) {

            button.classList.add("active");

        }


        if (
            category === "fullbody" &&
            buttonText === "fullbody"
        ) {

            button.classList.add("active");

        }


        if (
            buttonText === category
        ) {

            button.classList.add("active");

        }

    });

}


/* ==========================================
   SEARCH
========================================== */

function searchExercises() {

    const searchTerm =
        exerciseSearch.value
            .toLowerCase()
            .trim();


    const filteredExercises =
        exercises.filter(exercise =>

            exercise.name
                .toLowerCase()
                .includes(searchTerm)

            ||

            exercise.muscles
                .toLowerCase()
                .includes(searchTerm)

            ||

            exercise.category
                .toLowerCase()
                .includes(searchTerm)

            ||

            exercise.difficulty
                .toLowerCase()
                .includes(searchTerm)

        );


    displayExercises(filteredExercises);

}


/* ==========================================
   FILTER BY DIFFICULTY
========================================== */

function filterDifficulty(difficulty) {

    const filteredExercises =
        exercises.filter(
            exercise =>
            exercise.difficulty === difficulty
        );


    displayExercises(filteredExercises);


    document
        .getElementById("exercise-database")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==========================================
   OPEN EXERCISE MODAL
========================================== */

function openExercise(exerciseName) {

    const exercise =
        exercises.find(
            item =>
            item.name === exerciseName
        );


    if (!exercise) {
        return;
    }


    document.getElementById("modalCategory")
        .textContent =
        formatCategory(exercise.category);


    document.getElementById("modalTitle")
        .textContent =
        exercise.name;


    document.getElementById("modalDifficulty")
        .textContent =
        exercise.difficulty;


    document.getElementById("modalMuscles")
        .textContent =
        exercise.muscles;


    document.getElementById("modalEquipment")
        .textContent =
        exercise.equipment;


    document.getElementById("modalSets")
        .textContent =
        exercise.sets;


    document.getElementById("modalReps")
        .textContent =
        exercise.reps;


    document.getElementById("modalRest")
        .textContent =
        exercise.rest;


    document.getElementById("modalDescription")
        .textContent =
        exercise.description;


    document.getElementById("modalProgression")
        .textContent =
        exercise.progression;


    document.getElementById("modalRegression")
        .textContent =
        exercise.regression;


    exerciseModal.classList.add("active");


    document.body.style.overflow = "hidden";

}


/* ==========================================
   CLOSE EXERCISE MODAL
========================================== */

function closeExercise() {

    exerciseModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* ==========================================
   CLOSE MODAL WHEN CLICKING BACKGROUND
========================================== */

exerciseModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === exerciseModal
        ) {

            closeExercise();

        }

    }
);


/* ==========================================
   ESC KEY CLOSES MODAL
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeExercise();

        }

    }
);


/* ==========================================
   INITIAL DISPLAY
========================================== */

displayExercises(exercises);