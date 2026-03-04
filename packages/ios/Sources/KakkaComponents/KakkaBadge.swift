import SwiftUI
import KakkaTokens

// MARK: - BadgeVariant
public enum BadgeVariant {
    case `default`
    case accent
    case success
    case warning
    case error
}

// MARK: - KakkaBadge
public struct KakkaBadge: View {
    let text: String
    let variant: BadgeVariant

    @Environment(\.kakkaTheme) private var theme

    public init(_ text: String, variant: BadgeVariant = .default) {
        self.text = text
        self.variant = variant
    }

    private var backgroundColor: Color {
        switch variant {
        case .default: return theme.surfaceColor
        case .accent:  return KakkaColors.accentPrimaryLight
        case .success: return KakkaColors.success.opacity(0.15)
        case .warning: return KakkaColors.warning.opacity(0.15)
        case .error:   return KakkaColors.error.opacity(0.15)
        }
    }

    private var foregroundColor: Color {
        switch variant {
        case .default: return theme.textSecondary
        case .accent:  return KakkaColors.accentPrimaryDark
        case .success: return KakkaColors.success
        case .warning: return KakkaColors.warning
        case .error:   return KakkaColors.error
        }
    }

    public var body: some View {
        Text(text)
            .font(KakkaFontSize.xs)
            .fontWeight(.medium)
            .foregroundColor(foregroundColor)
            .padding(.horizontal, KakkaSpacing.s2)
            .padding(.vertical, KakkaSpacing.s1)
            .background(backgroundColor)
            .clipShape(Capsule())
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    HStack(spacing: KakkaSpacing.s2) {
        KakkaBadge("Default", variant: .default)
        KakkaBadge("Accent", variant: .accent)
        KakkaBadge("Success", variant: .success)
        KakkaBadge("Warning", variant: .warning)
        KakkaBadge("Error", variant: .error)
    }
    .padding()
}
#endif
