<template>
  <div style="height: 100%">
    <div class="rows">
      <el-collapse v-if="isReDataEditor">
        <el-collapse-item title="参数辅助" name="1">
          <el-row :gutter="24">
            <el-col :span="3">$T[变量名]</el-col>
            <el-col :span="3">$R[条形码]</el-col>
            <el-col :span="3">$E[二维码]</el-col>
            <el-col :span="3">$D[表格名]</el-col>
            <el-col :span="3">$F[列名]</el-col>
            <el-col :span="3">$V[列名]</el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="9">$B[width] 配合$D使用,表格所有边框宽度。$B[0] </el-col>
            <el-col :span="15">$N[t],当前行边框不显示,参数中含有t,则显示上边框,含b显示下边框,左右不显示</el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="7">$VA[value1,+value2] (和)横向合计</el-col>
            <el-col :span="5">$VA[value1,*value2] (积)</el-col>
            <el-col :span="6">$VA[value1,/value2] (比值)</el-col>
            <el-col :span="6">$VA[value1,-value2] (相减)</el-col>
          </el-row>
         
          <el-row :gutter="24">
            <el-col :span="12">$A[纵向合计]，可添加多个，多个时","隔开</el-col>
            <el-col :span="6">$AD[平均数]</el-col>
            <el-col :span="6">$ADD[平均数纵向合计]</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">点状表格边框：$S[dotted]</el-col>
            <el-col :span="6">实线表格边框：$S[solid]</el-col>
            <el-col :span="6">虚线表格边框：$S[dashed]</el-col>
          </el-row>
          <el-row :gutter="20">
             <el-col :span="20">单个单元格边框设置：$C[].参数:rltb,分别为右左上下例:$C[t]显示单元格上边框</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">$FM[图片列] 表格图图片列</el-col>
            <el-col :span="8">$VM[图片行] 表格图图片行</el-col>
            <el-col :span="8">注:$VA[]只穿一个参数显示为空</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
              >$F[arr1-arr2]表格嵌套，显示数据为arr1中的arr2数组</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23"
              >根据表达式显示表格数据(纵向)
              $P[存活,已关闭,con.存活==con.已关闭?con.存活:con.已关闭]
              con固定表达式里变量前缀</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23"
              >根据表达式显示表格数据(横向)
              $PV[存活,已关闭,con.存活==con.已关闭?con.存活:con.已关闭]
              con固定表达式里变量前缀</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23">
              注:$P和$PV中表达式，类似于大于小于这种符号，必须加
              <span style="color: red">单引号</span
              >例如$PV[存活,已关闭,con.存活+'>'+con.已关闭?con.存活:con.已关闭]
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23"
              >$F[arr1-arr2-b-t-l]b,t,l没有顺序,有b最后一条数据有下边框，有t第一条数据有上边框,l居左，居中，r居右</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">自定义表格宽度，在表格属性中</el-col>
            <el-col :span="14" style="color: red"
              >注:不可编辑表格多行多列后,设置表格宽度</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23"
              >$CHECK[数组名] 数据格式
              数组名:[{"content":"444",check:"checked"},{"content":"444"}]含有
              check:"checked"为选中项</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23"
              >$RADIO[[数组名] 数据格式
              数组名:[{"content":"444",select:"checked"},{"content":"444"}]
              select:"checked"为选中项</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23"
              >$W[400~800]和$D[]配合使用设置th是否加粗400不加粗 800加粗</el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="23"
              >$TW[400~800],放在需要设置的th单元格里面设置th内容是否加粗</el-col
            >
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div id="editor" style="width: 100%; height: 90%"></div>
  </div>
</template> 
 
<script>
import "../anx-ueditor/ueditor.config.js";
import "../anx-ueditor/ueditor.all.js";
import "../anx-ueditor/lang/zh-cn/zh-cn.js";
export default {
  name: "axueditor",
  data() {
    return {
      editor: null,
    };
  },
  props: {
    toolbars: {
      type: Array,
      default() {
        return [
          "undo", //撤销
          "redo", //重做
          "inserttable", //插入表格
          "mergeright", //右合并单元格
          "mergedown", //下合并单元格
          "deleterow", //删除行
          "deletecol", //删除列
          "splittorows", //拆分成行
          "splittocols", //拆分成列
          "splittocells", //完全拆分单元格
          "deletecaption", //删除表格标题
          "inserttitle", //插入标题
          "mergecells", //合并多个单元格
          "deletetable", //删除表格
          "cleardoc", //清空文档
          "fontfamily", //字体
          "fontsize", //字号
          "bold", //加粗
          "italic", //斜体
          "justifyleft", //居左对齐
          "justifyright", //居右对齐
          "justifycenter", //居中对齐
          "justifyjustify", //两端对齐
          "forecolor", //字体颜色
          "backcolor", //背景色
        ];
      },
    },
    isReData: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isReDataEditor: {
      type: Boolean,
      default() {
        return false;
      },
    },
    dataResultStr: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.editor = UE_COMMON.getEditor("editor", {
      toolbars: [this.toolbars],
      elementPathEnabled: false,
    });
  },
  watch: {
    isReData(val) {
      if (val && isReDataEditor) {
        let dom = this.editor.getContent();
        let dataR = JSON.parse(this.dataResultStr);
        dataR.domStr = dom;
        this.$emit("handleData", dataR);
      }
    },
    isReDataEditor(val) {
      if (!val) {
        let dom = this.editor.getContent();
        this.$emit("handleData", dom);
      }
    },
  },
};
</script>
<style  lang="scss">
</style>
