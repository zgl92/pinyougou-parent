//定义品优购 品牌控制器(controller)
app.controller('brandController', function ($scope, $controller, brandService) {


     $controller('baseController',{$scope:$scope});


    //查询品牌列表
    $scope.findAll = function () {
        brandService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }


    /*//分页控件配置  currentPage:当前页  totalItems:总记录数 itemsPerPage:每页记录数  perPageOptions:分页选项  onChange:当页码重新变更后自动触发的方法
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            $scope.reloadList();//重新加载
        }
    };

    //刷新列表
    $scope.reloadList = function () {
        //切换页码
        $scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    }*/


    //分页方法
    $scope.findPage = function (page, size) {
        brandService.findPage(page, size).success(
            function (response) {
                $scope.list = response.rows; //当前页的数据
                $scope.paginationConf.totalItems = response.total; //更新记录数
            }
        );
    }

    //增加（保存）方法
    $scope.save = function () {
        var object = null; //方法名

        if ($scope.entity.id != null) {
            //修改方法
            object = brandService.update($scope.entity);
        } else {
            //增加方法
            object = brandService.add($scope.entity);
        }

        object.success(
            function (response) {
                if (response.success) {
                    //重新查询
                    $scope.reloadList();//重新加载
                } else {
                    alert(response.message);
                }
            }
        );
    }

    //查询实体
    $scope.findOne = function (id) {
        brandService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    /*//批量删除--获取集合
    $scope.selectIds = []; //用户勾选的ID集合

    $scope.updateSelection = function ($event, id) {

        //判断复选框勾选状态
        if ($event.target.checked) {
            $scope.selectIds.push(id); //push方法往集合添加元素
        } else {
            //移除参数
            var index = $scope.selectIds.indexOf(id); //查找值得位置
            $scope.selectIds.splice(index, 1);  //参数1：移除的位置  参数二：移除的个数
        }
    }*/

    //删除
    $scope.delete = function () {
        brandService.delete($scope.selectIds).success(
            function (response) {
                if (response.success) {
                    $scope.reloadList(); //刷新
                } else {
                    alert(response.message)
                }
            }
        );
    }

    $scope.searchEntity = {};//定义搜索对象

    $scope.search = function (page, rows) {
        brandService.search(page,rows,$scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows; //当前页的数据
                $scope.paginationConf.totalItems = response.total; //更新记录数
            }
        );
    }

})