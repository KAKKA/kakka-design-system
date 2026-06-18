import SwiftUI
import KakkaTokens

// MARK: - KakkaBottomSheet
public struct KakkaBottomSheet<Content: View>: View {
    @Binding var isPresented: Bool
    let title: String?
    let content: Content

    @Environment(\.kakkaTheme) private var theme

    public init(
        isPresented: Binding<Bool>,
        title: String? = nil,
        @ViewBuilder content: () -> Content
    ) {
        self._isPresented = isPresented
        self.title = title
        self.content = content()
    }

    public var body: some View {
        Color.clear
            .sheet(isPresented: $isPresented) {
                VStack(alignment: .leading, spacing: 0) {
                    // ドラッグインジケータ
                    HStack {
                        Spacer()
                        Capsule()
                            .fill(KakkaColors.gray300)
                            .frame(width: 36, height: 4)
                        Spacer()
                    }
                    .padding(.top, KakkaSpacing.s3)
                    .padding(.bottom, KakkaSpacing.s2)

                    // タイトル
                    if let title = title {
                        Text(title)
                            .font(KakkaFontSize.lg)
                            .fontWeight(.bold)
                            .foregroundColor(KakkaColors.gray800)
                            .padding(.horizontal, KakkaSpacing.s4)
                            .padding(.bottom, KakkaSpacing.s3)
                    }

                    // コンテンツ
                    content
                        .padding(.horizontal, KakkaSpacing.s4)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                .background(KakkaColors.gray0)
                .presentationDetents([.medium, .large])
                .presentationDragIndicator(.hidden)
            }
    }
}

// MARK: - View Extension
public extension View {
    func kakkaBottomSheet<Content: View>(
        isPresented: Binding<Bool>,
        title: String? = nil,
        @ViewBuilder content: () -> Content
    ) -> some View {
        self.sheet(isPresented: isPresented) {
            VStack(alignment: .leading, spacing: 0) {
                HStack {
                    Spacer()
                    Capsule()
                        .fill(KakkaColors.gray300)
                        .frame(width: 36, height: 4)
                    Spacer()
                }
                .padding(.top, KakkaSpacing.s3)
                .padding(.bottom, KakkaSpacing.s2)

                if let title = title {
                    Text(title)
                        .font(KakkaFontSize.lg)
                        .fontWeight(.bold)
                        .foregroundColor(KakkaColors.gray800)
                        .padding(.horizontal, KakkaSpacing.s4)
                        .padding(.bottom, KakkaSpacing.s3)
                }

                content()
                    .padding(.horizontal, KakkaSpacing.s4)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            .background(KakkaColors.gray0)
            .presentationDetents([.medium, .large])
            .presentationDragIndicator(.hidden)
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    struct PreviewWrapper: View {
        @State private var showSheet = false

        var body: some View {
            VStack {
                Button("シートを開く") {
                    showSheet = true
                }
                .buttonStyle(.borderedProminent)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .kakkaBottomSheet(isPresented: $showSheet, title: "設定") {
                VStack(alignment: .leading, spacing: KakkaSpacing.s3) {
                    Text("ここにコンテンツが入ります。")
                        .font(KakkaFontSize.sm)
                        .foregroundColor(KakkaColors.gray600)
                    Text("スクロール可能なコンテンツも配置できます。")
                        .font(KakkaFontSize.sm)
                        .foregroundColor(KakkaColors.gray600)
                }
            }
        }
    }

    return PreviewWrapper()
}
#endif
