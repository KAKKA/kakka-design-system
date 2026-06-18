package design.kakka.components.bottomsheet

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.SheetState
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun KakkaBottomSheet(
    visible: Boolean,
    onDismiss: () -> Unit,
    title: String? = null,
    modifier: Modifier = Modifier,
    sheetState: SheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
    content: @Composable ColumnScope.() -> Unit,
) {
    if (!visible) return

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = sheetState,
        shape = RoundedCornerShape(
            topStart = KakkaRadius.xl,
            topEnd = KakkaRadius.xl,
            bottomStart = KakkaRadius.none,
            bottomEnd = KakkaRadius.none,
        ),
        containerColor = KakkaColors.gray0,
        dragHandle = {
            // デフォルトのドラッグハンドルを利用
            androidx.compose.material3.BottomSheetDefaults.DragHandle()
        },
        modifier = modifier,
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = KakkaSpacing.s6),
        ) {
            if (title != null) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleLarge.copy(fontWeight = FontWeight.Bold),
                    color = MaterialTheme.colorScheme.onBackground,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(
                            start = KakkaSpacing.s4,
                            end = KakkaSpacing.s4,
                            bottom = KakkaSpacing.s4,
                        ),
                )
            }
            content()
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Preview(showBackground = true)
@Composable
private fun KakkaBottomSheetPreview() {
    KakkaTheme {
        var visible by remember { mutableStateOf(true) }
        KakkaBottomSheet(
            visible = visible,
            onDismiss = { visible = false },
            title = "オプションを選択",
        ) {
            Text(
                text = "コンテンツがここに入ります。",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground,
                modifier = Modifier.padding(horizontal = KakkaSpacing.s4),
            )
        }
    }
}
