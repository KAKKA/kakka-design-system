package design.kakka.catalog

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.components.badge.KakkaBadge
import design.kakka.components.badge.KakkaBadgeVariant
import design.kakka.components.button.KakkaButton
import design.kakka.components.button.KakkaButtonVariant
import design.kakka.components.card.KakkaCard
import design.kakka.components.card.KakkaCardElevation
import design.kakka.components.checkbox.KakkaCheckbox
import design.kakka.components.dialog.KakkaDialog
import design.kakka.components.divider.KakkaDivider
import design.kakka.components.input.KakkaTextField
import design.kakka.components.radio.KakkaRadioButton
import design.kakka.components.spinner.KakkaCircularProgress
import design.kakka.components.spinner.KakkaProgressSize
import design.kakka.components.tag.KakkaChip
import design.kakka.tokens.KakkaSpacing

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            KakkaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background,
                ) {
                    CatalogScreen()
                }
            }
        }
    }
}

@Composable
fun CatalogScreen() {
    var textFieldValue by remember { mutableStateOf("") }
    var checkboxChecked by remember { mutableStateOf(false) }
    var radioSelected by remember { mutableStateOf(0) }
    var showDialog by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(KakkaSpacing.s4),
        verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s6),
    ) {
        item {
            Text(
                text = "KAKKA Design System",
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground,
            )
            Text(
                text = "Android Component Catalog",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.6f),
            )
        }

        // ---- KakkaButton ----
        item {
            SectionHeader(title = "Button")
            Column(verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s2)) {
                KakkaButton(text = "Filled ボタン", onClick = {}, variant = KakkaButtonVariant.Filled)
                KakkaButton(text = "Outline ボタン", onClick = {}, variant = KakkaButtonVariant.Outline)
                KakkaButton(text = "Ghost ボタン", onClick = {}, variant = KakkaButtonVariant.Ghost)
                KakkaButton(text = "Loading...", onClick = {}, loading = true)
                KakkaButton(text = "無効", onClick = {}, enabled = false)
            }
        }

        // ---- KakkaTextField ----
        item {
            SectionHeader(title = "TextField")
            Column(verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s2)) {
                KakkaTextField(
                    value = textFieldValue,
                    onValueChange = { textFieldValue = it },
                    label = "ラベル",
                    placeholder = "テキストを入力してください",
                )
                KakkaTextField(
                    value = "",
                    onValueChange = {},
                    label = "エラー状態",
                    errorMessage = "このフィールドは必須です",
                )
                KakkaTextField(
                    value = "無効状態",
                    onValueChange = {},
                    label = "無効",
                    enabled = false,
                )
            }
        }

        // ---- KakkaCheckbox ----
        item {
            SectionHeader(title = "Checkbox")
            Column(verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s2)) {
                KakkaCheckbox(
                    checked = checkboxChecked,
                    onCheckedChange = { checkboxChecked = it },
                    label = "チェックボックス（クリックで切替）",
                )
                KakkaCheckbox(
                    checked = true,
                    onCheckedChange = {},
                    label = "チェック済み",
                )
                KakkaCheckbox(
                    checked = false,
                    onCheckedChange = {},
                    label = "未チェック（無効）",
                    enabled = false,
                )
            }
        }

        // ---- KakkaRadioButton ----
        item {
            SectionHeader(title = "RadioButton")
            Column(verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s2)) {
                KakkaRadioButton(
                    selected = radioSelected == 0,
                    onClick = { radioSelected = 0 },
                    label = "選択肢 A",
                )
                KakkaRadioButton(
                    selected = radioSelected == 1,
                    onClick = { radioSelected = 1 },
                    label = "選択肢 B",
                )
                KakkaRadioButton(
                    selected = false,
                    onClick = {},
                    label = "無効",
                    enabled = false,
                )
            }
        }

        // ---- KakkaBadge ----
        item {
            SectionHeader(title = "Badge")
            Row(horizontalArrangement = Arrangement.spacedBy(KakkaSpacing.s2)) {
                KakkaBadge(text = "Default")
                KakkaBadge(text = "Accent", variant = KakkaBadgeVariant.Accent)
                KakkaBadge(text = "Success", variant = KakkaBadgeVariant.Success)
                KakkaBadge(text = "Warning", variant = KakkaBadgeVariant.Warning)
                KakkaBadge(text = "Error", variant = KakkaBadgeVariant.Error)
            }
        }

        // ---- KakkaChip ----
        item {
            SectionHeader(title = "Chip (Tag)")
            Row(horizontalArrangement = Arrangement.spacedBy(KakkaSpacing.s2)) {
                KakkaChip(label = "デザイン")
                KakkaChip(label = "削除可能", onRemove = {})
                KakkaChip(label = "Compose", onRemove = {})
            }
        }

        // ---- KakkaCard ----
        item {
            SectionHeader(title = "Card")
            Column(verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s2)) {
                KakkaCard(elevation = KakkaCardElevation.None) {
                    Text("Elevation: None")
                }
                KakkaCard(elevation = KakkaCardElevation.Low) {
                    Text("Elevation: Low（デフォルト）")
                }
                KakkaCard(elevation = KakkaCardElevation.Medium) {
                    Text("Elevation: Medium")
                }
                KakkaCard(elevation = KakkaCardElevation.High) {
                    Text("Elevation: High")
                }
            }
        }

        // ---- KakkaDialog ----
        item {
            SectionHeader(title = "Dialog")
            KakkaButton(
                text = "ダイアログを開く",
                onClick = { showDialog = true },
            )
            if (showDialog) {
                KakkaDialog(
                    onDismissRequest = { showDialog = false },
                    title = "確認",
                    confirmText = "OK",
                    dismissText = "キャンセル",
                    onConfirm = { showDialog = false },
                ) {
                    Text(text = "この操作を実行してよろしいですか？")
                }
            }
        }

        // ---- KakkaCircularProgress ----
        item {
            SectionHeader(title = "CircularProgress (Spinner)")
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(KakkaSpacing.s6),
            ) {
                Column(horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally) {
                    KakkaCircularProgress(size = KakkaProgressSize.Small)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text("Small", style = MaterialTheme.typography.bodySmall)
                }
                Column(horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally) {
                    KakkaCircularProgress(size = KakkaProgressSize.Medium)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text("Medium", style = MaterialTheme.typography.bodySmall)
                }
                Column(horizontalAlignment = androidx.compose.ui.Alignment.CenterHorizontally) {
                    KakkaCircularProgress(size = KakkaProgressSize.Large)
                    Spacer(modifier = Modifier.height(4.dp))
                    Text("Large", style = MaterialTheme.typography.bodySmall)
                }
            }
        }

        // ---- KakkaDivider ----
        item {
            SectionHeader(title = "Divider")
            Column(verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s3)) {
                KakkaDivider()
                KakkaDivider(label = "または")
                KakkaDivider(label = "セクション区切り")
            }
        }

        item {
            Spacer(modifier = Modifier.height(KakkaSpacing.s8))
        }
    }
}

@Composable
private fun SectionHeader(title: String) {
    Column {
        Text(
            text = title,
            style = MaterialTheme.typography.titleLarge,
            color = MaterialTheme.colorScheme.onBackground,
        )
        Spacer(modifier = Modifier.height(KakkaSpacing.s2))
        KakkaDivider()
        Spacer(modifier = Modifier.height(KakkaSpacing.s3))
    }
}
