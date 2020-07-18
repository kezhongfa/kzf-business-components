# 规则选择器

## 如何使用规则选择器

```javascript
async function openSelectorInstance() {
  const SelectorService = awiat window.SystemJS.import(`/web-common-component/selectors/index.js`);

  SelectorService.open({
    instanceId: 1,
    ruleId: 1,// 规则values
    zIndex: 10000, // 显示层级
    ok(result) {
      console.log(result);
    }
  }).then(instance => {
    console.log(instance);
  });
}
```

规则选择器返回结果格式如下，其中`value`值为`规则ID`

```javascript
result: {
  instanceId: 1, // 选择器ID
  selector: {...}, // 选择器配置
  value: 343, // 规则ID
  total: 122212, //
}
```

## 选择器参数定义

```typescript
interface IDetailSelectorOptions {
  instanceId: string | number; // 选择器实例ID
  value?: string[]; // 规则ID
  ok?(): void; // 选择器确定时执行的回调函数
  close?(): void; // 选择器取消(关闭)时执行的回调函数
  duration?: number; // 选择器关闭时动画时间
  container?: HTMLElement; // 选择器节点需要插入的容器，默认为 document.body
  zIndex?: number; // 选择器节点的`z-index`值
  locale?: any; // 本地化语言包，通常由PortalService中提供
}
```
