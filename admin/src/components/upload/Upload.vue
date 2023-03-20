<template>
    <el-upload 
        class="avatar-uploader" 
        action=""
        :show-file-list="false" 
        :auto-upload="false" 
        :on-change="handleChange">

        <img v-if="props.avatarPath" :src="uploadAvatar" class="avatar" />

        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>

    </el-upload>
</template>

<script setup>
import {Plus} from '@element-plus/icons-vue'
import { defineEmits,defineProps,computed } from 'vue'

const props = defineProps({
    avatarPath:String
})

const emit = defineEmits(['uploadOnChange'])

//每次选择完图片的回调
const handleChange = (file) => {
    emit('uploadOnChange',file.raw)
}

const uploadAvatar = computed(() =>
    (props.avatarPath.includes('blob') ? props.avatarPath : `http://localhost:3000${props.avatarPath}`)
)
</script>