package design.kakka.components.badge

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

enum class KakkaBadgeVariant { Default, Accent, Success, Warning, Error }

@Composable
fun KakkaBadge(
    text: String,
    modifier: Modifier = Modifier,
    variant: KakkaBadgeVariant = KakkaBadgeVariant.Default,
) {
    val (backgroundColor, contentColor) = when (variant) {
        KakkaBadgeVariant.Default -> Pair(
            MaterialTheme.colorScheme.primaryContainer,
            MaterialTheme.colorScheme.onSurface,
        )
        KakkaBadgeVariant.Accent -> Pair(
            KakkaColors.accentPrimaryDefault,
            KakkaColors.gray0,
        )
        KakkaBadgeVariant.Success -> Pair(
            KakkaColors.statusSuccess.copy(alpha = 0.15f),
            KakkaColors.statusSuccess,
        )
        KakkaBadgeVariant.Warning -> Pair(
            KakkaColors.statusWarning.copy(alpha = 0.15f),
            KakkaColors.statusWarning,
        )
        KakkaBadgeVariant.Error -> Pair(
            KakkaColors.statusError.copy(alpha = 0.15f),
            KakkaColors.statusError,
        )
    }

    Box(
        modifier = modifier
            .background(
                color = backgroundColor,
                shape = RoundedCornerShape(KakkaRadius.full),
            )
            .padding(horizontal = KakkaSpacing.s3, vertical = KakkaSpacing.s1),
        contentAlignment = Alignment.Center,
    ) {
        Text(
            text = text,
            color = contentColor,
            style = MaterialTheme.typography.labelLarge,
        )
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaBadgePreview() {
    KakkaTheme {
        KakkaBadge(text = "デフォルト")
    }
}
