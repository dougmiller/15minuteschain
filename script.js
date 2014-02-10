/*jshint moz:true */
(function () {
    "use strict";

    let c = console.log;

    let job1 = document.getElementById("job1"),
        job2 = document.getElementById("job2"),
        job3 = document.getElementById("job3"),
        job4 = document.getElementById("job4");

    let job1history = localStorage.getItem(job1.children[0].textContent);
    let job2history = localStorage.getItem(job2.children[0].textContent);
    let job3history = localStorage.getItem(job3.children[0].textContent);
    let job4history = localStorage.getItem(job4.children[0].textContent);

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let lastModDate = localStorage.getItem("lastModDate");

    if (lastModDate === null) {
        localStorage.setItem("lastModDate", today);
        lastModDate = today;
    }

    if (job1history === null) {
        localStorage.setItem(job1.children[0].textContent, "false,false,false,false,false,false,false");
        job1history = localStorage.getItem(job1.children[0].textContent);
    }

    if (lastModDate !== today) {
        localStorage.setItem("lastModDate", today);
        let datediff = today - lastModDate;
        for (let i = 0; i < datediff; i += 1) {
            let localhistory = job1history.split(',');
            localhistory.splice(6, 1);
            localhistory.push('false');
        }
    }


    let localchistory = job1history.split(','); // localhistory stores strings, not objects, so arrays are converted to csv
    let children = job1.children;
    for (let i = 0; i < localchistory.length; i += 1) {
        if (localchistory[i] === 'true') {
            children[i + 1].classList.add("completed");
            children[i + 1].classList.remove("notcompleted");
        }
    }


    job1.children[1].addEventListener("click", function () {
        let children = job1.children, progress = [];
        children[1].classList.add("completed");

        for (let i = 1; i < children.length; i++) {
            if (children[i].classList.contains("notcompleted")) {
                progress.push("false");
            } else {
                progress.push("true");
            }
        }
        localStorage.setItem(job1.children[0].textContent, progress);
        c(progress);
    });

    job2.children[1].addEventListener("click", function () {
        c(localStorage.getItem(job1history));
        c(localStorage.getItem(job1.children[0].textContent));
    });

    job3.children[1].addEventListener("click", function () {
        delete window.localStorage[job1.children[0].textContent];
    });
}());
