// MapContainer.js

import React, { useEffect } from "react";
import "./map.css";
const { kakao } = window;
let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
let lat = 37.3785528;
let lng = 127.114275;
const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB, {
      location: new kakao.maps.LatLng(lat, lng),
      bounds: new kakao.maps.LatLngBounds(
        new kakao.maps.LatLng(lat - 0.1, lng - 0.1),
        new kakao.maps.LatLng(lat + 0.1, lng + 0.1)
      ),
      // radius: 10000,
      radius: 10000,
      // size: 5,
    });

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: new kakao.maps.MarkerImage(
          "https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png",
          new kakao.maps.Size(31, 35),
          {
            offset: new kakao.maps.Point(16, 34),
            alt: "마커 이미지 예제",
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33",
          }
        ),
      });

      // var customOverlay = new kakao.maps.CustomOverlay({
      //   map: map,
      //   position: new kakao.maps.LatLng(place.y, place.x),
      //   content:
      //     '<div id="customoverlay" class="customoverlay">' +
      //     '  <a target="_blank">' +
      //     '    <span class="title">' +
      //     place.place_name +
      //     "</span>" +
      //     "  </a>" +
      //     "</div>",
      //   yAnchor: 1,
      // });
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
        // customOverlay.setMap(map);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        // infowindow.setContent(
        //   '<div style="padding:10px;font-size:12px;color:red;">' +
        //     place.place_name +
        //     "</div>"
        // );
        infowindow.close();

        // customOverlay.setMap(null);
      });
    }
  }, [searchPlace]);

  // 마커에 클릭이벤트를 등록

  return (
    <div
      id="myMap"
      style={{
        width: "500px",
        height: "500px",
      }}
    ></div>
  );
};

export default MapContainer;
