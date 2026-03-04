package design.kakka.components.card

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaSpacing

enum class KakkaCardElevation { None, Low, Medium, High }

@Composable
fun KakkaCard(
    modifier: Modifier = Modifier,
    elevation: KakkaCardElevation = KakkaCardElevation.Low,
    content: @Composable () -> Unit,
) {
    val tonalElevationDp = when (elevation) {
        KakkaCardElevation.None   -> 0.dp
        KakkaCardElevation.Low    -> 2.dp
        KakkaCardElevation.Medium -> 4.dp
        KakkaCardElevation.High   -> 8.dp
    }

    Card(
        modifier = modifier,
        shape = MaterialTheme.shapes.medium,
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface,
            contentColor = MaterialTheme.colorScheme.onSurface,
        ),
        elevation = CardDefaults.cardElevation(
            defaultElevation = tonalElevationDp,
        ),
    ) {
        Box(modifier = Modifier.padding(KakkaSpacing.s4)) {
            content()
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaCardPreview() {
    KakkaTheme {
        KakkaCard {
            Text(text = "カードのコンテンツ")
        }
    }
}
