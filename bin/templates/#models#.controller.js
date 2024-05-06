const #models#Service = require('../services/#models#.service');
const logger = require('../logger');

const get#Models#= async (req, res, next) => {
    try {
        const #models# = await #models#Service.get#Models#();
        res.status(200).json({#models#});
    } catch (err) {
        next(err)
    };
};

const get#Model#ById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send('Id is required');
        const #model# = await #models#Service.get#Model#(id);
        if (!#model#) return res.status(404).send();
        res.status(200).json(#model#);
    } catch (err) {
        next(err)
    };
};

const create#Model# = async (req, res, next) => {
    try {
        const #model# = await #models#Service.create#Model#(req.body);
        if (!#model#) return res.status(404).send();
        logger.save('info', 'create#Model#', {
            id: #model#.id,
            user: req.session.user
        });
        res.location(`/#models#/${#model#.id}`);
        res.status(200).json(#model#);
    } catch (err) {
        next(err)
    };
};

const patch#Model# = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send('Id is required');
        const #model# = await #models#Service.patch#Model#(id, req.body);
        if (!#model#) return res.status(404).send();
        logger.save('info', 'patch#Model#', {
            id,
            user: req.session.user
        });
        res.location(`/#models#/${#model#.id}`);
        res.status(200).json(#model#);
    } catch (err) {
        next(err)
    };
};

const delete#Model# = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send('Id is required');
        const exist = await #models#Service.delete#Model#(id);
        if (!exist) return res.status(404).send();
        logger.save('info', 'delete#Model#', {
            id,
            user: req.session.user
        });
        res.status(200).send();
    } catch (err) {
        next(err)
    };
};

module.exports = {
    get#Models#,
    get#Model#ById,
    create#Model#,
    patch#Model#,
    delete#Model#
};
