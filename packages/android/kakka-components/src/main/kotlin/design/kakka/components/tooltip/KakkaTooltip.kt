package design.kakka.components.tooltip

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.PlainTooltip
import androidx.compose.material3.Text
import androidx.compose.material3.TooltipBox
import androidx.compose.material3.TooltipDefaults
import androidx.compose.material3.rememberTooltipState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun KakkaTooltip(
    text: String,
    content: @Composable () -> Unit,
    modifier: Modifier = Modifier,
) {
    val tooltipState = rememberTooltipState()

    TooltipBox(
        positionProvider = TooltipDefaults.rememberPlainTooltipPositionProvider(),
        tooltip = {
            PlainTooltip(
                shape = RoundedCornerShape(KakkaRadius.md),
                containerColor = KakkaColors.gray900,
                contentColor = KakkaColors.gray0,
            ) {
                Text(
                    text = text,
                    color = KakkaColors.gray0,
                )
            }
        },
        state = tooltipState,
        modifier = modifier,
    ) {
        content()
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Preview(showBackground = true)
@Composable
private fun KakkaTooltipPreview() {
    KakkaTheme {
        Column(modifier = Modifier.padding(KakkaSpacing.s8)) {
            KakkaTooltip(text = "これはツールチップです") {
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = "情報",
                    tint = KakkaColors.gray500,
                )
            }
        }
    }
}
