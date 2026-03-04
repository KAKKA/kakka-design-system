import SwiftUI
import KakkaTokens

// MARK: - LinkVariant
public enum LinkVariant {
    case `default`
    case subtle
}

// MARK: - KakkaLink
public struct KakkaLink: View {
    let title: String
    let url: URL?
    let isExternal: Bool
    let variant: LinkVariant
    let action: (() -> Void)?

    @Environment(\.kakkaTheme) private var theme

    public init(
        _ title: String,
        url: URL? = nil,
        isExternal: Bool = false,
        variant: LinkVariant = .default,
        action: (() -> Void)? = nil
    ) {
        self.title = title
        self.url = url
        self.isExternal = isExternal
        self.variant = variant
        self.action = action
    }

    private var foregroundColor: Color {
        switch variant {
        case .default: return theme.accent
        case .subtle:  return theme.textSecondary
        }
    }

    private var content: some View {
        HStack(spacing: KakkaSpacing.s1) {
            Text(title)
                .font(KakkaFontSize.md)
                .underline()

            if isExternal {
                Image(systemName: "arrow.up.right.square")
                    .font(.system(size: 13))
            }
        }
        .foregroundColor(foregroundColor)
    }

    public var body: some View {
        if let url = url {
            Link(destination: url) {
                content
            }
        } else if let action = action {
            Button(action: action) {
                content
            }
            .buttonStyle(.plain)
        } else {
            content
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(alignment: .leading, spacing: KakkaSpacing.s3) {
        KakkaLink("通常リンク", action: {})
        KakkaLink("外部リンク", isExternal: true, action: {})
        KakkaLink("サブトルリンク", variant: .subtle, action: {})
        KakkaLink("外部サブトル", isExternal: true, variant: .subtle, action: {})
    }
    .padding()
}
#endif
