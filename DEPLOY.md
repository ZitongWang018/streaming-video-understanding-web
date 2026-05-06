# 部署到 GitHub Pages（streaming-video-understanding-web）

本仓库为**静态 HTML**，使用 GitHub Actions 发布到 GitHub Pages。

## 〇、必读（顺序错了 Actions 会失败）

**必须先启用 Pages，再指望 workflow 跑绿。** 若顺序反了，Actions 里会出现：

`Get Pages site failed` / `Not Found`（指向 GitHub REST「Get a GitHub Pages site」）。

正确顺序：

1. **先做下面「二、在 GitHub 上启用 Pages」全部步骤并保存。**
2. 再推送代码，或在 **Actions** 里对失败的工作流点 **Re-run all jobs**。

> 说明：`actions/configure-pages` 的 `enablement` 参数需要 **PAT 等非 `GITHUB_TOKEN`**，本仓库 workflow 使用默认 `GITHUB_TOKEN`，因此无法在脚本里替你「从零开通」Pages，必须在网页里点一次。

## 一、首次推送到你的仓库

在本地项目目录执行（已将远程取名为 `streaming-web`，不影响原有 `origin`）：

```bash
git remote add streaming-web https://github.com/ZitongWang018/streaming-video-understanding-web.git
git push -u streaming-web main
```

若已添加过同名远程，可先：`git remote remove streaming-web` 再重新 `add`。

**HTTPS 推送权限：** GitHub 已不支持账号密码，请使用 **Personal Access Token (classic)**（勾选 `repo`）代替密码，或改用 SSH：`git@github.com:ZitongWang018/streaming-video-understanding-web.git`。

## 二、在 GitHub 上启用 Pages（仅需一次，且须在 workflow 首次成功前完成）

1. 打开仓库：<https://github.com/ZitongWang018/streaming-video-understanding-web>
2. **Settings** → **Pages**
3. **Build and deployment** → **Source** 选择 **GitHub Actions**（不要选 “Deploy from a branch”，除非你改用分支静态托管）。
4. 若有 **Visibility** / 访问权限选项，按仓库类型设为 Public 或按文档允许 Pages。
5. 保存后，到 **Actions** 打开失败的 **Deploy site to GitHub Pages**，点击 **Re-run all jobs**（或再推送一次 `main`）。

首次需在 **Actions** 标签页等待 workflow 绿灯；成功后站点一般为：

**<https://zitongwang018.github.io/streaming-video-understanding-web/>**

（首页为仓库根目录的 `index.html`；Streaming 专题：<code>/streaming-video-understanding/</code>（跳转至完整页）或根目录 <code>streaming-video-understanding.html</code>。）

## 三、可选：自定义域名

在 **Pages** 里填写域名并按要求添加 DNS；仓库根目录可放置 `CNAME` 文件（内容由域名提供商说明为准）。

## 四、上游与镜像说明

Streaming 专题正文快照来源：<https://github.com/ydyhello/Awesome-VLM-Streaming-Video>

### 覆盖上游 README 全文（含 pdf / docs / GitHub 链接）

1. 用浏览器打开 upstream Raw：`https://raw.githubusercontent.com/ydyhello/Awesome-VLM-Streaming-Video/main/README.md`，全文复制替换本地的 `streaming-video-understanding-source.md`。
2. **务必替换其中的「📖 Contents」整块**为本仓库当前版本（锚点与 HTML 标题 id 一致，否则页内目录跳转失效）。除此之外应保持与 upstream README **字节级一致**（不在该 md 内手写本站说明）。
3. 在项目根目录执行（二选一）：

```bash
node tools/sync-streaming.mjs
```

或分步：

```bash
node tools/readme-to-streaming-fragment.mjs
node tools/build-streaming-page.mjs
```

4. 提交并推送后，GitHub Actions 会更新 Pages。

## FAQ：为什么我改了内容，网页却没有变？

专题页的 **`streaming-video-understanding.html` 是「编译产物」**：浏览器并不会去读旁边的 `.md` 再排版，而是展示已经嵌进 HTML 里的表格与段落。

因此：

- 只改了 **`streaming-video-understanding-source.md`** → 必须再跑一次 **`node tools/sync-streaming.mjs`**，然后用浏览器 **强刷**（如 Ctrl+F5）打开的 `streaming-video-understanding.html`。
- 只改了 **`streaming-video-understanding.html`** → 保存后刷新就能看到；但若之后又运行上面的生成脚本，**手工改动会被覆盖**（除非你改成改脚本模板 `tools/build-streaming-page.mjs`）。
- 在线 GitHub Pages 的更新 → 需要 **push 到 GitHub**，等 Actions 部署完成后再刷新线上地址。

若需要「保存 Markdown 就立刻在浏览器里变」的体验，要改成运行时渲染 Markdown（例如前端加载 `.md`），和现在「静态整页、利于 Pages / SEO」的架构不同。
