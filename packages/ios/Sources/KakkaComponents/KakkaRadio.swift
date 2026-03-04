import SwiftUI
import KakkaTokens

// MARK: - KakkaRadio
public struct KakkaRadio: View {
    let label: String?
    let isSelected: Bool
    let action: () -> Void

    @Environment(\.kakkaTheme) private var theme

    public init(
        label: String? = nil,
        isSelected: Bool,
        action: @escaping () -> Void
    ) {
        self.label = label
        self.isSelected = isSelected
        self.action = action
    }

    public var body: some View {
        Button(action: action) {
            HStack(spacing: KakkaSpacing.s2) {
                // Radio circle
                ZStack {
                    Circle()
                        .fill(theme.backgroundColor)
                        .frame(width: 20, height: 20)
                        .overlay(
                            Circle()
                                .stroke(isSelected ? theme.accent : theme.border, lineWidth: 1.5)
                        )

                    if isSelected {
                        Circle()
                            .fill(theme.accent)
                            .frame(width: 10, height: 10)
                    }
                }

                // Label
                if let label = label {
                    Text(label)
                        .font(KakkaFontSize.md)
                        .foregroundColor(theme.textPrimary)
                }
            }
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(alignment: .leading, spacing: KakkaSpacing.s3) {
        KakkaRadio(label: "選択済み", isSelected: true, action: {})
        KakkaRadio(label: "未選択", isSelected: false, action: {})
        KakkaRadio(isSelected: true, action: {})
    }
    .padding()
}
#endif
