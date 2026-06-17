import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: 'Patterns/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        width: 256,
        height: 480,
        background: 'var(--kakka-color-semantic-background-subtle, #F7F7F5)',
        borderRight: '1px solid var(--kakka-color-semantic-border-default, #E0E0DB)',
      }}
    >
      <Sidebar>
        <SidebarSection label="メイン">
          <SidebarItem icon={icon('M3 10l7-6 7 6M5 9v7h10V9')} active>
            ダッシュボード
          </SidebarItem>
          <SidebarItem icon={icon('M4 5h12M4 10h12M4 15h12')} trailing="12">
            予約一覧
          </SidebarItem>
          <SidebarItem icon={icon('M10 3v14M3 10h14')}>新規予約</SidebarItem>
        </SidebarSection>
        <SidebarSection label="管理">
          <SidebarItem icon={icon('M10 4v12M4 10h12')}>設定</SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};
