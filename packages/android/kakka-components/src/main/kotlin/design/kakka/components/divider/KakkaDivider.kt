package design.kakka.components.divider

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaSpacing

@Composable
fun KakkaDivider(
    modifier: Modifier = Modifier,
    label: String? = null,
) {
    if (label == null) {
        HorizontalDivider(
            modifier = modifier.fillMaxWidth(),
            color = MaterialTheme.colorScheme.outline,
        )
    } else {
        Row(
            modifier = modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            HorizontalDivider(
                modifier = Modifier.weight(1f),
                color = MaterialTheme.colorScheme.outline,
            )
            Text(
                text = label,
                modifier = Modifier.padding(horizontal = KakkaSpacing.s3),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f),
            )
            HorizontalDivider(
                modifier = Modifier.weight(1f),
                color = MaterialTheme.colorScheme.outline,
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaDividerPreview() {
    KakkaTheme {
        KakkaDivider(label = "または")
    }
}
