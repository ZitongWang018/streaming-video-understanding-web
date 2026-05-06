/**
 * 一键：README 快照 → HTML 片段 → streaming-video-understanding.html
 * 用法（在项目根目录）：node tools/sync-streaming.mjs
 */
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function run(rel) {
  const script = path.join(ROOT, rel);
  execSync(`node "${script}"`, { stdio: "inherit", cwd: ROOT, shell: true });
}

run("tools/readme-to-streaming-fragment.mjs");
run("tools/build-streaming-page.mjs");
console.log("\n✓ 已更新 streaming-video-understanding.html（用浏览器刷新本地文件即可预览）\n");
