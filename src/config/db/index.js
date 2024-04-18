const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/page_product', {

        // });
        await mongoose.connect('mongodb+srv://lehai10101010:tien20194184@profuct.ldkskcc.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };
