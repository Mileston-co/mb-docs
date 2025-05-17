const fs = require("fs-extra");
const path = require("path");
const translate = require("@vitalets/google-translate-api");

const locales = ["fr", "de", "ru"];
const translationsDir = path.join(__dirname, "../i18n");
const defaultLocale = "en";

async function translateFile(filePath, targetLocale) {
  const content = await fs.readJson(filePath);
  const translatedContent = {};

  for (const [key, value] of Object.entries(content)) {
    try {
      const result = await translate(value, { to: targetLocale });
      translatedContent[key] = result.text;
    } catch (error) {
      console.error(
        `Error translating key '${key}' to ${targetLocale}:`,
        error
      );
      translatedContent[key] = value; // Fallback to original text
    }
  }

  return translatedContent;
}

async function translateAll() {
  for (const locale of locales) {
    const localeDir = path.join(translationsDir, locale);
    const defaultDir = path.join(translationsDir, defaultLocale);

    if (!fs.existsSync(localeDir)) {
      await fs.mkdirp(localeDir);
    }

    const files = await fs.readdir(defaultDir);

    for (const file of files) {
      const filePath = path.join(defaultDir, file);
      const targetPath = path.join(localeDir, file);

      // Skip directories
      if ((await fs.stat(filePath)).isDirectory()) {
        console.log(`Skipping directory ${filePath}`);
        continue;
      }

      console.log(`Translating ${file} to ${locale}...`);
      const translatedContent = await translateFile(filePath, locale);
      await fs.writeJson(targetPath, translatedContent, { spaces: 2 });
    }
  }

  console.log("Translation completed!");
}

translateAll().catch((error) => {
  console.error("Error during translation:", error);
});
