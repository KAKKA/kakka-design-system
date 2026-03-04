package design.kakka.components.dialog

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme

@Composable
fun KakkaDialog(
    onDismissRequest: () -> Unit,
    title: String? = null,
    confirmText: String = "OK",
    dismissText: String? = null,
    onConfirm: () -> Unit,
    content: @Composable () -> Unit,
) {
    AlertDialog(
        onDismissRequest = onDismissRequest,
        title = title?.let {
            {
                Text(
                    text = it,
                    style = MaterialTheme.typography.titleLarge,
                )
            }
        },
        text = {
            content()
        },
        confirmButton = {
            TextButton(onClick = onConfirm) {
                Text(
                    text = confirmText,
                    color = MaterialTheme.colorScheme.primary,
                )
            }
        },
        dismissButton = dismissText?.let {
            {
                TextButton(onClick = onDismissRequest) {
                    Text(
                        text = it,
                        color = MaterialTheme.colorScheme.onSurface,
                    )
                }
            }
        },
        containerColor = MaterialTheme.colorScheme.surface,
        titleContentColor = MaterialTheme.colorScheme.onSurface,
        textContentColor = MaterialTheme.colorScheme.onSurface,
        shape = MaterialTheme.shapes.large,
    )
}

@Preview(showBackground = true)
@Composable
private fun KakkaDialogPreview() {
    KakkaTheme {
        KakkaDialog(
            onDismissRequest = {},
            title = "確認",
            confirmText = "OK",
            dismissText = "キャンセル",
            onConfirm = {},
        ) {
            Text(text = "この操作を実行しますか？")
        }
    }
}
