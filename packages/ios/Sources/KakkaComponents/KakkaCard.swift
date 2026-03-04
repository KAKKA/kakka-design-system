import SwiftUI
import KakkaTokens

// MARK: - CardElevation
public enum CardElevation {
    case none
    case low
    case medium
    case high

    var shadowRadius: CGFloat {
        switch self {
        case .none:   return 0
        case .low:    return 2
        case .medium: return 6
        case .high:   return 16
        }
    }

    var shadowOpacity: Double {
        switch self {
        case .none:   return 0
        case .low:    return 0.06
        case .medium: return 0.1
        case .high:   return 0.16
        }
    }

    var shadowY: CGFloat {
        switch self {
        case .none:   return 0
        case .low:    return 1
        case .medium: return 3
        case .high:   return 8
        }
    }
}

// MARK: - CardPadding
public enum CardPadding {
    case none
    case sm
    case md
    case lg

    var value: CGFloat {
        switch self {
        case .none: return 0
        case .sm:   return KakkaSpacing.s3
        case .md:   return KakkaSpacing.s4
        case .lg:   return KakkaSpacing.s6
        }
    }
}

// MARK: - KakkaCard
public struct KakkaCard<Content: View>: View {
    let elevation: CardElevation
    let padding: CardPadding
    let content: Content

    @Environment(\.kakkaTheme) private var theme

    public init(
        elevation: CardElevation = .low,
        padding: CardPadding = .md,
        @ViewBuilder content: () -> Content
    ) {
        self.elevation = elevation
        self.padding = padding
        self.content = content()
    }

    public var body: some View {
        content
            .padding(padding.value)
            .background(theme.backgroundColor)
            .cornerRadius(KakkaRadius.xl)
            .overlay(
                RoundedRectangle(cornerRadius: KakkaRadius.xl)
                    .stroke(theme.border, lineWidth: elevation == .none ? 1 : 0)
            )
            .shadow(
                color: KakkaColors.gray900.opacity(elevation.shadowOpacity),
                radius: elevation.shadowRadius,
                x: 0,
                y: elevation.shadowY
            )
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s4) {
        KakkaCard(elevation: .none) {
            Text("Elevation: none")
        }
        KakkaCard(elevation: .low) {
            Text("Elevation: low")
        }
        KakkaCard(elevation: .medium, padding: .lg) {
            Text("Elevation: medium, padding: lg")
        }
        KakkaCard(elevation: .high) {
            Text("Elevation: high")
        }
    }
    .padding()
    .background(Color(red: 0.95, green: 0.95, blue: 0.95))
}
#endif
