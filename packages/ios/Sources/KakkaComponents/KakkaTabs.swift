import SwiftUI
import KakkaTokens

// MARK: - KakkaTabItem
public struct KakkaTabItem {
    public let label: String

    public init(label: String) {
        self.label = label
    }
}

// MARK: - KakkaTabs
public struct KakkaTabs: View {
    let tabs: [KakkaTabItem]
    @Binding var selectedIndex: Int

    @Environment(\.kakkaTheme) private var theme

    public init(tabs: [KakkaTabItem], selectedIndex: Binding<Int>) {
        self.tabs = tabs
        self._selectedIndex = selectedIndex
    }

    public var body: some View {
        VStack(spacing: 0) {
            HStack(spacing: 0) {
                ForEach(tabs.indices, id: \.self) { index in
                    Button(action: {
                        withAnimation(.easeInOut(duration: 0.2)) {
                            selectedIndex = index
                        }
                    }) {
                        VStack(spacing: 0) {
                            Text(tabs[index].label)
                                .font(KakkaFontSize.sm)
                                .fontWeight(selectedIndex == index ? .semibold : .regular)
                                .foregroundColor(
                                    selectedIndex == index
                                        ? KakkaColors.gray800
                                        : KakkaColors.gray500
                                )
                                .padding(.vertical, KakkaSpacing.s3)
                                .frame(maxWidth: .infinity)

                            // インジケータ
                            Rectangle()
                                .fill(
                                    selectedIndex == index
                                        ? KakkaColors.accentPrimaryDefault
                                        : Color.clear
                                )
                                .frame(height: 2)
                        }
                    }
                    .buttonStyle(.plain)
                }
            }

            // ボトムトラックライン
            Rectangle()
                .fill(KakkaColors.gray200)
                .frame(height: 1)
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    struct PreviewWrapper: View {
        @State private var selected = 0
        let tabs = [
            KakkaTabItem(label: "ホーム"),
            KakkaTabItem(label: "お知らせ"),
            KakkaTabItem(label: "設定"),
        ]

        var body: some View {
            VStack(spacing: KakkaSpacing.s6) {
                KakkaTabs(tabs: tabs, selectedIndex: $selected)

                Text("選択中: \(tabs[selected].label)")
                    .font(KakkaFontSize.md)

                Spacer()
            }
            .padding(.horizontal, KakkaSpacing.s4)
        }
    }

    return PreviewWrapper()
}
#endif
