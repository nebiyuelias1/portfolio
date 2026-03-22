const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const POSTS_DIR = path.join(__dirname, "..", "blog", "posts");
const OUTPUT_FILE = path.join(__dirname, "..", "blog", "posts.json");

function buildBlogManifest() {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  const posts = files.map((file) => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    const slug = file.replace(/\.md$/, "");

    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : null,
      description: data.description || "",
      tags: data.tags || [],
      translations: data.translations || {},
    };
  });

  // Sort by date descending (newest first)
  posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
  console.log(`Built blog manifest: ${posts.length} post(s) -> blog/posts.json`);
}

buildBlogManifest();
