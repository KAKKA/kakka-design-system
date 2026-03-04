package design.kakka.components.input

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaSpacing

@Composable
fun KakkaTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    placeholder: String? = null,
    errorMessage: String? = null,
    enabled: Boolean = true,
    singleLine: Boolean = true,
) {
    val isError = errorMessage != null

    Column(modifier = modifier) {
        OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier.fillMaxWidth(),
            label = label?.let { { Text(text = it) } },
            placeholder = placeholder?.let { { Text(text = it) } },
            isError = isError,
            enabled = enabled,
            singleLine = singleLine,
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = MaterialTheme.colorScheme.primary,
                unfocusedBorderColor = MaterialTheme.colorScheme.outline,
                errorBorderColor = MaterialTheme.colorScheme.error,
                focusedLabelColor = MaterialTheme.colorScheme.primary,
                unfocusedLabelColor = MaterialTheme.colorScheme.onSurface,
                errorLabelColor = MaterialTheme.colorScheme.error,
            ),
        )
        if (isError && errorMessage != null) {
            Spacer(modifier = Modifier.height(KakkaSpacing.s1))
            Text(
                text = errorMessage,
                color = MaterialTheme.colorScheme.error,
                style = MaterialTheme.typography.bodySmall,
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaTextFieldPreview() {
    KakkaTheme {
        Column {
            KakkaTextField(
                value = "入力済みテキスト",
                onValueChange = {},
                label = "ラベル",
                placeholder = "プレースホルダー",
            )
            Spacer(modifier = Modifier.height(KakkaSpacing.s4))
            KakkaTextField(
                value = "",
                onValueChange = {},
                label = "エラー状態",
                errorMessage = "このフィールドは必須です",
            )
        }
    }
}
