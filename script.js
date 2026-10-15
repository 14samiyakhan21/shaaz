
/* =========================================================
   PYAARII'S BIRTHDAY WEBSITE
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. PAGE NAVIGATION
   ========================================================= */

const pages = document.querySelectorAll(".page");

const nextButtons = document.querySelectorAll(".next-btn");


function showPage(pageId) {

    const currentPage =
        document.querySelector(".page.active");

    const nextPage =
        document.getElementById(pageId);


    if (!nextPage) return;


    if (currentPage === nextPage) return;


    /* Remove active page */

    if (currentPage) {

        currentPage.classList.remove("active");

    }


    /* Small delay for smooth transition */

    setTimeout(() => {

        nextPage.classList.add("active");

    }, 100);


    /* Always start new page from top */

    nextPage.scrollTop = 0;

}


/* All Continue / Next buttons */

nextButtons.forEach(button => {

    button.addEventListener("click", () => {

        const nextPage =
            button.dataset.next;

        if (nextPage) {

            showPage(nextPage);

        }

    });

});


/* BACK BUTTON NAVIGATION */


/* BACK BUTTON NAVIGATION */


/* BACK BUTTON NAVIGATION */

function goBack() {
    const currentPage = document.querySelector(".page.active");

    if (!currentPage) return;

    const match = currentPage.id.match(/^page(\d+)$/);

    if (!match) return;

    const pageNumber = Number(match[1]);

    if (pageNumber > 1) {
        showPage("page" + (pageNumber - 1));
    }
}


/* =========================================================
   2. MEMORY SLIDESHOW
   ========================================================= */

const memorySlides =
    document.querySelectorAll(".memory-slide");

const previousMemory =
    document.getElementById("previousMemory");

const nextMemory =
    document.getElementById("nextMemory");

const memoryCounter =
    document.getElementById("memoryCounter");


let currentMemory = 0;


function showMemory(index) {

    if (!memorySlides.length) return;


    /* Loop around */

    if (index < 0) {

        currentMemory =
            memorySlides.length - 1;

    }

    else if (
        index >= memorySlides.length
    ) {

        currentMemory = 0;

    }

    else {

        currentMemory = index;

    }


    memorySlides.forEach(
        (slide, i) => {

            slide.classList.remove(
                "active-memory"
            );

            if (i === currentMemory) {

                slide.classList.add(
                    "active-memory"
                );

            }

        }
    );


    if (memoryCounter) {

        memoryCounter.textContent =
            `${currentMemory + 1} / ${memorySlides.length}`;

    }

}


/* Previous memory */

if (previousMemory) {

    previousMemory.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory - 1
            );

        }
    );

}


/* Next memory */

if (nextMemory) {

    nextMemory.addEventListener(
        "click",
        () => {

            showMemory(
                currentMemory + 1
            );

        }
    );

}


/* Initialize */

showMemory(0);



/* =========================================================
   3. BABY LETTER ENVELOPE
   ========================================================= */

const babyEnvelope =
    document.getElementById(
        "babyEnvelope"
    );

const babyLetterContent =
    document.getElementById(
        "babyLetterContent"
    );


if (babyEnvelope) {

    babyEnvelope.addEventListener(
        "click",
        () => {

            babyLetterContent.classList.toggle(
                "show"
            );


            /* Change envelope text */

            const envelope =
                babyEnvelope.querySelector(
                    ".envelope"
                );


            if (
                babyLetterContent.classList.contains(
                    "show"
                )
            ) {

                envelope.textContent = "💗";

            }

            else {

                envelope.textContent = "💌";

            }

        }
    );

}



/* =========================================================
   4. BIRTHDAY MUSIC
   ========================================================= */

const birthdayMusic =
    document.getElementById(
        "birthdayMusic"
    );


/*
   Browser autoplay restrictions mean
   music normally cannot start automatically.

   We allow the user to press Play manually.
*/


if (birthdayMusic) {

    birthdayMusic.volume = 0.65;

}



/* =========================================================
   5. QUIZ
   ========================================================= */


/*
   IMPORTANT:

   Replace the example questions and answers
   below with your REAL friendship questions.
*/


const quizQuestions = [

    {
        question:
            "Where did we first meet?",

        options: [

            "School",

            "College",

            "Work",

            "Somewhere random 😂"

        ],

        answer: 1

    },


    {
        question:
            "Who usually starts our conversations?",

        options: [

            "Me",

            "Pyaarii",

            "Both of us",

            "Depends on the day 😂"

        ],

        answer: 2

    },


    {
        question:
            "Who is more likely to say 'I'm fine' when they're not?",

        options: [

            "Me",

            "Pyaarii",

            "Both 😂",

            "Nobody"

        ],

        answer: 0

    },


    {
        question:
            "What describes our friendship best?",

        options: [

            "Normal",

            "Chaotic 😂",

            "Boring",

            "We barely talk"

        ],

        answer: 1

    },


    {
        question:
            "Who is going to spoil the baby the most?",

        options: [

            "Mama",

            "Papa",

            "Me obviously 😌",

            "Everyone"

        ],

        answer: 2

    }

];


let currentQuestion = 0;

let quizScore = 0;

let quizAnswered = false;


const questionNumber =
    document.getElementById(
        "questionNumber"
    );

const questionText =
    document.getElementById(
        "questionText"
    );

const quizOptions =
    document.getElementById(
        "quizOptions"
    );

const quizFeedback =
    document.getElementById(
        "quizFeedback"
    );

const nextQuestionBtn =
    document.getElementById(
        "nextQuestionBtn"
    );

const quizResult =
    document.getElementById(
        "quizResult"
    );

const scoreText =
    document.getElementById(
        "scoreText"
    );

const scoreMessage =
    document.getElementById(
        "scoreMessage"
    );

const quizContinue =
    document.getElementById(
        "quizContinue"
    );



function loadQuestion() {

    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        showQuizResult();

        return;

    }


    quizAnswered = false;


    const question =
        quizQuestions[
            currentQuestion
        ];


    /* Question number */

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;


    /* Question */

    questionText.textContent =
        question.question;


    /* Clear old options */

    quizOptions.innerHTML = "";


    /* Clear feedback */

    quizFeedback.textContent = "";


    /* Hide next button */

    nextQuestionBtn.style.display =
        "none";


    /* Create options */

    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        index,
                        button
                    );

                }
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}



/* =========================================================
   6. QUIZ ANSWER
   ========================================================= */

function selectAnswer(
    selectedIndex,
    selectedButton
) {

    if (quizAnswered) return;


    quizAnswered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const allOptions =
        document.querySelectorAll(
            ".quiz-option"
        );


    /* Correct */

    if (
        selectedIndex ===
        question.answer
    ) {

        quizScore++;


        selectedButton.classList.add(
            "correct"
        );


        quizFeedback.textContent =
            "Correct! 😭💗 You actually know me!";


    }


    /* Wrong */

    else {

        selectedButton.classList.add(
            "wrong"
        );


        allOptions[
            question.answer
        ].classList.add(
            "correct"
        );


        quizFeedback.textContent =
            "Oops 😂 But I'll forgive you! 💕";

    }


    /* Show next button */

    nextQuestionBtn.style.display =
        "inline-block";

}



/* =========================================================
   7. NEXT QUIZ QUESTION
   ========================================================= */

if (nextQuestionBtn) {

    nextQuestionBtn.addEventListener(
        "click",
        () => {

            currentQuestion++;

            loadQuestion();

        }
    );

}



/* =========================================================
   8. QUIZ RESULT
   ========================================================= */

function showQuizResult() {


    questionNumber.textContent =
        "Quiz Complete! 🎉";


    questionText.textContent =
        "So... how well do you know us?";


    quizOptions.innerHTML = "";


    quizFeedback.textContent = "";


    nextQuestionBtn.style.display =
        "none";


    quizResult.classList.add(
        "show"
    );


    scoreText.textContent =
        `${quizScore} / ${quizQuestions.length}`;


    let message = "";


    if (
        quizScore ===
        quizQuestions.length
    ) {

        message =
            "Okay WOW! 😭💕 You know our friendship better than anyone!";

    }

    else if (
        quizScore >= 3
    ) {

        message =
            "Not bad Pyaarii! 😂💕 You definitely know me!";

    }

    else {

        message =
            "We clearly need to spend more time together. 😂❤️";

    }


    scoreMessage.textContent =
        message;


    /* Show continue button */

    if (quizContinue) {

        quizContinue.style.display =
            "inline-block";

    }

}


/* Start quiz */

if (quizQuestions.length) {

    loadQuestion();

}



/* =========================================================
   9. FINAL GIFT
   ========================================================= */

const giftButton =
    document.getElementById(
        "giftButton"
    );


if (giftButton) {

    giftButton.addEventListener(
        "click",
        () => {

            /* Gift animation */

            giftButton.style.transform =
                "scale(1.4) rotate(10deg)";


            giftButton.style.opacity =
                "0";


            /* Confetti */

            createConfetti(120);


            /* Open final page */

            setTimeout(
                () => {

                    showPage("page12");

                },
                900
            );

        }
    );

}



/* =========================================================
   10. CONFETTI
   ========================================================= */

function createConfetti(amount = 80) {

    const container =
        document.getElementById(
            "confettiContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    for (
        let i = 0;
        i < amount;
        i++
    ) {


        const piece =
            document.createElement(
                "span"
            );


        piece.classList.add(
            "confetti"
        );


        /* Random position */

        piece.style.left =
            Math.random() * 100 + "%";


        /* Random size */

        const size =
            Math.random() * 8 + 5;


        piece.style.width =
            size + "px";


        piece.style.height =
            size * 1.5 + "px";


        /* Random animation */

        const duration =
            Math.random() * 3 + 3;


        piece.style.animationDuration =
            duration + "s";


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        /* Random shape */

        if (
            Math.random() > 0.5
        ) {

            piece.style.borderRadius =
                "50%";

        }


        container.appendChild(
            piece
        );

    }


    /* Remove after animation */

    setTimeout(
        () => {

            container.innerHTML = "";

        },
        7000
    );

}



/* =========================================================
   11. EXTRA FINAL PAGE EFFECT
   ========================================================= */


/*
   When the final page becomes visible,
   automatically create a smaller burst
   of confetti.
*/


const page12 =
    document.getElementById(
        "page12"
    );


let finalConfettiShown = false;


function checkFinalPage() {

    if (
        page12 &&
        page12.classList.contains(
            "active"
        ) &&
        !finalConfettiShown
    ) {

        finalConfettiShown = true;

        createConfetti(100);

    }

}


/* Watch page changes */

const pageObserver =
    new MutationObserver(
        checkFinalPage
    );


pages.forEach(page => {

    pageObserver.observe(
        page,
        {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );

});



/* =========================================================
   12. KEYBOARD NAVIGATION
   ========================================================= */


/*
   Desktop users can also use
   ArrowRight to move forward.
*/


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "ArrowRight"
        ) {

            const current =
                document.querySelector(
                    ".page.active"
                );


            if (!current) return;


            const currentId =
                current.id;


            const number =
                parseInt(
                    currentId.replace(
                        "page",
                        ""
                    )
                );


            if (
                number >= 1 &&
                number < 12
            ) {

                showPage(
                    `page${number + 1}`
                );

            }

        }

    }
);



/* =========================================================
   13. TOUCH SWIPE NAVIGATION
   ========================================================= */


/*
   On mobile, swipe left to move
   to the next page.
*/


let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchStartX -
            touchEndX;


        if (
            difference > 80
        ) {

            const current =
                document.querySelector(
                    ".page.active"
                );


            if (!current) return;


            const number =
                parseInt(
                    current.id.replace(
                        "page",
                        ""
                    )
                );


            if (
                number >= 1 &&
                number < 12
            ) {

                showPage(
                    `page${number + 1}`
                );

            }

        }

    },
    {
        passive: true
    }
);



/* =========================================================
   14. PREVENT ACCIDENTAL DRAGGING
   ========================================================= */

document.querySelectorAll("img").forEach(
    image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    }
);



/* =========================================================
   15. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "💕 Pyaarii's Birthday Website Loaded Successfully!"
);

console.log(
    "🎂 Happy Birthday SHAAZMEEN!"
);

console.log(
    "🍼 Baby Chapter: February 2027"
);


/* =========================================================
   END OF SCRIPT.JS
   ========================================================= */

/* =========================================
   PAGE 8 — MEMORIES ALBUM LIGHTBOX
   ========================================= */

(() => {
    const album = document.getElementById("albumGrid");
    const lightbox = document.getElementById("albumLightbox");
    const largeImage = document.getElementById("albumLargeImage");
    const counter = document.getElementById("albumPhotoCounter");
    const closeButton = document.getElementById("albumClose");
    const previousButton = document.getElementById("albumPrev");
    const nextButton = document.getElementById("albumNext");

    // Stop safely if the album HTML is missing
    if (
        !album ||
        !lightbox ||
        !largeImage ||
        !counter ||
        !closeButton ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }

    // Get all album photo buttons
    const photoButtons = Array.from(
        album.querySelectorAll(".album-photo")
    );

    // Only use photos that successfully load
    const photos = photoButtons
        .map((button) => {
            const img = button.querySelector("img");

            return {
                button: button,
                img: img,
                src: button.dataset.photo,
                alt: img ? img.alt : "Our memory",
                loaded: false
            };
        })
        .filter((photo) => photo.src && photo.img);

    let currentPhoto = 0;
    let lastFocusedElement = null;
    let previousBodyOverflow = "";

    // Preload photos and hide missing image cards
    photos.forEach((photo) => {
        const testImage = new Image();

        testImage.onload = () => {
            photo.loaded = true;
        };

        testImage.onerror = () => {
            photo.button.hidden = true;
        };

        testImage.src = photo.src;
    });

    function getAvailablePhotos() {
        return photos.filter(
            (photo) => photo.loaded && !photo.button.hidden
        );
    }

    function showPhoto(index) {
        const availablePhotos = getAvailablePhotos();

        if (availablePhotos.length === 0) {
            return;
        }

        currentPhoto =
            (index + availablePhotos.length) % availablePhotos.length;

        const photo = availablePhotos[currentPhoto];

        largeImage.src = photo.src;
        largeImage.alt = photo.alt;

        counter.textContent =
            `${currentPhoto + 1} / ${availablePhotos.length}`;
    }

    function openAlbum(photo) {
        const availablePhotos = getAvailablePhotos();

        if (availablePhotos.length === 0) {
            return;
        }

        const index = availablePhotos.indexOf(photo);

        if (index === -1) {
            return;
        }

        lastFocusedElement = document.activeElement;
        previousBodyOverflow = document.body.style.overflow;

        showPhoto(index);

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeAlbum() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = previousBodyOverflow;

        largeImage.removeAttribute("src");

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }
    }

    // Open a photo when clicked
    photos.forEach((photo) => {
        photo.button.addEventListener("click", () => {
            openAlbum(photo);
        });
    });

    // Previous photo
    previousButton.addEventListener("click", () => {
        showPhoto(currentPhoto - 1);
    });

    // Next photo
    nextButton.addEventListener("click", () => {
        showPhoto(currentPhoto + 1);
    });

    // Close button
    closeButton.addEventListener("click", closeAlbum);

    // Close when clicking the dark background
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeAlbum();
        }
    });

    // Keyboard controls for the open photo viewer
    document.addEventListener(
        "keydown",
        (event) => {
            if (!lightbox.classList.contains("is-open")) {
                return;
            }

            if (event.key === "Escape") {
                event.preventDefault();
                event.stopImmediatePropagation();
                closeAlbum();
            } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                event.stopImmediatePropagation();
                showPhoto(currentPhoto - 1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                event.stopImmediatePropagation();
                showPhoto(currentPhoto + 1);
            }
        },
        true
    );

})();
