<script setup lang="ts">
const year = new Date().getFullYear().toString()
const company = import.meta.env.VITE_APP_COMPANY
const gwb = import.meta.env.VITE_APP_GWB
const gwbCode = import.meta.env.VITE_APP_GWB_CODE
const icp = import.meta.env.VITE_APP_ICP
</script>
<template>
    <div class="footer">
        <p class="white">Copyright &copy; {{ year }} {{ company }}</p>
        <div class="white">
            <div style="width: 16px;">
                <img class="image_inner" style="width: 100%;height: 100%;" src="/images/galogo.png" />
            </div>
            <a :href="`https://beian.mps.gov.cn/#/query/webSearch?code=${gwbCode}`" rel="noreferrer" target="_blank">{{
                gwb }}</a>
            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" style="margin-left: 20px;">{{ icp
                }}</a>
        </div>
    </div>
</template>
<style scoped>
.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.white {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0;
    font-weight: 400;
    line-height: 19px;
    display: flex;
    align-items: center;
    margin: 5px 0;
}

.image_inner {
    vertical-align: top;
    opacity: 1;
}
</style>