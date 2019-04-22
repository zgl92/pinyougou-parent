app.controller('baseController', function ($scope) {
    //分页控件配置  currentPage:当前页  totalItems:总记录数 itemsPerPage:每页记录数  perPageOptions:分页选项  onChange:当页码重新变更后自动触发的方法
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
    }


    //批量删除--获取集合
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
    }

    //提取json字符串数据中某个属性，返回拼接字符串 逗号分隔
    $scope.jsonToString = function (jsonString, key) {
        var json = JSON.parse(jsonString);//将json字符串转换为json对象
        var value = "";
        for (var i = 0; i < json.length; i++) {
            if (i > 0) {
                value += ","
            }
            value += json[i][key];
        }
        return value;
    }


})