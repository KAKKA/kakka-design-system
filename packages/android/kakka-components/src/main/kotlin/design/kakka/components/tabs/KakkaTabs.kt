package design.kakka.components.tabs

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaSpacing

data class KakkaTabItem(val label: String)

@Composable
fun KakkaTabs(
    tabs: List<KakkaTabItem>,
    selectedIndex: Int,
    onSelect: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    Box(modifier = modifier) {
        TabRow(
            selectedTabIndex = selectedIndex,
            modifier = Modifier.fillMaxWidth(),
            containerColor = MaterialTheme.colorScheme.background,
            contentColor = KakkaColors.gray800,
            indicator = { tabPositions ->
                if (selectedIndex < tabPositions.size) {
                    Box(
                        modifier = Modifier
                            .tabIndicatorOffset(tabPositions[selectedIndex])
                            .height(2.dp)
                            .background(KakkaColors.accentPrimaryDefault),
                    )
                }
            },
            divider = {
                HorizontalDivider(
                    thickness = 1.dp,
                    color = KakkaColors.gray200,
                )
            },
        ) {
            tabs.forEachIndexed { index, tab ->
                Tab(
                    selected = index == selectedIndex,
                    onClick = { onSelect(index) },
                    text = {
                        Text(
                            text = tab.label,
                            style = MaterialTheme.typography.labelLarge,
                            color = if (index == selectedIndex) {
                                KakkaColors.gray800
                            } else {
                                KakkaColors.gray500
                            },
                        )
                    },
                    selectedContentColor = KakkaColors.gray800,
                    unselectedContentColor = KakkaColors.gray500,
                    modifier = Modifier.padding(vertical = KakkaSpacing.s3),
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaTabsPreview() {
    KakkaTheme {
        var selected by remember { mutableIntStateOf(0) }
        Column(modifier = Modifier.padding(KakkaSpacing.s4)) {
            KakkaTabs(
                tabs = listOf(
                    KakkaTabItem("ホーム"),
                    KakkaTabItem("お知らせ"),
                    KakkaTabItem("設定"),
                ),
                selectedIndex = selected,
                onSelect = { selected = it },
            )
        }
    }
}
