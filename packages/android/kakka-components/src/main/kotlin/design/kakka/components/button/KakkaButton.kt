package design.kakka.components.button

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme

enum class KakkaButtonVariant { Filled, Outline, Ghost }
enum class KakkaButtonSize { Large, Medium, Small }

@Composable
fun KakkaButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    variant: KakkaButtonVariant = KakkaButtonVariant.Filled,
    size: KakkaButtonSize = KakkaButtonSize.Medium,
    enabled: Boolean = true,
    loading: Boolean = false,
) {
    val padding = when (size) {
        KakkaButtonSize.Large  -> PaddingValues(horizontal = 28.dp, vertical = 14.dp)
        KakkaButtonSize.Medium -> PaddingValues(horizontal = 20.dp, vertical = 10.dp)
        KakkaButtonSize.Small  -> PaddingValues(horizontal = 14.dp, vertical = 6.dp)
    }
    val content: @Composable () -> Unit = {
        if (loading) {
            CircularProgressIndicator(modifier = Modifier.size(16.dp), strokeWidth = 2.dp)
        } else {
            Text(text)
        }
    }

    when (variant) {
        KakkaButtonVariant.Filled -> Button(
            onClick = onClick,
            modifier = modifier,
            enabled = enabled && !loading,
            contentPadding = padding,
            colors = ButtonDefaults.buttonColors(
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = MaterialTheme.colorScheme.onPrimary,
            ),
            content = { content() },
        )
        KakkaButtonVariant.Outline -> OutlinedButton(
            onClick = onClick,
            modifier = modifier,
            enabled = enabled && !loading,
            contentPadding = padding,
            border = BorderStroke(1.5.dp, MaterialTheme.colorScheme.primary),
            content = { content() },
        )
        KakkaButtonVariant.Ghost -> TextButton(
            onClick = onClick,
            modifier = modifier,
            enabled = enabled && !loading,
            contentPadding = padding,
            content = { content() },
        )
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaButtonPreview() {
    KakkaTheme {
        KakkaButton(text = "KAKKA Button", onClick = {})
    }
}
