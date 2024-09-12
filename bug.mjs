import { transform } from "@swc/core";
import { readFile } from "fs/promises";
import { cwd } from "process";
import { join } from "path";

const filePath = "./src/file.js";

const code = await readFile(filePath, "utf-8");

const filename = join(cwd(), filePath);

console.log("expected\n");

const expected = (
  await transform(code, {
    filename,
  })
).code;
console.log(expected);

console.log("unexpected\n");

const unexpected = (
  await transform(code, {
    filename,
    jsc: {
      baseUrl: cwd(),
    },
  })
).code;
console.log(unexpected);
