import SwiftUI
import KakkaTokens

// MARK: - KakkaCheckbox
public struct KakkaCheckbox: View {
    let label: String?
    @Binding var isChecked: Bool

    @Environment(\.kakkaTheme) private var theme

    public init(
        label: String? = nil,
        isChecked: Binding<Bool>
    ) {
        self.label = label
        self._isChecked = isChecked
    }

    public var body: some View {
        Button(action: {
            isChecked.toggle()
        }) {
            HStack(spacing: KakkaSpacing.s2) {
                // Checkbox box
                ZStack {
                    RoundedRectangle(cornerRadius: KakkaRadius.md)
                        .fill(isChecked ? theme.accent : theme.backgroundColor)
                        .frame(width: 20, height: 20)
                        .overlay(
                            RoundedRectangle(cornerRadius: KakkaRadius.md)
                                .stroke(isChecked ? theme.accent : theme.border, lineWidth: 1.5)
                        )

                    if isChecked {
                        Image(systemName: "checkmark")
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(KakkaColors.gray0)
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
        KakkaCheckbox(label: "チェックあり", isChecked: .constant(true))
        KakkaCheckbox(label: "チェックなし", isChecked: .constant(false))
        KakkaCheckbox(isChecked: .constant(true))
    }
    .padding()
}
#endif
