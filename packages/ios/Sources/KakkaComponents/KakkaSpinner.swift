import SwiftUI
import KakkaTokens

// MARK: - SpinnerSize
public enum SpinnerSize {
    case sm
    case md
    case lg

    var scale: CGFloat {
        switch self {
        case .sm: return 0.6
        case .md: return 1.0
        case .lg: return 1.5
        }
    }

    var frameSize: CGFloat {
        switch self {
        case .sm: return 20
        case .md: return 32
        case .lg: return 48
        }
    }
}

// MARK: - KakkaSpinner
public struct KakkaSpinner: View {
    let size: SpinnerSize
    let color: Color?

    @Environment(\.kakkaTheme) private var theme

    public init(size: SpinnerSize = .md, color: Color? = nil) {
        self.size = size
        self.color = color
    }

    private var spinnerColor: Color {
        color ?? theme.accent
    }

    public var body: some View {
        ProgressView()
            .progressViewStyle(CircularProgressViewStyle(tint: spinnerColor))
            .scaleEffect(size.scale)
            .frame(width: size.frameSize, height: size.frameSize)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    HStack(spacing: KakkaSpacing.s6) {
        KakkaSpinner(size: .sm)
        KakkaSpinner(size: .md)
        KakkaSpinner(size: .lg)
        KakkaSpinner(size: .md, color: KakkaColors.error)
    }
    .padding()
}
#endif
