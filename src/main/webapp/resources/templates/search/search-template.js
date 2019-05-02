SearchTemplate = function() {
    var self = this;
    self.keyword = 'kakao';
    self.page = 1;
    pageSize = 10;
    self.totalNumber = 0;

    self.load = function(main) {
        self.main = main;
        keywordSearchEventOn();
    };

    jQuery.get("/resources/templates/search/top/top-keyword-entry-template.html", function(resp) {
        self.keyword_template = Handlebars.compile(resp);
        initTop10();
    });

    jQuery.get("/resources/templates/search/place/place-pagination-template.html", function(resp) {
        self.place_template = Handlebars.compile(resp);
        initPlaceList();
    });


    function initPlaceList() {
            $('#pagination-container').pagination({
                dataSource: 'http://localhost:9000/api/places?keyword='+self.keyword,
                locator: 'documents',
                pageSize: pageSize,
                showPrevious: false,
                showNext: false,
                totalNumberLocator: function(response) {
                    return Number(response.meta.total_count);
                },
                alias: {
                    pageNumber: 'page',
                    pageSize: 'limit'
                },
                callback: function(data, pagination) {
                    place_tmpl = self.place_template({data:data, startIdx: (pagination.pageNumber - 1) * pagination.pageSize});
                    $('#data-container').html(place_tmpl);
                    placeClickEventOn();
                }
            });
    }

    function initTop10() {
        var param = {};

        callApi("http://localhost:9000/api/rank/keywords", param).then(res => {
            top5_data = res.slice(0,5);
            top10_data = res.slice(5,10);

            keyword_top5_tmpl = self.keyword_template({entry:top5_data, startIdx:0});
            keyword_top10_tmpl = self.keyword_template({entry:top10_data, startIdx:5});

            $('#keyword_top5').html(keyword_top5_tmpl);
            $('#keyword_top10').html(keyword_top10_tmpl);
        });
    }


    function placeClickEventOn() {
        $('#place_ul li.place_li ').on('click', function (e) {
            var param = {"placeName":$(this).find('span.place_span').text(), "placeUrl":$(this).find('span.place_span').attr("placeUrl"), "addressName":$(this).find('span.place_span').attr("addressName"), "phone":$(this).find('span.place_span').attr("phone"), "longtitude":$(this).find('span.place_span').attr("longtitude"), "latitude":$(this).find('span.place_span').attr("latitude")};
            self.main.loadDetailFrame(param);
        });
    };


    function keywordSearchEventOn() {
        $('#place_search_btn').on('click', function (e) {
            keyword_val = $('#keyword_ipt').val();

            //검색
            self.keyword = keyword_val;
            initPlaceList();

            //검색 조회수 +1
            countKeyword(keyword_val);
        });
    };

    //검색 조회수 Count Async
    function countKeyword(keyword) {
        callApi('http://localhost:9000/api/rank/keyword/count/'+keyword_val,{});
    }

};