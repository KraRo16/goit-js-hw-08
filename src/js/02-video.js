import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.on('timeupdate', throttle(playOn, 1000));

function playOn({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}
setCurrentTime();
function setCurrentTime() {
  if (!localStorage.getItem('videoplayer-current-time')) {
    return;
  }
  player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
}
