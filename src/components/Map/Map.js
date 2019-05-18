import React from 'react';
import {View, Image, Modal, Alert, TextInput, TouchableOpacity, ActivityIndicator, Text} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import Config from 'react-native-config';

import styles from '~/components/Map/styles';

MapboxGL.setAccessToken(Config.MAPBOX_API_TOKEN);

class Map extends React.Component {
  state = {
    modalOpen: false,
    loading: false,
    inputValue: '',
    coordinates: [],
  };

  renderAnnotations = () => {
    const { users } = this.props;

    return users.map(user => (
      <MapboxGL.PointAnnotation
        id='rocketseat'
        coordinate={user.coordinates}
        key={user.id}
      >
        <Image source={{ uri: user.avatar }} style={styles.avatar}/>
        <MapboxGL.Callout title={`${user.name}\n${user.bio}`} />
      </MapboxGL.PointAnnotation>
    ));
  };

  handleMapLongPress = async ({ geometry }) => {
    const { coordinates } = geometry;
    this.setState({ modalOpen: true, coordinates });
  };

  handleChangeInput = text => this.setState({ inputValue: text });

  closeModal = () => this.setState({ modalOpen: false });

  handleFetchUser = async () => {
    const { addUser } = this.props;
    this.setState({ loading: true });
    const { coordinates, inputValue } = this.state;
    await addUser(inputValue, coordinates);
    this.setState({ loading: false, modalOpen: false });
  };

  render() {
    const { modalOpen, loading, inputValue } = this.state;
    return (
      <React.Fragment>
        <Modal
          animationType="slide"
          transparent={modalOpen}
          visible={modalOpen}
          onRequestClose={this.closeModal}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Adicionar novo usuário"
              underlineColorAndroid="transparent"
              value={inputValue}
              onChangeText={this.handleChangeInput}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={this.closeModal}>
                {loading
                  ? <ActivityIndicator style={styles.loadingIcon} />
                  : <Text style={styles.text}>Cancelar</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={this.handleFetchUser}>
                {loading
                  ? <ActivityIndicator style={styles.loadingIcon} />
                  : <Text style={styles.text}>Procurar</Text> }
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <MapboxGL.MapView
          centerCoordinate={[-49.6446024, -27.2108001]}
          style={styles.container}
          showUserLocation
          styleURL={MapboxGL.StyleURL.Light}
          onLongPress={this.handleMapLongPress}
        >
          {this.renderAnnotations()}
        </MapboxGL.MapView>
      </React.Fragment>
    );
  }
};

export default Map;
