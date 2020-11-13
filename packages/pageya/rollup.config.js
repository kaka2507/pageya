import tsPlugin from '@rollup/plugin-typescript';

export default {
    input: './src/index.ts',
    output: {
        format: 'es',
        dir: "dist",
        sourcemap: true,
    },
    external: ['react', 'antd', '@ant-design/icons', '@form-composer/core', '@form-composer/ant-fields', 'antd/dist/antd.css', 'react-final-form'],
    plugins: [
        tsPlugin()
    ]
}