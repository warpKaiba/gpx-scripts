// ==UserScript==
// @name         GPX - Bigger Berry Feeder
// @namespace    https://github.com/warpKaiba/
// @version      0.6
// @description  Automatically clicks through berry feeder
// @author       You
// @match        https://gpx.plus/users*
// @match        https://gpx.plus/*/feeder
// @grant        none
// @icon         https://pbs.twimg.com/profile_images/1797456195/icon_400x400.png
// @downloadURL  https://github.com/warpKaiba/gpx-scripts/raw/master/gpxAutoBerryFeeder.user.js
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function() {

        if (window.location.href.includes("/users/")) {
            function changeMax() {
                document.getElementById("usersOpenTotal").max = "10000";
            }

            setInterval(function(){
                changeMax()
            }, 300);
            // Your code here...


        }
    }, 200)
    $("#usersOpen").submit(function(e) {
        e.preventDefault();
        if($("#usersTable").is(":empty"))
            return;
        var options = $(this).serializeJSON();
        if(options.number > 100000) {
            alert("Please enter a number 100000 or below!");
            return false;
        }
        var links = function() {
            if(options.type == '2')
                var a = $('a.pIcons[data-egg!=1]:not(.transparent):lt('+options.number+')');
            else if(options.type == '3')
                var a = $('a.pIcons[data-wild=1]:not(.transparent):lt('+options.number+')');
            else if(options.type == '4')
                var a = $('a.pIcons[data-bred=1]:not(.transparent):lt('+options.number+')');
            else if(options.type == '1')
                var a = $('a.pIcons[data-egg=1]:not(.transparent):lt('+options.number+')');
            else
                var a = $('a.pIcons:not(.transparent):lt('+options.number+')');
            return a;
        }
        if(options.area != "0") {
            var fnames = [];
            links = links();
            links.each(function() {
                fnames.push($(this).data("fname"));
            });
            links.addClass('transparent');
            localStorage.usersOpen = JSON.stringify(options);
            berryFeeder(fnames, "users", "the Users List", options.area == "2");
        } else {
            if(navigator.appVersion.toLowerCase().indexOf("chrome") != -1 && options.number > 25)
                if(confirm("For security reasons, Chrome prevents more than 25 windows from being opened at a time!  Would you like to reduce the number to 25? (Note that if you wish to open a larger number, you can alternatively just click the 'Open' button multiple times)")) {
                    options.number = 25;
                    $(this).find("[type='number']").val(25);
                }
            links = links();
            if(links.length == 0) {
                alert("No Pokemon could be opened!");
                return;
            }
            links.each(function () {
                window.open($(this).attr("href") + '/open');
            });
            links.addClass('transparent');
        }
        if(hasLocalStorage)
            localStorage.usersOpen = JSON.stringify(options);
    });
})();


var i = 0, max = infoPage.feeder.pokes.length, maxy = infoPage.feeder.current.length, j = maxy-1, delay = 2, run, runy;
var display = document.getElementById("infoTable")
var displayCount = 0
console.log(j)

runy = function() {
    var tempDatay = "fname=" + infoPage.feeder.current[j] + "&do_interact=Yes&page=info&type=feeder&currentPage=info"

    $.ajax({
        url: "https://gpx.plus/AJAX/page",
        data: tempDatay,
        success: function(response){

            display.textContent = displayCount + " interactions completed"
            displayCount += 1

        },
        error: function(response) {
            console.log(response.error);
        }
    })
    console.log(j)

    if(j-- > -1){
        setTimeout(runy, delay);
    } else {run()}
}

run = function(){

    var tempData = "fname=" + infoPage.feeder.pokes[i] + "&do_interact=Yes&page=info&type=feeder&berry=3&currentPage=info"

    $.ajax({
        url: "https://gpx.plus/AJAX/page",
        data: tempData,
        complete: "",
        success: function(response){

            display.textContent = displayCount + " interactions completed"
            displayCount += 1

        },
        error: function() {
            console.log(response.error);
        }
    })

    if(i++ < max){
        setTimeout(run, delay);
    }
}
runy();

// fname: naeck  ----- what my script sends
// do_interact: Yes
// page: info
// type: feeder
// currentPage: info

