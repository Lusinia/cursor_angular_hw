import angular from '../../libs/angular';
import shopApp from '../module/module';

shopApp.factory("ordersFactory", () => {
    let orders = [ {
        id: 1,
        title: "Cat in the dark",
        img: './img/cat2.jpg',
        desc: "Its just me",
        quantity: 1
    }
    ];
    let factory = {};
    factory.getOrders = () => {
        return  orders;
    };

    factory.addOrder = (item) => {

        if(orders.length >0){
            let isCoincidence = false;
            orders.forEach((order) => {
                if (item.title === order.title) {
                    isCoincidence = true;
                    order.quantity++;
                }
            });
            if (!isCoincidence) {
                orders.push(item);
            }
        }

    };

    return factory;
});
