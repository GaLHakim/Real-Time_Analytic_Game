const express = require('express');
const router = express.Router();
const User = require('../models').User;

const auth = require('../controller/authController');
const developer = require('../controller/developerController');
const dashboard = require('../controller/dashboardController');
const project = require('../controller/projectController');
const genre = require('../controller/genreController');
const eventType = require('../controller/eventTypeController');
const activity = require('../controller/activityController');

// const sessionChecker = (req, res, next) => {
//     if (req.session_info && req.cookies.user_id) {
//         req.session_info = req.session;
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }
//     console.log('Session Cek');    
//     console.log(req.session_info);
// };

// router.get('/', (req, res, next) => {
//     res.render('landing', {layout: 'layout_LandingPage'});
// });

router.post('/auth/login', auth.login);
router.post('/auth/signup', auth.signup);
router.get('/auth/edit/:id', auth.edit);
router.put('/auth/update', auth.update);

//#region signup
router.get('/signup', (req, res, next) => {
    res.render('cloud/signup', {
        title: 'Sign Up'
    });
})

//#region signup awal
// router.get('/signup', (req, res, next) => {
//     res.render('signup', {layout: 'layout_Login'});
// })

// router.post('/signup', (req, res, next) => {
//     const dataUser = {
//         developer_name: req.body.developer_name,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password
//     }
//     User.findOne({
//             where: {
//                 email: req.body.email
//             }
//         })
//         .then(user => {
//             if(!user){
//                 User.create(dataUser)
//                     .then(user => {
//                         req.session_info = user.dataValues.id;
//                         res.redirect('/dashboard');
//                     })
//                     .catch(err => {
//                         res.redirect('/signup');
//                         // res.send('gagal create');
//                     });
//                     console.log('Signup Cek');    
//                     console.log(req.session_info);
//             }else{
//                 res.redirect('/signup');
//                 // res.send('sudah ada');
//             }
//         })
//         .catch(err => {
//             res.redirect('/signup');
//             // res.send('gagal findOne' + err);
//         })

    //#region post signup Default
    // User.create({
    //     developer_name: req.body.developer_name,
    //     email: req.body.email,
    //     username: req.body.username,
    //     password: req.body.password
    // })
    // .then(user => {
    //     req.session.user = user.dataValues;
    //     res.redirect('/dashboard');
    // })
    // .catch(error => {
    //     res.redirect('/signup');
    // });
    //#endregion
// });
//#endregion
//#endregion

//#region login
router.get('/login', (req, res, next) => {
    res.render('cloud/login', {
        title: 'Log In'
    });
});

//#region login awal
// router.get('/login', sessionChecker, (req, res, next) => {
//     res.render('login', {layout: 'layout_Login'});
// });
// router.post('/login', (req, res, next) => {
//     const dataUser = {
//         username: req.body.username,
//         password: req.body.password
//     }

//     User.findOne({
//             where: {
//                 username: dataUser.username
//             } 
//         })
//         .then(user => {
//             if (!user) {
//                 res.redirect('/login');
//             } else if (!user.validPassword(dataUser.password)) {
//                 res.redirect('/login');
//             } else {
//                 req.session_info = user.dataValues.id;
//                 res.redirect('/dashboard');
//             }
//             console.log('Login Cek');
//             console.log(req.session_info);
//         })
//         .catch(err => {
//             res.redirect('/login');
//             // res.send('gagal findOne' + err);
//         })
    // #region post login awal 
    // const username = req.body.username,
    //         password = req.body.password;

    // User.findOne({ where: { username: username } })
    // .then((user) => {
    //     if (!user) {
    //         res.redirect('/login');
    //     } else if (!user.validPassword(password)) {
    //         res.redirect('/login');
    //     } else {
    //         req.session.user = user.dataValues;
    //         res.redirect('/dashboard');
    //     }
    // });
    // #endregion
// });
//#endregion
//#endregion

//#region dashboard
router.get('/dashboard', auth.checkLogin, developer.devInfo, (req, res, next) => {
    res.render('cloud/dashboard', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo
    });

    //#region dashboard awal
    // if (req.session_info && req.cookies.user_id) {
    //     res.render('dashboard', {layout: 'layout_AdminPanel', user: req.session_info});
    // }
    // else {
    //     res.redirect('/login');
    // }
    // console.log('Dashboard Cek');
    // console.log(req.session_info);
    //#endregion
});
//#endregion

//#region chart
router.get('/chart', auth.checkLogin, developer.devInfo, project.showProject, (req, res, next) => {
    res.render('cloud/chart', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo,
        project: res.dataAllProject
    });
});
//#endregion

//#region project
router.get('/project', auth.checkLogin, developer.devInfo, project.showProject, genre.showGenre, (req, res, next) => {
    res.render('cloud/project', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo,
        project: res.dataAllProject,
        genre: res.dataAllGenre
    });
});

router.post('/project', project.createProject);
//#endregion

//#region genre
router.post('/genre', genre.create);
//#endregion

//#region activity
router.get('/activity', auth.checkLogin, developer.devInfo, (req, res, next) => {
    res.render('cloud/activity', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo
    });
});

router.get('/api/showActs', activity.showActs);
router.get('/api/actsSelect', activity.actsSelect);
//#endregion

//#region eventType
router.get('/eventType', auth.checkLogin, developer.devInfo, project.showProject, eventType.showEvent, (req, res, next) => {
    res.render('cloud/eventType', {
        title: 'Real-Time Analytic Game',
        devInfo: res.devInfo,
        project: res.dataAllProject,
        eventType: res.dataAllEventType
    });
});

router.post('/eventType', eventType.create);
//#endregion

//#region logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_id) {  
        res.clearCookie('user_id');
        console.log(JSON.stringify(hbsContent)); 
        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});
//#endregion

//#region profile
router.get('/profile', auth.checkLogin, developer.devInfo, (req, res, next) => {
    res.render('profile', {
        layout: 'layout_AdminPanel',
        devInfo: res.devInfo
    });

    //#region awal 2
    // User.findOne({
    //         where: {
    //             id: parseInt(req.session.user.id)
    //         }            
    //     })
    //     .then(user => {
    //         if(user){
    //             res.render('profile', {layout: 'layout_AdminPanel', user: req.session.user});
    //             // res.json(user)
    //         }else{
    //             res.send('gagal')
    //         }
    //     })
    //     .catch(err => {
    //         res.send('gagal findOne: ' + err)
    //     })
    //     console.log(req.session.user);
    //#endregion
    //#region awal
    // if (req.session.user && req.cookies.user_id) {
    //     res.render('profile', {layout: 'layout_AdminPanel', user: req.session.user});
    //     User.findOne({
    //         // where: {
    //         //     id: req.session.user.id
    //         // }            
    //     })
    //     .then(user => {
    //         if(user){
    //             res.json(user.id)
    //         }else{
    //             res.send('gagal')
    //         }
    //     })
    //     .catch(err => {
    //         res.send('error: ' + err)
    //     })
    //     res.render('chart', {layout: 'layout_AdminPanel', user: req.session.user});
    // }
    // else {
    //     res.redirect('/dashboard');
    // }
    //#endregion
});
// router.post('/profileUpdate', (req, res, next) => {
//     const dataUser = {
//         developer_name: req.body.developer_name,
//         email: req.body.email,
//         username: req.body.username,
//         description: req.body.description,
//         address: req.body.address,
//         phone: req.body.phone
//     }
//     User.update(dataUser, {
//             where:{
//                 id: parseInt(req.session.user.id) 
//             }
//         })
//         .then(user => {
//             req.session.user = user.dataValue;
//             // res.redirect('/profile');
//             res.json(user.dataValue)
//         })
//         .catch(err => {
//             // res.redirect('/signup');
//             res.send('gagal update');
//         });
// })
//#endregion

module.exports = router;