const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");

module.exports = () => {
  const projectRoot = path.join(__dirname, "..");
  const buttonsDir = path.join(projectRoot, "img", "buttons");

  if (!fs.existsSync(buttonsDir)) {
    return [];
  }

  const groupsBySize = new Map();

  fs.readdirSync(buttonsDir)
    .filter((entry) => !entry.startsWith("."))
    .forEach((entry) => {
      const filePath = path.join(buttonsDir, entry);
      const stats = fs.statSync(filePath);
      if (!stats.isFile()) {
        return;
      }

      try {
        const { width, height } = sizeOf(filePath);
        const key = `${width}x${height}`;
        const alt = entry
          .replace(path.extname(entry), "")
          .replace(/[-_]+/g, " ")
          .trim();

        if (!groupsBySize.has(key)) {
          groupsBySize.set(key, {
            width,
            height,
            sizeLabel: key,
            area: width * height,
            items: [],
          });
        }

        groupsBySize.get(key).items.push({
          url: `/img/buttons/${entry}`,
          width,
          height,
          alt: alt || "Button image",
        });
      } catch (error) {
        console.warn(`Skipping button asset ${entry}: ${error.message}`);
      }
    });

  return Array.from(groupsBySize.values())
    .sort((a, b) => {
      if (b.area !== a.area) {
        return b.area - a.area;
      }
      if (b.width !== a.width) {
        return b.width - a.width;
      }
      return a.height - b.height;
    })
    .map((group) => ({
      width: group.width,
      height: group.height,
      sizeLabel: group.sizeLabel,
      items: group.items.sort((a, b) => a.url.localeCompare(b.url)),
    }));
};
