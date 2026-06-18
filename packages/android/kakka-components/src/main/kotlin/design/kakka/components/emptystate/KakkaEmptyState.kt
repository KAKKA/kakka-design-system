package design.kakka.components.emptystate

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.SearchOff
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.components.button.KakkaButton
import design.kakka.components.button.KakkaButtonVariant
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaSpacing

@Composable
fun KakkaEmptyState(
    title: String,
    modifier: Modifier = Modifier,
    description: String? = null,
    icon: ImageVector? = null,
    actionLabel: String? = null,
    onAction: (() -> Unit)? = null,
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = KakkaSpacing.s12),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s3),
    ) {
        if (icon != null) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = KakkaColors.gray400,
                modifier = Modifier.size(48.dp),
            )
        }

        Text(
            text = title,
            style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
            color = MaterialTheme.colorScheme.onBackground,
            textAlign = TextAlign.Center,
        )

        if (description != null) {
            Text(
                text = description,
                style = MaterialTheme.typography.bodyMedium,
                color = KakkaColors.gray600,
                textAlign = TextAlign.Center,
            )
        }

        if (actionLabel != null && onAction != null) {
            KakkaButton(
                text = actionLabel,
                onClick = onAction,
                variant = KakkaButtonVariant.Outline,
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaEmptyStatePreview() {
    KakkaTheme {
        KakkaEmptyState(
            title = "データがありません",
            description = "条件を変えて再度検索してみてください。",
            icon = Icons.Default.SearchOff,
            actionLabel = "再検索",
            onAction = {},
        )
    }
}
