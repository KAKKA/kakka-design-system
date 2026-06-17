import SwiftUI
import KakkaTokens

// MARK: - KakkaSwitch
public struct KakkaSwitch: View {
    @Binding var isOn: Bool
    let label: String?
    let isDisabled: Bool

    @Environment(\.kakkaTheme) private var theme

    public init(isOn: Binding<Bool>, label: String? = nil, isDisabled: Bool = false) {
        self._isOn = isOn
        self.label = label
        self.isDisabled = isDisabled
    }

    public var body: some View {
        if let label = label {
            Toggle(label, isOn: $isOn)
                .tint(KakkaColors.accentPrimaryDefault)
                .disabled(isDisabled)
                .opacity(isDisabled ? 0.5 : 1.0)
        } else {
            Toggle("", isOn: $isOn)
                .labelsHidden()
                .tint(KakkaColors.accentPrimaryDefault)
                .disabled(isDisabled)
                .opacity(isDisabled ? 0.5 : 1.0)
        }
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    @Previewable @State var isOn1 = true
    @Previewable @State var isOn2 = false
    @Previewable @State var isOn3 = true

    VStack(spacing: KakkaSpacing.s4) {
        KakkaSwitch(isOn: $isOn1, label: "通知を受け取る")
        KakkaSwitch(isOn: $isOn2, label: "ダークモード")
        KakkaSwitch(isOn: $isOn3, label: "無効化済み", isDisabled: true)
        HStack {
            Text("ラベルなし")
            Spacer()
            KakkaSwitch(isOn: $isOn1)
        }
    }
    .padding()
}
#endif
