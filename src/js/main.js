var webgl, gui;
var mouseDown;
var mouseX;
var mouseY;
var camera;
var rate = 0;
var data;
var stats;
var snd2;
var mousePosWorld;
var isBeforeMidnight;
var worldWidth = 150, worldDepth = 150,
            worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
var waterNormals;
var water;
var controls;
var someOtherObject;
var buildings = [];
var boats = [];
var messagesTab = [];
var vector, raycaster, isShiftDown = false;
var mouse = new THREE.Vector2(), INTERSECTED;
$(document).ready(function(){
    setTimeout(init,3000);
});


function init(){

    messagesTab = ["I feel good on this particular moment",
                   "Let us sing",
                   "The key to joy is disobedience",
                   "I am sad",
                   "Do you feel lonely sometimes ?",
                   "Do I exist ?",
                   "I'm going upstairs now",
                   "Turning my mind off",
                   "It's either ether or the other",
                   "I'm alone'",
                   "Don't feel bad",
                   "I like you",
                   "This sky is intense",
                   "Don't leave me",
                   "Do you feel sad ?",
                   "I'm so sorry for this",
                   "I should not",
                   "I feel empty",
                   "Is this normal ?",
                   "It's like I don't belong here",
                   "Nobody's really confortable",
                   "Do you believe in ghosts ?",
                   "I'm cold"]



    var snd = new Audio("assets/sounds/mainTheme.mp3"); // buffers automatically when created
    snd2 = new Audio("assets/sounds/nouvelleNote.mp3"); // buffers automatically when created
    snd.play();
    snd.volume = 0;
    FadeIn(snd)

    // stats = new Stats();
    // stats.setMode(1); // 0: fps, 1: ms

    // align top-left
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.left = '0px';
    // stats.domElement.style.top = '0px';

    //document.body.appendChild( stats.domElement );


    webgl = new Webgl(window.innerWidth, window.innerHeight);
    $('.three').append(webgl.renderer.domElement);

    // gui = new dat.GUI();
    // gui.close();

    $(window).on('resize', resizeHandler);


    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //document.addEventListener( 'click', webgl.spawn, false );
    $(document).mousedown(function(event){if(event.which === 1)mouseDown = true;});
    $(document).mouseup(function(){console.log("up");mouseDown = false;});
    //document.addEventListener( 'click', webgl.spawn, false );
    animate();



    $('h1').animate({paddingLeft:"100px"},4000);
    setTimeout(function(){

        $('h1').fadeIn(1000);
    },2000);


    setTimeout(function(){$('canvas').fadeIn(3000)},5000);

}

function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
    webgl.update();
    requestAnimationFrame(animate);
    webgl.render();


}

function FadeIn(audio) {

    var sound = audio;

    if ( sound.volume <= 0.9 )
        {
            console.log(sound.volume)
            sound.volume+=0.1;
            setInterval(function() { FadeIn(sound) }, 1000);
        }
        else return;


}

function onDocumentMouseMove( event ) {


                event.preventDefault();

                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


}
