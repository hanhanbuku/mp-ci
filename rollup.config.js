import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm'
    },
    plugins: [
        terser({ compress: {
            // drop_console: true
        }
        })
    ]
};
