
/* ==========================================
   STRENGTHHUB GYM TRAINING
   EXERCISE DATABASE
========================================== */

const gymExercises = [

    {
        name: "Barbell Bench Press",
        category: "chest",
        difficulty: "Intermediate",
        muscles: "Chest, Triceps, Front Shoulders",
        equipment: "Barbell & Bench",
        sets: "3–4",
        reps: "6–10",
        rest: "90–120 sec",
        description: "Lie flat on the bench with your feet firmly on the floor. Lower the bar under control toward your mid chest, then press it back up while keeping your body stable.",
        progression: "Increase the weight gradually once you can complete all your planned reps with good technique.",
        alternative: "Dumbbell Bench Press"
    },

    {
        name: "Incline Dumbbell Press",
        category: "chest",
        difficulty: "Intermediate",
        muscles: "Upper Chest, Front Shoulders, Triceps",
        equipment: "Dumbbells & Incline Bench",
        sets: "3",
        reps: "8–12",
        rest: "90 sec",
        description: "Set the bench to a moderate incline. Hold the dumbbells above your chest, lower them under control and press them back up.",
        progression: "Increase the dumbbell weight when you can complete the upper end of your rep range comfortably.",
        alternative: "Incline Barbell Press"
    },

    {
        name: "Cable Chest Fly",
        category: "chest",
        difficulty: "Beginner",
        muscles: "Chest",
        equipment: "Cable Machine",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description: "Stand between the cable handles with a slight bend in your elbows. Bring your hands together in front of your chest while keeping the movement controlled.",
        progression: "Increase resistance gradually while maintaining a controlled stretch and contraction.",
        alternative: "Dumbbell Fly"
    },

    {
        name: "Lat Pulldown",
        category: "back",
        difficulty: "Beginner",
        muscles: "Lats, Upper Back, Biceps",
        equipment: "Cable Machine",
        sets: "3",
        reps: "8–12",
        rest: "90 sec",
        description: "Sit securely at the pulldown station. Pull the bar toward your upper chest while keeping your torso controlled.",
        progression: "Gradually increase resistance while maintaining full control through the movement.",
        alternative: "Assisted Pull-Up"
    },

    {
        name: "Barbell Row",
        category: "back",
        difficulty: "Intermediate",
        muscles: "Lats, Upper Back, Rear Shoulders, Biceps",
        equipment: "Barbell",
        sets: "3–4",
        reps: "6–10",
        rest: "90–120 sec",
        description: "Hinge at your hips while keeping your back stable. Pull the bar toward your lower ribs and lower it under control.",
        progression: "Increase weight gradually while keeping your torso stable.",
        alternative: "Seated Cable Row"
    },

    {
        name: "Seated Cable Row",
        category: "back",
        difficulty: "Beginner",
        muscles: "Mid Back, Lats, Biceps",
        equipment: "Cable Machine",
        sets: "3",
        reps: "8–12",
        rest: "90 sec",
        description: "Sit upright with your feet supported. Pull the handle toward your torso while keeping your shoulders controlled.",
        progression: "Increase resistance when you can complete your target reps with controlled technique.",
        alternative: "Chest-Supported Dumbbell Row"
    },

    {
        name: "Barbell Squat",
        category: "legs",
        difficulty: "Intermediate",
        muscles: "Quadriceps, Glutes, Hamstrings",
        equipment: "Barbell & Rack",
        sets: "3–4",
        reps: "6–10",
        rest: "120 sec",
        description: "Position the bar securely across your upper back. Brace your core, bend your knees and hips to lower yourself under control, then drive through your feet to stand.",
        progression: "Increase the load gradually while maintaining consistent technique.",
        alternative: "Leg Press"
    },

    {
        name: "Leg Press",
        category: "legs",
        difficulty: "Beginner",
        muscles: "Quadriceps, Glutes, Hamstrings",
        equipment: "Leg Press Machine",
        sets: "3",
        reps: "8–12",
        rest: "90 sec",
        description: "Place your feet securely on the platform. Lower the weight under control and press through your feet to return to the starting position.",
        progression: "Gradually increase the resistance while keeping your movement controlled.",
        alternative: "Goblet Squat"
    },

    {
        name: "Romanian Deadlift",
        category: "legs",
        difficulty: "Intermediate",
        muscles: "Hamstrings, Glutes, Lower Back",
        equipment: "Barbell or Dumbbells",
        sets: "3",
        reps: "8–12",
        rest: "90–120 sec",
        description: "Hold the weight close to your body. Push your hips backward while maintaining a stable spine, then drive your hips forward.",
        progression: "Increase weight gradually while maintaining control and a stable spine.",
        alternative: "Dumbbell Romanian Deadlift"
    },

    {
        name: "Dumbbell Shoulder Press",
        category: "shoulders",
        difficulty: "Beginner",
        muscles: "Shoulders, Triceps",
        equipment: "Dumbbells & Bench",
        sets: "3",
        reps: "8–12",
        rest: "90 sec",
        description: "Start with the dumbbells at shoulder height. Press them overhead while keeping your core stable.",
        progression: "Increase the dumbbell weight once you can complete your target reps with good technique.",
        alternative: "Machine Shoulder Press"
    },

    {
        name: "Dumbbell Lateral Raise",
        category: "shoulders",
        difficulty: "Beginner",
        muscles: "Lateral Deltoids",
        equipment: "Dumbbells",
        sets: "3",
        reps: "10–15",
        rest: "60 sec",
        description: "Stand tall with dumbbells at your sides. Raise your arms outward until approximately level with your shoulders.",
        progression: "Increase resistance carefully while keeping the movement controlled.",
        alternative: "Cable Lateral Raise"
    },

    {
        name: "Barbell Bicep Curl",
        category: "arms",
        difficulty: "Beginner",
        muscles: "Biceps",
        equipment: "Barbell",
        sets: "3",
        reps: "8–12",
        rest: "60–90 sec",
        description: "Stand with the barbell held at your thighs. Keep your elbows close to your body and curl the bar toward your shoulders without swinging.",
        progression: "Increase the weight gradually while maintaining strict control.",
        alternative: "Dumbbell Curl"
    },

    {
        name: "Cable Tricep Pushdown",
        category: "arms",
        difficulty: "Beginner",
        muscles: "Triceps",
        equipment: "Cable Machine",
        sets: "3",
        reps: "10–15",
        rest: "60–90 sec",
        description: "Stand upright at the cable station with your elbows close to your body. Push the handle downward until your arms are extended.",
        progression: "Increase resistance gradually while keeping your elbows stable.",
        alternative: "Overhead Dumbbell Tricep Extension"
    },

    {
        name: "Cable Crunch",
        category: "core",
        difficulty: "Beginner",
        muscles: "Abdominals",
        equipment: "Cable Machine",
        sets: "3",
        reps: "10–15",
        rest: "60 sec",
        description: "Kneel in front of the cable machine with the rope held near your head. Curl your torso downward by contracting your abdominal muscles.",
        progression: "Increase resistance gradually while keeping the movement controlled.",
        alternative: "Weighted Crunch"
    },

    {
        name: "Hanging Knee Raise",
        category: "core",
        difficulty: "Intermediate",
        muscles: "Abdominals, Hip Flexors",
        equipment: "Pull-Up Bar",
        sets: "3",
        reps: "8–15",
        rest: "60–90 sec",
        description: "Hang from a pull-up bar with your body controlled. Raise your knees toward your chest without swinging.",
        progression: "Progress from knee raises to straight-leg raises as your control improves.",
        alternative: "Captain's Chair Knee Raise"
    }

];


/* ==========================================
   GET PAGE ELEMENTS
========================================== */

const gymGrid = document.getElementById("gymExerciseGrid");

const gymModal = document.getElementById("gymExerciseModal");


/* ==========================================
   DISPLAY EXERCISES
========================================== */

function displayGymExercises(exercises) {

    if (!gymGrid) {
        console.error("gymExerciseGrid was not found.");
        return;
    }

    gymGrid.innerHTML = "";


    exercises.forEach((exercise, index) => {

        const card = document.createElement("div");

        card.className = "exercise-card";


        card.innerHTML = `

            <div class="exercise-card-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <span class="exercise-card-category">
                ${exercise.category.toUpperCase()}
            </span>

            <h3>
                ${exercise.name}
            </h3>

            <p>
                ${exercise.muscles}
            </p>

            <div class="exercise-card-footer">

                <span>
                    ${exercise.difficulty}
                </span>

                <button
                    type="button"
                    onclick="openGymExercise(${index})">

                    VIEW EXERCISE →

                </button>

            </div>

        `;


        gymGrid.appendChild(card);

    });

}


/* ==========================================
   FILTER
========================================== */

function filterGymExercises(category) {

    const buttons =
        document.querySelectorAll(
            "#gym-library .filter-btn"
        );


    buttons.forEach(button => {

        button.classList.remove("active");

    });


    buttons.forEach(button => {

        if (
            button.textContent
                .trim()
                .toLowerCase() === category
        ) {

            button.classList.add("active");

        }

    });


    if (category === "all") {

        displayGymExercises(gymExercises);

        return;

    }


    const filtered =
        gymExercises.filter(
            exercise =>
                exercise.category === category
        );


    displayGymExercises(filtered);

}


/* ==========================================
   SEARCH
========================================== */

function searchGymExercises() {

    const searchInput =
        document.getElementById("gymSearch");


    if (!searchInput) return;


    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        gymExercises.filter(exercise =>

            exercise.name
                .toLowerCase()
                .includes(searchTerm)

            ||

            exercise.category
                .toLowerCase()
                .includes(searchTerm)

            ||

            exercise.muscles
                .toLowerCase()
                .includes(searchTerm)

            ||

            exercise.equipment
                .toLowerCase()
                .includes(searchTerm)

        );


    displayGymExercises(filtered);

}


/* ==========================================
   OPEN MODAL
========================================== */

function openGymExercise(index) {

    const exercise =
        gymExercises[index];


    if (!exercise || !gymModal) return;


    document.getElementById("gymModalCategory").textContent =
        exercise.category.toUpperCase();


    document.getElementById("gymModalTitle").textContent =
        exercise.name;


    document.getElementById("gymModalDifficulty").textContent =
        exercise.difficulty;


    document.getElementById("gymModalMuscles").textContent =
        exercise.muscles;


    document.getElementById("gymModalEquipment").textContent =
        exercise.equipment;


    document.getElementById("gymModalSets").textContent =
        exercise.sets;


    document.getElementById("gymModalReps").textContent =
        exercise.reps;


    document.getElementById("gymModalRest").textContent =
        exercise.rest;


    document.getElementById("gymModalDescription").textContent =
        exercise.description;


    document.getElementById("gymModalProgression").textContent =
        exercise.progression;


    document.getElementById("gymModalAlternative").textContent =
        exercise.alternative;


    gymModal.classList.add("active");


    document.body.style.overflow = "hidden";

}


/* ==========================================
   CLOSE MODAL
========================================== */

function closeGymExercise() {

    if (!gymModal) return;


    gymModal.classList.remove("active");


    document.body.style.overflow = "";

}


/* ==========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================== */

if (gymModal) {

    gymModal.addEventListener(
        "click",
        function(event) {

            if (event.target === gymModal) {

                closeGymExercise();

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

        if (event.key === "Escape") {

            closeGymExercise();

        }

    }
);


/* ==========================================
   DIFFICULTY FILTER
========================================== */

function filterGymDifficulty(level) {

    const filtered =
        gymExercises.filter(
            exercise =>
                exercise.difficulty === level
        );


    displayGymExercises(filtered);


    const library =
        document.getElementById("gym-library");


    if (library) {

        library.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* ==========================================
   INITIAL LOAD
========================================== */

displayGymExercises(gymExercises);

