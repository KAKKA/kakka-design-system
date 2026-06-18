import SwiftUI
import KakkaTokens

// MARK: - SkeletonVariant
public enum SkeletonVariant {
    case text
    case rect
    case circle
}

// MARK: - KakkaSkeleton
public struct KakkaSkeleton: View {
    let variant: SkeletonVariant
    let width: CGFloat?
    let height: CGFloat?

    @State private var shimmerOffset: CGFloat = -1.0

    public init(
        variant: SkeletonVariant = .text,
        width: CGFloat? = nil,
        height: CGFloat? = nil
    ) {
        self.variant = variant
        self.width = width
        self.height = height
    }

    private var resolvedHeight: CGFloat {
        if let h = height { return h }
        switch variant {
        case .text:   return 16
        case .rect:   return 80
        case .circle: return 48
        }
    }

    private var resolvedWidth: CGFloat? {
        if let w = width { return w }
        switch variant {
        case .circle: return resolvedHeight
        default:      return nil // maxWidth: .infinity
        }
    }

    private var cornerRadius: CGFloat {
        switch variant {
        case .text:   return KakkaRadius.md
        case .rect:   return KakkaRadius.md
        case .circle: return KakkaRadius.full
        }
    }

    // シマーグラデーション
    private var shimmerGradient: LinearGradient {
        LinearGradient(
            gradient: Gradient(colors: [
                KakkaColors.gray100,
                KakkaColors.gray50,
                KakkaColors.gray100,
            ]),
            startPoint: .leading,
            endPoint: .trailing
        )
    }

    public var body: some View {
        GeometryReader { geometry in
            ZStack {
                RoundedRectangle(cornerRadius: cornerRadius)
                    .fill(KakkaColors.gray100)

                RoundedRectangle(cornerRadius: cornerRadius)
                    .fill(shimmerGradient)
                    .offset(x: shimmerOffset * geometry.size.width)
                    .clipped()
            }
        }
        .frame(
            width: resolvedWidth,
            height: resolvedHeight
        )
        .frame(maxWidth: resolvedWidth == nil ? .infinity : resolvedWidth)
        .onAppear {
            withAnimation(
                .linear(duration: 1.2)
                .repeatForever(autoreverses: false)
            ) {
                shimmerOffset = 1.0
            }
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(alignment: .leading, spacing: KakkaSpacing.s4) {
        Text("text variant")
            .font(KakkaFontSize.xs)
            .foregroundColor(KakkaColors.gray500)
        KakkaSkeleton(variant: .text)
        KakkaSkeleton(variant: .text, width: 200)

        Text("rect variant")
            .font(KakkaFontSize.xs)
            .foregroundColor(KakkaColors.gray500)
        KakkaSkeleton(variant: .rect)
        KakkaSkeleton(variant: .rect, width: 160, height: 100)

        Text("circle variant")
            .font(KakkaFontSize.xs)
            .foregroundColor(KakkaColors.gray500)
        HStack(spacing: KakkaSpacing.s3) {
            KakkaSkeleton(variant: .circle, width: 40, height: 40)
            KakkaSkeleton(variant: .circle, width: 56, height: 56)
            KakkaSkeleton(variant: .circle, width: 72, height: 72)
        }
    }
    .padding(KakkaSpacing.s4)
}
#endif
