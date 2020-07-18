# 级联选择器使用指南

## 如何使用级联选择器

级联选择器可以采用以下两种方式调用：

### 1. 方式一

方式一中的参数`config.instanceId`只能是级联选择器的`实例ID`，这种方式需要请求的静态资源相较方式二更少

```typescript
function open(config: ICascadeSelectorConfig) {
  return SystemJS.import("/web-common-component/selectors/cascade.js").then(
    ({ CascadeSelectorService }) => {
      return CascadeSelectorService.open(config);
    }
  );
}
```

### 2. 方式二

方式二中的参数`config.instanceId`可以为是任何选择器的`实例ID`，选择器在内部会根据选择器的类型做分发，在实际项目中采用该方式可能会更加安全方便。

缺点是需要请求的资源会更多一些。

```typescript
function open(config: ICascadeSelectorConfig) {
  return SystemJS.import("/web-common-component/selectors/index.js").then(
    ({ SelectorService }) => {
      return SelectorService.open(config);
    }
  );
}
```

## 级联选择器帮助函数

一般来说，业务方只会记录选中项的值，而展示的名称则不会被记录，所以我们需要提供一个方法对值进行解析，以便访问页面的时候显示名称

注意：该函数的返回值一个 `Promise，`其结果的格式与 上述 `open` 函数中 `ok` 函数的参数一致，具体请查看下文中 `interface ICascadeSelectorResult`

```typescript
function parseCascadeSelectorResult(config: ICascadeSelectorPreviewConfig) {
  return SystemJS.import("/web-common-component/selectors/cascade.js").then(
    ({ CascadeSelectorService }) => {
      return CascadeSelectorService.preview(config);
    }
  );
}
```

## 级联选择器相关参数和返回值的类型定义如下

### 1. 打开级联选择器时需要传的参数

```typescript
interface ICascadeSelectorConfig {
  instanceId: string | number; // 选择器的ID
  deepth: number; // 选择器的最大层级
  isMultipleSelection: boolean; // 单选|多选
  mode: "SIMPLE" | "COMPOSED"; // 选择器模式，COMPOSED 表示 组合字段模式、SIMPLE 表示 单字段模式
  locale?: any; // 本地化语言包，通常由PortalService中提供
  container?: HTMLElement;
  zIndex?: number; // 弹框的 zIndex，默认为 1050
  ok?(result?: ICascadeSelectorResult): void; // 选择器确认后执行的函数
  close?(): void; // 选择器取消后执行的函数
  okText?: string; // 确认按钮的文案
  cancelText?: string; // 取消按钮的文案
  value?: string[] | string[][]; // 选择器初始值，单选时为 一维数组、多选时为 二维数组
}

interface ICascadeSelectorResult {
  instanceId: string;
  selector: object; // 选择器的配置，需要注意的是该配置是组合过的（不是接口返回的配置）
  value: string[][]; // 二维数组，值为 verboseValue 中的 code
  verboseValue: Array<Array<{ code: string; name: string }>>; // 二维数组，值为 code 和 name 组成的对象
  recommendValue: string[] | string[][]; // 优化过的返回值，当选择器为单选时为 一维数组，多选时为 二维数组
  chains: INode[][]; // 节点链路数组，一般仅作为调试时用
}
```

### 2. 级联选择器根据已选值获取结果的函数的参数格式

```typescript
interface ICascadeSelectorPreviewConfig {
  instanceId: string | number; // 选择器的ID
  deepth: number; // 选择器的最大层级
  isMultipleSelection: boolean; // 单选|多选
  mode: "SIMPLE" | "COMPOSED"; // 选择器模式，COMPOSED 表示 组合字段模式、SIMPLE 表示 单字段模式
  value: string[] | string[][]; // 选择器初始值，单选时为 一维数组、多选时为 二维数组
}
```
