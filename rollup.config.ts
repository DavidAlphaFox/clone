import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";

const pkg = require("./package.json");

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: "clone", format: "umd", sourcemap: true },
    { file: pkg.module, format: "es", sourcemap: true }
  ],
  external: [],
  watch: {
    include: "src/**"
  },
  plugins: [typescript({ useTsconfigDeclarationDir: true }), sourceMaps()]
};
