import type { Preview } from "@storybook/vue3";
import CssVarProvider from './CssVarProvider.vue';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...MINIMAL_VIEWPORTS,
    },
    decorators: [
      () => CssVarProvider
    ]
  },
};

export default preview;
