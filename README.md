# Hometown Buddy · 巴冬兄弟

以《Hometown Buddy》主题曲为灵感的**单页沉浸式叙事站**——
像把 MV 做成网页：打开就播歌，往下滚动看一班巴冬渔村兄弟的故事。

线上地址：https://qin0906le.github.io/hometownbuddy/

## 页面流程（从上滚到下）

1. **开场全屏**：沙滩合照铺满屏幕 + HOMETOWN BUDDY + 播放按钮
2. **三个章节**：童年（赤脚沙滩/脚车/抓鱼）→ 长大后（WhatsApp/Lim Teh）→ 重聚（KL/老板/孩子），每章歌词标题 + 小故事 + 照片
3. **副歌横幅**：两段歌词金句全宽呈现
4. **时间轴**：巴冬童年 → 各奔东西 → 婚礼 → 大圆桌重聚 → 未来
5. **KTV 歌词**：歌词跟着歌曲进度逐句高亮、自动滚动，点任意一句跳转
6. **结尾**："Bro～ 今晚去哪里？" + WhatsApp 一键丢"走咯"

## 背景音乐

打开网页自动播放主题曲（`assets/audio/hometown-buddy.mp3`），
浏览器拦截自动播放时第一次点击页面即开始；
开场大按钮和右下角悬浮按钮都可以播放/停止，手动停止后不再自动播。

## 设计

- 配色取自主视觉照片：夕阳沙滩米色、珊瑚粉霞光、落日橙、暮色海蓝
- 文案保留马来西亚华语特色：Lim Teh、吹水、脚车、阿母、steady、骂够够
- 纯静态（HTML/CSS/JS），无构建步骤；推送即由 GitHub Actions 自动部署

## 动态视频背景

三段家乡实拍短视频（已压缩、去音轨、静音循环自动播）穿插在页面里：

- `assets/video/beach-sunset.mp4` — 开场全屏：海边日落
- `assets/video/cycling.mp4` — 第一章：骑脚车白天到日落
- `assets/video/jetty.mp4` — Bridge 横幅背景：海边木桥 / 海风轻轻吹过

每段视频都配了一张 `*-poster.jpg` 作为加载前的封面。

## 替换照片

在 GitHub 网页进入 `assets/img/` → Add file → Upload files，
按以下文件名上传覆盖即可自动上线：

- `assets/img/buddies-departure.jpg` — 回乡 · Departure Hall（占位中）
- `assets/img/buddies-homecoming-ride.jpg` — 回乡街头骑脚车（占位中）
- `assets/img/buddies-trip.jpg` — Koh Lipe 海岛旅行合照（已就位）
- `assets/img/buddies-groomsmen.jpg` — 接亲粉色兄弟团合照（已就位）
- `assets/img/buddies-prewedding.jpg` — 新人婚纱照（已就位）
- `assets/img/buddies-dinner.jpg` — 圆桌聚餐合照（已就位）
- `assets/img/buddies-wedding.jpg` — 婚礼紫色全员合照（已就位）

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```
