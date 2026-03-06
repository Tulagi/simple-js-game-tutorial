# 第一章：项目设置

## 学习目标

在本章中，你将学会：
- 如何创建一个基本的 HTML 页面
- 设置开发环境
- 理解项目结构

## 项目结构

```
simple-js-game-tutorial/
├── index.html          # 主页面文件
├── game.js             # 游戏逻辑文件
├── README.md           # 项目说明文档
└── docs/               # 教程文档目录
    └── chapter1-setup.md
```

## 开发环境准备

### 1. 文本编辑器推荐

- **Visual Studio Code** (推荐)
- Sublime Text
- Atom
- WebStorm

### 2. 浏览器要求

- Chrome (推荐)
- Firefox
- Edge
- Safari

### 3. 可选工具

- Live Server 插件 (VS Code)
- Git 版本控制

## 创建基础 HTML 文件

让我们从创建 `index.html` 文件开始：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简单打砖块游戏 - 教程</title>
</head>
<body>
    <h1>我的第一个游戏</h1>
</body>
</html>
```

## 添加 Canvas 元素

Canvas 是 HTML5 提供的绘图 API，我们将使用它来绘制游戏画面：

```html
<canvas id="gameCanvas" width="800" height="600"></canvas>
```

## 完整的基础 HTML 结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简单打砖块游戏 - 教程</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        canvas {
            border: 2px solid #333;
            background-color: #000;
        }
    </style>
</head>
<body>
    <h1>简单打砖块游戏</h1>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    
    <script src="game.js"></script>
</body>
</html>
```

## 下一步

在下一章中，我们将学习如何使用 JavaScript 操作 Canvas 来绘制基本图形。

[前往第二章：基础 HTML 结构 →](chapter2-html.md)