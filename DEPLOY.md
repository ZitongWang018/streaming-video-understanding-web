# 部署到 GitHub Pages（streaming-video-understanding-web）

本仓库为**静态 HTML**，使用 GitHub Actions 发布到 GitHub Pages。

## 一、首次推送到你的仓库

在本地项目目录执行（已将远程取名为 `streaming-web`，不影响原有 `origin`）：

```bash
git remote add streaming-web https://github.com/ZitongWang018/streaming-video-understanding-web.git
git push -u streaming-web main
```

若已添加过同名远程，可先：`git remote remove streaming-web` 再重新 `add`。

**HTTPS 推送权限：** GitHub 已不支持账号密码，请使用 **Personal Access Token (classic)**（勾选 `repo`）代替密码，或改用 SSH：`git@github.com:ZitongWang018/streaming-video-understanding-web.git`。

## 二、在 GitHub 上启用 Pages（仅需一次）

1. 打开仓库：<https://github.com/ZitongWang018/streaming-video-understanding-web>
2. **Settings** → **Pages**
3. **Build and deployment** → **Source** 选择 **GitHub Actions**（不要选 “Deploy from a branch”，除非你改用分支静态托管）。
4. 保存后，向 `main` 推送会触发 `.github/workflows/deploy-pages.yml`。

首次需在 **Actions** 标签页等待 workflow 绿灯；成功后站点一般为：

**<https://zitongwang018.github.io/streaming-video-understanding-web/>**

（首页为仓库根目录的 `index.html`；Streaming 专题直达：`streaming-video-understanding.html`。）

## 三、可选：自定义域名

在 **Pages** 里填写域名并按要求添加 DNS；仓库根目录可放置 `CNAME` 文件（内容由域名提供商说明为准）。

## 四、上游与镜像说明

Streaming 专题正文快照来源：<https://github.com/ydyhello/Awesome-VLM-Streaming-Video>

本地更新 `streaming-video-understanding-source.md` 后重新生成页面：

```bash
node tools/readme-to-streaming-fragment.mjs
node tools/build-streaming-page.mjs
```
