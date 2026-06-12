/* Hometown Buddy 单页站脚本
   1. 主题曲播放：打开网页自动播放（被浏览器拦截时，第一次点击页面即开始），
      右下角悬浮按钮和开场大按钮都可以播放/停止，停止后不再自动播。
   2. KTV 歌词：按时间戳跟着歌高亮当前句，点任何一句跳到对应进度。
   3. 滚动浮现动画。 */
(function () {
  var SRC_PREFIX = document.querySelector('script[data-root]')
    ? document.querySelector('script[data-root]').getAttribute('data-root')
    : '';

  /* ---------- 歌词时间轴（秒） ---------- */
  var LYRICS = [
    { mark: 'VERSE 1' },
    { t: 16, s: '小时候赤脚跑过' },
    { t: 19, s: '海风吹过咸咸的温度' },
    { t: 22.5, s: '你讲走去玩咯 我讲 steady' },
    { t: 28, s: '骑着脚车白天到日落' },
    { t: 32.5, s: '偷偷去抓鱼 被阿母骂够够' },
    { t: 35.5, s: '以前什么都没有 快乐却特别多' },
    { mark: 'PRE-CHORUS' },
    { t: 40.5, s: '日子慢慢把我们带走' },
    { t: 44.5, s: '但 WhatsApp 一响还是' },
    { t: 48, s: '打几玩 game 吹水到半夜' },
    { t: 50.5, s: '走咯 Lim Teh 又聊一整夜' },
    { mark: 'CHORUS' },
    { t: 53.5, s: 'Hometown Buddy 一世人的兄弟' },
    { t: 58.5, s: '虽然现在大家忙' },
    { t: 61, s: '但一句 bro 最近好吗 感情还是不会变' },
    { t: 66.5, s: 'Hometown Buddy 永远的兄弟' },
    { t: 70.5, s: '从巴冬渔村一起长大的友谊' },
    { t: 74.5, s: '几十年后再相聚 还是这班兄弟' },
    { mark: 'VERSE 2' },
    { t: 82, s: '有人去 KL' },
    { t: 84.5, s: '有人已经当老板发财很多' },
    { t: 88.5, s: '有人结婚了 有人孩子都会飞跑' },
    { t: 96, s: '虽然大家越来越忙 见面越来越少' },
    { t: 100.5, s: '但每次聚在一起还是像从前' },
    { mark: 'BRIDGE' },
    { t: 107.5, s: '海风轻轻吹过 Old Hometown' },
    { t: 111, s: '我们的故事 never slowing down' },
    { t: 114, s: '从小玩到大 不曾散' },
    { t: 116.5, s: '兄弟的名字永远放心上' },
    { mark: 'FINAL CHORUS' },
    { t: 120, s: 'Hometown Buddy 不管未来去哪里' },
    { t: 124.5, s: '我们的回忆永远留在心里' },
    { t: 128.5, s: '海风还会记得那群疯疯的自己' },
    { t: 133.5, s: 'Hometown Buddy 兄弟情没过期' },
    { t: 138, s: '等到以后大家头发变白' },
    { t: 140.5, s: '回到巴冬再相聚 还是那句——' },
    { t: 149.5, s: 'Bro～ 今晚去哪里？' }
  ];

  /* ---------- 音频 ---------- */
  var audio = new Audio(SRC_PREFIX + 'assets/audio/hometown-buddy.mp3');
  audio.loop = true;
  audio.preload = 'auto';

  var saved = parseFloat(localStorage.getItem('hb-song-time'));
  if (!isNaN(saved)) {
    audio.currentTime = saved;
  }
  setInterval(function () {
    if (!audio.paused) {
      localStorage.setItem('hb-song-time', audio.currentTime);
    }
  }, 1000);

  /* ---------- 悬浮播放按钮 ---------- */
  var btn = document.createElement('button');
  btn.className = 'music-toggle';
  btn.setAttribute('aria-label', '播放/停止主题曲');
  btn.innerHTML =
    '<span class="disc">♪</span><span class="label">Hometown Buddy</span>';
  document.body.appendChild(btn);

  var heroBtn = document.getElementById('hero-play');

  function render() {
    var playing = !audio.paused;
    btn.classList.toggle('playing', playing);
    if (heroBtn) {
      heroBtn.classList.toggle('playing', playing);
      heroBtn.innerHTML = playing ? '❚❚&nbsp; 停止播放' : '▶&nbsp; 播放我们的歌';
    }
  }

  function play() {
    audio.play().then(render).catch(function () {
      /* 等待用户交互 */
    });
  }

  function toggle() {
    if (audio.paused) {
      play();
      localStorage.removeItem('hb-song-muted');
    } else {
      audio.pause();
      localStorage.setItem('hb-song-muted', '1');
      render();
    }
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggle();
  });
  if (heroBtn) {
    heroBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });
  }

  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);

  // 自动播放；用户主动停止过就不再自动播
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

  /* ---------- KTV 歌词 ---------- */
  var box = document.getElementById('ktv-box');
  var lineEls = [];
  if (box) {
    LYRICS.forEach(function (item) {
      var el;
      if (item.mark) {
        el = document.createElement('div');
        el.className = 'ktv-line mark';
        el.textContent = item.mark;
      } else {
        el = document.createElement('button');
        el.className = 'ktv-line';
        el.type = 'button';
        el.textContent = item.s;
        el.addEventListener('click', function () {
          audio.currentTime = item.t;
          localStorage.removeItem('hb-song-muted');
          play();
        });
        lineEls.push({ t: item.t, el: el });
      }
      box.appendChild(el);
    });

    audio.addEventListener('timeupdate', function () {
      var t = audio.currentTime;
      var nowIdx = -1;
      for (var i = 0; i < lineEls.length; i++) {
        if (t >= lineEls[i].t) {
          nowIdx = i;
        }
      }
      lineEls.forEach(function (l, i) {
        l.el.classList.toggle('now', i === nowIdx);
        l.el.classList.toggle('done', i < nowIdx);
      });
      // 只滚动歌词框内部，不动整个页面
      if (nowIdx >= 0 && !audio.paused) {
        var el = lineEls[nowIdx].el;
        var target = el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2;
        if (Math.abs(box.scrollTop - target) > 8) {
          box.scrollTop = target;
        }
      }
    });
  }

  /* ---------- 滚动浮现 ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
