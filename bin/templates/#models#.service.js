const { #Model#, sequelize } = require('../models');

const create#Model# = async (#model#Obj) => {
    return await #Model#.create(#model#Obj);
};

const get Definitions= async () => {
    return await #Model#.findAll();
};

const get#Model#ById = async (id) => {
    return await #Model#.findByPk(id, {});
};

const patch#Model#ById = async (id, #model#Obj) => {
    let #model# = await get#Model#ById(id);
    if (!#model#) return;

    #model# = Object.assign(#model#.dataValues, #model#Obj);
    const result = await #Model#.update(#model#,
        {
            where: { id },
            returning: true,
            plain: true,
        });
    if (result.length > 1)
        return result[1].dataValues;
};

const delete#Model#ById = async (id) => {
    await #Model#.destroy({ where: { id } });
    return true;
};

module.exports = {
    create#Model#,
    get#Model#ById,
    get#Model#ByName,
    get#Models#,
    patch#Model#ById,
    delete#Model#ById
}
