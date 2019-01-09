app.factory('Connector', ['$http', '$q', function ($http, $q) {
    var baseUrl = hostname + "/";
    return {
        getSeoData: function () {
            return $http.get(baseUrl + 'seo')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse.data);
                    }
                );
        },
        getBlock: function (block_id) {
            return $http.get(baseUrl + 'block', {params: {id: block_id}})
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse.data);
                    }
                );
        },
        getBlocks: function (blocks_id) {
            return $http.post(baseUrl + 'blocks', blocks_id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse.data);
                    }
                );
        },
        sendMessage: function (message) {
            return $http.post(baseUrl + 'sendMessage', message)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        return $q.reject(errResponse.data);
                    }
                );
        }
    };
}]);