# uIdea

一个想要超越 Powerpoint 和 keynote 的幻灯片系统。

![QQ20191231-095430@2x.png](https://i.loli.net/2020/03/18/ILzP6DTHZvd97gY.png)

![QQ20191231-105844@2x.png](https://i.loli.net/2020/03/18/ORdIg4y2mxPHj1z.png)

[直接体验](https://pearmini.github.io/uIdea/)

## 缘起

这个项目最初的灵感是来自于 [impress.js](https://github.com/impress/impress.js)，但它使用起来很麻烦（毕竟为了做幻灯片而写代码有点...)，另一方面现有的一些制作幻灯片的软件使用起来不尽人意。

《人类简史》中有一个观点，人类之所以强于其他动物就是因为人类会讲故事。而幻灯片不失为一种讲故事的好方式，所以如何通过幻灯片更快、更有效地将想讲的故事传达给听众，是一个有意思的文字。

于是我将 uIdea 作为了人机交互课程的课设，也就是目前这个版本。但是现在这个版本仍然有很大的改进空间，所以我将它作为我的毕设。希望大家使用后多多提意见，我会在我毕设最后的成果中体现。

## 特色

- 更加符合人们创作流程的使用体验。
- 更少拖拽和对其操作的布局。
- 更加自由和方便的修改样式。
- 拥有有和 impress.js 相似的切换动画和 overview 模式，但是这里的布局和动画都是一键生成，不需要你写代码一张张的调整...
  
## 使用方法

基本的使用方法请移步[这里](https://pearmini.github.io/uIdea/)，并且点击教程。这里只是对其中一些进行更加详细的说明。

### 想法

“想法面板”中的**想法**不仅可以直接拖进**每一页幻灯片**，还可以拖进**大纲面板**。

![Mar-18-2020 17-08-24.gif](https://i.loli.net/2020/03/18/EpX9st8Nz2Hduxl.gif)

### 大纲

支持多种拖拽方式来改变幻灯片的顺序。

![Mar-18-2020 17-12-08.gif](https://i.loli.net/2020/03/18/FvXnlL7eT438suh.gif)

### 结构

每一页幻灯片是由一些视觉元素组成，主要有四种：文字、图片、容器和画布。

#### 文字

文字会根据容器的大小自动调整大小。

#### 图片

因为没有云存储能力，所以推荐将图片存储到[图床](https://zhuanlan.zhihu.com/p/35270383)上，然后将上传图片链接，用来减少浏览器缓存的压力。

#### 容器

容器主要用来对幻灯片进行布局。它可以包含任意数量的元素（包括容器本身），并且可以指定子元素的排列方式：水平或者竖直。

通过调整容器的 `span` 属性可以调整子元素的大小比例关系。

[![80wKPJ.gif](https://s1.ax1x.com/2020/03/18/80wKPJ.gif)](https://imgchr.com/i/80wKPJ)

可以通过拖拽结构面板中的“树”来修改子元素的顺序，或者直接在幻灯片中拖拽交换两者的位置，如下图。

[![80wmaF.gif](https://s1.ax1x.com/2020/03/18/80wmaF.gif)](https://imgchr.com/i/80wmaF)

#### Canvas API

在使用画布的时候，需要将它的内容设置为一个回调函数，该函数的四个参数分别是：

- canvas 对象
- context 对象
- canvas 的 width 属性：会随着容器大小的变化而变化。
- canvas 的 height 属性：会随着容器的大小的变化而变化。

下面这个例子是在画布中间画一个边长为 100 的正方形。

```js
function(canvas, context, width, height){
  const size = 100,
    x = (width - size ) / 2 ,
    y = (height - size ) / 2;
  context.fillStyle = "#000000";
  context.fillRect(x, y, size, size);
}
```

目前动画方式只支持 `setInterval`，不支持 `requestAnimationFrame`。同时在回调函数中需要将 `timer` 返回，这样在组件销毁的时候会调用 `clearInterval(timer)` 清除该计时器。

使用方法如下。

```js
function(canvas, context, width, height){
  const animation = () => {
    // animation code here
  }
  const timer = setInterval(animation, 30)
  return timer;
}
```

### 属性和属性变量

目前属性变量只有两种类型：color 和 number。创建一个属性变量后，首先可以修改名字（“字体大小”，“字体颜色”），然后可以通过拖动将其和选择的元素（文字、容器...）的属性关联起来。

和属性变量关联的属性后面会有一个**眼睛**和**垃圾桶**。在这个状态下，属性的值是不能直接改变的，需要修改与其关联的属性变量的值。点击**眼睛**会高亮对应的属性变量，点击**垃圾桶**会解除属性变量和该属性的绑定，这时可以直接修改该属性的值，同时修改属性变量的值不会影响该属性的值。

下面的动图演示了：新建一个红色的属性变量，并且和两段文字绑定，之后修改该变量的值为蓝色，两段文字的颜色同时发生变化。

![800FFe.gif](https://s1.ax1x.com/2020/03/18/800FFe.gif)

当然已经预设了一些属性变量，大家可以自行修改。

## 技术栈

umi + antd

## Todo

- 更加方便的布局方式。
- 支持动画。
- 扩展性更强的大纲。
- 更加舒服的交互方式。
- 词云模式的布局调整。
- ...
  