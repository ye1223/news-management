<template>
    <div>
        <div id="div1">
        </div>
    </div>
</template>
<script setup>
import E from 'wangeditor'
import {onMounted,defineEmits,defineProps} from 'vue'
const emit = defineEmits(['contentEvent'])
const props = defineProps({
    content:String
})

onMounted(() => {
    // 最先
    const editor = new E('#div1')
    editor.create()

    // 设置初始值
    props.content && editor.txt.html(props.content) // 重新设置编辑器内容

    // 配置 onchange 回调函数
    editor.config.onchange = function (newHtml) {
    // console.log('change 之后最新的 html', newHtml)

    // 传给父组件
    emit('contentEvent',newHtml)
}
})


</script>