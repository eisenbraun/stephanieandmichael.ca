var app = {}; 


/** Retrieving DOM Objects */
app.parallax = document.querySelectorAll('.parallax');
app.chapters = document.getElementById('chapters');
app.sections = {
    liberty: document.getElementById('liberty'), 
    dating: document.getElementById('dating'),
    proposal: document.getElementById('proposal'),
    surprise: document.getElementById('surprise'),
    wedding: document.getElementById('wedding')
};

/** Initializing variables */ 
app.scrolling = false;
app.bounds = {};


/** Scroll page to the desired location */
app.scrollTo = function(section, speed) {
    var point = app.bounds[section].top, 
    start = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop, 
    i = start; 

    console.log(start + ": " + point);
    function animate(i, speed) { 
        if(point < start) {
            if(i >= point) {
                window.scrollTo(0, i);
                i -= speed;
                setTimeout(function() { 
                    animate(i, speed);
                }, 10);
            }
        } else {
            if(i <= point) {
                window.scrollTo(0, i);
                i += speed;
                setTimeout(function() { 
                    animate(i, speed);
                }, 10);
            }
        }

        
    }

    animate(i, speed);
};

/** Retrieve the rectangular bounds of the element */
app.getBounds = function(element) {
    for(var section in app.sections) { 
        if(typeof app.sections[section] === 'object') {
            app.bounds[section] = app.sections[section].getBoundingClientRect();
        }
    }
};


/** Creates a parallax scrolling effect */ 
app.parallaxScrolling = function() { 
    var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var length = app.parallax.length; 

    for(var i = 0; i < length; i++) {
        app.parallax[i].setAttribute('style', 'background-position: center ' + app.parallax[i].getBoundingClientRect().top/8 +'px');
    }
};


/** Running init functions */ 
app.getBounds();

/** Creating Event Listeners */ 
/*window.addEventListener("scroll", function() {
     if(!app.scrolling) {
        app.scrolling = true;
        setTimeout(function() {
            app.parallaxScrolling();
            app.scrolling = false;
        }, 100); 
     }
     
});*/

app.chapters.addEventListener('click', function(e) {
    e.preventDefault();

    if(e.target && e.target.classList.contains('chapters')) {
        app.scrollTo(e.target.getAttribute('data-href').substring(0), 40);
    }
}, true); 