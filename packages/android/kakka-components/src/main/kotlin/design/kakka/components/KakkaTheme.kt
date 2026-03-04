package design.kakka.components

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius

private val KakkaLightColorScheme = lightColorScheme(
    primary          = KakkaColors.gray900,
    onPrimary        = KakkaColors.gray0,
    primaryContainer = KakkaColors.gray100,
    secondary        = KakkaColors.accentPrimaryDefault,
    onSecondary      = KakkaColors.gray0,
    background       = KakkaColors.gray0,
    onBackground     = KakkaColors.gray800,
    surface          = KakkaColors.gray50,
    onSurface        = KakkaColors.gray800,
    outline          = KakkaColors.gray200,
    error            = KakkaColors.statusError,
)

private val KakkaDarkColorScheme = darkColorScheme(
    primary          = KakkaColors.gray0,
    onPrimary        = KakkaColors.gray900,
    primaryContainer = KakkaColors.gray800,
    secondary        = KakkaColors.accentPrimaryLight,
    onSecondary      = KakkaColors.gray900,
    background       = KakkaColors.gray900,
    onBackground     = KakkaColors.gray100,
    surface          = KakkaColors.gray800,
    onSurface        = KakkaColors.gray100,
    outline          = KakkaColors.gray700,
    error            = KakkaColors.statusError,
)

private val KakkaShapes = Shapes(
    extraSmall = androidx.compose.foundation.shape.RoundedCornerShape(KakkaRadius.sm),
    small      = androidx.compose.foundation.shape.RoundedCornerShape(KakkaRadius.md),
    medium     = androidx.compose.foundation.shape.RoundedCornerShape(KakkaRadius.lg),
    large      = androidx.compose.foundation.shape.RoundedCornerShape(KakkaRadius.xl),
    extraLarge = androidx.compose.foundation.shape.RoundedCornerShape(KakkaRadius.xxl),
)

private val KakkaTypography = Typography(
    bodyLarge = TextStyle(fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 24.sp),
    bodyMedium = TextStyle(fontWeight = FontWeight.Normal, fontSize = 14.sp, lineHeight = 20.sp),
    bodySmall = TextStyle(fontWeight = FontWeight.Normal, fontSize = 12.sp, lineHeight = 16.sp),
    labelLarge = TextStyle(fontWeight = FontWeight.Medium, fontSize = 14.sp, lineHeight = 20.sp),
    titleLarge = TextStyle(fontWeight = FontWeight.Bold, fontSize = 22.sp, lineHeight = 28.sp),
    headlineMedium = TextStyle(fontWeight = FontWeight.Bold, fontSize = 28.sp, lineHeight = 36.sp),
)

@Composable
fun KakkaTheme(
    darkTheme: Boolean = false,
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = if (darkTheme) KakkaDarkColorScheme else KakkaLightColorScheme,
        shapes = KakkaShapes,
        typography = KakkaTypography,
        content = content,
    )
}
