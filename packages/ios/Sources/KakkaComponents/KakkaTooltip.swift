import SwiftUI
import KakkaTokens

// MARK: - KakkaTooltip
public struct KakkaTooltip<Content: View>: View {
    let text: String
    let content: Content

    @State private var showTooltip = false
    @Environment(\.kakkaTheme) private var theme

    public init(
        text: String,
        @ViewBuilder content: () -> Content
    ) {
        self.text = text
        self.content = content()
    }

    public var body: some View {
        content
            .onTapGesture {
                showTooltip.toggle()
            }
            .popover(isPresented: $showTooltip, arrowEdge: .top) {
                if #available(iOS 16.4, *) {
                    tooltipBubble
                        .presentationCompactAdaptation(.popover)
                } else {
                    tooltipBubble
                }
            }
    }

    private var tooltipBubble: some View {
        Text(text)
            .font(KakkaFontSize.xs)
            .foregroundColor(KakkaColors.gray0)
            .padding(.horizontal, KakkaSpacing.s3)
            .padding(.vertical, KakkaSpacing.s2)
            .background(KakkaColors.gray900)
            .cornerRadius(KakkaRadius.md)
    }
}

// MARK: - View Extension
public extension View {
    func kakkaTooltip(_ text: String) -> some View {
        KakkaTooltip(text: text) {
            self
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s8) {
        KakkaTooltip(text: "これはツールチップです") {
            Label("タップしてみて", systemImage: "info.circle")
                .font(KakkaFontSize.sm)
                .foregroundColor(KakkaColors.accentPrimaryDefault)
                .padding(KakkaSpacing.s3)
                .background(KakkaColors.gray50)
                .cornerRadius(KakkaRadius.lg)
        }

        Image(systemName: "questionmark.circle")
            .font(.system(size: 24))
            .foregroundColor(KakkaColors.gray600)
            .kakkaTooltip("ヘルプテキストをここに書きます")
    }
    .padding(KakkaSpacing.s6)
}
#endif
