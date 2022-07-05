<template>
  <div class="map__wrapper">
    <div class="map__host" ref="map"></div>
    <div class="alert alert-danger" role="alert" v-show="errorMessage">
      {{ errorMessage }}
    </div>
    <p class="map__info">
      Click on the map to add your address. <br />Shop locations, where you
      ordered goodies, are marked with candies.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      geocoder: null,
      errorMessage: null,
      marker: null,
    };
  },
  props: {
    address: {
      type: String,
      default: '',
    },
    shopLocations: {
      type: Array,
      default: [],
    },
  },
  watch: {
    address(newAddress, oldAddress) {
      if (newAddress.trim() != oldAddress.trim()) {
        this.getAddressCoordinates(newAddress);
      }
    },
    shopLocations(newLocations, oldLocations) {
      if (newLocations.length != oldLocations.length) {
        this.deleteShopMarkers();
        this.addShopMarkers(newLocations);
      }
    },
  },
  mounted() {
    if (!window.markerArray) {
      window.markerArray = [];
    }

    const vm = this;
    this.map = new window.google.maps.Map(this.$refs.map, {
      center: { lat: 49.2348125, lng: 28.4694866 },
      zoom: 16,
    });
    this.geocoder = new google.maps.Geocoder();

    const addMarker = position => {
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position,
          map: this.map,
        });
      }
      this.marker.setPosition(position);
      this.map.panTo(position);
      this.getAddressText(position);
    };

    this.map.addListener('click', event => {
      addMarker(event.latLng, this.map);
    });
  },
  methods: {
    getAddressText(position) {
      const vm = this;
      this.geocoder.geocode({ location: position }, function (results, status) {
        if (status == 'OK') {
          vm.emitAddress(results[0].formatted_address);
        } else {
          console.log(
            'Geocode was not successful for the following reason: ' + status
          );
          vm.showError("Can't find address");
        }
      });
    },
    getAddressCoordinates(address) {
      const vm = this;
      this.geocoder.geocode({ address: address }, function (results, status) {
        if (status == 'OK') {
          vm.map.setCenter(results[0].geometry.location);
          vm.marker = new google.maps.Marker({
            map: vm.map,
            position: results[0].geometry.location,
          });
        } else {
          console.log(
            'Geocode was not successful for the following reason: ' + status
          );
          vm.showError("Can't find address on the map");
        }
      });
    },
    addShopMarkers(locations) {
      const vm = this;

      locations.forEach(location => {
        const { lat, lng } = location;
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(lat, lng),
          icon: '/assets/icons/candy-icon.png',
          map: vm.map,
        });
        window.markerArray.push(marker);
      });
    },
    deleteShopMarkers() {
      window.markerArray.forEach(marker => marker.setMap(null));
      window.markerArray = [];
    },
    showError(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
    },
    emitAddress(address) {
      this.$emit('onGetAddress', address);
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  &__host {
    width: 300px;
    height: 300px;
  }
  &__info {
    max-width: 300px;
    background: #ffffff;
    padding: 20px 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
}
</style>
