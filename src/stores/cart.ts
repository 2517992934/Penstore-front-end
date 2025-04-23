// stores/cart.ts
import { defineStore } from 'pinia'

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    isChosen: boolean
    description: string
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        selectedItems: [] as CartItem[] // 确保接口字段与实际数据匹配
    }),
    actions: {
        // 添加明确的类型转换
        updateSelected(items: any[]) {
            this.selectedItems = items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                isChosen: item.isChosen,
                description: item.description
            }))
        }
    }
})