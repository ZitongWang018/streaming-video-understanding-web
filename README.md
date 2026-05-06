# 🤖 World Model & VLA Survey

<div align="center">

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge&logo=github)](https://song2yu.github.io/world-model-vla/)
[![HTML](https://img.shields.io/badge/Format-HTML-orange?style=for-the-badge&logo=html5)](https://song2yu.github.io/world-model-vla/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**A comprehensive survey on World Models and Vision-Language-Action (VLA), plus a dedicated Streaming Video Understanding hub** (structured mirror of [Awesome-VLM-Streaming-Video](https://github.com/ydyhello/Awesome-VLM-Streaming-Video): papers, PDFs, code links, benchmarks).

### 👉 [**World Model & VLA index →**](https://song2yu.github.io/world-model-vla/) · [**Streaming topic `/streaming-video-understanding/`**](https://zitongwang018.github.io/streaming-video-understanding-web/streaming-video-understanding/) _(mirror deploy; adjust if your Pages URL differs)_

</div>

---

## 📖 About

This project presents:

- 🎬 **Streaming Video（README 网页镜像）** — 本仓库内路径 **`/streaming-video-understanding/`** / **`streaming-video-understanding.html`** 即 [ydyhello/Awesome-VLM-Streaming-Video](https://github.com/ydyhello/Awesome-VLM-Streaming-Video) 根目录 **`README.md`** 的结构化 HTML 版（表格 pdf/docs/GitHub 与 upstream 同源）；文末中文「综合评析」为本站追加。
- 🧠 **World Models** — how agents learn internal representations of the environment
- 🦾 **VLA Models** — integrating vision, language, and action for robot control
- 📊 **Taxonomy & Comparisons** — structured categorization of existing approaches
- 🔬 **Key Papers & Benchmarks** — curated references and evaluation metrics

---

## 🌐 View Online

The surveys are hosted as interactive HTML pages via GitHub Pages:

**🔗 Streaming-Video-Understanding:** `…/streaming-video-understanding/` or `…/streaming-video-understanding.html` on your Pages host (see [DEPLOY.md](./DEPLOY.md)).

**🔗 World Model & VLA (upstream demo):** https://song2yu.github.io/world-model-vla/

**🔗 Long Video Understanding with Memory:** https://song2yu.github.io/world-model-vla/long-video-memory.html

**🔗 生成面试题:** https://song2yu.github.io/world-model-vla/genai_interview.html

**🔗 DS-OCR: visual-context-compression:** https://song2yu.github.io/world-model-vla/visual-context-compression.html

### 部署本站到自有仓库（GitHub Pages）

若要将本站推到 **[ZitongWang018/streaming-video-understanding-web](https://github.com/ZitongWang018/streaming-video-understanding-web)** 并启用 Pages，请按 **[DEPLOY.md](./DEPLOY.md)** 操作（远程 `streaming-web`、Actions 发布）。

静态站点生成后即可访问：`https://zitongwang018.github.io/streaming-video-understanding-web/`（以仓库 Pages 设置为准）。

---

No installation required — just open the link in any browser.

---

## 📁 Repository Structure

```
world-model-vla/
├── index.html                          # Survey hub (WM / VLA + links to Streaming topic)
├── streaming-video-understanding.html    # Full Streaming topic (Awesome-VLM mirror + 中文评析)
├── streaming-video-understanding/index.html  # Same topic via path /streaming-video-understanding/
├── lingbot.html                        # Redirect → /streaming-video-understanding/
├── long-video-memory.html              # Long Video Understanding with Memory Survey (2019–2026)
├── visual-context-compression.html     # Visual context compression (2024–2026)
└── genai_interview.html                # 🆕 生成面试题（Transformer/预训练/RLHF/推理优化/生成模型）


```

The entire survey is a **single self-contained HTML file** — all styles, scripts, and content are bundled together, making it easy to share and view offline.

**Streaming 专题：**若修改 `streaming-video-understanding-source.md`，需在仓库根目录执行 **`node tools/sync-streaming.mjs`** 才会更新 `streaming-video-understanding.html`（详见 [DEPLOY.md](./DEPLOY.md) FAQ）。

---

## 💾 Offline Access

Want to read it offline? Just download the HTML file:

```bash
git clone https://github.com/song2yu/world-model-vla.git
# Then open index.html in your browser
```

Or directly download:
[⬇️ Download index.html](https://raw.githubusercontent.com/song2yu/world-model-vla/main/index.html)

---

## 📬 Citation & Contact

If you find this survey helpful, feel free to ⭐ star the repo and share it!

---

<div align="center">
Made with ❤️ | Hosted on <a href="https://pages.github.com/">GitHub Pages</a>
</div>
