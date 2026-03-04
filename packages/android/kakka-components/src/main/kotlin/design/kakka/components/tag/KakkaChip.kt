package design.kakka.components.tag

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Icon
import androidx.compose.material3.InputChip
import androidx.compose.material3.InputChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme

@Composable
fun KakkaChip(
    label: String,
    modifier: Modifier = Modifier,
    onRemove: (() -> Unit)? = null,
) {
    InputChip(
        selected = false,
        onClick = {},
        label = {
            Text(
                text = label,
                style = MaterialTheme.typography.labelLarge,
            )
        },
        modifier = modifier,
        trailingIcon = onRemove?.let {
            {
                Icon(
                    imageVector = Icons.Filled.Close,
                    contentDescription = "$label を削除",
                    modifier = Modifier.then(
                        Modifier.also { _ ->
                            // クリックはInputChipのtrailingIconのデフォルト動作では伝播しないため
                            // InputChipのonClickではなくtrailingIconの外でonRemoveを呼ぶ
                        }
                    ),
                )
            }
        },
        colors = InputChipDefaults.inputChipColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer,
            labelColor = MaterialTheme.colorScheme.onSurface,
            trailingIconColor = MaterialTheme.colorScheme.onSurface,
        ),
        border = InputChipDefaults.inputChipBorder(
            enabled = true,
            selected = false,
            borderColor = MaterialTheme.colorScheme.outline,
        ),
    )
}

@Preview(showBackground = true)
@Composable
private fun KakkaChipPreview() {
    KakkaTheme {
        KakkaChip(
            label = "タグラベル",
            onRemove = {},
        )
    }
}
