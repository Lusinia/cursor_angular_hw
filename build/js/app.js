"use strict";var shopApp=angular.module("shopApp",["ngRoute","ngAnimate"]);shopApp.config(["$routeProvider","$locationProvider",function(t,r){t.when("/",{templateUrl:"../partials/home.html",controller:"mainController"}).when("/add",{templateUrl:"../partials/add.html",controller:"addProduct"}).when("/orders",{templateUrl:"../partials/orders.html",controller:"ShowOrders"}).when("/product/:id",{templateUrl:"../partials/product.html",controller:"ShowProduct"}).otherwise({redirectTo:"/orders"}),r.html5Mode(!0)}]),angular.module("shopApp").run(["$templateCache",function(t){t.put("../partials/add.html",'<div class={{pageStyle}}><h1>Добро пожаловать</h1><h2 class=text-primary>Добавить книгу в список</h2><form name=form class=css-form novalidate><div class=form-group><label for=name>Title <input type=text id=name name=name class=form-control data-ng-model=newProduct.title required ng-minlength=2></label><p ng-show=form.name.$error.minlength class=help-block>Название книги слишком короткое.</p></div><div class=form-group><label for=img>Image url <input type=text id=img class=form-control name=img data-ng-model=newProduct.img required ng-pattern="/^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$/"></label><p ng-show=form.img.$error.pattern class=help-block>Укажите изображение книги.</p></div><div class=form-group><label for=genre>Genre <input type=text id=genre class=form-control name=genre data-ng-model=newProduct.genre required ng-minlength=2></label><p ng-show=form.genre.$error.minlength class=help-block>Какого жанра эта книга.</p></div><div class=form-group><label for=cost>Cost <input type=text id=cost class=form-control name=cost data-ng-model=newProduct.cost required ng-pattern="/^[0-9]{1,}$/"></label><p ng-show=form.cost.$error.pattern class=help-block>Введите стоимость книги.</p></div><div class=form-group><label for=desc>Description <textarea id=desc name=desc class=form-control data-ng-model=newProduct.desc required ng-minlength=2></textarea></label><p ng-show=form.desc.$error.minlength class=help-block>Укажите описание книги.</p></div><div class=buttonWrapper><button type=submit data-ng-click=addProduct() class="btn btn-success" ng-disabled=form.$invalid>Добавить</button> <a href="/" class="btn btn-primary">На главную</a></div></form></div>'),t.put("../partials/home.html",'<div class="{{ pageStyle }}"><h1>Книжный магазин</h1><h2>Книги на любой вкус</h2><div class=buttons><a href=/add class="btn btn-primary btn-lg">Добавить книгу</a> <a href=/orders data-ng-click=setOrdersNumber() class="btn btn-primary btn-lg">Мои заказы <span class="glyphicon glyphicon-flash" aria-hidden=true></span> {{orders.length}}</a></div><ul class=list><li data-ng-repeat=\'prod in products | filter: prod.title | orderBy: "title"\' data-ng-click=showProduct(prod) ng-animate="\'animate\'" data-ng-model=item><md-card><p class=genre>{{ prod.genre }}</p><a href="/product/{{ prod.id }}"><h3>{{ prod.title }}</h3><img src="{{ prod.img }}" width=100 class=md-card-image alt="image caption"><br></a><p class=desc>{{ prod.description.substring(0, 50) }} ...</p><div class=cost>{{prod.cost}} $</div></md-card></li></ul></div>'),t.put("../partials/orders.html",'<div class={{pageStyle}}><h1>Книжная лавочка</h1><h2>Твои заказы</h2><ul class=orders-list><li data-ng-repeat=\'order in orders | filter: order.id | orderBy: "id"\'>№ {{ order.id }}. <span>{{ order.title }}</span> - {{ order.quantity }} pc ({{ order.cost*order.quantity}} $)<button class="btn btn-danger" data-ng-click=removeOrder($index)>Удалить</button></li></ul><div class=sum><span>Общая сумма:</span> <span class=sumInfo>{{ sum }} $</span></div><a href="/" class="btn btn-primary btn-lg">На главную</a></div>'),t.put("../partials/product.html",'<div class={{pageStyle}}><md-toolbar class=md-warn><a href=#orders class="btn btn-primary btn-lg buy" data-ng-click=addOrder(item)>Купить всего за $ {{ cost }}</a></md-toolbar><md-content flex layout-padding><h1>{{ title}}</h1><img class=img-responsive src="{{ img }}" alt=img width=300><p class=desc>{{ description }}</p><p><b>Жанр: <span>{{genre}}</span></b></p></md-content><a href=/orders ng-click=deleteProduct() class="btn btn-warning">Удалить книгу</a> <a href="/" class="btn btn-info">На главную</a></div>')}]),shopApp.factory("ordersFactory",function(){var t=[{id:1,title:"Cat in the dark",img:"./img/cat2.jpg",desc:"Its just me",cost:"50",quantity:1}],r={};return r.getOrders=function(){return t},r.addOrder=function(r){if(t.length>0){var e=!1;t.forEach(function(t){r.title===t.title&&(e=!0,t.quantity++)}),e||t.push(r)}},r.defineCostForItems=function(t){var r=0;return t.forEach(function(t){r+=+t.cost}),r},r}),shopApp.factory("productsFactory",["$http","$location",function(t,r){var e=function(){return t.get("http://localhost:8080/")},o=[],n={};return n.getJSON=function(){return e()},n.getProducts=function(){return o},n.setProducts=function(t){o=t},n.addProduct=function(e){t({method:"post",url:"http://localhost:8080/",data:JSON.stringify(e),config:"Content-Type: application/json;"}).then(function(t){console.log(t),r.path("/")},function(t){console.log(t)})},n.deleteProduct=function(r){var e={index:r.index,productId:r.product.id};t.delete("http://localhost:8080/product/"+e.productId,{params:e}).then(function(t){console.log(t)})},n.findProductById=function(t){var r=void 0;return o.forEach(function(e){e.id==t&&(r=e)}),r},n}]),shopApp.controller("ShowOrders",["$scope","$routeParams","productsFactory","ordersFactory",function(t,r,e,o){t.pageStyle="showOrdersStyle",t.orders=[],t.sum=o.defineCostForItems(o.getOrders()),t.item={},t.selected={value:0};t.orders=o.getOrders(),t.removeOrder=function(r){t.orders[r].quantity>1?t.orders[r].quantity-=1:1===t.orders[r].quantity&&t.orders.splice(r,1)}}]),shopApp.controller("ShowProduct",["$scope","$routeParams","productsFactory","ordersFactory",function(t,r,e,o){t.pageStyle="showProductStyle",t.ProductId=r.id;var n=e.findProductById(t.ProductId);t.img=n.img,t.title=n.title,t.genre=n.genre,t.description=n.description,t.cost=n.cost,t.products=e.getProducts(),t.addOrder=function(t){o.addOrder({title:n.title,id:o.getOrders().length+1,cost:n.cost,quantity:1})},t.deleteProduct=function(){var r=t.products.indexOf(n);e.deleteProduct({index:r,product:n})}}]),shopApp.controller("addProduct",["$scope","productsFactory",function(t,r){t.pageStyle="addStyle",t.addProduct=function(){r.addProduct({title:t.newProduct.title,img:t.newProduct.img,description:t.newProduct.desc,genre:t.newProduct.genre,cost:t.newProduct.cost,id:Math.random()})}}]),shopApp.controller("mainController",["$scope","$location","$routeParams","productsFactory","ordersFactory",function(t,r,e,o,n){t.pageStyle="mainPageStyle",t.pageClass="page-style",t.products=[],t.orders=[],t.item={};var a=function(){o.getJSON().then(function(r){var e=[];r.data.forEach(function(t){var r={};r.description=t.description,r.title=t.title,r.img=t.img,r.genre=t.genre,r.cost=t.cost,r.id=t.id,e.push(r)}),o.setProducts(e),t.products=e})};t.products=a(),t.orders=n.getOrders()}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRlbXBsYXRlcy5qcyIsIm9yZGVycy5qcyIsInByb2R1Y3RzLmpzIiwiU2hvd09yZGVycy5qcyIsIlNob3dQcm9kdWN0LmpzIiwiYWRkUHJvZHVjdC5qcyIsIm1haW5Db250cm9sbGVyLmpzIl0sIm5hbWVzIjpbInNob3BBcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwiY29uZmlnIiwiJHJvdXRlUHJvdmlkZXIiLCIkbG9jYXRpb25Qcm92aWRlciIsIndoZW4iLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJvdGhlcndpc2UiLCJyZWRpcmVjdFRvIiwiaHRtbDVNb2RlIiwicnVuIiwiJHRlbXBsYXRlQ2FjaGUiLCJwdXQiLCJmYWN0b3J5Iiwib3JkZXJzIiwiaWQiLCJ0aXRsZSIsImltZyIsImRlc2MiLCJjb3N0IiwicXVhbnRpdHkiLCJnZXRPcmRlcnMiLCJhZGRPcmRlciIsIml0ZW0iLCJsZW5ndGgiLCJpc0NvaW5jaWRlbmNlIiwiZm9yRWFjaCIsIm9yZGVyIiwicHVzaCIsImRlZmluZUNvc3RGb3JJdGVtcyIsInN1bSIsIiRodHRwIiwiJGxvY2F0aW9uIiwicmVjaWV2ZURhdGEiLCJnZXQiLCJwcm9kdWN0cyIsImdldEpTT04iLCJnZXRQcm9kdWN0cyIsInNldFByb2R1Y3RzIiwiZGF0YSIsImFkZFByb2R1Y3QiLCJtZXRob2QiLCJ1cmwiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsInBhdGgiLCJkZWxldGVQcm9kdWN0IiwicHJvZHVjdEluZm8iLCJpbmRleCIsInByb2R1Y3RJZCIsInByb2R1Y3QiLCJkZWxldGUiLCJwYXJhbXMiLCJmaW5kUHJvZHVjdEJ5SWQiLCJmb3VuZCIsIiRzY29wZSIsIiRyb3V0ZVBhcmFtcyIsInByb2R1Y3RzRmFjdG9yeSIsIm9yZGVyc0ZhY3RvcnkiLCJwYWdlU3R5bGUiLCJzZWxlY3RlZCIsInZhbHVlIiwicmVtb3ZlT3JkZXIiLCJzcGxpY2UiLCJQcm9kdWN0SWQiLCJjdXJyZW50UHJvZHVjdCIsImdlbnJlIiwiZGVzY3JpcHRpb24iLCJpbmRleE9mIiwibmV3UHJvZHVjdCIsIk1hdGgiLCJyYW5kb20iLCJwYWdlQ2xhc3MiLCJjcmVhdGVMaXN0IiwiaXRlbXMiLCJsaXN0Iiwia2V5IiwibGlzdEl0ZW0iXSwibWFwcGluZ3MiOiJBQUFBLGFBR0EsSUFBQUEsUUFBQUMsUUFBQUMsT0FBQSxXQUFBLFVBQUEsY0FLQUYsUUFBQUcsUUFBQSxpQkFBQSxvQkFBQSxTQUFBQyxFQUFBQyxHQUVBRCxFQUdBRSxLQUFBLEtBQ0FDLFlBQUEsd0JBQ0FDLFdBQUEsbUJBSUFGLEtBQUEsUUFDQUMsWUFBQSx1QkFDQUMsV0FBQSxlQUlBRixLQUFBLFdBQ0FDLFlBQUEsMEJBQ0FDLFdBQUEsZUFJQUYsS0FBQSxnQkFDQUMsWUFBQSwyQkFDQUMsV0FBQSxnQkFDQUMsV0FBQUMsV0FBQSxZQUNBTCxFQUFBTSxXQUFBLE1DbkNBVixRQUFBQyxPQUFBLFdBQUFVLEtBQUEsaUJBQUEsU0FBQUMsR0FBQUEsRUFBQUMsSUFBQSx1QkFBQSx3cURBQ0FELEVBQUFDLElBQUEsd0JBQUEsOHpCQUNBRCxFQUFBQyxJQUFBLDBCQUFBLHFnQkFDQUQsRUFBQUMsSUFBQSwyQkFBQSx3Z0JDQUFkLFFBQUFlLFFBQUEsZ0JBQUEsV0FDQSxJQUFBQyxJQUNBQyxHQUFBLEVBQ0FDLE1BQUEsa0JBQ0FDLElBQUEsaUJBQ0FDLEtBQUEsY0FDQUMsS0FBQSxLQUNBQyxTQUFBLElBRUFQLEtBMkJBLE9BMUJBQSxFQUFBUSxVQUFBLFdBQ0EsT0FBQVAsR0FHQUQsRUFBQVMsU0FBQSxTQUFBQyxHQUVBLEdBQUFULEVBQUFVLE9BQUEsRUFBQSxDQUNBLElBQUFDLEdBQUEsRUFDQVgsRUFBQVksUUFBQSxTQUFBQyxHQUNBSixFQUFBUCxRQUFBVyxFQUFBWCxRQUNBUyxHQUFBLEVBQ0FFLEVBQUFQLGNBR0FLLEdBQ0FYLEVBQUFjLEtBQUFMLEtBSUFWLEVBQUFnQixtQkFBQSxTQUFBZixHQUNBLElBQUFn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QUFBSCxNQUNBbkQsS0FBQXdDLEVBQUFjLFdBQUF0RCxLQUNBSixHQUFBMkQsS0FBQUMsZUNQQTdFLFFBQUFRLFdBQUEsa0JBQUEsU0FBQSxZQUFBLGVBQUEsa0JBQUEsZ0JBQUEsU0FBQXFELEVBQUEzQixFQUFBNEIsRUFBQUMsRUFBQUMsR0FDQUgsRUFBQUksVUFBQSxnQkFDQUosRUFBQWlCLFVBQUEsYUFDQWpCLEVBQUF4QixZQUNBd0IsRUFBQTdDLFVBQ0E2QyxFQUFBcEMsUUFFQSxJQUFBc0QsRUFBQSxXQUNBaEIsRUFBQXpCLFVBQUFTLEtBQUEsU0FBQWlDLEdBQ0EsSUFBQUMsS0FDQUQsRUFBQXZDLEtBQUFiLFFBQUEsU0FBQXNELEdBQ0EsSUFBQUMsS0FDQUEsRUFBQVYsWUFBQVMsRUFBQVQsWUFDQVUsRUFBQWpFLE1BQUFnRSxFQUFBaEUsTUFDQWlFLEVBQUFoRSxJQUFBK0QsRUFBQS9ELElBQ0FnRSxFQUFBWCxNQUFBVSxFQUFBVixNQUNBVyxFQUFBOUQsS0FBQTZELEVBQUE3RCxLQUNBOEQsRUFBQWxFLEdBQUFpRSxFQUFBakUsR0FDQWdFLEVBQUFuRCxLQUFBcUQsS0FFQXBCLEVBQUF2QixZQUFBeUMsR0FDQXBCLEVBQUF4QixTQUFBNEMsS0FLQXBCLEVBQUF4QixTQUFBMEMsSUFDQWxCLEVBQUE3QyxPQUFBZ0QsRUFBQXpDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vLyBkZWZpbmUgb3VyIGFwcGxpY2F0aW9uIGFuZCBwdWxsIGluIG5nUm91dGUgYW5kIG5nQW5pbWF0ZVxudmFyIHNob3BBcHAgPSBhbmd1bGFyLm1vZHVsZShcInNob3BBcHBcIiwgW1wibmdSb3V0ZVwiLCBcIm5nQW5pbWF0ZVwiXSk7XG5cbi8vIFJPVVRJTkcgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIHNldCBvdXIgcm91dGluZyBmb3IgdGhpcyBhcHBsaWNhdGlvblxuLy8gZWFjaCByb3V0ZSB3aWxsIHB1bGwgaW4gYSBkaWZmZXJlbnQgY29udHJvbGxlclxuc2hvcEFwcC5jb25maWcoWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsIGZ1bmN0aW9uICgkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICRyb3V0ZVByb3ZpZGVyXG5cbiAgICAvLyBob21lIHBhZ2VcbiAgICAud2hlbihcIi9cIiwge1xuICAgICAgICB0ZW1wbGF0ZVVybDogXCIuLi9wYXJ0aWFscy9ob21lLmh0bWxcIixcbiAgICAgICAgY29udHJvbGxlcjogXCJtYWluQ29udHJvbGxlclwiXG4gICAgfSlcblxuICAgIC8vIGFkZCBwYWdlXG4gICAgLndoZW4oXCIvYWRkXCIsIHtcbiAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi4vcGFydGlhbHMvYWRkLmh0bWxcIixcbiAgICAgICAgY29udHJvbGxlcjogXCJhZGRQcm9kdWN0XCJcbiAgICB9KVxuXG4gICAgLy8gb3JkZXJzIHBhZ2VcbiAgICAud2hlbihcIi9vcmRlcnNcIiwge1xuICAgICAgICB0ZW1wbGF0ZVVybDogXCIuLi9wYXJ0aWFscy9vcmRlcnMuaHRtbFwiLFxuICAgICAgICBjb250cm9sbGVyOiBcIlNob3dPcmRlcnNcIlxuICAgIH0pXG5cbiAgICAvLyBwcm9kdWN0IHBhZ2VcbiAgICAud2hlbihcIi9wcm9kdWN0LzppZFwiLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiBcIi4uL3BhcnRpYWxzL3Byb2R1Y3QuaHRtbFwiLFxuICAgICAgICBjb250cm9sbGVyOiBcIlNob3dQcm9kdWN0XCJcbiAgICB9KS5vdGhlcndpc2UoeyByZWRpcmVjdFRvOiBcIi9vcmRlcnNcIiB9KTtcbiAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG59XSk7IiwiYW5ndWxhci5tb2R1bGUoJ3Nob3BBcHAnKS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KCcuLi9wYXJ0aWFscy9hZGQuaHRtbCcsJzxkaXYgY2xhc3M9e3twYWdlU3R5bGV9fT48aDE+XFx1MDQxNFxcdTA0M0VcXHUwNDMxXFx1MDQ0MFxcdTA0M0UgXFx1MDQzRlxcdTA0M0VcXHUwNDM2XFx1MDQzMFxcdTA0M0JcXHUwNDNFXFx1MDQzMlxcdTA0MzBcXHUwNDQyXFx1MDQ0QzwvaDE+PGgyIGNsYXNzPXRleHQtcHJpbWFyeT5cXHUwNDE0XFx1MDQzRVxcdTA0MzFcXHUwNDMwXFx1MDQzMlxcdTA0MzhcXHUwNDQyXFx1MDQ0QyBcXHUwNDNBXFx1MDQzRFxcdTA0MzhcXHUwNDMzXFx1MDQ0MyBcXHUwNDMyIFxcdTA0NDFcXHUwNDNGXFx1MDQzOFxcdTA0NDFcXHUwNDNFXFx1MDQzQTwvaDI+PGZvcm0gbmFtZT1mb3JtIGNsYXNzPWNzcy1mb3JtIG5vdmFsaWRhdGU+PGRpdiBjbGFzcz1mb3JtLWdyb3VwPjxsYWJlbCBmb3I9bmFtZT5UaXRsZSA8aW5wdXQgdHlwZT10ZXh0IGlkPW5hbWUgbmFtZT1uYW1lIGNsYXNzPWZvcm0tY29udHJvbCBkYXRhLW5nLW1vZGVsPW5ld1Byb2R1Y3QudGl0bGUgcmVxdWlyZWQgbmctbWlubGVuZ3RoPTI+PC9sYWJlbD48cCBuZy1zaG93PWZvcm0ubmFtZS4kZXJyb3IubWlubGVuZ3RoIGNsYXNzPWhlbHAtYmxvY2s+XFx1MDQxRFxcdTA0MzBcXHUwNDM3XFx1MDQzMlxcdTA0MzBcXHUwNDNEXFx1MDQzOFxcdTA0MzUgXFx1MDQzQVxcdTA0M0RcXHUwNDM4XFx1MDQzM1xcdTA0MzggXFx1MDQ0MVxcdTA0M0JcXHUwNDM4XFx1MDQ0OFxcdTA0M0FcXHUwNDNFXFx1MDQzQyBcXHUwNDNBXFx1MDQzRVxcdTA0NDBcXHUwNDNFXFx1MDQ0MlxcdTA0M0FcXHUwNDNFXFx1MDQzNS48L3A+PC9kaXY+PGRpdiBjbGFzcz1mb3JtLWdyb3VwPjxsYWJlbCBmb3I9aW1nPkltYWdlIHVybCA8aW5wdXQgdHlwZT10ZXh0IGlkPWltZyBjbGFzcz1mb3JtLWNvbnRyb2wgbmFtZT1pbWcgZGF0YS1uZy1tb2RlbD1uZXdQcm9kdWN0LmltZyByZXF1aXJlZCBuZy1wYXR0ZXJuPVwiL14oaHR0cHM/OlxcXFwvXFxcXC8pPyhbXFxcXGRhLXpcXFxcLi1dKylcXFxcLihbYS16XFxcXC5dezIsNn0pKFtcXFxcL1xcXFx3IFxcXFwuLV0qKSpcXFxcLz8kL1wiPjwvbGFiZWw+PHAgbmctc2hvdz1mb3JtLmltZy4kZXJyb3IucGF0dGVybiBjbGFzcz1oZWxwLWJsb2NrPlxcdTA0MjNcXHUwNDNBXFx1MDQzMFxcdTA0MzZcXHUwNDM4XFx1MDQ0MlxcdTA0MzUgXFx1MDQzOFxcdTA0MzdcXHUwNDNFXFx1MDQzMVxcdTA0NDBcXHUwNDMwXFx1MDQzNlxcdTA0MzVcXHUwNDNEXFx1MDQzOFxcdTA0MzUgXFx1MDQzQVxcdTA0M0RcXHUwNDM4XFx1MDQzM1xcdTA0MzguPC9wPjwvZGl2PjxkaXYgY2xhc3M9Zm9ybS1ncm91cD48bGFiZWwgZm9yPWdlbnJlPkdlbnJlIDxpbnB1dCB0eXBlPXRleHQgaWQ9Z2VucmUgY2xhc3M9Zm9ybS1jb250cm9sIG5hbWU9Z2VucmUgZGF0YS1uZy1tb2RlbD1uZXdQcm9kdWN0LmdlbnJlIHJlcXVpcmVkIG5nLW1pbmxlbmd0aD0yPjwvbGFiZWw+PHAgbmctc2hvdz1mb3JtLmdlbnJlLiRlcnJvci5taW5sZW5ndGggY2xhc3M9aGVscC1ibG9jaz5cXHUwNDFBXFx1MDQzMFxcdTA0M0FcXHUwNDNFXFx1MDQzM1xcdTA0M0UgXFx1MDQzNlxcdTA0MzBcXHUwNDNEXFx1MDQ0MFxcdTA0MzAgXFx1MDQ0RFxcdTA0NDJcXHUwNDMwIFxcdTA0M0FcXHUwNDNEXFx1MDQzOFxcdTA0MzNcXHUwNDMwLjwvcD48L2Rpdj48ZGl2IGNsYXNzPWZvcm0tZ3JvdXA+PGxhYmVsIGZvcj1jb3N0PkNvc3QgPGlucHV0IHR5cGU9dGV4dCBpZD1jb3N0IGNsYXNzPWZvcm0tY29udHJvbCBuYW1lPWNvc3QgZGF0YS1uZy1tb2RlbD1uZXdQcm9kdWN0LmNvc3QgcmVxdWlyZWQgbmctcGF0dGVybj1cIi9eWzAtOV17MSx9JC9cIj48L2xhYmVsPjxwIG5nLXNob3c9Zm9ybS5jb3N0LiRlcnJvci5wYXR0ZXJuIGNsYXNzPWhlbHAtYmxvY2s+XFx1MDQxMlxcdTA0MzJcXHUwNDM1XFx1MDQzNFxcdTA0MzhcXHUwNDQyXFx1MDQzNSBcXHUwNDQxXFx1MDQ0MlxcdTA0M0VcXHUwNDM4XFx1MDQzQ1xcdTA0M0VcXHUwNDQxXFx1MDQ0MlxcdTA0NEMgXFx1MDQzQVxcdTA0M0RcXHUwNDM4XFx1MDQzM1xcdTA0MzguPC9wPjwvZGl2PjxkaXYgY2xhc3M9Zm9ybS1ncm91cD48bGFiZWwgZm9yPWRlc2M+RGVzY3JpcHRpb24gPHRleHRhcmVhIGlkPWRlc2MgbmFtZT1kZXNjIGNsYXNzPWZvcm0tY29udHJvbCBkYXRhLW5nLW1vZGVsPW5ld1Byb2R1Y3QuZGVzYyByZXF1aXJlZCBuZy1taW5sZW5ndGg9Mj48L3RleHRhcmVhPjwvbGFiZWw+PHAgbmctc2hvdz1mb3JtLmRlc2MuJGVycm9yLm1pbmxlbmd0aCBjbGFzcz1oZWxwLWJsb2NrPlxcdTA0MjNcXHUwNDNBXFx1MDQzMFxcdTA0MzZcXHUwNDM4XFx1MDQ0MlxcdTA0MzUgXFx1MDQzRVxcdTA0M0ZcXHUwNDM4XFx1MDQ0MVxcdTA0MzBcXHUwNDNEXFx1MDQzOFxcdTA0MzUgXFx1MDQzQVxcdTA0M0RcXHUwNDM4XFx1MDQzM1xcdTA0MzguPC9wPjwvZGl2PjxkaXYgY2xhc3M9YnV0dG9uV3JhcHBlcj48YnV0dG9uIHR5cGU9c3VibWl0IGRhdGEtbmctY2xpY2s9YWRkUHJvZHVjdCgpIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzXCIgbmctZGlzYWJsZWQ9Zm9ybS4kaW52YWxpZD5cXHUwNDE0XFx1MDQzRVxcdTA0MzFcXHUwNDMwXFx1MDQzMlxcdTA0MzhcXHUwNDQyXFx1MDQ0QzwvYnV0dG9uPiA8YSBocmVmPVwiL1wiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+XFx1MDQxRFxcdTA0MzAgXFx1MDQzM1xcdTA0M0JcXHUwNDMwXFx1MDQzMlxcdTA0M0RcXHUwNDQzXFx1MDQ0RTwvYT48L2Rpdj48L2Zvcm0+PC9kaXY+Jyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJy4uL3BhcnRpYWxzL2hvbWUuaHRtbCcsJzxkaXYgY2xhc3M9XCJ7eyBwYWdlU3R5bGUgfX1cIj48aDE+XFx1MDQxQVxcdTA0M0RcXHUwNDM4XFx1MDQzNlxcdTA0M0RcXHUwNDRCXFx1MDQzOSBcXHUwNDNDXFx1MDQzMFxcdTA0MzNcXHUwNDMwXFx1MDQzN1xcdTA0MzhcXHUwNDNEPC9oMT48aDI+XFx1MDQxQVxcdTA0M0RcXHUwNDM4XFx1MDQzM1xcdTA0MzggXFx1MDQzRFxcdTA0MzAgXFx1MDQzQlxcdTA0NEVcXHUwNDMxXFx1MDQzRVxcdTA0MzkgXFx1MDQzMlxcdTA0M0FcXHUwNDQzXFx1MDQ0MTwvaDI+PGRpdiBjbGFzcz1idXR0b25zPjxhIGhyZWY9L2FkZCBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIj5cXHUwNDE0XFx1MDQzRVxcdTA0MzFcXHUwNDMwXFx1MDQzMlxcdTA0MzhcXHUwNDQyXFx1MDQ0QyBcXHUwNDNBXFx1MDQzRFxcdTA0MzhcXHUwNDMzXFx1MDQ0MzwvYT4gPGEgaHJlZj0vb3JkZXJzIGRhdGEtbmctY2xpY2s9c2V0T3JkZXJzTnVtYmVyKCkgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWxnXCI+XFx1MDQxQ1xcdTA0M0VcXHUwNDM4IFxcdTA0MzdcXHUwNDMwXFx1MDQzQVxcdTA0MzBcXHUwNDM3XFx1MDQ0QiA8c3BhbiBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tZmxhc2hcIiBhcmlhLWhpZGRlbj10cnVlPjwvc3Bhbj4ge3tvcmRlcnMubGVuZ3RofX08L2E+PC9kaXY+PHVsIGNsYXNzPWxpc3Q+PGxpIGRhdGEtbmctcmVwZWF0PVxcJ3Byb2QgaW4gcHJvZHVjdHMgfCBmaWx0ZXI6IHByb2QudGl0bGUgfCBvcmRlckJ5OiBcInRpdGxlXCJcXCcgZGF0YS1uZy1jbGljaz1zaG93UHJvZHVjdChwcm9kKSBuZy1hbmltYXRlPVwiXFwnYW5pbWF0ZVxcJ1wiIGRhdGEtbmctbW9kZWw9aXRlbT48bWQtY2FyZD48cCBjbGFzcz1nZW5yZT57eyBwcm9kLmdlbnJlIH19PC9wPjxhIGhyZWY9XCIvcHJvZHVjdC97eyBwcm9kLmlkIH19XCI+PGgzPnt7IHByb2QudGl0bGUgfX08L2gzPjxpbWcgc3JjPVwie3sgcHJvZC5pbWcgfX1cIiB3aWR0aD0xMDAgY2xhc3M9bWQtY2FyZC1pbWFnZSBhbHQ9XCJpbWFnZSBjYXB0aW9uXCI+PGJyPjwvYT48cCBjbGFzcz1kZXNjPnt7IHByb2QuZGVzY3JpcHRpb24uc3Vic3RyaW5nKDAsIDUwKSB9fSAuLi48L3A+PGRpdiBjbGFzcz1jb3N0Pnt7cHJvZC5jb3N0fX0gJDwvZGl2PjwvbWQtY2FyZD48L2xpPjwvdWw+PC9kaXY+Jyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJy4uL3BhcnRpYWxzL29yZGVycy5odG1sJywnPGRpdiBjbGFzcz17e3BhZ2VTdHlsZX19PjxoMT5cXHUwNDFBXFx1MDQzRFxcdTA0MzhcXHUwNDM2XFx1MDQzRFxcdTA0MzBcXHUwNDRGIFxcdTA0M0JcXHUwNDMwXFx1MDQzMlxcdTA0M0VcXHUwNDQ3XFx1MDQzQVxcdTA0MzA8L2gxPjxoMj5cXHUwNDIyXFx1MDQzMlxcdTA0M0VcXHUwNDM4IFxcdTA0MzdcXHUwNDMwXFx1MDQzQVxcdTA0MzBcXHUwNDM3XFx1MDQ0QjwvaDI+PHVsIGNsYXNzPW9yZGVycy1saXN0PjxsaSBkYXRhLW5nLXJlcGVhdD1cXCdvcmRlciBpbiBvcmRlcnMgfCBmaWx0ZXI6IG9yZGVyLmlkIHwgb3JkZXJCeTogXCJpZFwiXFwnPlxcdTIxMTYge3sgb3JkZXIuaWQgfX0uIDxzcGFuPnt7IG9yZGVyLnRpdGxlIH19PC9zcGFuPiAtIHt7IG9yZGVyLnF1YW50aXR5IH19IHBjICh7eyBvcmRlci5jb3N0Km9yZGVyLnF1YW50aXR5fX0gJCk8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXJcIiBkYXRhLW5nLWNsaWNrPXJlbW92ZU9yZGVyKCRpbmRleCk+XFx1MDQyM1xcdTA0MzRcXHUwNDMwXFx1MDQzQlxcdTA0MzhcXHUwNDQyXFx1MDQ0QzwvYnV0dG9uPjwvbGk+PC91bD48ZGl2IGNsYXNzPXN1bT48c3Bhbj5cXHUwNDFFXFx1MDQzMVxcdTA0NDlcXHUwNDMwXFx1MDQ0RiBcXHUwNDQxXFx1MDQ0M1xcdTA0M0NcXHUwNDNDXFx1MDQzMDo8L3NwYW4+IDxzcGFuIGNsYXNzPXN1bUluZm8+e3sgc3VtIH19ICQ8L3NwYW4+PC9kaXY+PGEgaHJlZj1cIi9cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIj5cXHUwNDFEXFx1MDQzMCBcXHUwNDMzXFx1MDQzQlxcdTA0MzBcXHUwNDMyXFx1MDQzRFxcdTA0NDNcXHUwNDRFPC9hPjwvZGl2PicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCcuLi9wYXJ0aWFscy9wcm9kdWN0Lmh0bWwnLCc8ZGl2IGNsYXNzPXt7cGFnZVN0eWxlfX0+PG1kLXRvb2xiYXIgY2xhc3M9bWQtd2Fybj48YSBocmVmPSNvcmRlcnMgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWxnIGJ1eVwiIGRhdGEtbmctY2xpY2s9YWRkT3JkZXIoaXRlbSk+XFx1MDQxQVxcdTA0NDNcXHUwNDNGXFx1MDQzOFxcdTA0NDJcXHUwNDRDIFxcdTA0MzJcXHUwNDQxXFx1MDQzNVxcdTA0MzNcXHUwNDNFIFxcdTA0MzdcXHUwNDMwICQge3sgY29zdCB9fTwvYT48L21kLXRvb2xiYXI+PG1kLWNvbnRlbnQgZmxleCBsYXlvdXQtcGFkZGluZz48aDE+e3sgdGl0bGV9fTwvaDE+PGltZyBjbGFzcz1pbWctcmVzcG9uc2l2ZSBzcmM9XCJ7eyBpbWcgfX1cIiBhbHQ9aW1nIHdpZHRoPTMwMD48cCBjbGFzcz1kZXNjPnt7IGRlc2NyaXB0aW9uIH19PC9wPjxwPjxiPlxcdTA0MTZcXHUwNDMwXFx1MDQzRFxcdTA0NDA6IDxzcGFuPnt7Z2VucmV9fTwvc3Bhbj48L2I+PC9wPjwvbWQtY29udGVudD48YSBocmVmPS9vcmRlcnMgbmctY2xpY2s9ZGVsZXRlUHJvZHVjdCgpIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCI+XFx1MDQyM1xcdTA0MzRcXHUwNDMwXFx1MDQzQlxcdTA0MzhcXHUwNDQyXFx1MDQ0QyBcXHUwNDNBXFx1MDQzRFxcdTA0MzhcXHUwNDMzXFx1MDQ0MzwvYT4gPGEgaHJlZj1cIi9cIiBjbGFzcz1cImJ0biBidG4taW5mb1wiPlxcdTA0MURcXHUwNDMwIFxcdTA0MzNcXHUwNDNCXFx1MDQzMFxcdTA0MzJcXHUwNDNEXFx1MDQ0M1xcdTA0NEU8L2E+PC9kaXY+Jyk7fV0pOyIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHNob3BBcHAuZmFjdG9yeShcIm9yZGVyc0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3JkZXJzID0gW3tcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgdGl0bGU6IFwiQ2F0IGluIHRoZSBkYXJrXCIsXG4gICAgICAgICAgICBpbWc6ICcuL2ltZy9jYXQyLmpwZycsXG4gICAgICAgICAgICBkZXNjOiBcIkl0cyBqdXN0IG1lXCIsXG4gICAgICAgICAgICBjb3N0OiAnNTAnLFxuICAgICAgICAgICAgcXVhbnRpdHk6IDFcbiAgICAgICAgfV07XG4gICAgICAgIHZhciBmYWN0b3J5ID0ge307XG4gICAgICAgIGZhY3RvcnkuZ2V0T3JkZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG9yZGVycztcbiAgICAgICAgfTtcblxuICAgICAgICBmYWN0b3J5LmFkZE9yZGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgICAgICAgICAgaWYgKG9yZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ29pbmNpZGVuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBvcmRlcnMuZm9yRWFjaChmdW5jdGlvbiAob3JkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udGl0bGUgPT09IG9yZGVyLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0NvaW5jaWRlbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLnF1YW50aXR5Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQ29pbmNpZGVuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmYWN0b3J5LmRlZmluZUNvc3RGb3JJdGVtcyA9IGZ1bmN0aW9uIChvcmRlcnMpIHtcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICAgICAgb3JkZXJzLmZvckVhY2goZnVuY3Rpb24gKG9yZGVyKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9ICtvcmRlci5jb3N0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc3VtO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZmFjdG9yeTtcbiAgICB9KTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgLy8gRkFDVE9SWVxuICAgIHNob3BBcHAuZmFjdG9yeShcInByb2R1Y3RzRmFjdG9yeVwiLCBbXCIkaHR0cFwiLCBcIiRsb2NhdGlvblwiLCBmdW5jdGlvbiAoJGh0dHAsICRsb2NhdGlvbikge1xuXG4gICAgICAgIHZhciByZWNpZXZlRGF0YSA9IGZ1bmN0aW9uIHJlY2lldmVEYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgcHJvZHVjdHMgPSBbXTtcblxuICAgICAgICB2YXIgZmFjdG9yeSA9IHt9O1xuICAgICAgICBmYWN0b3J5LmdldEpTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVjaWV2ZURhdGEoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZmFjdG9yeS5nZXRQcm9kdWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0cztcbiAgICAgICAgfTtcbiAgICAgICAgZmFjdG9yeS5zZXRQcm9kdWN0cyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBwcm9kdWN0cyA9IGRhdGE7XG4gICAgICAgIH07XG4gICAgICAgIGZhY3RvcnkuYWRkUHJvZHVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgICAgICAgICAgICAgY29uZmlnOiAnQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uOydcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvJyk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZmFjdG9yeS5kZWxldGVQcm9kdWN0ID0gZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgdmFyIHByb2R1Y3RJbmZvID0ge1xuICAgICAgICAgICAgICAgIGluZGV4OiBkYXRhLmluZGV4LFxuICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogZGF0YS5wcm9kdWN0LmlkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJGh0dHAuZGVsZXRlKCdodHRwOi8vbG9jYWxob3N0OjgwODAvcHJvZHVjdC8nICsgcHJvZHVjdEluZm8ucHJvZHVjdElkLCB7IHBhcmFtczogcHJvZHVjdEluZm8gfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZmFjdG9yeS5maW5kUHJvZHVjdEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIHZhciBmb3VuZCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24gKHByb2R1Y3QpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvZHVjdC5pZCA9PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHByb2R1Y3Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmYWN0b3J5O1xuICAgIH1dKTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgc2hvcEFwcC5jb250cm9sbGVyKFwiU2hvd09yZGVyc1wiLCBbXCIkc2NvcGVcIiwgXCIkcm91dGVQYXJhbXNcIiwgXCJwcm9kdWN0c0ZhY3RvcnlcIiwgXCJvcmRlcnNGYWN0b3J5XCIsIGZ1bmN0aW9uICgkc2NvcGUsICRyb3V0ZVBhcmFtcywgcHJvZHVjdHNGYWN0b3J5LCBvcmRlcnNGYWN0b3J5KSB7XG4gICAgICAgICRzY29wZS5wYWdlU3R5bGUgPSAnc2hvd09yZGVyc1N0eWxlJztcbiAgICAgICAgJHNjb3BlLm9yZGVycyA9IFtdO1xuICAgICAgICAkc2NvcGUuc3VtID0gb3JkZXJzRmFjdG9yeS5kZWZpbmVDb3N0Rm9ySXRlbXMob3JkZXJzRmFjdG9yeS5nZXRPcmRlcnMoKSk7XG4gICAgICAgICRzY29wZS5pdGVtID0ge307XG4gICAgICAgICRzY29wZS5zZWxlY3RlZCA9IHsgdmFsdWU6IDAgfTtcblxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICAkc2NvcGUub3JkZXJzID0gb3JkZXJzRmFjdG9yeS5nZXRPcmRlcnMoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpbml0KCk7XG4gICAgICAgICRzY29wZS5yZW1vdmVPcmRlciA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLm9yZGVyc1tpdGVtXS5xdWFudGl0eSA+IDEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub3JkZXJzW2l0ZW1dLnF1YW50aXR5IC09IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCRzY29wZS5vcmRlcnNbaXRlbV0ucXVhbnRpdHkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUub3JkZXJzLnNwbGljZShpdGVtLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG59KSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHNob3BBcHAuY29udHJvbGxlcihcIlNob3dQcm9kdWN0XCIsIFtcIiRzY29wZVwiLCBcIiRyb3V0ZVBhcmFtc1wiLCBcInByb2R1Y3RzRmFjdG9yeVwiLCBcIm9yZGVyc0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCRzY29wZSwgJHJvdXRlUGFyYW1zLCBwcm9kdWN0c0ZhY3RvcnksIG9yZGVyc0ZhY3RvcnkpIHtcbiAgICAgICAgJHNjb3BlLnBhZ2VTdHlsZSA9ICdzaG93UHJvZHVjdFN0eWxlJztcbiAgICAgICAgJHNjb3BlLlByb2R1Y3RJZCA9ICRyb3V0ZVBhcmFtcy5pZDtcbiAgICAgICAgdmFyIGN1cnJlbnRQcm9kdWN0ID0gcHJvZHVjdHNGYWN0b3J5LmZpbmRQcm9kdWN0QnlJZCgkc2NvcGUuUHJvZHVjdElkKTtcbiAgICAgICAgJHNjb3BlLmltZyA9IGN1cnJlbnRQcm9kdWN0LmltZztcbiAgICAgICAgJHNjb3BlLnRpdGxlID0gY3VycmVudFByb2R1Y3QudGl0bGU7XG4gICAgICAgICRzY29wZS5nZW5yZSA9IGN1cnJlbnRQcm9kdWN0LmdlbnJlO1xuICAgICAgICAkc2NvcGUuZGVzY3JpcHRpb24gPSBjdXJyZW50UHJvZHVjdC5kZXNjcmlwdGlvbjtcbiAgICAgICAgJHNjb3BlLmNvc3QgPSBjdXJyZW50UHJvZHVjdC5jb3N0O1xuICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSBwcm9kdWN0c0ZhY3RvcnkuZ2V0UHJvZHVjdHMoKTtcblxuICAgICAgICAkc2NvcGUuYWRkT3JkZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgb3JkZXJzRmFjdG9yeS5hZGRPcmRlcih7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGN1cnJlbnRQcm9kdWN0LnRpdGxlLFxuICAgICAgICAgICAgICAgIGlkOiBvcmRlcnNGYWN0b3J5LmdldE9yZGVycygpLmxlbmd0aCArIDEsXG4gICAgICAgICAgICAgICAgY29zdDogY3VycmVudFByb2R1Y3QuY29zdCxcbiAgICAgICAgICAgICAgICBxdWFudGl0eTogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmRlbGV0ZVByb2R1Y3QgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5wcm9kdWN0cy5pbmRleE9mKGN1cnJlbnRQcm9kdWN0KTtcbiAgICAgICAgICAgIHByb2R1Y3RzRmFjdG9yeS5kZWxldGVQcm9kdWN0KHtcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcHJvZHVjdDogY3VycmVudFByb2R1Y3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1dKTtcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgc2hvcEFwcC5jb250cm9sbGVyKFwiYWRkUHJvZHVjdFwiLCBbXCIkc2NvcGVcIiwgXCJwcm9kdWN0c0ZhY3RvcnlcIiwgZnVuY3Rpb24gKCRzY29wZSwgcHJvZHVjdHNGYWN0b3J5KSB7XG4gICAgICAgICRzY29wZS5wYWdlU3R5bGUgPSAnYWRkU3R5bGUnO1xuXG4gICAgICAgICRzY29wZS5hZGRQcm9kdWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcHJvZHVjdHNGYWN0b3J5LmFkZFByb2R1Y3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAkc2NvcGUubmV3UHJvZHVjdC50aXRsZSxcbiAgICAgICAgICAgICAgICBpbWc6ICRzY29wZS5uZXdQcm9kdWN0LmltZyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJHNjb3BlLm5ld1Byb2R1Y3QuZGVzYyxcbiAgICAgICAgICAgICAgICBnZW5yZTogJHNjb3BlLm5ld1Byb2R1Y3QuZ2VucmUsXG4gICAgICAgICAgICAgICAgY29zdDogJHNjb3BlLm5ld1Byb2R1Y3QuY29zdCxcbiAgICAgICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfV0pO1xufSkoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uICgpIHtcblxuICAgIC8vIENPTlRST0xMRVJTID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgLy8gaG9tZSBwYWdlIGNvbnRyb2xsZXJcbiAgICBzaG9wQXBwLmNvbnRyb2xsZXIoXCJtYWluQ29udHJvbGxlclwiLCBbXCIkc2NvcGVcIiwgXCIkbG9jYXRpb25cIiwgXCIkcm91dGVQYXJhbXNcIiwgXCJwcm9kdWN0c0ZhY3RvcnlcIiwgXCJvcmRlcnNGYWN0b3J5XCIsIGZ1bmN0aW9uICgkc2NvcGUsICRsb2NhdGlvbiwgJHJvdXRlUGFyYW1zLCBwcm9kdWN0c0ZhY3RvcnksIG9yZGVyc0ZhY3RvcnkpIHtcbiAgICAgICAgJHNjb3BlLnBhZ2VTdHlsZSA9ICdtYWluUGFnZVN0eWxlJztcbiAgICAgICAgJHNjb3BlLnBhZ2VDbGFzcyA9IFwicGFnZS1zdHlsZVwiO1xuICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSBbXTtcbiAgICAgICAgJHNjb3BlLm9yZGVycyA9IFtdO1xuICAgICAgICAkc2NvcGUuaXRlbSA9IHt9O1xuXG4gICAgICAgIHZhciBjcmVhdGVMaXN0ID0gZnVuY3Rpb24gY3JlYXRlTGlzdCgpIHtcbiAgICAgICAgICAgIHByb2R1Y3RzRmFjdG9yeS5nZXRKU09OKCkudGhlbihmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIGl0ZW1zLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaXN0SXRlbSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5kZXNjcmlwdGlvbiA9IGtleS5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0udGl0bGUgPSBrZXkudGl0bGU7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmltZyA9IGtleS5pbWc7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmdlbnJlID0ga2V5LmdlbnJlO1xuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jb3N0ID0ga2V5LmNvc3Q7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmlkID0ga2V5LmlkO1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gobGlzdEl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHByb2R1Y3RzRmFjdG9yeS5zZXRQcm9kdWN0cyhsaXN0KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSBsaXN0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gY3JlYXRlTGlzdCgpO1xuICAgICAgICAgICAgJHNjb3BlLm9yZGVycyA9IG9yZGVyc0ZhY3RvcnkuZ2V0T3JkZXJzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaW5pdCgpO1xuICAgIH1dKTtcbn0pKCk7Il19
