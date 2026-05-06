import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const README = path.join(ROOT, "streaming-video-understanding-source.md");
const OUT = path.join(__dirname, "_streaming_readme_fragment.html");

function slugify(title) {
  return (
    title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u4e00-\u9fff-]/g, "")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInline(s) {
  let out = "";
  let pos = 0;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
    while ((m = re.exec(s)) !== null) {
    out += escapeHtml(s.slice(pos, m.index));
    const href = m[2];
    const inner = escapeHtml(m[1]);
    if (href.startsWith("#")) {
      out += `<a href="${escapeHtml(href)}">${inner}</a>`;
    } else {
      out += `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
    }
    pos = re.lastIndex;
  }
  out += escapeHtml(s.slice(pos));
  return out;
}

function formatCell(raw) {
  let s = raw;
  const imgs = [];
  s = s.replace(/!\[\]\(([^)]+)\)/g, (_, url) => {
    imgs.push(url);
    return `__IMG_${imgs.length - 1}__`;
  });
  const links = [];
  s = s.replace(/\[\[([^\]]+)\]\]\(([^)]+)\)/g, (_, lab, url) => {
    links.push({ lab, url });
    return `__LNK_${links.length - 1}__`;
  });
  s = escapeHtml(s);
  imgs.forEach((url, idx) => {
    const safe = escapeHtml(url);
    s = s.replace(
      `__IMG_${idx}__`,
      `<img class="star-badge" src="${safe}" alt="" loading="lazy" height="20" />`,
    );
  });
  links.forEach(({ lab, url }, idx) => {
    s = s.replace(
      `__LNK_${idx}__`,
      `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(lab)}</a>`,
    );
  });
  return s;
}

function isSep(row) {
  const s = row.replace(/\|/g, "").trim();
  if (!s) return false;
  for (const ch of s) {
    if (ch !== ":" && ch !== "-" && ch !== " ") return false;
  }
  return true;
}

function splitRow(row) {
  let r = row.trim();
  if (r.startsWith("|")) r = r.slice(1);
  if (r.endsWith("|")) r = r.slice(0, -1);
  const cells = [];
  let cur = "";
  for (let i = 0; i < r.length; i++) {
    const ch = r[i];
    if (ch === "|" && r[i - 1] !== "\\") {
      cells.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  cells.push(cur.trim());
  return cells.map((c) => c.replace(/\\\|/g, "|"));
}

function convert(text) {
  const lines = text.split(/\r?\n/);
  const chunks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (
      line.startsWith("|") &&
      i + 1 < lines.length &&
      lines[i + 1].startsWith("|") &&
      isSep(lines[i + 1])
    ) {
      const headers = splitRow(lines[i]);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (isSep(lines[i])) {
          i++;
          continue;
        }
        rows.push(splitRow(lines[i]));
        i++;
      }
      let html =
        '<div class="table-wrap"><table class="mtable readme-table"><thead><tr>';
      for (const h of headers) html += `<th>${formatCell(h)}</th>`;
      html += "</tr></thead><tbody>";
      for (const row of rows) {
        html += "<tr>";
        for (const c of row) html += `<td>${formatCell(c)}</td>`;
        html += "</tr>";
      }
      html += "</tbody></table></div>";
      chunks.push(html);
      continue;
    }

    if (line.startsWith("# ") && !line.startsWith("##")) {
      const title = line.slice(2).trim();
      chunks.push(`<h1 class="readme-h1" id="${slugify(title)}">${escapeHtml(title)}</h1>`);
    } else if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      chunks.push(`<h2 class="readme-h2" id="${slugify(title)}">${escapeHtml(title)}</h2>`);
    } else if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      chunks.push(`<h3 class="readme-h3" id="${slugify(title)}">${escapeHtml(title)}</h3>`);
    } else if (/^\s*-\s+/.test(line)) {
      const content = line.replace(/^\s*-\s+/, "").trim();
      chunks.push(`<li>${formatInline(content)}</li>`);
    } else if (line.trim() === "") {
      /* skip */
    } else {
      chunks.push(`<p>${formatInline(line)}</p>`);
    }
    i++;
  }

  const merged = [];
  let ul = [];
  for (const c of chunks) {
    if (c.startsWith("<li>")) ul.push(c);
    else {
      if (ul.length) {
        merged.push(`<ul class="readme-ul">${ul.join("")}</ul>`);
        ul = [];
      }
      merged.push(c);
    }
  }
  if (ul.length) merged.push(`<ul class="readme-ul">${ul.join("")}</ul>`);
  return merged.join("\n");
}

const body = convert(fs.readFileSync(README, "utf8"));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, body, "utf8");
console.log("Wrote", OUT, body.length);
