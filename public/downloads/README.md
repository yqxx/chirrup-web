# 安装包目录

将私有仓库 `chirrup` 打包产物复制到此目录，并按下列文件名命名（与 `src/config/downloads.ts` 一致）：

| 文件 | 来源 |
|------|------|
| `chirrup-1.0.0-windows-portable.exe` | `npm run build:win:portable` |
| `chirrup-1.0.0-macos.dmg` | `npm run build:mac` |

Windows 仅提供便携版（portable.exe），不提供 NSIS 安装包。

发新版时：更新 `src/config/downloads.ts` 中的 `APP_VERSION` 与文件名，替换本目录文件后推送即可。
