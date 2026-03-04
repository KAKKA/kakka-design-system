import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Elevation', 'Border Radius'],
          'Components',
          [
            'Button', 'Link', 'Input', 'Textarea', 'Select',
            'Checkbox', 'Radio', 'Label', 'Badge', 'Tag',
            'Avatar', 'Divider', 'Card', 'Dialog', 'Toast',
            'Accordion', 'Breadcrumbs', 'Spinner',
          ],
        ],
      },
    },
    docs: { codePanel: true },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'subtle', value: '#F7F7F5' },
        { name: 'dark', value: '#0A0A07' },
      ],
    },
  },
};

export default preview;
