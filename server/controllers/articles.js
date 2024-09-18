const connectDB = require('./../config/db');
require('./../models/article');

const HttpError = require('../settings/error');
const  { Article, User, Category }  = require('./../models');

const ArticleControllel = {

    create: async (req, res, next) => {
        const newArticle = {
            name: req.body.name,
            content: req.body.content,
            CategoryId: req.body.CategoryId,
            UserId: req.body.UserId
        }
        try {
            await Article.create(newArticle);
        } catch (err) {
            const error = new HttpError(
                'Could not create the article, please try again later.',
                500
            );
            return next(error)
        }
        res.json(newArticle);
    },
    
    getAll: async (req, res, next) => {
        let articles;
        try {
            articles = await Article.findAll({ 
                include: [ 
                    { model: User, as: 'user', attributes: ['id', 'firstname'] }, 
                    { model: Category, as: 'category', attributes: ['id', 'name'] },
                ]});
        } catch (err) {
            const error = new HttpError(
                'Something went wrong, could not get articles list.',
                500
            );
            return next(error) 
        }



        // article in articlesarray has User and Category objects, 
        // this helper operation is for make readable fields for client side 
        let updatedArticles = articles.map(article => {
            article.dataValues._user = article.user.dataValues;
            article.dataValues._category = article.category.dataValues;
            return article
        });
        
        return res.json(updatedArticles);
    },

    update: async (req, res, next) => {
        let article;
        let canBePublished = false;
        try {
            article = await Article.findOne({ where: { id: req.params.id }});
            canBePublished = article.text || article.image;
        } catch (err) {
            const error = new HttpError(
                `Something went wrong, could not get artcle with ${req.params.id} id`,
                500
            );
            return next(error);
        }

        if(!canBePublished) {
            const error = new HttpError(
                "Article content can't be empty.",
                400
            );
            return next(error);
        }

        if(article.isPublished === true) {
            const error = new HttpError(
                "Article already published.",
                400
            );
            return next(error);
        }

        try {
            article.isPublished = true;
            await article.save();
        
        } catch(err) {
            const error = new HttpError(
                "Could't publish the article, please try again.",
                400
            );
            return next(error);
        }
        return res.json({ message: "Article is published" });
    }
}

module.exports = ArticleControllel;