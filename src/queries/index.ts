import { Image } from "../types";

export async function getImages() {
    try {
        const response = await fetch(
            "https://react-backend.chang180backend.com/api/images", 
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
            `https://react-backend.chang180backend.com/api/images/${id}/like`, 
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

export async function addImage(formData: FormData) {
    try {
        // 檢查圖片大小
        const imageFile = formData.get('image') as File;
        if (imageFile) {
            // 檢查檔案大小，假設限制為 2MB
            const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
            if (imageFile.size > MAX_FILE_SIZE) {
                throw {
                    message: "圖片檔案過大，請上傳小於 2MB 的圖片",
                    status: 413,
                    details: "檔案大小超過限制"
                };
            }
        }

        // 從 cookie 中獲取 CSRF 令牌
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            ?.split('=')[1];
        
        // 解碼 URL 編碼的令牌
        const decodedToken = csrfToken ? decodeURIComponent(csrfToken) : null;

        // 檢查我們是否有 CSRF 令牌
        if (!decodedToken) {
            console.warn('CSRF 令牌未找到，這可能導致請求被拒絕');
        }

        // 新增 FormData 除錯訊息
        console.log('FormData 內容:');
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await fetch(
            "https://react-backend.chang180backend.com/api/images",
            {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": decodedToken || '', // 添加 CSRF 令牌頭
                },
                body: formData
            }
        );
        console.log("Response:", response);
        
        if (!response.ok) {
            try {
                // 複製響應以便查看詳細錯誤
                const responseClone = response.clone();
                const errorText = await responseClone.text();
                console.log('錯誤響應文本:', errorText);
                
                try {
                    // 嘗試解析為 JSON
                    const errorJson = JSON.parse(errorText);
                    console.log('錯誤 JSON:', errorJson);
                    
                    // 如果有 Laravel 驗證錯誤
                    if (errorJson.errors) {
                        const errorMessages = Object.values(errorJson.errors)
                            .flat()
                            .join(', ');
                        
                        throw {
                            message: errorMessages,
                            status: response.status,
                            details: errorJson.message || '表單驗證失敗',
                            errors: errorJson.errors
                        };
                    }
                    
                    // 一般錯誤
                    throw errorJson;
                } catch (jsonParseError) {
                    // 如果不是 JSON，使用原始錯誤文本
                    console.log('無法解析錯誤為 JSON:', jsonParseError);
                }
                
                const errorData = await response.json();
                throw errorData;
            } catch (jsonError) {
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
        console.error("Error adding image:", error);
        // 確保錯誤有 message 屬性
        if (typeof error === 'object' && error !== null && !('message' in error)) {
            error.message = "上傳圖片時發生未知錯誤";
        }
        throw error;
    }
}
