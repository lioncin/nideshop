const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * 获取分类栏目数据
   * @returns {Promise.<Promise|void|PreventPromise>}
   */
  async indexAction() {
    const categoryId = this.get('id');

    const model = this.model('category');
    const data = await model.limit(100).where({parent_id: 0}).select();

    let currentCategory = null;
    if (categoryId) {
      currentCategory = await model.where({'id': categoryId}).find();
    }

    if (think.isEmpty(currentCategory)) {
      currentCategory = data[0];
    }

    // 获取子分类数据
    if (currentCategory && currentCategory.id) {
      currentCategory.subCategoryList = await model.where({'parent_id': currentCategory.id}).select();
    }

    return this.success({
      categoryList: data,
      currentCategory: currentCategory
    });
  }

  async currentAction() {
    const categoryId = this.get('id');
    const model = this.model('category');
    const fetchSubCategories = async(category) => {
      const subCategories = await model.where({'parent_id': category.id}).select();
      for (let i = 0; i < subCategories.length; i++) {
        subCategories[i].subCategoryList = await fetchSubCategories(subCategories[i]);
      }
      return subCategories;
    };
    let currentCategory = null;
    if (categoryId) {
      currentCategory = await model.where({'id': categoryId}).find();
      if (currentCategory && currentCategory.id) {
        currentCategory.subCategoryList = await fetchSubCategories(currentCategory);
      }
    }
    return this.success({
      currentCategory: currentCategory
    });
  }
};
