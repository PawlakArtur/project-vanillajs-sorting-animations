import second from './second';
import anime from 'animejs';

console.log(second);

var el = document.getElementsByClassName('el');

var domNode = anime({
    targets: '#cssSelector .el',
    translateX: 250,
    duration: 300,
    loop: true,
    direction: 'alternate',
    easing: 'easeInCubic',
});
console.log(domNode);
var play = document.getElementById("play");
play.addEventListener('click', function() {
    domNode.play;
})