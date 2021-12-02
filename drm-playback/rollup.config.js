import commonJs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        exports: "auto",
        name: "THEOdemo",
        globals: {
            'chromecast-caf-receiver': ['cast'],
            'chromecast-caf-receiver/cast.framework': ['cast.framework'],
            'chromecast-caf-receiver/cast.framework.messages': ['cast.framework.messages'],
            'chromecast-caf-receiver/cast.framework.events': ['cast.framework.events'],
            'chromecast-caf-receiver/cast.debug': ['cast.debug']
        }
    },
    external: [
        'chromecast-caf-receiver',
        'chromecast-caf-receiver/cast.framework',
        'chromecast-caf-receiver/cast.framework.messages',
        'chromecast-caf-receiver/cast.framework.events',
        'chromecast-caf-receiver/cast.debug'
    ],
    plugins: [
        resolve(),
        commonJs({ extensions: [".js", ".ts"] }),
        typescript()
    ],
};
