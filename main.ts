import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The image lives next to this program.
const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function detectFormat(bytes: Buffer): string {
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "PNG";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "JPEG";
  }
  return "unknown";
}

const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.png");

// The output path must stay inside the output directory.
const resolvedOutput = resolve(outputPath);
if (resolvedOutput !== outputDir && !resolvedOutput.startsWith(outputDir + "/")) {
  throw new Error(`output path escapes the output directory: ${resolvedOutput}`);
}

const sourceBytes = readFileSync(sourcePath);
copyFileSync(sourcePath, resolvedOutput);

console.log(`source: ${resolve(sourcePath)}`);
console.log(`output: ${resolvedOutput}`);
console.log(
  `source: ${sourceBytes.length} bytes, format ${detectFormat(sourceBytes)}, sha256 ${sha256(sourceBytes)}`,
);

// Read the output back and fail unless it is byte-identical to the source.
const outputBytes = readFileSync(resolvedOutput);
console.log(
  `output: ${outputBytes.length} bytes, format ${detectFormat(outputBytes)}, sha256 ${sha256(outputBytes)}`,
);
if (!outputBytes.equals(sourceBytes)) {
  throw new Error("output bytes differ from source bytes");
}
console.log("verified: output is byte-identical to source");
