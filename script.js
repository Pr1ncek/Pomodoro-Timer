// Timer
// Number of sessions per day
// duration of the sessions
// break in between 
// Daily motivational quote
// Track progress

var counterController = (function () {

    var minutes, seconds, numberOfWorkSessions, breakInterval, pause, isBreak;

    minutes = 45;
    seconds = 59;
    breakInterval = 2;
    numberOfWorkSessions = 5;

    pause = false;
    isBreak = false;

    function startTimer(duration, display) {
        var timer = duration,
            min, sec;

        var id = setInterval(function () {

            if (pause) {

                minutes = min + 1;

                clearInterval(id);
            }

            min = parseInt(timer / 60, 10)
            sec = parseInt(timer % 60, 10);

            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;

            display.updateUITimer(min, sec);

            if (--timer < 0) {

                isBreak = !isBreak;

                clearInterval(id);
            }

        }, 1000);
    }

    return {

        getTime: function () {

            return {
                minutes: minutes,
                seconds: seconds,
                breakInterval: breakInterval,
                numberOfWorkSessions: numberOfWorkSessions
            }

        },

        setMinutes: function (min, uiController) {

            minutes = min;

            console.log(minutes);

            seconds = 10;

            uiController.updateUITimer(minutes, seconds);

        },

        setWorkSessions: function (numberOfWorkSessions) {

            numberOfWorkSessions = numberOfWorkSessions;

        },

        setBreakInterval: function (breakInterval) {

            breakInterval = breakInterval;


        },

        //        updateUITimer: function (uiController) {
        //
        //            uiController.updateUITimer(minutes, seconds);
        //
        //        },

        startTimer: function (min, uiController) {

            console.log(minutes + " " + seconds);

            console.log(min);

            var time = 1 * 60;

            pause = false;

            while (numberOfWorkSessions > 0){
                
                console.log(isBreak + " " + numberOfWorkSessions)
                
                if (isBreak)
                    startTimer(breakInterval * 60, uiController);
                else
                    startTimer(time, uiController);
                
                numberOfWorkSessions--;
            }


            //            pause = false;
            //
            //            var id = setInterval(function () {
            //                
            //                if (pause)
            //                    clearInterval(id);
            //
            //                seconds--;
            //
            //                if (seconds === 0) {
            //                    seconds = 10;
            //                    minutes--;
            //                }
            //                
            //                counterController.updateUITimer(uiController);
            //
            //            }, 1000)


        },

        pauseTimer: function () {

            pause = true;


        }

    }

})();


var uiController = (function () {


    var domInputs = {

        minutes: document.querySelector(".timer-minutes"),

        seconds: document.querySelector(".timer-seconds"),

        workSessionInterval: document.getElementById("ws-interval"),

        workSessionsPerDay: document.getElementById("ws-perday"),

        breakInterval: document.getElementById("ws-break"),

        startButton: document.getElementById("start-button")

        //        preferences: document.querySelector(".preferences")

    };

    return {

        getDomInputs: function () {
            return domInputs;
        },

        updateUITimer: function (minutes, seconds) {

            domInputs.minutes.textContent = minutes;

            domInputs.seconds.textContent = seconds;

        },

        pauseTimer: function () {

            domInputs.startButton.textContent = "Pause";

            domInputs.startButton.classList.remove("btn-primary");

            domInputs.startButton.classList.add("btn-danger");

        },

        startTimer: function () {

            domInputs.startButton.textContent = "Work!";

            domInputs.startButton.classList.add("btn-primary");

            domInputs.startButton.classList.remove("btn-danger");

        }

    }
})();


var mainController = (function (counterController, uiController) {

    var domInputs = uiController.getDomInputs();

    var time = counterController.getTime();

    domInputs.workSessionInterval.addEventListener("change", function () {

        var wsInterval = this.options[this.selectedIndex].value;

        counterController.setMinutes(Number(wsInterval), uiController);

        console.log("changed");

    });

    domInputs.workSessionsPerDay.addEventListener("change", function () {

        var workSessions = this.options[this.selectedIndex].value;

        counterController.setWorkSessions(Number(workSessions));

    });

    domInputs.breakInterval.addEventListener("change", function () {

        var breakInterval = this.options[this.selectedIndex].value;

        counterController.setBreakInterval(Number(breakInterval));

    });

    domInputs.startButton.addEventListener("click", function () {

        if (this.textContent === "Work!") {

            time = counterController.getTime();

            console.log(time.minutes + " " + time.seconds);

            counterController.startTimer(time.minutes, uiController);

            uiController.pauseTimer();


        } else {

            counterController.pauseTimer();
            uiController.startTimer();

        }
    });




})(counterController, uiController);
