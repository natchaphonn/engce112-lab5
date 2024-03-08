import {
  defineConfig,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerCompileClass,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Prompt',
        mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerCompileClass()],
});
