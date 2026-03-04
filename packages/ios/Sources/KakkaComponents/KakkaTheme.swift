import SwiftUI
import KakkaTokens

// Environment keys for KAKKA theme
public struct KakkaThemeKey: EnvironmentKey {
    public static let defaultValue = KakkaThemeValues()
}

public extension EnvironmentValues {
    var kakkaTheme: KakkaThemeValues {
        get { self[KakkaThemeKey.self] }
        set { self[KakkaThemeKey.self] = newValue }
    }
}

public struct KakkaThemeValues {
    public var primaryColor = KakkaColors.gray900
    public var backgroundColor = KakkaColors.gray0
    public var surfaceColor = KakkaColors.gray50
    public var textPrimary = KakkaColors.gray800
    public var textSecondary = KakkaColors.gray600
    public var accent = KakkaColors.accentPrimaryDefault
    public var border = KakkaColors.gray200
}

public struct KakkaTheme<Content: View>: View {
    let content: Content

    public init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    public var body: some View {
        content
            .environment(\.kakkaTheme, KakkaThemeValues())
    }
}
