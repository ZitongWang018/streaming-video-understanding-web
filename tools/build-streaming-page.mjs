import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
let frag = fs.readFileSync(path.join(__dirname, "_streaming_readme_fragment.html"), "utf8");
frag = frag.replace(/^<h1 class="readme-h1"[^>]*>[\s\S]*?<\/h1>\s*\n?/, "");

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
    <strong>维护说明：</strong>正文表格与链接同步自上游仓库
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
  <title>Streaming-Video-Understanding · VLM 流视频综述镜像</title>
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
    header .subtitle {
      color: var(--muted);
      font-size: 0.95rem;
      max-width: 720px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
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
        <span>📚</span><span>上游仓库 Awesome-VLM-Streaming-Video</span>
      </a>
      <span class="org-badge"><span>🎬</span><span>Streaming · Proactive · KV · Benchmarks</span></span>
      <span class="org-badge"><span>📅</span><span>同步快照 2026-05</span></span>
    </div>
    <h1>Streaming-Video-Understanding</h1>
    <p class="subtitle">
      面向连续视频流的 VLM / MLLM：主动交互、长程记忆、实时推理与评测资源汇编。
      下方正文为上游 README 的结构化镜像（表格内链接与 shields 均指向原始论文与代码）。
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
    <a class="tab" href="#analysis">综合评析</a>
  </nav>

  <div class="container">
    <div class="insight-box" style="margin-bottom:28px">
      <strong>使用说明：</strong>右下角「阅读设置」可调整整页字号与表格密度，偏好保存在本机 localStorage（键名 <code>svu_prefs_v1</code>）。
      Star 徽章图片来自 GitHub shields，需联网显示。
    </div>

    <article class="readme-bundle" id="upstream-readme" aria-label="Awesome list mirror">
${frag}
    </article>

${analysisZh}
  </div>

  <footer>
    数据来源：
    <a href="https://github.com/ydyhello/Awesome-VLM-Streaming-Video" target="_blank" rel="noopener noreferrer">https://github.com/ydyhello/Awesome-VLM-Streaming-Video</a>
    &nbsp;|&nbsp; 本地快照：<code>streaming-video-understanding-source.md</code>
    &nbsp;|&nbsp;
    <a href="index.html">← World Model &amp; VLA 总览</a>
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
