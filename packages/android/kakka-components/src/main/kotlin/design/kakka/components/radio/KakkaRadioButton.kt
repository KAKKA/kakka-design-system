package design.kakka.components.radio

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.RadioButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaSpacing

@Composable
fun KakkaRadioButton(
    selected: Boolean,
    onClick: () -> Unit,
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
                        role = Role.RadioButton,
                        onClick = onClick,
                    )
                } else {
                    Modifier
                }
            ),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        RadioButton(
            selected = selected,
            onClick = onClick,
            enabled = enabled,
            colors = RadioButtonDefaults.colors(
                selectedColor = MaterialTheme.colorScheme.primary,
                unselectedColor = MaterialTheme.colorScheme.outline,
                disabledSelectedColor = MaterialTheme.colorScheme.outline,
                disabledUnselectedColor = MaterialTheme.colorScheme.outline,
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
private fun KakkaRadioButtonPreview() {
    KakkaTheme {
        KakkaRadioButton(
            selected = true,
            onClick = {},
            label = "ラジオボタンのラベル",
        )
    }
}
