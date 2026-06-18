import SwiftUI
import KakkaTokens

// MARK: - KakkaEmptyState
public struct KakkaEmptyState: View {
    let title: String
    let description: String?
    let systemImage: String?
    let actionLabel: String?
    let action: (() -> Void)?

    @Environment(\.kakkaTheme) private var theme

    public init(
        title: String,
        description: String? = nil,
        systemImage: String? = nil,
        actionLabel: String? = nil,
        action: (() -> Void)? = nil
    ) {
        self.title = title
        self.description = description
        self.systemImage = systemImage
        self.actionLabel = actionLabel
        self.action = action
    }

    public var body: some View {
        VStack(spacing: KakkaSpacing.s3) {
            if let systemImage = systemImage {
                Image(systemName: systemImage)
                    .font(.system(size: 48))
                    .foregroundColor(KakkaColors.gray400)
            }

            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundColor(theme.textPrimary)
                .multilineTextAlignment(.center)

            if let description = description {
                Text(description)
                    .font(KakkaFontSize.sm)
                    .foregroundColor(theme.textSecondary)
                    .multilineTextAlignment(.center)
            }

            if let actionLabel = actionLabel, let action = action {
                KakkaButton(actionLabel, variant: .outline, action: action)
                    .padding(.top, KakkaSpacing.s1)
            }
        }
        .padding(KakkaSpacing.s12)
        .frame(maxWidth: .infinity)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack {
        KakkaEmptyState(
            title: "まだデータがありません",
            description: "最初のアイテムを追加してみましょう。",
            systemImage: "tray",
            actionLabel: "追加する",
            action: {}
        )

        Divider()

        KakkaEmptyState(
            title: "検索結果がありません",
            description: "別のキーワードで試してみてください。",
            systemImage: "magnifyingglass"
        )
    }
    .padding()
}
#endif
