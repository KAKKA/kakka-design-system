import SwiftUI
import KakkaTokens

// MARK: - KakkaMenuItem
public struct KakkaMenuItem {
    public let label: String
    public let action: () -> Void
    public let isDestructive: Bool

    public init(
        label: String,
        isDestructive: Bool = false,
        action: @escaping () -> Void
    ) {
        self.label = label
        self.isDestructive = isDestructive
        self.action = action
    }
}

// MARK: - KakkaMenu
public struct KakkaMenu<Label: View>: View {
    let items: [KakkaMenuItem]
    let label: Label

    @Environment(\.kakkaTheme) private var theme

    public init(
        items: [KakkaMenuItem],
        @ViewBuilder label: () -> Label
    ) {
        self.items = items
        self.label = label()
    }

    public var body: some View {
        Menu {
            ForEach(items.indices, id: \.self) { index in
                let item = items[index]
                if item.isDestructive {
                    Button(role: .destructive) {
                        item.action()
                    } label: {
                        Text(item.label)
                    }
                } else {
                    Button {
                        item.action()
                    } label: {
                        Text(item.label)
                    }
                }
            }
        } label: {
            label
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s6) {
        // アイコンボタントリガー
        KakkaMenu(
            items: [
                KakkaMenuItem(label: "編集する") {
                    print("編集")
                },
                KakkaMenuItem(label: "コピー") {
                    print("コピー")
                },
                KakkaMenuItem(label: "削除する", isDestructive: true) {
                    print("削除")
                },
            ]
        ) {
            Label("メニューを開く", systemImage: "ellipsis.circle")
                .font(KakkaFontSize.md)
                .foregroundColor(KakkaColors.accentPrimaryDefault)
                .padding(.horizontal, KakkaSpacing.s4)
                .padding(.vertical, KakkaSpacing.s2)
                .background(KakkaColors.gray50)
                .cornerRadius(KakkaRadius.lg)
        }

        // テキストボタントリガー
        KakkaMenu(
            items: [
                KakkaMenuItem(label: "設定") { print("設定") },
                KakkaMenuItem(label: "ログアウト", isDestructive: true) { print("ログアウト") },
            ]
        ) {
            Image(systemName: "ellipsis")
                .font(.system(size: 20, weight: .semibold))
                .foregroundColor(KakkaColors.gray700)
                .frame(width: 36, height: 36)
                .background(KakkaColors.gray100)
                .clipShape(Circle())
        }
    }
    .padding(KakkaSpacing.s6)
}
#endif
