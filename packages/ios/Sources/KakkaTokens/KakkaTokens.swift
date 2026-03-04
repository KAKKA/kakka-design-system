import SwiftUI

// MARK: - KakkaColors
public enum KakkaColors {
    // Gray scale（微温かみあり）
    public static let gray0   = Color(red: 1.0,    green: 1.0,    blue: 1.0)
    public static let gray50  = Color(red: 0.9686, green: 0.9686, blue: 0.9608)
    public static let gray100 = Color(red: 0.9373, green: 0.9373, blue: 0.9255)
    public static let gray200 = Color(red: 0.8784, green: 0.8784, blue: 0.8588)
    public static let gray300 = Color(red: 0.7843, green: 0.7843, blue: 0.7569)
    public static let gray400 = Color(red: 0.6588, green: 0.6588, blue: 0.6196)
    public static let gray500 = Color(red: 0.4706, green: 0.4706, blue: 0.4392)
    public static let gray600 = Color(red: 0.3216, green: 0.3216, blue: 0.2863)
    public static let gray700 = Color(red: 0.2118, green: 0.2118, blue: 0.1882)
    public static let gray800 = Color(red: 0.1176, green: 0.1176, blue: 0.098)
    public static let gray900 = Color(red: 0.0392, green: 0.0392, blue: 0.0275)

    // Accent
    public static let accentPrimaryLight   = Color(red: 0.9098, green: 0.8941, blue: 0.8627)
    public static let accentPrimaryDefault = Color(red: 0.5451, green: 0.451,  blue: 0.3333)
    public static let accentPrimaryDark    = Color(red: 0.3608, green: 0.2902, blue: 0.2078)
    public static let accentSecondary      = Color(red: 0.2902, green: 0.4039, blue: 0.2549)

    // Status
    public static let error   = Color(red: 0.7529, green: 0.2235, blue: 0.1686)
    public static let warning = Color(red: 0.7176, green: 0.5255, blue: 0.0431)
    public static let success = Color(red: 0.2902, green: 0.4039, blue: 0.2549)
}

// MARK: - KakkaSpacing
public enum KakkaSpacing {
    public static let s0: CGFloat  = 0
    public static let s1: CGFloat  = 4
    public static let s2: CGFloat  = 8
    public static let s3: CGFloat  = 12
    public static let s4: CGFloat  = 16
    public static let s5: CGFloat  = 20
    public static let s6: CGFloat  = 24
    public static let s8: CGFloat  = 32
    public static let s10: CGFloat = 40
    public static let s12: CGFloat = 48
    public static let s16: CGFloat = 64
    public static let s20: CGFloat = 80
}

// MARK: - KakkaRadius
public enum KakkaRadius {
    public static let none: CGFloat = 0
    public static let sm: CGFloat   = 2
    public static let md: CGFloat   = 4
    public static let lg: CGFloat   = 8  // メインR値
    public static let xl: CGFloat   = 12
    public static let xxl: CGFloat  = 16
    public static let full: CGFloat = 999
}

// MARK: - KakkaFontSize
public enum KakkaFontSize {
    public static let xs:   Font = .system(size: 12)
    public static let sm:   Font = .system(size: 14)
    public static let md:   Font = .system(size: 16)
    public static let lg:   Font = .system(size: 18)
    public static let xl:   Font = .system(size: 20)
    public static let xxl:  Font = .system(size: 24)
    public static let xxxl: Font = .system(size: 30)
    public static let xxxxl: Font = .system(size: 36)
}
