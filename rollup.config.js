import { resolve } from "path";
import babel from "rollup-plugin-babel";
import copyright from "./copyright";

export default {
  input: resolve("source/react-intl-format"),
  output: [
    { file: "lib/react-intl-format.js", format: "cjs" },
    { file: "lib/react-intl-format.es.js", format: "es" }
  ],
  external: ["invariant", "prop-types", "react"],
  plugins: [babel()],
  banner: copyright
};
