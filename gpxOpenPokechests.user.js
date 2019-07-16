// ==UserScript==
// @name         GPX - Open pokechests
// @namespace    https://github.com/warpKaiba/
// @version      0.3
// @description  Adds open all pokechests button
// @author       kaiba
// @include      https://gpx.plus/*
// @grant        none
// @icon         https://pbs.twimg.com/profile_images/1797456195/icon_400x400.png
// @downloadURL  https://github.com/warpKaiba/gpx-scripts/raw/master/gpxOpenPokechests.user.js
// ==/UserScript==

(function() {
    'use strict';

    const target = document.getElementById("poketch")

    // config object
    const config = {
        characterData: true,
        characterDataOldValue: true,
        childList: true,
        subtree: true
    };

    // subscriber function
    function subscriber(mutations) {
        mutations.forEach((mutation) => {
            // handle mutations here
            if (mutation.addedNodes[0] != undefined) {
                if (mutation.addedNodes[0].innerText == "Pokéchests") {
                    console.log("opened pokechest tab")
                    $("#poketch .speechBubble").append("<button id='openallbutton'>Open All Chests</button>");
                    $("#openallbutton").click(openChests)
                    $("#poketch .speechBubble").append("<button id='shinyallbutton'>Make Chests Shiny</button>");
                    $("#shinyallbutton").click(shinyChests)
                }
            }
            console.log(mutation);
        });
    }

    // instantiating observer
    const observer = new MutationObserver(subscriber);

    // observing target
    observer.observe(target, config);



    function openChests() {
        console.log("openChests fired")
        var chests = $("#unopenedChestsDiv .unopenedChest")
        for (var i = 0; i<chests.length; i++) {

            //             chests[i].click()
            var data = "";

            if (chests[i].classList.contains("SpriteShinyPokechest")) {
                data = "shiny=1"
            }

            ajax('OpenPokechest', data, function(res){
                res.width = 485;

                $("#unopenedChestsDiv .unopenedChest").removeClass('transparent');
                createDialog(res);
                //$("#tabs [data-tab='pokechests'] span").text(user.pokechests);
                if(user.pokechests <= 0)
                    $("#unopenedChestsDiv").remove();
            });
        }
    }

    function shinyChests() {
        console.log("shinyChests fired")
        var chests = $("#unopenedChestsDiv .unopenedChest")
        chests.attr("class", "unopenedChest SpriteShinyPokechest")

    }
    // Your code here...
})();