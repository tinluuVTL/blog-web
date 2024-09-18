const connectDB = require('./../config/db');
require('./../models/category');

const HttpError = require('../settings/error');

const  { Category }  = require('./../models');


const CategoryController = {

    create: async (req, res, next) => {
        const newArticle = {
            name: req.body.name,
            description: req.body.description
        }
        try {
            await Category.create(newArticle);
        } catch (err) {
            const error = new HttpError(
                "Something went wrong, could not create the category.",
                400
            );
            return next(error);
        }
        res.json(newArticle);
    },
    
    getAll: async (req, res, next) => {
        let categories;
        try {
            categories = await Category.findAll(); 
        } catch(err) {
            const error = new HttpError(
                "Something went wrong, could not get categories list",
                500
            );
            return next(error);
        }
        return res.status(201).json(categories);
    },

    delete: async (req, res, next) => {
        let categoryId = req.params.id;
        if(!categoryId) {
            const error = new HttpError(
                "Category id can't be empty.",
                400
            );
            return next(error);
        }

        let category;
        try {
            category = await Category.findOne({ where: { id: categoryId }});
            if(!category) {
                throw new Error("There is no category");
            }
        } catch (err) {
            const error = new HttpError(
                'Something went wrong, could not delete category.',
                500
            );
            return next(error);
        }

        try {
            await category.destroy()
        } catch (err) {
            const error = new HttpError(
                'Something went wrong, could not delete category.',
                500
            );
            return next(error);
        }

        return res.status(201).json(category);


    }
}


module.exports = CategoryController;