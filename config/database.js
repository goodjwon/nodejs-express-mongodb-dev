if(process.env.NODE_ENV==='production'){
    module.exports = {mogoURI:
        'mongodb://goodjwon:eoqkr1031@ds139921.mlab.com:39921/goodjwon-video'
    }
} else {
    module.exports = {mogoURI:
            'mongodb://localhost/goodjwon'
    }
}