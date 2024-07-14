// uno.config.ts
import { defineConfig } from 'unocss'
//import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  // presets: [presetRemToPx()],
  theme: {
    colors: {
      veryCool: '#0000ff'
    },
    spacing: {
      aside: '200px'
    }
  }
})
