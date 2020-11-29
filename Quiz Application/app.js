var questions = [{
        question: "HTML stands for",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Markup Language",
            "Hyper Text Makeup Language",
            "Hyper Tech Markup Language",
            "None of these",
        ]
    },
    {
        question: "HTML program is saved using _________ extension.",
        answer: ".html",
        options: [
            ".htl",
            ".html",
            ".hml",
            ".htlm",
        ]
    },
    {
        question: "What are <div> tags used for?",
        answer: "To logically divide the document",
        options: [
            "To replace paragraphs. i.e. p tags",
            "To logically divide the paragraphs",
            "To logically divide the document",
            "To provide space between tables",
        ]
    },
    {
        question: "How can we resize the image?",
        answer: "Using height and width",
        options: [
            "Using resize attribute",
            "Using height and width",
            "Using size attribute",
            "Using rs attribute",
        ]
    },
    {
        question: "When creating a Web document, what format is used to express an image's height and width?",
        answer: "Pixels",
        options: [
            "Pixels",
            "Centimeters",
            "Dots per inch",
            "Inches",
        ]
    },
    {
        question: "What are meta tags used for?",
        answer: "To store information usually relevant to browsers and search engines",
        options: [
            "To store information usually relevant to browsers and search engines",
            "To only store information usually relevant to browsers",
            "To only store information about search engines",
            "To store information about external links",
        ]
    },
    {
        question: "ASCII stands for______",
        answer: "American Standard Code for Information Interchange",
        options: [
            "American Standard Code for Informal Interchange",
            "American Standard Code for Interchanging Information",
            "American Standard Code for Information Interchange",
            "American Standard Code for Information Interval",
        ]
    },
    {
        question: "If we want define style for an unique element, then which css selector will we use ?",
        answer: "Id",
        options: [
            "Id",
            "text",
            "class",
            "name",
        ]
    },
    {
        question: "Which element is used in the <HEAD> section on an HTML / XHTMLpage, if we want to use an external style sheet file to decorate the page ?",
        answer: "link",
        options: [
            "src",
            "link",
            "style",
            "css",
        ]
    },
    {
        question: "When we write src='img.png', what 'img.png' inside double quote implies?",
        answer: "value",
        options: [
            "element",
            "attribute",
            "value",
            "operator",
        ]
    },
];

function startTime() {
    var minutesLeft = 5;
    var secondsLeft = minutesLeft * 60;
    var timePara = document.getElementById("time");

    function updateCountDown() {
        var minutes = Math.floor(secondsLeft / 60)
        var seconds = secondsLeft % 60;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        timePara.innerHTML = minutes + ":" + seconds;
        secondsLeft--;

        if (minutes == 00 && seconds == 00) {
            showResult();
        }
    }
    setInterval(updateCountDown, 1000);
}

function showQuestion(e) {
    var qNo = document.getElementById('qNo')
    qNo.innerHTML = e + 1

    // Showing Question  
    var question = document.getElementById('question')
    question.innerHTML = questions[e].question;

    // Showing Options
    var option = document.getElementsByClassName('questionOption')
    for (var i = 0; i < option.length; i++) {
        option[i].innerHTML = questions[e].options[i]
    }
}

var questionCount = 0;
var marks = 0;

function nextQuestion() {
    validateAnswer(questionCount)
    questionCount++
    if (questionCount < questions.length) {
        showQuestion(questionCount)
    }
    if (questionCount === questions.length - 1) {
        var nextBtn = document.getElementById('nextBtn')
        nextBtn.innerText = "Finish"
    }
    if (questionCount === questions.length) {
        var nextBtn = document.getElementById('nextBtn')
        nextBtn.setAttribute('onclick', showResult())
    }

    removeSelectedOption()
}

function addSelectedOption(e) {
    removeSelectedOption()
    e.classList.add('selected')
}

function removeSelectedOption() {
    var selected = document.getElementsByClassName('selected')
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
}

function validateAnswer(e) {
    var userAnswer = document.getElementsByClassName('selected')
    if (userAnswer[0].innerHTML == questions[e].answer) {
        marks += 1;
    }
}

function showResult() {
    var main = document.getElementById('main')
    main.classList.add('hidden')
    var result = document.getElementById('result')
    result.classList.remove('hidden');
    var quizResult = document.getElementById('quizResult').innerHTML = "You got " + marks + " marks out of " + questions.length
}