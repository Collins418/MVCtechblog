const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const dataUser = require('./dataUser.json');
const dataBlog = require('./dataBlog.json');
const dataComment = require('./dataComment.json');


const seedDatabase = async () => {
    await sequelize.sync({
        force: true
    });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });


    const blogs = await Blog.bulkCreate(blogData,{
        individualHooks: true,
        returning:true,
    });

    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();