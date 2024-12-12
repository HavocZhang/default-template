/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_COMPANY: string
    readonly VITE_APP_GWB: string
    readonly VITE_APP_GWB_CODE: number
    readonly VITE_APP_ICP: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}