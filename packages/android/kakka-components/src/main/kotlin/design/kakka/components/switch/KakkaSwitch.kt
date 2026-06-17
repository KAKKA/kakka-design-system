package design.kakka.components.switch

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaSpacing

@Composable
fun KakkaSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    label: String? = null,
    enabled: Boolean = true,
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            enabled = enabled,
            colors = SwitchDefaults.colors(
                checkedTrackColor = KakkaColors.accentPrimaryDefault,
                checkedThumbColor = KakkaColors.gray0,
                uncheckedTrackColor = KakkaColors.gray200,
                uncheckedThumbColor = KakkaColors.gray400,
                disabledCheckedTrackColor = KakkaColors.accentPrimaryDefault.copy(alpha = 0.38f),
                disabledUncheckedTrackColor = KakkaColors.gray200.copy(alpha = 0.38f),
            ),
        )

        if (label != null) {
            Spacer(modifier = Modifier.width(KakkaSpacing.s3))
            Text(
                text = label,
                style = MaterialTheme.typography.bodyMedium,
                color = if (enabled) {
                    MaterialTheme.colorScheme.onBackground
                } else {
                    KakkaColors.gray400
                },
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaSwitchPreview() {
    KakkaTheme {
        var checked by remember { mutableStateOf(true) }
        KakkaSwitch(
            checked = checked,
            onCheckedChange = { checked = it },
            label = "通知を受け取る",
            modifier = Modifier.padding(KakkaSpacing.s4),
        )
    }
}
