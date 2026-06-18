package design.kakka.components.alert

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Error
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

enum class KakkaAlertVariant { Info, Success, Warning, Error }

private data class KakkaAlertColors(
    val background: Color,
    val bar: Color,
    val icon: Color,
    val iconVector: ImageVector,
)

private fun alertColors(variant: KakkaAlertVariant): KakkaAlertColors = when (variant) {
    KakkaAlertVariant.Info -> KakkaAlertColors(
        background = KakkaColors.statusBgInfo,
        bar = KakkaColors.statusInfo,
        icon = KakkaColors.statusInfo,
        iconVector = Icons.Default.Info,
    )
    KakkaAlertVariant.Success -> KakkaAlertColors(
        background = KakkaColors.statusBgSuccess,
        bar = KakkaColors.statusSuccess,
        icon = KakkaColors.statusSuccess,
        iconVector = Icons.Default.CheckCircle,
    )
    KakkaAlertVariant.Warning -> KakkaAlertColors(
        background = KakkaColors.statusBgWarning,
        bar = KakkaColors.statusWarning,
        icon = KakkaColors.statusWarning,
        iconVector = Icons.Default.Warning,
    )
    KakkaAlertVariant.Error -> KakkaAlertColors(
        background = KakkaColors.statusBgError,
        bar = KakkaColors.statusError,
        icon = KakkaColors.statusError,
        iconVector = Icons.Default.Error,
    )
}

@Composable
fun KakkaAlert(
    message: String,
    variant: KakkaAlertVariant,
    modifier: Modifier = Modifier,
    title: String? = null,
) {
    val colors = alertColors(variant)

    Row(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(KakkaRadius.md))
            .background(colors.background),
    ) {
        // 左端カラーバー（幅4dp）
        Box(
            modifier = Modifier
                .width(4.dp)
                .matchParentSize()
                .background(colors.bar),
        )

        // アイコン
        Icon(
            imageVector = colors.iconVector,
            contentDescription = null,
            tint = colors.icon,
            modifier = Modifier.padding(
                start = KakkaSpacing.s3,
                top = KakkaSpacing.s3,
                bottom = KakkaSpacing.s3,
                end = KakkaSpacing.s2,
            ),
        )

        // テキスト部
        Column(
            modifier = Modifier
                .weight(1f)
                .padding(
                    top = KakkaSpacing.s3,
                    end = KakkaSpacing.s3,
                    bottom = KakkaSpacing.s3,
                ),
        ) {
            if (title != null) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onBackground,
                )
            }
            Text(
                text = message,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground,
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaAlertPreview() {
    KakkaTheme {
        Column(
            modifier = Modifier.padding(KakkaSpacing.s4),
        ) {
            KakkaAlert(
                message = "This is an info message.",
                title = "Info",
                variant = KakkaAlertVariant.Info,
                modifier = Modifier.padding(bottom = KakkaSpacing.s2),
            )
            KakkaAlert(
                message = "Operation was successful.",
                title = "Success",
                variant = KakkaAlertVariant.Success,
                modifier = Modifier.padding(bottom = KakkaSpacing.s2),
            )
            KakkaAlert(
                message = "Please review before continuing.",
                variant = KakkaAlertVariant.Warning,
                modifier = Modifier.padding(bottom = KakkaSpacing.s2),
            )
            KakkaAlert(
                message = "Something went wrong.",
                title = "Error",
                variant = KakkaAlertVariant.Error,
            )
        }
    }
}
