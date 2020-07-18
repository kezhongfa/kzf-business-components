# 明细选择器

## 如何使用明细选择器

```javascript
async function openSelectorInstance() {
  const SelectorService = awiat window.SystemJS.import(`/web-common-component/selectors/index.js`);

  SelectorService.open({
    instanceId: 1,
    value: ['1', '2'], //明细value
    zIndex: 10000, // 显示层级
    ok(result) {
      console.log(result);
    }
  }).then(instance => {
    console.log(instance);
  });
}
```

明细选择器返回结果格式如下，其中`value`值为`已选中项的值的集合（数组）`

```javascript
result: {
  instanceId: 1, // 选择器ID
  selector: {...}, // 选择器配置
  value: ['23323', 'wewew'], // 返回字段数组
  verboseValue: {code: 34343, name: 显示名称} // 单选的时候返回的带名称的字段
}
```

## 选择器参数定义

```typescript
interface IDetailSelectorOptions {
  instanceId: string | number; // 选择器实例ID
  value?: string[]; // 已选中值的数组，与 verboseValue 只能存在一个
  verboseValue?: { code: string; name: string }; // 已选中值的数组，与 value 只能存在一个
  ok?(): void; // 选择器确定时执行的回调函数
  close?(): void; // 选择器取消(关闭)时执行的回调函数
  duration?: number; // 选择器关闭时动画时间
  container?: HTMLElement; // 选择器节点需要插入的容器，默认为 document.body
  zIndex?: number; // 选择器节点的`z-index`值
  locale?: any; // 本地化语言包，通常由PortalService中提供
  presetRules?: string; // 前置规则的JSON字符串
}
```
