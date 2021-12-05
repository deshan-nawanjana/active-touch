/*
    ActiveTouch Event Handling DNJS Library
        by Deshan Nawanjana
        https://dnjs.info/

*/

let ActiveTouch = {};

ActiveTouch._auth = {
    creator: "Deshan Nawanjana",
    library: "ActiveTouch Event Handling DNJS Library",
    website: "https://dnjs.info/"
};

ActiveTouch.configureElement = function(element) {
    // exception
    if(element.ActiveTouch) { return; }
    // touch action css
    element.style.touchAction = 'none';
    // setup
    element.ActiveTouch = {
        _data       : {
            busy : false,
            down : { x : null, y : null },
            history : {
                touchstart  : {},
                touchend    : {}
            },
            counts  : {
                touchstart  : 0,
                touchend    : 0
            }
        },
        touchstart  : {},
        touchmove   : {},
        touchend    : {},
        touchcancel : {},
        swipeup     : {},
        swipedown   : {},
        swipeleft   : {},
        swiperight  : {}
    };
    // event listeners
    Object.keys(element.ActiveTouch).forEach(function(event) {
        // exception
        if(event == '_data') { return; }
        // history
        element.ActiveTouch._data.history[event] = [];
        // listeners
        element.addEventListener(event, ActiveTouch.callbackEvent);
    });
};

ActiveTouch.addEventListener = function() {
    // argumants
    var args = arguments;
    var element  = args[0];
    var event    = args[1];
    var count    = null;
    var callback = null;
    // configure
    ActiveTouch.configureElement(element);
    // touch type selection
    if(args.length == 4) {
        // muti-touch events
        count    = args[2];
        callback = args[3];
    } else if(args.length == 3) {
        // any-touch events
        count    = 0;
        callback = args[2];
    }
    // array append
    var active = element.ActiveTouch;
    if(active[event][count]) {
        active[event][count].push(callback);
        return;
    } else { active[event][count] = [callback]; }
};

ActiveTouch.callbackEvent = function(e) {
    // values
    var element = this;
    var event   = e.type;
    var active  = element.ActiveTouch;
    // check
    if(active == undefined) { return; }
    // backup history
    var data    = element.ActiveTouch._data;
    if(data.busy == false) {
        data.busy = true;
        setTimeout(function() {
            // multi-touchstart and multi-touchend
            if(event == 'touchstart' || event == 'touchend') {
                var count = data.history[event].length;
                data.counts[event] = count;
                if(count > 0) {
                    // any-touch events
                    ActiveTouch.callbackEvent.execute(active[event]['0'], e);
                    // muti-touch events
                    ActiveTouch.callbackEvent.execute(active[event][count], e);
                }
            }
            // clear history
            data.busy = false;
            Object.keys(data.history).forEach(function(name) {
                data.history[name] = [];
            });
        }, 50);
    }
    // add to history
    data.history[event].push(e);
    // touchmove events
    if(event == 'touchmove') {
        e.preventDefault();
        var n = data.counts.touchstart;
        ActiveTouch.callbackEvent.execute(active[event][n], e);
        ActiveTouch.callbackEvent.execute(active[event]['0'], e);
    }
    // short defined
    var down = data.down;
    var exec = ActiveTouch.callbackEvent.execute;
    // get touchstart position
    if(event == 'touchstart') {
        down.x = e.touches[0].clientX;
        down.y = e.touches[0].clientY;
    }
    // swipe events
    if(down.x != null && down.y != null && event == 'touchmove') {
        // move positions
        var move = { x : e.touches[0].clientX, y : e.touches[0].clientY };
        // move difference
        var diff = { x : (down.x - move.x), y : (down.y - move.y) };
        // check direction
        var n = data.counts.touchstart;
        if(Math.abs(diff.x) > Math.abs(diff.y)) {
            if(diff.x < 0) {
                exec(active['swiperight']['0'], e);
                if(n != 0) { exec(active['swiperight'][n], e); }
            } else {
                exec(active['swipeleft']['0'], e);
                if(n != 0) { exec(active['swipeleft'][n], e); }
            }
        } else {
            if(diff.y < 0) {
                exec(active['swipedown']['0'], e);
                if(n != 0) { exec(active['swipedown'][n], e); }
            } else {
                exec(active['swipeup']['0'], e);
                if(n != 0) { exec(active['swipeup'][n], e); }
                
            }
        }
        // clear touchstart
        down.x = null;
        down.y = null;
    }
    // clear counts
    if(event == 'touchend') {
        Object.keys(data.counts).forEach(function(name) {
            data.counts[name] = 0;
        });
    }
};

ActiveTouch.callbackEvent.execute = function(array, e) {
    if(array == undefined) { return; }
    array.forEach(function(callback) {
        callback(e);
    });
};