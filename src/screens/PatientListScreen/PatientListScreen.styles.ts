// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
    paddingBottom: 6,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 4,
    marginHorizontal: 2,
  },
  button: {
    backgroundColor: '#4682B4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  delete: {
    backgroundColor: '#DC143C',
  },
  cancel: {
    backgroundColor: '#999',
  },
  btnText: {
    color: 'white',
  },
});

export default styles;
