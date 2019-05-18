import { StyleSheet } from 'react-native';
import { metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 3,
  },
  input: {
    height: 80,
    width: metrics.screenWidth,
    backgroundColor: '#FFF',
    color: 'red',
    borderRadius: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    height: 80,
    width: metrics.screenWidth / 2,
    backgroundColor: 'green',
  },
  cancelButton: {
    height: 80,
    width: metrics.screenWidth / 2,
    backgroundColor: 'red',
  },
  loadingIcon: {
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#9B65E6',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'sans-serif',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  },
});

export default styles;
