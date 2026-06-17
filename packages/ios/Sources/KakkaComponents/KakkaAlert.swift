import SwiftUI
import KakkaTokens

// MARK: - AlertVariant
public enum AlertVariant {
    case info
    case success
    case warning
    case error
}

// MARK: - KakkaAlert
public struct KakkaAlert: View {
    let message: String
    let title: String?
    let variant: AlertVariant

    @Environment(\.kakkaTheme) private var theme

    public init(_ message: String, title: String? = nil, variant: AlertVariant = .info) {
        self.message = message
        self.title = title
        self.variant = variant
    }

    private var backgroundColor: Color {
        switch variant {
        case .info:    return KakkaColors.statusBgInfo
        case .success: return KakkaColors.statusBgSuccess
        case .warning: return KakkaColors.statusBgWarning
        case .error:   return KakkaColors.statusBgError
        }
    }

    private var barColor: Color {
        switch variant {
        case .info:    return KakkaColors.info
        case .success: return KakkaColors.success
        case .warning: return KakkaColors.warning
        case .error:   return KakkaColors.error
        }
    }

    private var iconName: String {
        switch variant {
        case .info:    return "info.circle"
        case .success: return "checkmark.circle"
        case .warning: return "exclamationmark.triangle"
        case .error:   return "xmark.circle"
        }
    }

    public var body: some View {
        HStack(alignment: .top, spacing: 0) {
            // 左端カラーバー
            RoundedRectangle(cornerRadius: KakkaRadius.sm)
                .fill(barColor)
                .frame(width: 4)

            HStack(alignment: .top, spacing: KakkaSpacing.s2) {
                Image(systemName: iconName)
                    .foregroundColor(barColor)
                    .frame(width: 20, height: 20)

                VStack(alignment: .leading, spacing: KakkaSpacing.s1) {
                    if let title = title {
                        Text(title)
                            .font(KakkaFontSize.sm)
                            .fontWeight(.bold)
                            .foregroundColor(theme.textPrimary)
                    }
                    Text(message)
                        .font(KakkaFontSize.sm)
                        .foregroundColor(theme.textPrimary)
                        .fixedSize(horizontal: false, vertical: true)
                }
            }
            .padding(.horizontal, KakkaSpacing.s3)
            .padding(.vertical, KakkaSpacing.s3)
        }
        .background(backgroundColor)
        .cornerRadius(KakkaRadius.md)
        .clipped()
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s3) {
        KakkaAlert("情報メッセージです。", title: "お知らせ", variant: .info)
        KakkaAlert("操作が成功しました。", title: "成功", variant: .success)
        KakkaAlert("注意が必要です。", title: "警告", variant: .warning)
        KakkaAlert("エラーが発生しました。", variant: .error)
    }
    .padding()
}
#endif
