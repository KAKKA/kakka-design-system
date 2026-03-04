import SwiftUI
import KakkaTokens

// MARK: - KakkaTag
public struct KakkaTag: View {
    let text: String
    let onRemove: (() -> Void)?

    @Environment(\.kakkaTheme) private var theme

    public init(_ text: String, onRemove: (() -> Void)? = nil) {
        self.text = text
        self.onRemove = onRemove
    }

    public var body: some View {
        HStack(spacing: KakkaSpacing.s1) {
            Text(text)
                .font(KakkaFontSize.sm)
                .foregroundColor(theme.textPrimary)

            if let onRemove = onRemove {
                Button(action: onRemove) {
                    Image(systemName: "xmark")
                        .font(.system(size: 10, weight: .semibold))
                        .foregroundColor(theme.textSecondary)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.horizontal, KakkaSpacing.s2)
        .padding(.vertical, KakkaSpacing.s1)
        .background(theme.surfaceColor)
        .cornerRadius(KakkaRadius.lg)
        .overlay(
            RoundedRectangle(cornerRadius: KakkaRadius.lg)
                .stroke(theme.border, lineWidth: 1)
        )
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    HStack(spacing: KakkaSpacing.s2) {
        KakkaTag("タグ")
        KakkaTag("削除できるタグ", onRemove: {})
        KakkaTag("SwiftUI", onRemove: {})
    }
    .padding()
}
#endif
