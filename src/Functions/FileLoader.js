import chalk from "chalk";
import { glob } from "glob";
import path from "node:path";

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
 * @param {boolean | undefined} [srcFolder]
 * @return {Promise<string[]>}
 */
export async function loadFiles(directoryName, srcFolder = true) {
    try {
        const files = await glob(
            path
                .join(
                    process.cwd(),
                    srcFolder ? "/src/" : "/",
                    directoryName,
                    "/**/*.js"
                )
                .replace(/\\/g, "/")
        );
        const jsFiles = files.filter((file) => path.extname(file) === "js");
        await Promise.all(jsFiles.map(deleteCachedFile));
        return jsFiles;
    } catch (error) {
        console.error(
            chalk.red(`Error while loading files from ${directoryName}.`)
        );
        throw error;
    }
}
