import SwiftUI
import KakkaTokens

// MARK: - StatDelta
public enum StatDelta {
    case up
    case down
    case neutral
}

// MARK: - KakkaStat
public struct KakkaStat: View {
    let label: String
    let value: String
    let delta: String?
    let deltaDirection: StatDelta

    @Environment(\.kakkaTheme) private var theme

    public init(
        label: String,
        value: String,
        delta: String? = nil,
        deltaDirection: StatDelta = .neutral
    ) {
        self.label = label
        self.value = value
        self.delta = delta
        self.deltaDirection = deltaDirection
    }

    private var deltaColor: Color {
        switch deltaDirection {
        case .up:      return KakkaColors.success
        case .down:    return KakkaColors.error
        case .neutral: return theme.textSecondary
        }
    }

    private var deltaPrefix: String {
        switch deltaDirection {
        case .up:      return "↑"
        case .down:    return "↓"
        case .neutral: return ""
        }
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: KakkaSpacing.s1) {
            Text(label)
                .font(KakkaFontSize.xs)
                .foregroundColor(theme.textSecondary)

            Text(value)
                .font(.system(size: 28, weight: .bold))
                .foregroundColor(theme.textPrimary)

            if let delta = delta {
                Text("\(deltaPrefix)\(delta)")
                    .font(KakkaFontSize.sm)
                    .foregroundColor(deltaColor)
            }
        }
        .padding(KakkaSpacing.s5)
        .frame(maxWidth: .infinity, alignment: .leading)
        .overlay(
            RoundedRectangle(cornerRadius: KakkaRadius.lg)
                .stroke(KakkaColors.gray200, lineWidth: 1)
        )
        .cornerRadius(KakkaRadius.lg)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s3) {
        KakkaStat(label: "総ユーザー数", value: "12,345", delta: "5.2%", deltaDirection: .up)
        KakkaStat(label: "月次売上", value: "¥980,000", delta: "1.8%", deltaDirection: .down)
        KakkaStat(label: "アクティブ率", value: "68%")
    }
    .padding()
}
#endif
