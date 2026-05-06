import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
let frag = fs.readFileSync(path.join(__dirname, "_streaming_readme_fragment.html"), "utf8");
frag = frag.replace(/^<h1 class="readme-h1"[^>]*>[\s\S]*?<\/h1>\s*\n?/, "");

const trendsZh = fs.readFileSync(path.join(__dirname, "_streaming_trends_zh.html"), "utf8");

const analysisZh = `
<section class="paper-section" id="analysis">
  <div class="ps-header" style="border-color:#f59e0b">
    <div class="ps-icon" style="background:rgba(245,158,11,0.15)">🔍</div>
    <div class="ps-title-block">
      <h2>综合评析：Streaming Video Understanding 的技术拼图</h2>
      <div class="ps-en">Taxonomy · Trade-offs · Evaluation Landscape（中文导读，可与上方英文表格对照）</div>
    </div>
  </div>

  <div class="insight-box">
    <strong>问题定义：</strong>与离线「整段看完再问答」不同，Streaming Video Understanding 要求在<strong>连续到达的视觉流</strong>上完成感知、记忆与语言生成；系统的瓶颈通常集中在「何时更新表征」「何时触发回答」「KV / Token 预算如何在时间上分配」三件事。
  </div>

  <div class="compare-section" style="margin-bottom:28px">
    <h3>🧩 四条主干轴线（对应 upstream README 分区）</h3>
    <div class="compare-grid">
      <div class="cg-item">
        <div class="cg-name" style="color:#c4b5fd">💬 Proactive Interaction</div>
        <div class="cg-role">何时说话：辅助头 / 生成式触发 / RL / 免训练信号 / 混合框架 / 学习式时机</div>
        <div class="cg-arrow">→ 直接影响 TTFT、打断率与用户体验</div>
      </div>
      <div class="cg-item">
        <div class="cg-name" style="color:#67e8f9">🧠 Memory</div>
        <div class="cg-role">层级记忆、滑窗驱逐、Token 剪枝、KV 压缩与检索、语义摘要、事件记忆、空间记忆、快权重</div>
        <div class="cg-arrow">→ 长流场景的可扩展性与遗忘曲线</div>
      </div>
      <div class="cg-item">
        <div class="cg-name" style="color:#6ee7b7">⚡ Real-time Inference</div>
        <div class="cg-role">编解码并行、选择性调用大模型、视觉 Token 削减、KV 优化（含编解码侧协同）</div>
        <div class="cg-arrow">→ 延迟、功耗与部署可行性</div>
      </div>
      <div class="cg-item">
        <div class="cg-name" style="color:#fed7aa">💭 Thinking</div>
        <div class="cg-role">边看边想：流式 CoT、分段记忆、因果掩码与训练配方</div>
        <div class="cg-arrow">→ 复杂推理 vs. 额外延迟成本</div>
      </div>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-block">
      <h4>🔗 表格中的 Paper / Code 列</h4>
      <ul>
        <li><strong>pdf / docs：</strong>链向 arXiv、OpenReview、厂商 Model Card（如 Seed）、以及仓库内 PDF 路径，与上游「Paper」列一致。</li>
        <li><strong>GitHub：</strong>开源实现或官方代码仓；旁侧 shields 图为实时 star 数（需联网）。</li>
        <li><strong>「-」：</strong>表示上游未列出公开代码或暂无单独仓库链接。</li>
      </ul>
    </div>
    <div class="info-block">
      <h4>📊 Benchmarks / Datasets 阅读提示</h4>
      <ul>
        <li><strong>交互维度：</strong>OVBench、OVO-Bench、StreamingBench、SVBench、StreamingEval 等覆盖「回溯 / 实时理解 / 前瞻响应」不同切片。</li>
        <li><strong>场景维度：</strong>PhoStream（移动端）、StreamEQA（具身）、HomeSafe-Bench（家庭风险）、Artic / DeViBench（实时通信退化）等强调部署语境。</li>
        <li><strong>任务耦合：</strong>同一模型常同时出现在 Benchmarks 与 Training Datasets 分区，建议「论文链路 → 数据构造 → 评测协议」对照阅读。</li>
      </ul>
    </div>
    <div class="info-block">
      <h4>⚙️ 工程折叠 vs. 算法创新的分界</h4>
      <ul>
        <li><strong>KV-Cache 系列：</strong>从「压缩 / 检索 / 层级卸载」到「与触发策略联合设计」，往往是延迟与显存的第一杠杆。</li>
        <li><strong>Token 侧：</strong>语义载体、差分丢弃、与视频编码（如码流运动矢量）结合，属于「减少无效计算」路线。</li>
        <li><strong>触发侧：</strong>免训练启发式与学习式策略可混合；混合框架（提案–匹配–余弦突变）代表系统化趋势。</li>
      </ul>
    </div>
  </div>

  <div class="insight-box" style="border-left-color:var(--accent2);background:rgba(34,211,238,0.06)">
    <strong>维护说明：</strong>正文与上游 <code>README.md</code> 对齐；权威修改请提交至
    <a href="https://github.com/ydyhello/Awesome-VLM-Streaming-Video" target="_blank" rel="noopener noreferrer">ydyhello/Awesome-VLM-Streaming-Video</a>；
    本地源码快照见 <code>streaming-video-understanding-source.md</code>，可用 <code>node tools/readme-to-streaming-fragment.mjs</code> 重新生成 HTML 片段。
  </div>
</section>
`;

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Awesome-VLM-Streaming-Video：开源 README.md 的结构化网页镜像，收录流媒体场景 VLM/MLLM 论文 pdf/docs、GitHub 与评测表格；文末附中文趋势时间线、2026 焦点对比、OpenReview 会议核验表与综合评析（本站）。" />
  <title>Awesome-VLM-Streaming-Video · README 网页镜像（Streaming-Video-Understanding）</title>
  <style>
    :root {
      --bg: #0f1117;
      --surface: #1a1d27;
      --surface2: #23273a;
      --border: #2e3350;
      --accent: #6366f1;
      --accent2: #22d3ee;
      --accent3: #f59e0b;
      --text: #e2e8f0;
      --muted: #94a3b8;
      --font-scale: 1;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: calc(16px * var(--font-scale)); }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.65;
    }
    header {
      background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #0c1a2e 100%);
      border-bottom: 1px solid var(--border);
      padding: 48px 28px 36px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    header::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .logo-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 18px;
      position: relative;
      z-index: 1;
    }
    .org-badge {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 6px 16px;
      font-size: 0.82rem;
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    header h1 {
      font-size: 2rem;
      font-weight: 900;
      background: linear-gradient(90deg, #a78bfa, #22d3ee, #f59e0b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
      letter-spacing: -0.02em;
      position: relative;
      z-index: 1;
    }
    header .subtitle-en {
      color: var(--text);
      font-size: 0.95rem;
      max-width: 800px;
      margin: 0 auto 14px;
      position: relative;
      z-index: 1;
      line-height: 1.55;
    }
    header .subtitle {
      color: var(--muted);
      font-size: 0.88rem;
      max-width: 820px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
      line-height: 1.65;
    }
    .mirror-banner {
      background: linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(8,145,178,0.08) 100%);
      border: 1px solid rgba(99,102,241,0.35);
      border-left: 4px solid var(--accent);
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 22px;
      font-size: 0.86rem;
      color: var(--text);
      line-height: 1.65;
    }
    .mirror-banner h2.mirror-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--accent2);
      margin-bottom: 12px;
      letter-spacing: 0.02em;
    }
    .mirror-banner ul {
      margin: 10px 0 14px 1.15rem;
      color: var(--muted);
    }
    .mirror-banner ul li { margin-bottom: 6px; }
    .mirror-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 18px;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--border);
      font-size: 0.82rem;
    }
    .mirror-links a {
      color: var(--accent2);
      text-decoration: none;
      border: 1px solid rgba(34,211,238,0.35);
      border-radius: 10px;
      padding: 4px 12px;
    }
    .mirror-links a:hover { background: rgba(34,211,238,0.08); }
    nav {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 0;
      flex-wrap: wrap;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-back {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.82rem;
      padding: 12px 14px 12px 0;
      border-right: 1px solid var(--border);
      margin-right: 10px;
      white-space: nowrap;
    }
    .nav-back:hover { color: var(--text); }
    nav a.tab {
      color: var(--muted);
      text-decoration: none;
      font-size: 0.82rem;
      padding: 12px 10px;
      white-space: nowrap;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    nav a.tab:hover { color: var(--text); border-color: var(--accent); }
    .container { max-width: 1180px; margin: 0 auto; padding: 36px 22px 48px; }
    .readme-bundle {
      background: transparent;
    }
    .readme-h2 {
      font-size: 1.35rem;
      font-weight: 800;
      margin: 2.2rem 0 1rem;
      scroll-margin-top: 72px;
      color: var(--text);
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }
    .readme-h3 {
      font-size: 1.08rem;
      font-weight: 700;
      margin: 1.4rem 0 0.75rem;
      scroll-margin-top: 68px;
      color: var(--accent2);
    }
    .readme-bundle p {
      color: var(--muted);
      font-size: 0.92rem;
      margin-bottom: 12px;
    }
    .readme-ul {
      margin: 10px 0 18px 1.2rem;
      color: var(--muted);
      font-size: 0.88rem;
    }
    .readme-ul li { margin-bottom: 6px; }
    .readme-ul a { color: var(--accent2); }
    .table-wrap {
      overflow-x: auto;
      margin-bottom: 20px;
      border-radius: 10px;
      border: 1px solid var(--border);
    }
    .mtable {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.78rem;
      margin: 0;
    }
    .mtable th {
      background: var(--surface2);
      color: var(--muted);
      font-weight: 600;
      padding: 8px 10px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }
    .mtable td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
      color: var(--text);
    }
    .mtable tr:hover td { background: rgba(35,39,58,0.45); }
    .mtable a { color: var(--accent2); }
    .star-badge { vertical-align: middle; margin-left: 4px; max-height: 20px; }
    body.compact-tables .readme-table { font-size: 0.68rem; }
    body.compact-tables .mtable th,
    body.compact-tables .mtable td { padding: 5px 6px; }

    .paper-section { margin-top: 48px; scroll-margin-top: 60px; }
    .ps-header {
      display: flex;
      align-items: flex-start;
      gap: 18px;
      margin-bottom: 22px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f59e0b;
    }
    .ps-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.45rem;
      flex-shrink: 0;
    }
    .ps-title-block h2 { font-size: 1.35rem; font-weight: 800; margin-bottom: 4px; }
    .ps-title-block .ps-en { font-size: 0.8rem; color: var(--muted); margin-bottom: 6px; }

    .insight-box {
      background: rgba(99,102,241,0.08);
      border: 1px solid rgba(99,102,241,0.28);
      border-left: 3px solid var(--accent);
      border-radius: 8px;
      padding: 16px 18px;
      margin-bottom: 18px;
      font-size: 0.88rem;
      color: var(--text);
      line-height: 1.65;
    }
    .insight-box strong { color: var(--accent2); }
    .compare-section {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 22px;
      margin-bottom: 22px;
    }
    .compare-section h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--text);
    }
    .compare-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
    }
    .cg-item {
      text-align: center;
      padding: 14px;
      background: var(--bg);
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .cg-item .cg-name { font-size: 0.85rem; font-weight: 700; margin-bottom: 8px; }
    .cg-item .cg-role { font-size: 0.76rem; color: var(--muted); margin-bottom: 10px; line-height: 1.5; }
    .cg-item .cg-arrow { color: var(--accent3); font-size: 0.78rem; }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }
    @media (max-width: 720px) {
      .info-grid { grid-template-columns: 1fr; }
    }
    .info-block {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px;
    }
    .info-block h4 {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 10px;
    }
    .info-block ul { list-style: none; }
    .info-block ul li {
      font-size: 0.84rem;
      color: var(--text);
      padding: 5px 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .info-block ul li:last-child { border: none; }
    .info-block ul li::before { content: '▸'; color: var(--accent3); flex-shrink: 0; margin-top: 1px; }

    footer {
      background: var(--surface);
      border-top: 1px solid var(--border);
      padding: 22px 28px;
      text-align: center;
      color: var(--muted);
      font-size: 0.78rem;
    }
    footer a { color: var(--accent); text-decoration: none; }

    .read-settings {
      position: fixed;
      bottom: 18px;
      right: 18px;
      z-index: 240;
      font-size: 0.78rem;
    }
    .read-settings-panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.45);
      padding: 12px 14px;
      min-width: 200px;
    }
    .read-settings-panel label { display: block; margin-bottom: 10px; color: var(--muted); }
    .read-settings-panel input[type="range"] { width: 100%; }
    .read-settings-toggle {
      width: 100%;
      padding: 8px 12px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface2);
      color: var(--text);
      cursor: pointer;
      margin-bottom: 8px;
      font-size: 0.78rem;
    }
    .read-settings-toggle:hover { border-color: var(--accent); }
    .read-settings-body { display: none; }
    .read-settings.open .read-settings-body { display: block; }

    .trends-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 8px;
    }
    @media (max-width: 960px) {
      .trends-grid { grid-template-columns: 1fr; }
    }
    .timeline-wrap {
      position: relative;
      padding-left: 22px;
      border-left: 2px solid var(--border);
      margin: 12px 0 8px;
    }
    .tl-node {
      position: relative;
      padding-bottom: 20px;
    }
    .tl-node:last-child { padding-bottom: 4px; }
    .tl-node::before {
      content: "";
      position: absolute;
      left: -27px;
      top: 6px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--bg);
    }
    .tl-date {
      font-size: 0.82rem;
      color: var(--accent2);
      font-weight: 600;
      margin-bottom: 6px;
    }
    .venue-pill {
      display: inline-block;
      font-size: 0.68rem;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(99, 102, 241, 0.22);
      color: #c7d2fe;
      white-space: nowrap;
    }
    .venue-pill.arxiv {
      background: rgba(148, 163, 184, 0.14);
      color: #cbd5e1;
    }
    .paper-mini-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.82rem;
      margin: 14px 0;
    }
    .paper-mini-table th,
    .paper-mini-table td {
      border: 1px solid var(--border);
      padding: 9px 11px;
      text-align: left;
      vertical-align: top;
    }
    .paper-mini-table th {
      background: var(--surface2);
      color: var(--muted);
      font-weight: 600;
    }
    .paper-mini-table a { color: var(--accent2); word-break: break-word; }

    @media (max-width: 640px) {
      header h1 { font-size: 1.45rem; }
      nav a.tab { padding: 10px 8px; font-size: 0.75rem; }
    }
  </style>
</head>
<body>
  <header>
    <div class="logo-row">
      <a class="org-badge" href="https://github.com/ydyhello/Awesome-VLM-Streaming-Video" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit">
        <span>📚</span><span>ydyhello/Awesome-VLM-Streaming-Video</span>
      </a>
      <span class="org-badge"><span>🌐</span><span>README.md → 网页镜像</span></span>
      <span class="org-badge"><span>📅</span><span>清单同步 branch：main（定期与上游对齐）</span></span>
    </div>
    <h1>Awesome-VLM-Streaming-Video 🎬</h1>
    <p class="subtitle-en">📚 A curated collection of papers and open-source code repositories dedicated to the application of Vision-Language Models (VLMs) for streaming video.</p>
    <p class="subtitle">
      <strong>Streaming-Video-Understanding</strong>：当前页面即上述仓库根目录 <code>README.md</code> 的<strong>结构化网页版</strong>
      —— 章节划分、表格行顺序、以及 Paper 列中的 <strong>pdf</strong> / <strong>docs</strong> / <strong>OpenReview</strong> / <strong>厂商 Model Card</strong>、Code 列中的 <strong>GitHub</strong> 与 star shields，均与上游 Markdown 同源（点击即跳转原文链接）。
      文末附有本站撰写的<strong>中文栏目</strong>：<strong>趋势与时间线</strong>（<code>#trends</code>）、<strong>2026 焦点</strong>（<code>#y2026</code>）、<strong>会议标注</strong>（<code>#venues</code>）、以及<strong>综合评析</strong>（<code>#analysis</code>）；不参与上游仓库版本控制。
    </p>
  </header>

  <nav>
    <a class="nav-back" href="index.html">← 返回总览</a>
    <a class="tab" href="#introduction">导读</a>
    <a class="tab" href="#contents">目录</a>
    <a class="tab" href="#project">Project</a>
    <a class="tab" href="#proactive-interaction">主动交互</a>
    <a class="tab" href="#long-term-memory-management">记忆</a>
    <a class="tab" href="#real-time-inference">实时推理</a>
    <a class="tab" href="#streaming-with-thinking">Thinking</a>
    <a class="tab" href="#benchmarks">Benchmarks</a>
    <a class="tab" href="#trends">趋势时间线</a>
    <a class="tab" href="#y2026">2026焦点</a>
    <a class="tab" href="#venues">会议标注</a>
    <a class="tab" href="#analysis">综合评析</a>
  </nav>

  <div class="container">
    <section class="mirror-banner" aria-labelledby="mirror-heading">
      <h2 class="mirror-title" id="mirror-heading">镜像说明 · 与上游 README 的对应关系</h2>
      <p style="color:var(--muted);margin-bottom:10px">
        可将本页视为 GitHub 上 Awesome List 的<strong>只读浏览器视图</strong>：便于检索、横向滚动宽表与章节内跳转。更新上游清单时，维护者只需替换仓库中的 <code>streaming-video-understanding-source.md</code>（由 <code>README.md</code> 拷贝而来）并重新运行生成脚本。
      </p>
      <ul>
        <li><strong>完全一致：</strong>Introduction、Contents（目录锚点已校正）、各分区标题、全部表格单元格文案与 URL。</li>
        <li><strong>Paper 列：</strong><code>pdf</code> 多为 arXiv / OpenReview PDF；亦可能指向 ByteDance Model Card、GitHub 内 PDF 路径等 —— 与上游仓库表格一致。</li>
        <li><strong>Code 列：</strong><code>GitHub</code> 链至代码仓库；右侧小图标为 shields.io 实时 star 数（需联网加载）。</li>
        <li><strong>尾部招聘段落</strong>（We're Hiring）亦随 README 一并镜像。</li>
        <li><strong>本站扩展：</strong>文末中文「趋势时间线 / 2026 焦点 / 会议标注」由 <code>tools/_streaming_trends_zh.html</code> 注入生成；上游 README 不含此文稿。</li>
      </ul>
      <div class="mirror-links">
        <a href="https://github.com/ydyhello/Awesome-VLM-Streaming-Video" target="_blank" rel="noopener noreferrer">⌂ 上游仓库主页</a>
        <a href="https://github.com/ydyhello/Awesome-VLM-Streaming-Video/blob/main/README.md" target="_blank" rel="noopener noreferrer">📄 README.md（GitHub）</a>
        <a href="https://raw.githubusercontent.com/ydyhello/Awesome-VLM-Streaming-Video/main/README.md" target="_blank" rel="noopener noreferrer">⬇ README.md（Raw）</a>
      </div>
    </section>

    <div class="insight-box" style="margin-bottom:28px">
      <strong>阅读辅助：</strong>右下角「阅读设置」可调字号与紧凑表格；偏好存于本机 <code>localStorage</code>（<code>svu_prefs_v1</code>）。Star 徽章依赖 GitHub shields，离线环境可能不显示。
    </div>

    <article class="readme-bundle" id="upstream-readme" aria-label="Awesome-VLM-Streaming-Video README mirror">
${frag}
    </article>

${trendsZh}
${analysisZh}
  </div>

  <footer>
    <div style="margin-bottom:10px;line-height:1.55">
      <strong>内容来源：</strong>
      <a href="https://github.com/ydyhello/Awesome-VLM-Streaming-Video" target="_blank" rel="noopener noreferrer">ydyhello/Awesome-VLM-Streaming-Video</a>
      （<code>README.md</code>）· 本地生成用快照 <code>streaming-video-understanding-source.md</code>
    </div>
    <div style="margin-bottom:10px;color:var(--muted);font-size:0.74rem;line-height:1.5">
      论文与代码链接版权归原作者及上游维护者；本站仅提供排版与中文导读，不代表上游立场。发现清单滞后或链接失效请优先向
      <a href="https://github.com/ydyhello/Awesome-VLM-Streaming-Video/issues" target="_blank" rel="noopener noreferrer">上游 Issues</a>
      反馈。
    </div>
    <a href="index.html">← World Model &amp; VLA 综述站首页</a>
  </footer>

  <div class="read-settings" id="read-settings">
    <button type="button" class="read-settings-toggle" id="rs-toggle" aria-expanded="false">阅读设置</button>
    <div class="read-settings-panel read-settings-body" id="rs-body">
      <label>字号缩放 <span id="rs-font-lbl">100%</span>
        <input type="range" id="rs-font" min="85" max="125" value="100" />
      </label>
      <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
        <input type="checkbox" id="rs-compact" /> 紧凑表格（更小字号与行距）
      </label>
    </div>
  </div>

  <script>
(function () {
  var KEY = 'svu_prefs_v1';
  var root = document.documentElement;
  var wrap = document.getElementById('read-settings');
  var btn = document.getElementById('rs-toggle');
  var body = document.getElementById('rs-body');
  var font = document.getElementById('rs-font');
  var fontLbl = document.getElementById('rs-font-lbl');
  var compact = document.getElementById('rs-compact');

  function load() {
    try {
      var j = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (j.font != null) { font.value = String(j.font); applyFont(j.font); }
      if (j.compact) { compact.checked = true; document.body.classList.add('compact-tables'); }
      if (j.panelOpen) { wrap.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    } catch (e) {}
  }
  function save() {
    localStorage.setItem(KEY, JSON.stringify({
      font: Number(font.value),
      compact: compact.checked,
      panelOpen: wrap.classList.contains('open')
    }));
  }
  function applyFont(v) {
    var s = Number(v) / 100;
    root.style.setProperty('--font-scale', String(s));
    fontLbl.textContent = v + '%';
  }
  btn.addEventListener('click', function () {
    wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', wrap.classList.contains('open'));
    save();
  });
  font.addEventListener('input', function () { applyFont(font.value); save(); });
  compact.addEventListener('change', function () {
    document.body.classList.toggle('compact-tables', compact.checked);
    save();
  });
  load();
})();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "streaming-video-understanding.html"), html, "utf8");
console.log("Wrote streaming-video-understanding.html");
