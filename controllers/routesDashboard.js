const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'description', 'date_created'],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(blogData => {
            const blogs = blogData.map(blog => blog.get({
                plain: true
            }));
            res.render('dashboard', {
                blogs,
                logged_in: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'description', 'date_created'],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'blog_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(blogData => {
            if (!blogData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const blog = blogData.get({
                plain: true
            });
            res.render('edit-blog', {
                blog,
                logged_in: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/new', (req, res) => {
    res.render('new-blog');
});

module.exports = router;