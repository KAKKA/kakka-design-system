import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'React',
    variant: 'default',
  },
};

export const Accent: Story = {
  args: {
    children: 'TypeScript',
    variant: 'accent',
  },
};

export const WithRemove: Story = {
  render: () => {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Storybook']);
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Tag key={tag} onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}>
            {tag}
          </Tag>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Tag variant="default">Default</Tag>
      <Tag variant="accent">Accent</Tag>
      <Tag variant="default" onRemove={() => {}}>
        Removable Default
      </Tag>
      <Tag variant="accent" onRemove={() => {}}>
        Removable Accent
      </Tag>
    </div>
  ),
};
