import { defineStore } from 'pinia';
import { goodsAPI } from '@/api/goods.js';

export const useGoodsStore = defineStore('goods', {
    state: () => ({
        goods: [],
        good:[]
    }),
    actions: {
        async getGoodsListById(categoryId) {
            try {
                const res = await goodsAPI.getGoodsListById(categoryId);
                this.goods = res.data;
                console.log(this.goods);
                console.log(res);
                return res.data;
            } catch (error) {
                console.error('获取商品列表失败:', error);
            }
        },
        async getGoodsById(goodsId) {
            try {
                const res = await goodsAPI.getGoodsById(goodsId);
                this.good=res.data;
                console.log(this.good);
                return res.data;

            } catch (error) {
                console.error('获取商品失败:', error);
                return null;
            }
        },
    },
});