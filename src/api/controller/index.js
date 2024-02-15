const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const goods = await this.model('goods').field(['id', 'name', 'retail_price']).limit(10).select();
    const brands = await this.model('brand').field(['id', 'name', 'pic_url']).limit(9).select();
    const category = await this.model('category').field(['id', 'name']).where({'parent_id': 0}).select();

    const nuandong = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'Attribute': ['like', `%暖冬好物%`]}).limit(12).select();
    const kaimen = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'Attribute': ['like', `%开门红%`]}).limit(12).select();
    const nvshen = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'Attribute': ['like', `%女神节%`]}).limit(12).select();
    const shipin = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'category_id': 256}).limit(12).select();
    const chuangyi = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'category_id': 103}).limit(12).select();
    const shangwu = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'category_id': 65}).limit(12).select();
    const qiche = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'category_id': 67}).limit(12).select();
    const chaopai = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'category_id': 79}).limit(12).select();
    const jiayong = await this.model('goods').field(['id', 'name', 'retail_price', 'primary_pic_url']).where({'category_id': 162}).limit(12).select();
    const ads = await this.model('ad').select();
    return this.success({
      ads: ads,
      goods: goods,
      brands: brands,
      category: category,
      nuandong: nuandong,
      kaimen: kaimen,
      nvshen: nvshen,
      shipin: shipin,
      chuangyi: chuangyi,
      shangwu: shangwu,
      qiche: qiche,
      chaopai: chaopai,
      jiayong: jiayong
    });
  }
};
