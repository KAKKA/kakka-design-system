package design.kakka.components.stat

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

enum class KakkaStatDelta { Up, Down, Neutral }

@Composable
fun KakkaStat(
    label: String,
    value: String,
    modifier: Modifier = Modifier,
    delta: String? = null,
    deltaDirection: KakkaStatDelta = KakkaStatDelta.Neutral,
) {
    Column(
        modifier = modifier
            .border(
                width = 1.dp,
                color = KakkaColors.gray200,
                shape = RoundedCornerShape(KakkaRadius.lg),
            )
            .padding(KakkaSpacing.s5),
    ) {
        // label
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = KakkaColors.gray600,
        )

        // value
        Text(
            text = value,
            style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onBackground,
        )

        // delta（任意）
        if (delta != null) {
            val (deltaColor: Color, deltaText: String) = when (deltaDirection) {
                KakkaStatDelta.Up      -> Pair(KakkaColors.statusSuccess, "↑$delta")
                KakkaStatDelta.Down    -> Pair(KakkaColors.statusError, "↓$delta")
                KakkaStatDelta.Neutral -> Pair(KakkaColors.gray600, delta)
            }
            Text(
                text = deltaText,
                style = MaterialTheme.typography.bodySmall,
                color = deltaColor,
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaStatPreview() {
    KakkaTheme {
        Column(modifier = Modifier.padding(KakkaSpacing.s4)) {
            KakkaStat(
                label = "Total Users",
                value = "12,345",
                delta = "5.2%",
                deltaDirection = KakkaStatDelta.Up,
                modifier = Modifier.padding(bottom = KakkaSpacing.s3),
            )
            KakkaStat(
                label = "Revenue",
                value = "¥980,000",
                delta = "2.1%",
                deltaDirection = KakkaStatDelta.Down,
                modifier = Modifier.padding(bottom = KakkaSpacing.s3),
            )
            KakkaStat(
                label = "Sessions",
                value = "4,567",
            )
        }
    }
}
