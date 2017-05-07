import second from './second';
import anime from 'animejs';

console.log(second);

var el = document.getElementsByClassName('el');

var domNode = anime({
    targets: el,
    translateX: 250,
    duration: 1500,
    easing: 'easeInCubic',
    autoplay: true,
    loop: true
});

console.log(domNode);

var play = document.getElementById('play');
play.addEventListener('click', function() {
    domNode.play();
})
var pause = document.getElementById('pause');
pause.addEventListener('click', function() {
    domNode.pause();    
});