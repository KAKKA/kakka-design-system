import SwiftUI
import KakkaTokens

// MARK: - AvatarSize
public enum AvatarSize {
    case sm
    case md
    case lg
    case xl

    var diameter: CGFloat {
        switch self {
        case .sm: return 28
        case .md: return 40
        case .lg: return 56
        case .xl: return 80
        }
    }

    var font: Font {
        switch self {
        case .sm: return KakkaFontSize.xs
        case .md: return KakkaFontSize.sm
        case .lg: return KakkaFontSize.lg
        case .xl: return KakkaFontSize.xxl
        }
    }
}

// MARK: - KakkaAvatar
public struct KakkaAvatar: View {
    let name: String?
    let size: AvatarSize
    let image: Image?

    @Environment(\.kakkaTheme) private var theme

    public init(name: String? = nil, size: AvatarSize = .md, image: Image? = nil) {
        self.name = name
        self.size = size
        self.image = image
    }

    private var initials: String {
        guard let name = name, !name.isEmpty else { return "?" }
        let components = name.components(separatedBy: .whitespaces).filter { !$0.isEmpty }
        if components.count >= 2 {
            let first = String(components[0].prefix(1))
            let second = String(components[1].prefix(1))
            return (first + second).uppercased()
        } else {
            return String(name.prefix(2)).uppercased()
        }
    }

    public var body: some View {
        ZStack {
            if let image = image {
                image
                    .resizable()
                    .scaledToFill()
                    .frame(width: size.diameter, height: size.diameter)
                    .clipShape(Circle())
            } else {
                Circle()
                    .fill(KakkaColors.accentPrimaryLight)
                    .frame(width: size.diameter, height: size.diameter)

                Text(initials)
                    .font(size.font)
                    .fontWeight(.semibold)
                    .foregroundColor(KakkaColors.accentPrimaryDark)
            }
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    HStack(spacing: KakkaSpacing.s4) {
        KakkaAvatar(name: "田中 太郎", size: .sm)
        KakkaAvatar(name: "Nobuhisa Hirata", size: .md)
        KakkaAvatar(name: "山田", size: .lg)
        KakkaAvatar(size: .xl)
    }
    .padding()
}
#endif
