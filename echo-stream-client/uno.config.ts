// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({
      //默认情况下（1单位 = 0.25rem）html默认字体是16, 改为4, 每单位就是1px
      baseFontSize: 4
    })
  ],
  theme: {
    colors: {
      veryCool: '#0000ff'
    },
    spacing: {
      aside: '200px'
    }
  }
})
