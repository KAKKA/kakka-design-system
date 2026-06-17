package design.kakka.components.stepper

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaSpacing

private val StepCircleSize = 28.dp
private val ConnectorHeight = 2.dp

@Composable
fun KakkaStepper(
    steps: List<String>,
    current: Int,
    modifier: Modifier = Modifier,
) {
    Column(modifier = modifier.fillMaxWidth()) {
        // 上段: 円 + コネクター
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            steps.forEachIndexed { index, _ ->
                val isDone    = index < current
                val isCurrent = index == current

                // ステップ円
                Box(
                    modifier = Modifier
                        .size(StepCircleSize)
                        .clip(CircleShape)
                        .then(
                            if (isDone || isCurrent) {
                                Modifier.background(KakkaColors.accentPrimaryDefault)
                            } else {
                                Modifier
                                    .background(KakkaColors.gray0)
                                    .border(2.dp, KakkaColors.gray300, CircleShape)
                            },
                        ),
                    contentAlignment = Alignment.Center,
                ) {
                    if (isDone) {
                        Icon(
                            imageVector = Icons.Default.Check,
                            contentDescription = null,
                            tint = KakkaColors.gray0,
                            modifier = Modifier.size(16.dp),
                        )
                    } else {
                        Text(
                            text = (index + 1).toString(),
                            style = MaterialTheme.typography.bodySmall,
                            color = if (isCurrent) KakkaColors.gray0 else KakkaColors.gray500,
                        )
                    }
                }

                // コネクター（最後のステップの後ろには付けない）
                if (index < steps.lastIndex) {
                    val connectorColor = if (index < current) {
                        KakkaColors.accentPrimaryDefault
                    } else {
                        KakkaColors.gray200
                    }
                    Box(
                        modifier = Modifier
                            .weight(1f)
                            .height(ConnectorHeight)
                            .background(connectorColor),
                    )
                }
            }
        }

        // 下段: ラベル
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = KakkaSpacing.s2),
        ) {
            steps.forEachIndexed { index, label ->
                val isDone    = index < current
                val isCurrent = index == current

                val labelColor = if (isDone || isCurrent) {
                    KakkaColors.gray800
                } else {
                    KakkaColors.gray500
                }

                // ラベルをステップ円の真下に揃えるため weight は使わず、
                // 各ラベルに同じ weight を付けてテキストを中央寄せにする
                Text(
                    text = label,
                    style = MaterialTheme.typography.bodySmall,
                    color = labelColor,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.weight(1f),
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun KakkaStepperPreview() {
    KakkaTheme {
        KakkaStepper(
            steps = listOf("Cart", "Address", "Payment", "Confirm"),
            current = 2,
            modifier = Modifier.padding(KakkaSpacing.s4),
        )
    }
}
