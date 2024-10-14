<template>
    <div>
      <div ref="mapContainer" class="map-container"></div>
      <!-- 搜索框和按钮 -->
      <div class="controls">
        <div class="search-section">
          <input v-model="searchQuery" class="search-input" placeholder="Search a place" />
          <button @click="searchPlace" class="search-btn">Search</button>
        </div>
  
        <!-- 导航路线 -->
        <div class="route-section">
          <input v-model="startLocation" placeholder="Start Location" class="location-input" />
          <input v-model="endLocation" placeholder="End Location" class="location-input" />
          <button @click="getRoute" class="route-btn">Get Route</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
  
  export default {
    data() {
      return {
        map: null,
        searchQuery: '',
        startLocation: '',
        endLocation: '',
        mapboxAccessToken: 'pk.eyJ1IjoiYXV5aXBlbmciLCJhIjoiY20yOW52dW5iMDdrajJscHR6M2FmMGdobCJ9.uHUVWDdchlEnCjBHBrE0Tg', // 替换为你的Mapbox Access Token
      };
    },
    mounted() {
      this.initializeMap();
    },
    methods: {
      initializeMap() {
        mapboxgl.accessToken = this.mapboxAccessToken;
        this.map = new mapboxgl.Map({
          container: this.$refs.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-74.5, 40],
          zoom: 9,
        });
  
        this.map.addControl(new mapboxgl.NavigationControl());
  
        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        });
        this.map.addControl(geocoder);
      },
      searchPlace() {
        const geocoder = new MapboxGeocoder({
          accessToken: this.mapboxAccessToken,
          mapboxgl: mapboxgl,
          proximity: {
            longitude: this.map.getCenter().lng,
            latitude: this.map.getCenter().lat,
          },
        });
        geocoder.query(this.searchQuery);
      },
      getRoute() {
        const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.startLocation};${this.endLocation}?geometries=geojson&access_token=${this.mapboxAccessToken}`;
        
        fetch(directionsRequest)
          .then(response => response.json())
          .then(data => {
            const route = data.routes[0].geometry;
            this.map.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: route,
                },
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75,
              },
            });
          })
          .catch(err => console.error(err));
      },
    },
  };
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 500px;
    margin: 20px 0;
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px 0;
  }
  
  .search-section, .route-section {
    display: flex;
    gap: 10px;
  }
  
  .search-input, .location-input {
    padding: 10px;
    width: 200px; /* 调整搜索框的宽度 */
    border: 1px solid #ccc;
  }
  
  .search-btn, .route-btn {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .search-btn {
    width: 100px; /* 调整按钮的宽度 */
  }
  
  .route-btn {
    width: 100px;
  }
  </style>
  