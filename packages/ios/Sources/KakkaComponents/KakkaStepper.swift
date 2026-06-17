import SwiftUI
import KakkaTokens

// MARK: - KakkaStepper
public struct KakkaStepper: View {
    let steps: [String]
    let current: Int

    @Environment(\.kakkaTheme) private var theme

    public init(steps: [String], current: Int) {
        self.steps = steps
        self.current = current
    }

    private let circleSize: CGFloat = 28

    public var body: some View {
        HStack(alignment: .top, spacing: 0) {
            ForEach(steps.indices, id: \.self) { index in
                VStack(spacing: KakkaSpacing.s1) {
                    HStack(spacing: 0) {
                        // 左コネクター（最初のステップは非表示）
                        if index > 0 {
                            connectorView(forSegmentEndingAt: index)
                        }

                        // ステップ円
                        stepCircle(index: index)

                        // 右コネクター（最後のステップは非表示）
                        if index < steps.count - 1 {
                            connectorView(forSegmentEndingAt: index + 1)
                        }
                    }

                    // ラベル
                    Text(steps[index])
                        .font(KakkaFontSize.xs)
                        .foregroundColor(index <= current ? KakkaColors.gray800 : KakkaColors.gray500)
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)
                }
                .frame(maxWidth: .infinity)
            }
        }
    }

    @ViewBuilder
    private func connectorView(forSegmentEndingAt endIndex: Int) -> some View {
        let isCompleted = endIndex <= current
        Rectangle()
            .fill(isCompleted ? KakkaColors.accentPrimaryDefault : KakkaColors.gray200)
            .frame(maxWidth: .infinity)
            .frame(height: 2)
            .padding(.bottom, circleSize / 2 - 1)
    }

    @ViewBuilder
    private func stepCircle(index: Int) -> some View {
        ZStack {
            if index < current {
                // 完了
                Circle()
                    .fill(KakkaColors.accentPrimaryDefault)
                    .frame(width: circleSize, height: circleSize)
                Image(systemName: "checkmark")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(KakkaColors.gray0)
            } else if index == current {
                // 現在
                Circle()
                    .fill(KakkaColors.accentPrimaryDefault)
                    .frame(width: circleSize, height: circleSize)
                Text("\(index + 1)")
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(KakkaColors.gray0)
            } else {
                // 未到達
                Circle()
                    .fill(Color.clear)
                    .frame(width: circleSize, height: circleSize)
                    .overlay(
                        Circle()
                            .stroke(KakkaColors.gray300, lineWidth: 1.5)
                    )
                Text("\(index + 1)")
                    .font(.system(size: 12, weight: .medium))
                    .foregroundColor(KakkaColors.gray500)
            }
        }
        .frame(width: circleSize, height: circleSize)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    VStack(spacing: KakkaSpacing.s8) {
        KakkaStepper(steps: ["入力", "確認", "完了"], current: 0)
        KakkaStepper(steps: ["入力", "確認", "完了"], current: 1)
        KakkaStepper(steps: ["入力", "確認", "完了"], current: 2)
        KakkaStepper(steps: ["カート", "配送先", "支払い", "確認"], current: 2)
    }
    .padding()
}
#endif
