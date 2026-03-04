package design.kakka.components.checkbox

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaSpacing

@Composable
fun KakkaCheckbox(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    enabled: Boolean = true,
) {
    Row(
        modifier = modifier
            .then(
                if (label != null) {
                    Modifier.clickable(
                        enabled = enabled,
                        role = Role.Checkbox,
                        onClick = { onCheckedChange(!checked) },
                    )
                } else {
                    Modifier
                }
            ),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Checkbox(
            checked = checked,
            onCheckedChange = onCheckedChange,
            enabled = enabled,
            colors = CheckboxDefaults.colors(
                checkedColor = MaterialTheme.colorScheme.primary,
                uncheckedColor = MaterialTheme.colorScheme.outline,
                checkmarkColor = MaterialTheme.colorScheme.onPrimary,
                disabledCheckedColor = MaterialTheme.colorScheme.outline,
                disabledUncheckedColor = MaterialTheme.colorScheme.outline,
            ),
        )
        if (label != null) {
            Spacer(modifier = Modifier.width(KakkaSpacing.s2))
            Text(
                text = label,
                style = MaterialTheme.typography.bodyMedium,
                color = if (enabled) {
                    MaterialTheme.colorScheme.onSurface
                } else {
                    MaterialTheme.colorScheme.onSurface.copy(alpha = 0.38f)
                },
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaCheckboxPreview() {
    KakkaTheme {
        KakkaCheckbox(
            checked = true,
            onCheckedChange = {},
            label = "チェックボックスのラベル",
        )
    }
}
