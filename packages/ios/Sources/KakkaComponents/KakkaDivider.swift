import SwiftUI
import KakkaTokens

// MARK: - KakkaDivider
public struct KakkaDivider: View {
    let label: String?

    @Environment(\.kakkaTheme) private var theme

    public init(label: String? = nil) {
        self.label = label
    }

    public var body: some View {
        if let label = label {
            HStack(spacing: KakkaSpacing.s3) {
                line
                Text(label)
                    .font(KakkaFontSize.xs)
                    .foregroundColor(theme.textSecondary)
                    .fixedSize()
                line
            }
        } else {
            line
        }
    }

    private var line: some View {
        Rectangle()
            .fill(theme.border)
            .frame(maxWidth: .infinity)
            .frame(height: 1)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s4) {
        KakkaDivider()
        KakkaDivider(label: "または")
        KakkaDivider(label: "セクション")
    }
    .padding()
}
#endif
