<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script><?php echo file_get_contents('engine/index.js'); ?></script>
    <style>
        body  {
            overflow: hidden;
            margin: 10px;
        }
        div {
            width: calc(100vw - 26px);
            height: calc(33vh - 45px);
            text-align: center;
            line-height: calc(33vh - 45px);
            color: blue;
            font-size: 18px;
            border: 3px solid red;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="element_1">
        Do Swipe
    </div>
    <div class="element_2">
        Touch / Muti-Touch
    </div>
    <div class="element_3">
        Touch Move / Muti-Touch Move
    </div>
</body>

<script>

var elisten = ActiveTouch.addEventListener;
var element_1 = document.querySelector('.element_1');
var element_2 = document.querySelector('.element_2');
var element_3 = document.querySelector('.element_3');

function setText(k, text) {
    if(k == 1) { element_1.innerHTML = text; }
    if(k == 2) { element_2.innerHTML = text; }
    if(k == 3) { element_3.innerHTML = text; }
}

// swipes
elisten(element_1,'swipeleft',  function(e) { setText(1, 'Swiped Left'); });
elisten(element_1,'swiperight', function(e) { setText(1, 'Swiped Right'); });
elisten(element_1,'swipeup',    function(e) { setText(1, 'Swiped Up'); });
elisten(element_1,'swipedown',  function(e) { setText(1, 'Swiped Down'); });
// touches
elisten(element_2,'touchstart', 1, function(e) { setText(2, '1 Touch'); });
elisten(element_2,'touchstart', 2, function(e) { setText(2, '2 Touches'); });
elisten(element_2,'touchstart', 3, function(e) { setText(2, '3 Touches'); });
elisten(element_2,'touchstart', 4, function(e) { setText(2, '4 Touches'); });
// touches
elisten(element_3,'touchmove', 1, function(e) { setText(3, '1 Touch Move'); });
elisten(element_3,'touchmove', 2, function(e) { setText(3, '2 Touch Moves'); });
elisten(element_3,'touchmove', 3, function(e) { setText(3, '3 Touch Moves'); });
elisten(element_3,'touchmove', 4, function(e) { setText(3, '4 Touch Moves'); });

</script>