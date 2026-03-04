// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "KakkaSwiftUI",
    platforms: [.iOS(.v16), .macOS(.v13)],
    products: [
        .library(name: "KakkaTokens", targets: ["KakkaTokens"]),
        .library(name: "KakkaComponents", targets: ["KakkaComponents"]),
    ],
    targets: [
        .target(name: "KakkaTokens", path: "Sources/KakkaTokens"),
        .target(name: "KakkaComponents", dependencies: ["KakkaTokens"], path: "Sources/KakkaComponents"),
        .testTarget(name: "KakkaComponentsTests", dependencies: ["KakkaComponents"], path: "Tests/KakkaComponentsTests"),
    ]
)
