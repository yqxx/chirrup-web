# 设计系统：风紧扯呼官网

与桌面端应用 `chirrup` 主题对齐。

## 品牌

- 中文名：风紧扯呼
- 代号：Chirrup
- Slogan：局域网实时预警 · 一键切屏

## 颜色

| Role | Hex |
|------|-----|
| Primary | `#171717` |
| Secondary | `#404040` |
| CTA / Accent | `#D4AF37` |
| CTA Hover | `#C4A030` |
| Background | `#FFFFFF` |
| Surface | `#FAFAFA` |
| Accent muted | `#F8F4E8` |
| Text muted | `#525252` |
| Border | `#E5E5E5` |

## 字体

Plus Jakarta Sans（与应用一致），权重 400–800。

## 页面结构

1. Sticky header（品牌 + 导航 + CTA）
2. Hero：品牌 + 主张 + CTA + 切屏动画（主导视觉）
3. Features：6 项能力（纯文案，不再复读切屏演示）
4. How：三步上手
5. Download：本站托管安装包
6. Guide：首次运行分镜
7. Footer

## 隐私

- 桌面端应用不开源；官网不展示源码 / GitHub 入口
- 安装包随 `public/downloads/` 发布

## 动效

- Hero 文案 fade-up
- Mock 窗口轻微 float
- 预警 toast pulse ring
- 尊重 `prefers-reduced-motion`

## 反模式（已规避）

- 不用 Inter / 系统默认栈作主字体
- 不用紫渐变 / 奶油衬线 / 报纸风
- Hero 不做卡片堆、不做浮动徽章贴纸
- 图标用 Lucide SVG，不用 emoji
