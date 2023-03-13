import chalk from "chalk";
import { glob } from "glob";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// By Lyxcode (https://youtube.com/@lyx)
/**
 * @param {string} file
 * @return {Promise<void>}
 */
export async function deleteCachedFile(file) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) {
        delete require.cache[filePath];
    }
}

// By Lyxcode (https://youtube.com/@lyx)
/**
 * @param {string} directoryName
 * @return {Promise<{
 *  jsFiles: string[];
 *  parentDirs: {
 *      path: string;
 *      parentDir: string | undefined
 *  }
 * }>}
 */
export async function loadFiles(directoryName) {
    try {
        const pattern = path
            .join(process.cwd(), "src/" + directoryName, "/**/*.js")
            .replace(/\\/g, "/");
        const files = await glob(pattern);
        const jsFiles = files.filter((file) => path.extname(file) === ".js");
        await Promise.all(jsFiles.map(deleteCachedFile));

        const parentDirs = [];

        for (const file of jsFiles) {
            const parentDir = path.dirname(file).split(path.sep).pop();
            if (file.includes("/Commands/")) {
                parentDirs.push({ path: file, parentDir: `${parentDir}` });
            } else if (parentDir !== "") {
                parentDirs.push({ path: file, parentDir });
            }
        }

        return { jsFiles, parentDirs };
    } catch (error) {
        console.error(
            chalk.red(`Error while loading files from ${directoryName}.`)
        );
        throw error;
    }
}
