import { Image } from "../types";

export async function getImages() {
    try {
        const response = await fetch(
            "http://laravel12-sail-xdebug.test/api/images", 
        );
        if (!response.ok) {
            // 嘗試解析 JSON，但如果失敗則創建一個自定義錯誤
            try {
                const errorData = await response.json();
                throw errorData;
            } catch (jsonError) {
                // 如果無法解析為 JSON，則創建一個自定義錯誤對象
                throw {
                    message: `${response.status} ${response.statusText}`,
                    status: response.status,
                    details: "無法解析服務器響應"
                };
            }
        }
        const {data} = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching images:", error);
        // 確保錯誤有 message 屬性，這樣 ErrorBoundary 可以顯示它
        if (typeof error === 'object' && error !== null && !('message' in error)) {
            error.message = "發生未知錯誤";
        }
        throw error;
    }
}

export async function toggleLikedStatus(id: Image['id']){
    try {
        // 從 cookie 中獲取 CSRF 令牌
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        
        // 解碼 URL 編碼的令牌
        const decodedToken = csrfToken ? decodeURIComponent(csrfToken) : null;
        const response = await fetch(
            `http://laravel12-sail-xdebug.test/api/images/${id}/like`, 
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": decodedToken || '', // 添加 CSRF 令牌頭
                },
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        const {data} = await response.json();
        return data;
    } catch (error) {
        console.error("Error toggling liked status:", error);
        throw error;
    }
}
