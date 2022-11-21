const mongoose = require('mongoose');

const Filme = mongoose.model('Filme', { 
        tittle: String,
        subtitle: String,
        description: String,
        image_url: String,
        trailer_url: String,
});

module.exports = Filme;