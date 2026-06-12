# Hometown Buddy · 巴冬兄弟 Blog

一个以《Hometown Buddy》主题曲为灵感的静态博客网站，记录一班从巴冬渔村一起长大的兄弟的故事。

## 设计理念

整个网站的视觉和文案都来自歌曲本身：

- **配色**：取自主视觉照片——夕阳沙滩的米色与珊瑚粉、落日橙、暮色海蓝
- **主视觉**：兄弟们的手围成圈、沙地上用贝壳拼出 "HOMETOWN BUDDY" 的照片（取自歌曲 MV）
- **文案**：歌词金句贯穿全站（"从小玩到大，不曾散"、"兄弟情没过期"）
- **语言风格**：保留马来西亚华语特色——Lim Teh、吹水、脚车、阿母、steady、骂够够

## 页面结构

```
index.html            首页：主视觉 + 歌词横幅 + 相聚时刻合照 + 博文列表
lyrics.html           主题曲完整歌词（按 Verse / Chorus / Bridge 排版）
about.html            关于我们
posts/
  childhood.html      赤脚跑过的沙滩：巴冬渔村的童年
  limteh.html         WhatsApp 一响：Lim Teh 又聊一整夜
  reunion.html        有人去 KL，有人当老板：几十年后再相聚
css/style.css         全站样式（夕阳沙滩主题）
js/player.js          全站音乐播放器（自动播放主题曲，跨页面续播）
assets/img/           主视觉与合照图片
assets/audio/         主题曲音频 hometown-buddy.mp3
```

## 背景音乐

打开任意页面会自动播放主题曲（右下角有悬浮播放按钮）。
浏览器拦截自动播放时，用户第一次点击页面即开始播放；
播放进度记录在 localStorage，换页面不断歌；用户手动暂停后不再自动播。

## 替换合照

首页"相聚时刻"目前是占位图，把真实合照保存为
`assets/img/buddies-dinner.jpg` 覆盖即可。

## 本地预览

纯静态网站，无需构建：

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

也可直接启用 GitHub Pages 部署。
