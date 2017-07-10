import angular from '../../libs/angular';
import shopApp from '../module/module';

export default  shopApp.factory("productsFactory", ["$http", ($http) => {

    let recieveData = () => {
        return $http.get('https://www.googleapis.com/books/v1/volumes?q=star')
    };
    var products = [];
    console.log('products', products);

    let factory = {};
    factory.getJSON = () => {
        return recieveData();
    }
    factory.getProducts = () => {
        console.log('products', products);

        return products;
    };
    factory.setProducts = (data) => {
        products = data;

    };
    factory.addProduct = (item) => {
        $http({
            method: 'post',
            url:'https://www.googleapis.com/books/v1/volumes?q=star',
            data: item,
            config: 'Content-Type: application/json;'
        }).then(function (response) {
            console.log(response);
        }, function (response) {
            console.log(response);
        });

        //products.push(item);
        console.log('products', products);

    };
    factory.findProductById = (id) => {
        let found;
        products.forEach((product) => {
            if (product.id == id) {
                found = product;
            }
        });
        return found;
    };
    return factory;
}
]);
