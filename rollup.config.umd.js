import { resolve } from "path";
import babel from "rollup-plugin-babel";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify";
import copyright from "./copyright";

const { NODE_ENV } = process.env;

function output(environment) {
  if (environment !== "production") {
    return "bin/react-intl-format.js";
  }

  return "bin/react-intl-format.min.js";
}

function plugins(environment) {
  const results = [
    nodeResolve(),
    babel(),
    replace({ "process.env.NODE_ENV": JSON.stringify(environment) }),
    commonjs({ sourceMap: true })
  ];

  if (environment === "production") {
    results.push(
      uglify({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        },
        output: {
          comments: (node, comment) => {
            const { value, type } = comment;

            if (type === "comment2") {
              return value.indexOf("*!") === 0;
            }

            return false;
          }
        }
      })
    );
  }

  return results;
}

export default {
  input: resolve("source/react-intl-format.js"),
  output: {
    file: output(NODE_ENV),
    format: "umd"
  },
  name: "ReactIntlFormat",
  sourcemap: true,
  globals: {
    react: "React",
    "react-intl": "ReactIntl"
  },
  external: ["react", "react-intl"],
  plugins: plugins(NODE_ENV),
  banner: copyright
};
