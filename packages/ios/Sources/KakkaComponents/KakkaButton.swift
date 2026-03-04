import SwiftUI
import KakkaTokens

// MARK: - ButtonVariant
public enum ButtonVariant {
    case filled
    case outline
    case ghost
}

// MARK: - ButtonSize
public enum ButtonSize {
    case large
    case medium
    case small

    var height: CGFloat {
        switch self {
        case .large:  return 52
        case .medium: return 44
        case .small:  return 36
        }
    }

    var horizontalPadding: CGFloat {
        switch self {
        case .large:  return KakkaSpacing.s6
        case .medium: return KakkaSpacing.s5
        case .small:  return KakkaSpacing.s4
        }
    }

    var font: Font {
        switch self {
        case .large:  return KakkaFontSize.md
        case .medium: return KakkaFontSize.sm
        case .small:  return KakkaFontSize.xs
        }
    }
}

// MARK: - KakkaButton
public struct KakkaButton: View {
    let title: String
    let variant: ButtonVariant
    let size: ButtonSize
    let isLoading: Bool
    let isDisabled: Bool
    let action: () -> Void

    @Environment(\.kakkaTheme) private var theme

    public init(
        _ title: String,
        variant: ButtonVariant = .filled,
        size: ButtonSize = .medium,
        isLoading: Bool = false,
        isDisabled: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.variant = variant
        self.size = size
        self.isLoading = isLoading
        self.isDisabled = isDisabled
        self.action = action
    }

    private var backgroundColor: Color {
        switch variant {
        case .filled:
            return isDisabled ? theme.border : theme.accent
        case .outline, .ghost:
            return .clear
        }
    }

    private var foregroundColor: Color {
        switch variant {
        case .filled:
            return isDisabled ? theme.textSecondary : KakkaColors.gray0
        case .outline:
            return isDisabled ? theme.textSecondary : theme.accent
        case .ghost:
            return isDisabled ? theme.textSecondary : theme.accent
        }
    }

    private var borderColor: Color {
        switch variant {
        case .filled:
            return .clear
        case .outline:
            return isDisabled ? theme.border : theme.accent
        case .ghost:
            return .clear
        }
    }

    public var body: some View {
        Button(action: {
            guard !isLoading && !isDisabled else { return }
            action()
        }) {
            ZStack {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: foregroundColor))
                        .scaleEffect(size == .small ? 0.7 : 1.0)
                } else {
                    Text(title)
                        .font(size.font)
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .frame(height: size.height)
            .padding(.horizontal, size.horizontalPadding)
            .background(backgroundColor)
            .foregroundColor(foregroundColor)
            .cornerRadius(KakkaRadius.lg)
            .overlay(
                RoundedRectangle(cornerRadius: KakkaRadius.lg)
                    .stroke(borderColor, lineWidth: 1.5)
            )
        }
        .disabled(isLoading || isDisabled)
        .opacity(isDisabled ? 0.6 : 1.0)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s4) {
        KakkaButton("Filled Large", variant: .filled, size: .large) {}
        KakkaButton("Outline Medium", variant: .outline, size: .medium) {}
        KakkaButton("Ghost Small", variant: .ghost, size: .small) {}
        KakkaButton("Loading", variant: .filled, isLoading: true) {}
        KakkaButton("Disabled", variant: .filled, isDisabled: true) {}
    }
    .padding()
}
#endif
