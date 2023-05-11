const fs = require("fs").promises;
const path = require("path");

async function scanDirectory(dir, results = []) {
  try {
    const files = await fs.readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        const innerFiles = await fs.readdir(filePath);

        for (const innerFile of innerFiles) {
          if (path.extname(innerFile) === ".json") {
            const jsonFilePath = path.join(filePath, innerFile);
            const fileContent = await fs.readFile(jsonFilePath, "utf-8");
            const jsonData = JSON.parse(fileContent);

            results.push({ uuid: file, ...jsonData });
          }
        }
      } else {
        await scanDirectory(filePath, results);
      }
    }
  } catch (error) {
    console.error(`Error while scanning directory: ${error}`);
  }

  return results;
}

async function writeResultsToFile(results, outputFile) {
  try {
    const jsonString = JSON.stringify(results, null, 2);
    await fs.writeFile(outputFile, jsonString, "utf-8");
    console.log(`Results saved to ${outputFile}`);
  } catch (error) {
    console.error(`Error writing results to file: ${error}`);
  }
}

(async () => {
  const args = process.argv.slice(2);
  const fpath = args[0];
  const dname = path.basename(fpath);
  const results = await scanDirectory(fpath);
  console.log("Results:", results);
  await writeResultsToFile(results, `${fpath}scans.json`);
})();
