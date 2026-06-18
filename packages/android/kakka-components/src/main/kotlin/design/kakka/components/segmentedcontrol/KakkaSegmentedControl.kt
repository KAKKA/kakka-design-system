package design.kakka.components.segmentedcontrol

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

@Composable
fun KakkaSegmentedControl(
    options: List<String>,
    selectedIndex: Int,
    onSelect: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    Row(
        modifier = modifier
            .background(
                color = KakkaColors.gray100,
                shape = RoundedCornerShape(KakkaRadius.full),
            )
            .padding(4.dp),
    ) {
        options.forEachIndexed { index, option ->
            val isSelected = index == selectedIndex

            Box(
                modifier = Modifier
                    .weight(1f)
                    .then(
                        if (isSelected) {
                            Modifier
                                .shadow(
                                    elevation = 1.dp,
                                    shape = RoundedCornerShape(KakkaRadius.full),
                                    ambientColor = KakkaColors.gray400,
                                    spotColor = KakkaColors.gray400,
                                )
                                .background(
                                    color = KakkaColors.gray0,
                                    shape = RoundedCornerShape(KakkaRadius.full),
                                )
                        } else {
                            Modifier
                        },
                    )
                    .clickable(
                        indication = null,
                        interactionSource = remember { MutableInteractionSource() },
                    ) { onSelect(index) }
                    .padding(vertical = KakkaSpacing.s2, horizontal = KakkaSpacing.s3),
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    text = option,
                    style = MaterialTheme.typography.labelLarge,
                    color = if (isSelected) KakkaColors.gray900 else KakkaColors.gray600,
                    textAlign = TextAlign.Center,
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaSegmentedControlPreview() {
    KakkaTheme {
        var selected by remember { mutableIntStateOf(0) }
        KakkaSegmentedControl(
            options = listOf("Day", "Week", "Month"),
            selectedIndex = selected,
            onSelect = { selected = it },
            modifier = Modifier
                .fillMaxWidth()
                .padding(KakkaSpacing.s4),
        )
    }
}
