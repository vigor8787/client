<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="ko" oncontextmenu="return false">
<head>
    <!-- TODO : Common Js-->
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="/resources/js/handlebars-v4.0.5.js"></script>
    <script type="text/javascript" src="/resources/js/handlebars-helper.js"></script>
    <script type="text/javascript" src="/resources/templates/index.js"></script>
    <script type="text/javascript" src="/resources/js/common.js"></script>

    <!-- 장소 검색 Pagination-->
    <script type="text/javascript" src="/resources/js/pagination.js"></script>

    <!-- Daum 지도 -->
    <script type="text/javascript" src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=48f07c5d07a4bc57fdf67f540016be95"></script>

    <!-- 공통 css -->
    <link rel="stylesheet" href="/resources/css/maps.css" media="screen" />

    <title>장소 검색 서비스</title>
    <script>
        $(document).ready(function() {
            var main = new Main();
            main.load();
        });
    </script>
</head>

<body>
<div class="section_header">
    <div class="aside" style="background:yellow;text-align:center">
            <span id="helpPopup" title="장소검색서비스">
                <h1>장소검색서비스</h1>
                <input type="button" id="logout_btn" value="Logout"/>
            </span>
    </div>
</div>

<div id="main_frame" style="text-align:center;padding-top:50px;"/>
</body>
</html>