const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const goods = await this.model('goods').field(['id', 'name', 'retail_price']).limit(10).select();
    const brands = await this.model('brand').field(['id', 'name', 'pic_url']).limit(9).select();
    const category = await this.model('category').field(['id', 'name']).where({'parent_id': 0}).select();
    return this.success({
      goods: goods,
      brands: brands,
      category: category
    });
  }
};
