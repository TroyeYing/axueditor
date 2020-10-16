# axueditor安想 vue 组件库

## 组件一  分页组件

### Install
`npm install axueditor安想 -S`


### Use

#### main.js
```
import Vue from 'vue'
import {axueditor} from ''axueditor;

     Vue.use(axueditor)


 ``` 


#### js:

``` 
 
```


#### vue

```
     <!-- toobars  自定义工具栏   
          isReDataEditor  参数辅助(配合打印组件模板，模板参数简介)  true显示  false不显示
      -->

      <!-- 包中没有静态文件，需要自己放入public里面新建Ueditor文件夹放入，注：自己二次开发的Ueditor作用域已经改变-->
      [静态文件](https://github.com/TroyeYing/Ueditor-static)
     <axueditor 
     :toolbars='toolbars'
     :isReDataEditor="true" 
          
     />
```




####  版本添加内容

**0.01~0.08版本实现功能**
     
     1. 表格拖拽修改
     2. 表格中插入表格
     3. 添加多个标题行标题列且合并拆分单元格不会有问题
     4. 目前表格添加会带一个表格名称变量(方便图表工具使用)


**0.09版本更新内容**

     实现表格的单元格中可添加分割线   
     主要方法修改：queryCommandState()



