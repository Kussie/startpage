/*
 * 
 * Inspired by Evening Startpage https://github.com/TB-96/Evening-Startpage
 * Inspired by https://github.com/jeroenpardon/sui
 * Modified and tweaked by Kussie
 *
 */

function startTime() {
  var currentDate = new Date();
  var hr = parseInt(currentDate.getHours());
  var min = parseInt(currentDate.getMinutes());
  //Add a zero in front of numbers<10
  if (min < 10) {
    min = "0" + min;
  }
  document.getElementById("header-time").innerHTML = hr + ":" + min;

  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  var date = currentDate.toLocaleDateString("en-GB", dateOptions);
  document.getElementById("header-date").innerHTML = date;

  var time = setTimeout(function(){ startTime() }, 60000);
}

const quotes = [
    'I like the impossible because there’s less competition - Walt Disney',
    'All our dreams can come true, if we have the courage to pursue them - Walt Disney',
    'The difference between winning and losing is often not quitting - Walt Disney',
    'If you can dream it, you can do it - Walt Disney',
    'It’s kind of fun to do the impossible - Walt Disney',
    'The way to get started is to quit talking and begin doing - Walt Disney',
    'sudo rm -rf /',
    'The best time to plant a tree was 20 years ago. The second best time is now – Chinese Proverb',
    'Impossible is just an opinion – Paulo Coelho',
    'The hard days are what make you stronger – Aly Raisman'
];
document.getElementById("header-quote").innerText = quotes[
  Math.floor(Math.random() * quotes.length)
];

// Fade out after clicking
window.onbeforeunload = function(e){
    document.body.style.opacity = 0;
}

$.getJSON("assets/data/apps.json",
    function (data) {
        var mysource = $('#apps-template').html();
        var mytemplate = Handlebars.compile(mysource);
        var myresult = mytemplate(data);
        $('#apps').html(myresult);
    });

$.getJSON("assets/data/sites.json",
    function (data) {
        var mysource = $('#sites-template').html();
        var mytemplate = Handlebars.compile(mysource);
        var myresult = mytemplate(data);
        $('#sites').html(myresult);
    });

$.getJSON("assets/data/bookmarks.json",
    function (data) {
        var mysource = $('#bookmarks-template').html();
        var mytemplate = Handlebars.compile(mysource);
        var myresult = mytemplate(data);
        $('#links-container').html(myresult);
    });

$(document).on("click", ".toggle", function (e) {
    var toggleTarget = $(this).attr('data-toggleTarget');
    $(`#${toggleTarget}`).toggle();
});

// show url on mouse over
$(document).on("mouseenter", ".apps-item", function (e) {
    descriptionField = $(this).find('.apps-text>.description');
    descriptionField.text(descriptionField.data('url').replace('https://', ''));
});
$(document).on("mouseleave", ".apps-item", function (e) {
    descriptionField = $(this).find('.apps-text>.description');
    descriptionField.text(descriptionField.data('description'));
});

document.getElementById("container").addEventListener("DOMContentLoaded", startTime());

setTimeout(function () {
    $('.apps-item').each(function (i) {
        var link = $(this).attr('href');
        if ($(this).find('.status-indicator').length) {
            getStatus(link, $(this));
        }
    });
}, 2000);

function getStatus(url, selector) {
    $.ajax(url)
        .done(function (data, xhr, res) {
            var status = res.status;
            selector.find('.status-indicator').removeAttr('active').attr('positive', 'positive');
        })
        .fail(function (data, xhr, res) {
            var status = res.status;
            selector.find('.status-indicator').removeAttr('active').attr('negative', 'negative');
        })
        .always(function (data, xhr, res) {
            var status = res.status;
            if (status === 200) {
                selector.find('.status-indicator').removeAttr('active').attr('positive', 'positive');
            }
        });
}