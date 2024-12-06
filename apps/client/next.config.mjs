import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    config.module.rules.push({
      test: /\.svg$/, // SVG 파일에 대해
      use: ['@svgr/webpack'], // @svgr/webpack을 사용하여 React 컴포넌트로 변환
    })

    return config
  },
  output: 'standalone',
}

export default nextConfig
