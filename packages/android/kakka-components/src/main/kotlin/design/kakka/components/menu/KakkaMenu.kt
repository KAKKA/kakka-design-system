package design.kakka.components.menu

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.MenuDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

data class KakkaMenuItem(
    val label: String,
    val onClick: () -> Unit,
    val danger: Boolean = false,
)

@Composable
fun KakkaMenu(
    expanded: Boolean,
    onDismiss: () -> Unit,
    items: List<KakkaMenuItem>,
    modifier: Modifier = Modifier,
) {
    DropdownMenu(
        expanded = expanded,
        onDismissRequest = onDismiss,
        shape = RoundedCornerShape(KakkaRadius.lg),
        containerColor = KakkaColors.gray0,
        shadowElevation = 4.dp,
        modifier = modifier,
    ) {
        items.forEach { item ->
            DropdownMenuItem(
                text = {
                    Text(
                        text = item.label,
                        style = MaterialTheme.typography.bodyMedium,
                        color = if (item.danger) KakkaColors.statusError else KakkaColors.gray800,
                    )
                },
                onClick = {
                    item.onClick()
                    onDismiss()
                },
                colors = MenuDefaults.itemColors(
                    textColor = if (item.danger) KakkaColors.statusError else KakkaColors.gray800,
                ),
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaMenuPreview() {
    KakkaTheme {
        var expanded by remember { mutableStateOf(true) }
        Box(modifier = Modifier.padding(KakkaSpacing.s4)) {
            IconButton(onClick = { expanded = true }) {
                Icon(
                    imageVector = Icons.Default.MoreVert,
                    contentDescription = "メニューを開く",
                    tint = KakkaColors.gray800,
                )
            }
            KakkaMenu(
                expanded = expanded,
                onDismiss = { expanded = false },
                items = listOf(
                    KakkaMenuItem(label = "編集", onClick = {}),
                    KakkaMenuItem(label = "共有", onClick = {}),
                    KakkaMenuItem(label = "削除", onClick = {}, danger = true),
                ),
            )
        }
    }
}
