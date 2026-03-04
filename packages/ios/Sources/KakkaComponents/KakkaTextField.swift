import SwiftUI
import KakkaTokens

// MARK: - KakkaTextField
public struct KakkaTextField: View {
    let label: String?
    let placeholder: String?
    let errorMessage: String?
    @Binding var text: String

    @Environment(\.kakkaTheme) private var theme
    @FocusState private var isFocused: Bool

    public init(
        _ label: String? = nil,
        placeholder: String? = nil,
        errorMessage: String? = nil,
        text: Binding<String>
    ) {
        self.label = label
        self.placeholder = placeholder
        self.errorMessage = errorMessage
        self._text = text
    }

    private var borderColor: Color {
        if let _ = errorMessage {
            return KakkaColors.error
        }
        return isFocused ? theme.accent : theme.border
    }

    private var borderWidth: CGFloat {
        isFocused ? 2 : 1
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: KakkaSpacing.s1) {
            // Label
            if let label = label {
                Text(label)
                    .font(KakkaFontSize.sm)
                    .foregroundColor(theme.textPrimary)
            }

            // Input field
            TextField(placeholder ?? "", text: $text)
                .font(KakkaFontSize.md)
                .foregroundColor(theme.textPrimary)
                .focused($isFocused)
                .padding(.horizontal, KakkaSpacing.s3)
                .padding(.vertical, KakkaSpacing.s3)
                .background(theme.backgroundColor)
                .cornerRadius(KakkaRadius.lg)
                .overlay(
                    RoundedRectangle(cornerRadius: KakkaRadius.lg)
                        .stroke(borderColor, lineWidth: borderWidth)
                )

            // Error message
            if let errorMessage = errorMessage {
                Text(errorMessage)
                    .font(KakkaFontSize.xs)
                    .foregroundColor(KakkaColors.error)
            }
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s4) {
        KakkaTextField("ラベル", placeholder: "入力してください", text: .constant(""))
        KakkaTextField("エラーあり", placeholder: "入力してください", errorMessage: "入力が必要です", text: .constant(""))
        KakkaTextField(placeholder: "ラベルなし", text: .constant("テキスト"))
    }
    .padding()
}
#endif
