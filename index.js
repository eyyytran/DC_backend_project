const express = require('express')
const app = express()
const cors = require('cors')
const es6Renderer = require('express-es6-template-engine')
const models = require('./db/models')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const store = new SequelizeStore({
    db: models.sequelize,
})
const PORT = 3001
// import routes
const usersRoutes = require('./routes/users')
const projectsRoutes = require('./routes/projects')
const cardsRoutes = require('./routes/cards')
const { getTitle, getScript } = require('./util/locals')
//middleware
app.use(
    cors({ origin: 'http://127.0.0.1:5500', methods: 'GET,POST,PUT,DELETE' })
)
app.use(express.json())
app.use('/public', express.static('./public'))
app.engine('html', es6Renderer)
app.set('views', './views')
app.set('view engine', 'html')
app.use(cookieParser())
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: store,
    })
)
store.sync()
// validate user
// const checkLogin = (req, res, next) => {
//   console.log("check", req.session.user);
//   if (req.session.user) {
//     next();
//   } else {
//     res.render('template', {
//         locals: {
//             title: getTitle('login'),
//             script: getScript('login'),
//         },
//         partials: {
//             partial: 'login',
//         },});
//   }
// };

// use routes
app.use('/users', usersRoutes)
app.use('/projects', projectsRoutes)
app.use('/cards', cardsRoutes)

app.get('/', (req, res) => {
    res.render('template', {
        locals: {
            title: getTitle('index'),
            script: getScript('index'),
        },
        partials: {
            partial: 'index',
        },
    })
})

app.get('/:route', (req, res) => {
    const route = req.params.route
    res.render('template', {
        locals: {
            title: getTitle(route),
            script: getScript(route),
        },
        partials: {
            partial: route,
        },
    })
})

//listening port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
