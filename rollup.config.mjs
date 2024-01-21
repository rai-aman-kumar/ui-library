import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import packageJSON from "./package.json";

const config = [
	{
		// entry point
		input: "src/index.ts",
		// creating builds in both esm and cjs
		// file names of built files are picked from package.json
		output: [
			{
				file: packageJSON.module,
				format: "esm",
				sourcemap: true,
			},
			{
				file: packageJSON.main,
				format: "cjs",
				sourcemap: true,
			},
		],
		// plugins to use for modules
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				tsconfig: "./tsconfig.json",
				// excluding test files, component test files and story files
				exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.ts"],
			}),
			postcss({
				extensions: [".css"],
				inject: true,
				extract: false,
			}),
		],
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [
			{
				file: "dist/index.d.ts",
				format: "esm",
			},
		],
		plugins: [dts()],
		external: [/\.css$/],
	},
];

export default config;
