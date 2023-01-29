const request = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const Amazonlisting = require('../Model/amazonProduct');
const data = [];

    connectToMongoDb = async () => {
        await mongoose.connect(
            'mongodb+srv://ruban:welcome123ruban@cluster0.lqdhlwj.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true }
            );
        console.log('connected to MongoDb');
    }

const searchItem = [
    'shirts',
    'jeans',
    'pants',    
    'redmi 5',
    'redmi 6',
    'latestmobiles'
]

module.exports = {
    amazon : () => {
            for(index = 0; index <= searchItem.length; index++){
            amazonHeader = async () =>{
                
                    const result = await request.get('https://www.amazon.in/s?k='+searchItem[index]);
                    const $ = await cheerio.load(result);
                  
                    $('.s-asin').each((i,el)=> {
                        const id = $(el).attr('data-asin');
                        const brand = $(el).find('h5 .a-size-base-plus').text();
                        const name = $(el).find('h2 span').text();  
                        const price = $(el).find('.a-price-whole').text();
                        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                        const image = $(el).find('.s-image').attr('src');
                        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                        const datas = {id,brand,name,price,rating,image,link};
                        data.push(datas)
                         Amazonlisting.create({
                              id : id,
                              brand: brand,
                              name: name,
                              price:price,
                              rating:rating,
                              image:image,
                              link:link
                          })
                          .then((listing)=> {
                              console.log(listing)
                          }); 
                        
                    });
                
            return data;
        }
     
         
        
        const main = async () =>{
            await connectToMongoDb();
            const amazonHead = await amazonHeader();
            console.log("Total scrapped : " + amazonHead.length);
          return amazonHead;
        }

        main();
        }
    } 
}