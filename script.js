(function () {
    "use strict";

    function compareDates(date1, date2) {
        return (date1 - date2) / 86400000;
    }

    let jobs = document.getElementsByClassName("chainContainer");
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    todayDate.setDate(todayDate.getDate());

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
            // Serialise state to local storage
            let state = localStorage.getItem(this.parentNode.children[0].textContent);
            this.classList.add("done");

            if (state === null) {  //  Nothing in local history yet
                state = [];
            } else {
                state = state.split(",");
            }

            if (state.indexOf(todayDate.toDateString()) === -1) {
                state.push(todayDate.toDateString());
                localStorage.setItem(this.parentNode.children[0].textContent, state);
            }
        });
    }

    //  Restore from state
    for (let i = 0; i < jobs.length; i += 1) {
        let prevState;
        try {
            prevState = localStorage.getItem(jobs[i].children[0].textContent).split(",");

            for (let j = 0; j < prevState.length; j += 1) {
                let stateDate = new Date(prevState[j]);
                let dateDiff = compareDates(todayDate, stateDate);

                if (dateDiff > jobs[i].children.length - 2) {
                    break;  // Array out of bounds
                }

                jobs[i].children[dateDiff + 1].classList.add("done");
            }

            for (let j = 2; j < jobs[i].children.length; j += 1) {
                if (!jobs[i].children[j].classList.contains("done")) {
                    jobs[i].children[j].classList.add("notdone");
                }
            }
        } catch (TypeError) { //  No history yet
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
            for (let j = 1; j < jobs[i].children.length; j += 1) {
                jobs[i].children[j].classList.remove("done");
                jobs[i].children[j].classList.remove("notdone");
            }
            for (let j = 2; j < jobs[i].children.length; j += 1) {
                jobs[i].children[j].classList.add("notdone");
            }
        }
    });
}());
