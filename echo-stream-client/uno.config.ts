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
      primary: '#00F268'
    },
    spacing: {
      aside: '200px'
    }
  }
})

/**
 * @color text-neutral-500 辅助文字色
 */
