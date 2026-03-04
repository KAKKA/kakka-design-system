package design.kakka.components.spinner

import androidx.compose.foundation.layout.size
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme

enum class KakkaProgressSize { Small, Medium, Large }

@Composable
fun KakkaCircularProgress(
    modifier: Modifier = Modifier,
    size: KakkaProgressSize = KakkaProgressSize.Medium,
) {
    val sizeDp: Dp = when (size) {
        KakkaProgressSize.Small  -> 20.dp
        KakkaProgressSize.Medium -> 36.dp
        KakkaProgressSize.Large  -> 56.dp
    }

    val strokeWidth: Dp = when (size) {
        KakkaProgressSize.Small  -> 2.dp
        KakkaProgressSize.Medium -> 3.dp
        KakkaProgressSize.Large  -> 4.dp
    }

    CircularProgressIndicator(
        modifier = modifier.size(sizeDp),
        color = MaterialTheme.colorScheme.primary,
        strokeWidth = strokeWidth,
        trackColor = MaterialTheme.colorScheme.primaryContainer,
    )
}

@Preview(showBackground = true)
@Composable
private fun KakkaCircularProgressPreview() {
    KakkaTheme {
        KakkaCircularProgress(size = KakkaProgressSize.Medium)
    }
}
