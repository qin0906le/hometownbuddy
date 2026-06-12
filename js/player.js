/* Hometown Buddy 全站音乐播放器
   打开网页自动播放主题曲；浏览器拦截自动播放时，
   用户第一次点击/触摸页面即开始播放。
   播放进度存在 localStorage，跨页面接着播不断歌。 */
(function () {
  var SRC_PREFIX = document.querySelector('script[data-root]')
    ? document.querySelector('script[data-root]').getAttribute('data-root')
    : '';

  var audio = new Audio(SRC_PREFIX + 'assets/audio/hometown-buddy.mp3');
  audio.loop = true;
  audio.preload = 'auto';

  // 跨页面续播
  var saved = parseFloat(localStorage.getItem('hb-song-time'));
  if (!isNaN(saved)) {
    audio.currentTime = saved;
  }
  setInterval(function () {
    if (!audio.paused) {
      localStorage.setItem('hb-song-time', audio.currentTime);
    }
  }, 1000);

  // 悬浮播放按钮
  var btn = document.createElement('button');
  btn.className = 'music-toggle';
  btn.setAttribute('aria-label', '播放/暂停主题曲');
  btn.innerHTML =
    '<span class="disc">♪</span><span class="label">Hometown Buddy</span>';
  document.body.appendChild(btn);

  function render() {
    btn.classList.toggle('playing', !audio.paused);
  }

  function play() {
    audio.play().then(render).catch(function () {
      /* 等待用户交互 */
    });
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (audio.paused) {
      play();
      localStorage.removeItem('hb-song-muted');
    } else {
      audio.pause();
      localStorage.setItem('hb-song-muted', '1');
      render();
    }
  });

  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);

  // 用户主动暂停过就不再自动播
  if (localStorage.getItem('hb-song-muted') !== '1') {
    play();
    var resume = function () {
      if (audio.paused && localStorage.getItem('hb-song-muted') !== '1') {
        play();
      }
      document.removeEventListener('click', resume);
      document.removeEventListener('touchstart', resume);
      document.removeEventListener('keydown', resume);
    };
    document.addEventListener('click', resume);
    document.addEventListener('touchstart', resume);
    document.addEventListener('keydown', resume);
  }
})();
