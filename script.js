(function () {
    "use strict";
    let c = console.log;

    let jobs = document.getElementsByClassName("chainContainer");

    //  The chainContainer is setup to have an <h1> as the first element ([0]).
    //  This element's text act's as the local storage key.
    //  I.E. Changing the text will lose your history.
    //  You can have as many of them as you want (fit on a page). Just copy a different one and change the text etc.
    //  Chain links start at [1] and go for as many as you want. 1 per day though. Unless you want to change that.
    let jobHistories = [];
    for (let i = 0; i < jobs.length; i += 1) {
        jobHistories[i] = localStorage.getItem(jobs[i].children[0].textContent);
    }

    //  Click on 'today'
    for (let i = 0; i < jobs.length; i += 1) {
        jobs[i].children[1].addEventListener("click", function () {
            this.classList.add("done");
            // Serialise state to local storage
            let state = [];
            for (let i = 1; i < this.parentNode.children.length; i += 1) {
                if (this.parentNode.children[i].classList.contains("done")) {
                    state.push("true");
                } else {
                    state.push("false");
                }
            }
            localStorage.setItem(this.parentNode.children[0].textContent, state);
        });
    }

    //  Restore from state
    for (let i = 0; i < jobs.length; i += 1) {
        let prevState;
        try {
            prevState = localStorage.getItem(jobs[i].children[0].textContent).split(",");

            for (let j = 0; j < prevState.length; j += 1) {
                if (prevState[j] === "true") {  // Using truthiness not actual boolean logic.
                    jobs[i].children[j + 1].classList.add("done");
                } else {
                    jobs[i].children[j + 1].classList.add("notdone");
                }
            }
        } catch (TypeError) { //  No history yet
            c(jobs[i]);
            for (let j = 2; j < jobs[i].children.length; j += 1) {
                jobs[i].children[j].classList.add("notdone");
            }
        }
    }

    //  Reset the history
    let reset = document.getElementById("reset");
    reset.addEventListener("click", function () {
        for (let i = 0; i < jobs.length; i += 1) {
            localStorage.clear(jobs[i].children[0].textContent);
            for (let j = 0; j < jobs[i].children.length; j += 1) {
                jobs[i].children[j].classList.remove("done");
                jobs[i].children[j].classList.remove("notdone");
            }
        }
    });
}());
