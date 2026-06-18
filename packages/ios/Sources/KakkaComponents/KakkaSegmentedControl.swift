import SwiftUI
import KakkaTokens

// MARK: - KakkaSegmentedControl
public struct KakkaSegmentedControl: View {
    let options: [String]
    @Binding var selectedIndex: Int

    @Environment(\.kakkaTheme) private var theme

    public init(options: [String], selectedIndex: Binding<Int>) {
        self.options = options
        self._selectedIndex = selectedIndex
    }

    public var body: some View {
        HStack(spacing: 0) {
            ForEach(options.indices, id: \.self) { index in
                Button {
                    selectedIndex = index
                } label: {
                    Text(options[index])
                        .font(KakkaFontSize.sm)
                        .fontWeight(selectedIndex == index ? .semibold : .regular)
                        .foregroundColor(selectedIndex == index ? KakkaColors.gray900 : KakkaColors.gray600)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, KakkaSpacing.s2)
                        .background(
                            Group {
                                if selectedIndex == index {
                                    RoundedRectangle(cornerRadius: KakkaRadius.full)
                                        .fill(KakkaColors.gray0)
                                        .shadow(color: Color.black.opacity(0.08), radius: 2, x: 0, y: 1)
                                } else {
                                    Color.clear
                                }
                            }
                        )
                }
                .buttonStyle(.plain)
            }
        }
        .padding(4)
        .background(KakkaColors.gray100)
        .cornerRadius(KakkaRadius.full)
    }
}

// MARK: - Preview
#if DEBUG
#Preview {
    @Previewable @State var selected1 = 0
    @Previewable @State var selected2 = 1

    VStack(spacing: KakkaSpacing.s4) {
        KakkaSegmentedControl(options: ["すべて", "進行中", "完了"], selectedIndex: $selected1)
        KakkaSegmentedControl(options: ["月", "週", "日"], selectedIndex: $selected2)
    }
    .padding()
}
#endif
