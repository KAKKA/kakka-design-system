package design.kakka.components.skeleton

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import design.kakka.components.KakkaTheme
import design.kakka.tokens.KakkaColors
import design.kakka.tokens.KakkaRadius
import design.kakka.tokens.KakkaSpacing

enum class KakkaSkeletonVariant { Text, Rect, Circle }

@Composable
fun KakkaSkeleton(
    variant: KakkaSkeletonVariant,
    modifier: Modifier = Modifier,
    width: Dp? = null,
    height: Dp? = null,
) {
    val infiniteTransition = rememberInfiniteTransition(label = "skeleton_shimmer")
    val shimmerOffset by infiniteTransition.animateFloat(
        initialValue = -1f,
        targetValue = 2f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 1200, easing = LinearEasing),
            repeatMode = RepeatMode.Restart,
        ),
        label = "shimmer_offset",
    )

    val shimmerBrush = Brush.linearGradient(
        colors = listOf(
            KakkaColors.gray100,
            KakkaColors.gray200,
            KakkaColors.gray100,
        ),
        start = Offset(shimmerOffset * 600f, 0f),
        end = Offset(shimmerOffset * 600f + 600f, 0f),
    )

    val shape = when (variant) {
        KakkaSkeletonVariant.Circle -> CircleShape
        KakkaSkeletonVariant.Text,
        KakkaSkeletonVariant.Rect -> RoundedCornerShape(KakkaRadius.md)
    }

    val defaultWidth: Dp = when (variant) {
        KakkaSkeletonVariant.Text -> 120.dp
        KakkaSkeletonVariant.Rect -> 200.dp
        KakkaSkeletonVariant.Circle -> 48.dp
    }
    val defaultHeight: Dp = when (variant) {
        KakkaSkeletonVariant.Text -> 16.dp
        KakkaSkeletonVariant.Rect -> 100.dp
        KakkaSkeletonVariant.Circle -> 48.dp
    }

    val resolvedWidth = width ?: defaultWidth
    val resolvedHeight = height ?: defaultHeight

    // Circle は正方形（直径 = width 優先）、Text/Rect は width × height
    val boxModifier = when (variant) {
        KakkaSkeletonVariant.Circle -> modifier.size(resolvedWidth)
        else -> modifier.width(resolvedWidth).height(resolvedHeight)
    }

    Box(
        modifier = boxModifier.background(brush = shimmerBrush, shape = shape),
    )
}

@Preview(showBackground = true)
@Composable
private fun KakkaSkeletonPreview() {
    KakkaTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(KakkaSpacing.s3),
            modifier = Modifier
                .fillMaxWidth()
                .padding(KakkaSpacing.s4),
        ) {
            KakkaSkeleton(variant = KakkaSkeletonVariant.Text)
            KakkaSkeleton(
                variant = KakkaSkeletonVariant.Text,
                width = 200.dp,
                height = 14.dp,
            )
            KakkaSkeleton(
                variant = KakkaSkeletonVariant.Rect,
                width = 280.dp,
                height = 120.dp,
            )
            KakkaSkeleton(variant = KakkaSkeletonVariant.Circle)
            KakkaSkeleton(
                variant = KakkaSkeletonVariant.Circle,
                width = 64.dp,
            )
        }
    }
}
