package design.kakka.tokens

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Auto-synced from @kakka/tokens - update via Style Dictionary

object KakkaColors {
    // Gray scale
    val gray0   = Color(0xFFFFFFFF)
    val gray50  = Color(0xFFF7F7F5)
    val gray100 = Color(0xFFEFEFEC)
    val gray200 = Color(0xFFE0E0DB)
    val gray300 = Color(0xFFC8C8C1)
    val gray400 = Color(0xFFA8A89E)
    val gray500 = Color(0xFF787870)
    val gray600 = Color(0xFF525249)
    val gray700 = Color(0xFF363630)
    val gray800 = Color(0xFF1E1E19)
    val gray900 = Color(0xFF0A0A07)

    // Accent
    val accentPrimaryLight   = Color(0xFFE8E4DC)
    val accentPrimaryDefault = Color(0xFF8B7355)
    val accentPrimaryDark    = Color(0xFF5C4A35)
    val accentSecondary      = Color(0xFF4A6741)

    // Status
    val statusError   = Color(0xFFC0392B)
    val statusWarning = Color(0xFFB7860B)
    val statusSuccess = Color(0xFF4A6741)
}

object KakkaSpacing {
    val s0:  Dp = 0.dp
    val s1:  Dp = 4.dp
    val s2:  Dp = 8.dp
    val s3:  Dp = 12.dp
    val s4:  Dp = 16.dp
    val s5:  Dp = 20.dp
    val s6:  Dp = 24.dp
    val s8:  Dp = 32.dp
    val s10: Dp = 40.dp
    val s12: Dp = 48.dp
    val s16: Dp = 64.dp
    val s20: Dp = 80.dp
}

object KakkaRadius {
    val none: Dp = 0.dp
    val sm:   Dp = 2.dp
    val md:   Dp = 4.dp
    val lg:   Dp = 8.dp   // KAKKAのメインR値
    val xl:   Dp = 12.dp
    val xxl:  Dp = 16.dp
    val full: Dp = 999.dp
}

object KakkaFontSize {
    val xs:  TextUnit = 12.sp
    val sm:  TextUnit = 14.sp
    val md:  TextUnit = 16.sp
    val lg:  TextUnit = 18.sp
    val xl:  TextUnit = 20.sp
    val xxl: TextUnit = 24.sp
    val xxxl: TextUnit = 30.sp
    val xxxxl: TextUnit = 36.sp
}
