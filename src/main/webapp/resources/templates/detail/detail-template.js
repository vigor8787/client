DetailTemplate = function() {
    var self = this;

    self.load = function(main, param) {
        self.main = main;
        self.param = param;
        loadDetailInfoFrame();
        loadMap();
        ReturnSearchEventOn();
    };

    function loadDetailInfoFrame() {
        jQuery.get("/resources/templates/detail/info/detail-info.html", function (tmpl) {
            detail_info_template = Handlebars.compile(tmpl);
            detail_info_tmpl = detail_info_template({placeName:self.param.placeName, placeUrl:self.param.placeUrl, addressName:self.param.addressName, phone:self.param.phone, longtitude:self.param.longtitude, latitude:self.param.latitude});
            $('#detail_info').html(detail_info_tmpl);
        });
    };

    function loadMap() {
        var container = document.getElementById("map");
        var markerPosition = new daum.maps.LatLng(self.param.latitude, self.param.longtitude);
        var options = {
            center: markerPosition,
            level: 3
        };

        var map = new daum.maps.Map(container, options);

        //Marker
        var marker = new daum.maps.Marker({
            position: markerPosition,
            text: self.param.phone
        });
        marker.setMap(map);


        //Custom Overlay
        var content = '<div class="customoverlay">' +
            '    <span class="title" style="color:red;">'+ self.param.placeName+'</span> ' +
            '  <br> <span class="title" style="color:red;">'+ self.param.addressName +'</span> ' +
            '</div>';

        var customOverlay = new daum.maps.CustomOverlay({
            map: map,
            position: markerPosition,
            content: content,
            yAnchor: 1
        });
    };

    function ReturnSearchEventOn() {
        $('#return_search_btn').on('click', function () {
            self.main.loadSearchFrame();
        });
    }

};