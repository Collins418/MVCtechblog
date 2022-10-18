const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all of the posts for homepage below
router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [ 'id', 'title', 'description', 'date_created' ],
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
            const blogs = blogData.map(blog => blog.get({ plain: true }));
            res.render('homepage', { blogs, logged_in: req.session.logged_in });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//login session
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/blog/:id', (req, res) => {
    Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [ 'id', 'title', 'description', 'date_created' ],
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
            if (!blogData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const blog = blogData.get({ plain: true });
            res.render('single-blog', { blog, logged_in: req.session.logged_in });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// get comments
router.get('/blogs-comments', (req, res) => {
    Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: [ 'id', 'title', 'description', 'date_created' ],
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
            if (!blogData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const blog = blogData.get({ plain: true });

            res.render('blogs-comments', { blog, logged_in: req.session.logged_in });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;